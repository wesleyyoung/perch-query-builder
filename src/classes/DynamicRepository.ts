import {GraphQLQueryTree} from "./GraphQLQueryTree";
import {Repository, SelectQueryBuilder} from "typeorm";
import {buildQueryRecursively} from "../functions";

/**
 * @class DynamicRepository
 * @description This class helps to resolve any GraphQL query based on the query tree constructed using GraphQLResolveInfo.
 * It can find any type of entity, join every requested relation and select asked attributes.
 */
export class DynamicRepository {

    /**
     * Generates TypeORM queryBuilder based on GraphQLQueryTree args, relations & options
     * @param repo
     * @param tree GraphQLQueryTree
     * @param qb
     */
    public static generateQueryBuilder<T>(
        repo: Repository<T>,
        tree: GraphQLQueryTree<T>,
        qb?: SelectQueryBuilder<T>
    ): SelectQueryBuilder<T> {

        const metadata = repo.metadata;
        qb = qb || repo.createQueryBuilder();

        qb.select([]); // Clear any selected attributes in the query builder

        buildQueryRecursively<T>(tree, qb, qb.alias, metadata);

        return qb;
    }

    /**
     * Finds multiple instances of entity
     * @param repo
     * @param tree GraphQLQueryTree
     */
    public static async find<T>(
        repo: Repository<T>,
        tree: GraphQLQueryTree<T>
    ): Promise<T[]> {
        return DynamicRepository.generateQueryBuilder<T>(repo, tree).getMany();
    }

    /**
     * Finds one instance of entity
     * @param repo
     * @param tree GraphQLQueryTree
     */
    public static async findOne<T>(
        repo: Repository<T>,
        tree: GraphQLQueryTree<T>
    ): Promise<T | undefined> {
        return DynamicRepository.generateQueryBuilder<T>(repo, tree).getOne();
    }
}
