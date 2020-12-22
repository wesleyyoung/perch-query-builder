import {ArgsType, Field, Int} from "@nestjs/graphql";

/**
 * @class PaginationArgs
 */
@ArgsType()
export class PaginationArgs {
    // @Field(type => Int, {nullable: true})
    // __first: number;

    // @Field(type => Int, {nullable: true})
    // __last: number;

    @Field(type => Int, {nullable: true})
    __limit: number;

    @Field(type => Int, {nullable: true})
    __offset: number;
}
