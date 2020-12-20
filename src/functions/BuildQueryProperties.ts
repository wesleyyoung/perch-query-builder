import {GraphQLObjectType} from "graphql";
import {GraphQLQueryTreeProperties} from "../classes";
import {buildQueryOptions} from "./BuildQueryOptions";

/**
 * @description This function takes query args and differs between args and options
 * @param type node type
 * @param queryArgs Args of graphql query
 */
export function buildQueryProperties<T>(
    type: GraphQLObjectType,
    queryArgs: { [key: string]: any },
): GraphQLQueryTreeProperties<T> {

    const args: { [key: string]: any } = {};
    const queryOptions: { [key: string]: any } = {};

    if (type.getFields && queryArgs) {
        Object.keys(queryArgs).forEach((key) => {
            if (Object.keys(type.getFields()).includes(key)) {
                args[key] = queryArgs[key];
            } else {
                queryOptions[key] = queryArgs[key];
            }
        });
    }

    return new GraphQLQueryTreeProperties(args, buildQueryOptions(queryOptions), type);
}
