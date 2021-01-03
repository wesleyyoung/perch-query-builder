import {ArgsType, Field} from "@nestjs/graphql";
import {LikeArgumentType} from "../graphql-argument-types";

/**
 * @class LikeArgs
 * @description Specify the property to match a "LIKE" case against.
 * example: MyQuery(like: {"id"}) { id }
 */
@ArgsType()
export class LikeArgs {
    @Field(type => LikeArgumentType, {nullable: true})
    _like: { prop: string; value: string; };
}
