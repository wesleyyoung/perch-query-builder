import {ArgsType, Field, Int} from "@nestjs/graphql";

/**
 * @class PaginationArgs
 */
@ArgsType()
export class PaginationArgs {
    @Field(type => Int, {nullable: true})
    _limit: number;

    @Field(type => Int, {nullable: true})
    _offset: number;
}
