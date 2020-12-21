import {GraphQLObjectType} from "graphql";
import {DynamicQueryOptions} from "../";

/**
 * @class GraphQLQueryTreeProperties<T>
 * @param args
 * @param options DynamicQueryOptions<T>
 * @param type GraphQLObjectType
 */
export class GraphQLQueryTreeProperties<T> {
    constructor(
        public args: { [key: string]: any },
        public options: DynamicQueryOptions<T>,
        public type: GraphQLObjectType
    ) {}
}
