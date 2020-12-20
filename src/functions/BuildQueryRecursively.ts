import {GraphQLQueryTree} from "../classes";
import {RelationMetadata} from "typeorm/metadata/RelationMetadata";
import {EntityMetadata, SelectQueryBuilder} from "typeorm";

/**
 * @description Builds TypeORM query with the query builder recursively, joining every requested relation,
 * selection every asked attribute, adding query options.
 * @param tree GraphQLQueryTree
 * @param qb SelectQueryBuilder
 * @param alias Entity alias
 * @param metadata Entity metadata
 */
export function buildQueryRecursively<T>(
    tree: GraphQLQueryTree<T>,
    qb: SelectQueryBuilder<T>,
    alias: string,
    metadata: EntityMetadata) {

    // Firstly, we list all selected fields at this level of the query tree
    const selectedFields = tree.fields.filter((field) => !field.isRelation()).map((field) => alias + "." + field.name);

    // Secondly, we list all fields used in arguments
    const argFields = Object.keys(tree.properties.args).map((arg) => alias + "." + arg);

    // We select all of above
    qb.addSelect(argFields);
    qb.addSelect(selectedFields);

    // We add order options
    Object.keys(tree.properties.options.order).forEach((key: string) => {
        qb.addOrderBy(alias + "." + key, tree.properties.options.order[key]);
    });

    // We add args filters
    Object.keys(tree.properties.args).forEach((key: string) => {
        qb.andWhere(alias + "." + key + " = :" + key, {[`${key}`]: tree.properties.args[key]});
    });

    // For each asked relation
    tree.fields.filter((field) => field.isRelation()).forEach((relationTree) => {

        const relation: RelationMetadata = metadata.findRelationWithPropertyPath(relationTree.name);

        // If the relation query tree is asking for exists, we join it recursively
        if (relation) {
            const relationAlias = qb.connection.namingStrategy.eagerJoinRelationAlias(alias, relation.propertyPath);

            qb.leftJoinAndSelect(alias + "." + relation.propertyPath, relationAlias);
            buildQueryRecursively(relationTree, qb, relationAlias, relation.inverseEntityMetadata);
        }
    });
}
