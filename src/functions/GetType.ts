import {getNullableType, GraphQLObjectType} from "graphql";

/**
 * @description Gets real type from GraphQL type
 * For example: [Installation!]! => Installation
 * @param type any
 */
export function getType(type: any): GraphQLObjectType {

    type = getNullableType(type);

    if (type.ofType) {
        type = getType(type.ofType);
    }

    return type;
}
