import {GraphQLObjectType} from "graphql";
import {GraphQLQueryTreeProperties, buildQueryOptions} from "../";

/**
 * @description This function takes the query arguments and splits them up into arguments and options
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
        Object.keys(queryArgs).forEach((key: string) => {
            if (Object.keys(type.getFields()).includes(key)) {
                args[key] = queryArgs[key];
            } else {
                queryOptions[key] = queryArgs[key];
            }
        });
    }

    return new GraphQLQueryTreeProperties(args, buildQueryOptions(queryOptions), type);
}
