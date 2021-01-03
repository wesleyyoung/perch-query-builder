import {GraphQLInputObjectType, GraphQLString} from "graphql";

export const LikeArgumentType = new GraphQLInputObjectType({
    name: "LikeArgumentType",
    fields: {
        prop: {type: GraphQLString},
        value: {type: GraphQLString},
    }
})
