import {GraphQLQueryTree} from "./GraphQLQueryTree";
import {Repository, SelectQueryBuilder} from "typeorm";
import {buildQueryRecursively} from "../";
import {GraphQLResolveInfo} from "graphql";

/**
 * @class ElatedRepository
 * @description This class helps to resolve any GraphQL query based on the query tree constructed using GraphQLResolveInfo.
 * It can find any type of entity, join every requested relation and select asked attributes.
 */
export class ElatedRepository {

    /**
     * Generates TypeORM queryBuilder based on GraphQLQueryTree args, relations & options
     * @param repository
     * @param qb
     * @param info
     */
    public static generateQueryBuilder<T>(
        repository: Repository<T>,
        info: GraphQLResolveInfo,
        qb?: SelectQueryBuilder<T>,
    ): SelectQueryBuilder<T> {

        const tree = GraphQLQueryTree.createTree(info);

        qb = qb || repository.createQueryBuilder();

        qb.select([]);

        buildQueryRecursively<T>(tree, qb, qb.alias, repository.metadata);

        return qb;
    }

    /**
     * Finds multiple instances of entity
     * @param repository
     * @param info
     */
    public static async find<T>(
        repository: Repository<T>,
        info: GraphQLResolveInfo,
    ): Promise<T[]> {
        return ElatedRepository.generateQueryBuilder<T>(repository, info).getMany();
    }

    /**
     * Finds one instance of entity
     * @param repository
     * @param info
     */
    public static async findOne<T>(
        repository: Repository<T>,
        info: GraphQLResolveInfo,
    ): Promise<T | undefined> {
        return ElatedRepository.generateQueryBuilder<T>(repository, info).getOne();
    }
}
