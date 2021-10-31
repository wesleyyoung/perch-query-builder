import {GraphQLQueryTree, PAGINATE} from "../";
import {RelationMetadata} from "typeorm/metadata/RelationMetadata";
import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";

/**
 * @description Builds a TypeORM query with the queryBuilder recursively, joining every requested relation,
 * selecting every asked attribute, and adding query options.
 * @param tree GraphQLQueryTree
 * @param qb SelectQueryBuilder
 * @param alias Entity alias
 * @param metadata EntityMetadata
 */
export function buildQueryRecursively<T>(
    tree: GraphQLQueryTree<T>,
    qb: SelectQueryBuilder<T>,
    alias: string,
    metadata: EntityMetadata
) {
    const options = tree.properties.options;

    // Firstly, we list all selected fields at this level of the query tree
    const selectedFields = tree.fields
        .filter((field: GraphQLQueryTree<T>) => !field.isRelationIn(metadata))
        .map((field: GraphQLQueryTree<T>) => alias + "." + field.name);

    // Secondly, we list all fields used in arguments
    const argFields = Object
        .keys(tree.properties.args)
        .map((arg: string) => alias + "." + arg);

    // Thirdly, we select all primary keys, to make sure that joined relations are not null
    const primaryFields = metadata.primaryColumns
        .map((ref: ColumnMetadata) => alias + "." + ref.propertyPath)

    // We select all of above
    qb.addSelect(argFields);
    qb.addSelect(selectedFields);
    qb.addSelect(primaryFields)

    // We add order options
    Object.keys(options.order)
        .forEach((key: string) => {
            qb.addOrderBy(alias + "." + key, options.order[key]);
        });

    // We add args filters
    Object.keys(tree.properties.args)
        .forEach((key: string) => {
            if(Array.isArray(tree.properties.args[key])) {
                qb.andWhere(alias + "." + key + " IN (:" + key + ")", { [`${key}`]: tree.properties.args[key] });
            } else {
                qb.andWhere(alias + "." + key + " = :" + key, { [`${key}`]: tree.properties.args[key] });
            }
        });

    if (options.paginate.offset) {
        qb.skip(options.paginate.offset);
    }

    if (options.paginate.limit) {
        qb.take(options.paginate.limit);
    }

    // For each asked relation
    tree.fields
        .filter((field: GraphQLQueryTree<T>) => field.isRelationIn(metadata))
        .forEach((relationTree: GraphQLQueryTree<T>) => {
            const relation: RelationMetadata = metadata.findRelationWithPropertyPath(relationTree.name);

            // If the relation query tree is asking for exists, we join it recursively
            if (relation) {
                // We append _perch to avoid duplicate alias names when using joins with pagination
                const relationAlias = qb.connection
                    .namingStrategy
                    .eagerJoinRelationAlias(alias, relation.propertyPath);

                qb.leftJoin(alias + "." + relation.propertyPath, relationAlias);

                buildQueryRecursively(relationTree, qb, relationAlias, relation.inverseEntityMetadata);
            }
        });
}
