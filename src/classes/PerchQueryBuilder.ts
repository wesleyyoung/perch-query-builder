import {Repository, SelectQueryBuilder} from "typeorm";
import {buildQueryRecursively, GraphQLQueryTree} from "../";
import {GraphQLResolveInfo} from "graphql";
import {QueryBuilderOptions} from "../interfaces";

/**
 * @class PerchQueryBuilder
 * @description This class helps to resolve any GraphQL query based on the query tree constructed using GraphQLResolveInfo.
 * It will attempt to join every relation and select all attributes present in the GraphQL query that map to a valid property on the given entity type.
 */
export class PerchQueryBuilder {

    /**
     * Generates TypeORM queryBuilder based on GraphQLQueryTree args, relations & options
     * @param repository
     * @param info
     * @param options
     */
    public static generateQueryBuilder<T>(
        repository: Repository<T>,
        info: GraphQLResolveInfo,
        options?: QueryBuilderOptions<T>,
    ): SelectQueryBuilder<T> {

        let tree = GraphQLQueryTree.createTree(info);
        if (options?.rootField) {
            options.rootField.split(".").forEach((fieldName) => {
                tree = tree.getField(fieldName);
            });
        }

        const validFields = tree.fields.filter(item => repository.metadata.propertiesMap[item.name] || item.fields.length > 0);

        tree.fields = validFields;

        const qb = options?.qb || repository.createQueryBuilder();

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
        return PerchQueryBuilder.generateQueryBuilder<T>(repository, info).getMany();
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
        return PerchQueryBuilder.generateQueryBuilder<T>(repository, info).getOne();
    }
}
