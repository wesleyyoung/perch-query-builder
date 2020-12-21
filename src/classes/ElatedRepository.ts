import {GraphQLQueryTree} from "./GraphQLQueryTree";
import {Repository, SelectQueryBuilder} from "typeorm";
import {buildQueryRecursively} from "../";
import {EntityMetadata} from "typeorm/metadata/EntityMetadata";
import {GraphQLResolveInfo} from "graphql";

/**
 * @class ElatedRepository
 * @description This class helps to resolve any GraphQL query based on the query tree constructed using GraphQLResolveInfo.
 * It can find any type of entity, join every requested relation and select asked attributes.
 */
export class ElatedRepository {

    /**
     * Generates TypeORM queryBuilder based on GraphQLQueryTree args, relations & options
     * @param qb
     * @param metadata
     * @param info
     */
    public static generateQueryBuilder<T>(
        qb: SelectQueryBuilder<T>,
        metadata: EntityMetadata,
        info: GraphQLResolveInfo,
    ): SelectQueryBuilder<T> {

        const tree = GraphQLQueryTree.createTree(info);

        qb.select([]);

        buildQueryRecursively<T>(tree, qb, qb.alias, metadata);

        return qb;
    }

    /**
     * Finds multiple instances of entity
     * @param qb
     * @param metadata
     * @param info
     */
    public static async find<T>(
        qb: SelectQueryBuilder<T>,
        metadata: EntityMetadata,
        info: GraphQLResolveInfo,
    ): Promise<T[]> {
        return ElatedRepository.generateQueryBuilder<T>(qb, metadata, info).getMany();
    }

    /**
     * Finds one instance of entity
     * @param qb
     * @param metadata
     * @param info
     */
    public static async findOne<T>(
        qb: SelectQueryBuilder<T>,
        metadata: EntityMetadata,
        info: GraphQLResolveInfo,
    ): Promise<T | undefined> {
        return ElatedRepository.generateQueryBuilder<T>(qb, metadata, info).getOne();
    }
}
