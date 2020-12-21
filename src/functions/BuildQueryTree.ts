import {GraphQLResolveInfo} from "graphql";
import {getType, buildTree, GraphQLQueryTree, buildQueryProperties} from "../";
import {getArgumentValues} from "graphql/execution/values";

/**
 * @description This function returns a GraphQLQueryTree from the GraphQLResolveInfo passed to it
 * @param info GraphQLResolveInfo
 */
export function buildQueryTree<T>(info: GraphQLResolveInfo): GraphQLQueryTree<T> {

    const name = info.fieldName;
    const fieldDef = getType(info.parentType).getFields()[name];
    const node = info.fieldNodes[0];
    const queryArgs = getArgumentValues(fieldDef, node, info.variableValues);
    const type = getType(info.returnType);
    const properties = buildQueryProperties(type, queryArgs);
    const root = new GraphQLQueryTree(info.fieldName, properties);

    buildTree<T>(root, node.selectionSet.selections, info);

    return root;
}
