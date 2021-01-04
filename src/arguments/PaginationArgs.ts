import {ArgsType, Field, Int} from "type-graphql";

/**
 * @class PaginationArgs
 */
@ArgsType()
export class PaginationArgs {
    // @Field(type => Int, {nullable: true})
    // _first: number;

    // @Field(type => Int, {nullable: true})
    // _last: number;

    @Field(type => Int, {nullable: true})
    _limit: number;

    @Field(type => Int, {nullable: true})
    _offset: number;
}
