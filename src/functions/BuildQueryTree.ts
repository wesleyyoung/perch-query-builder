import {GraphQLResolveInfo} from "graphql";
import {getType, buildTree, GraphQLQueryTree, buildQueryProperties} from "../";
import {getArgumentValues} from "graphql/execution/values";

/**
 * @description This function takes GraphQLResolveInfo and starts to build the query tree
 * @param info GraphQLResolveInfo
 */
export function buildQueryTree<T>(info: GraphQLResolveInfo): GraphQLQueryTree<T> {

    const name = info.fieldName;
    const fieldDef = getType(info.parentType).getFields()[name];
    const queryArgs = getArgumentValues(fieldDef, info.fieldNodes[0], info.variableValues);
    const type = getType(info.returnType);

    const properties = buildQueryProperties(type, queryArgs);
    const root = new GraphQLQueryTree(info.fieldName, properties);

    buildTree<T>(root, info.fieldNodes[0].selectionSet.selections, info);

    return root;
}
