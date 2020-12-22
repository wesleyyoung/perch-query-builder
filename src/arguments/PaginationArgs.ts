import {ArgsType, Field, Int} from "@nestjs/graphql";

/**
 * @class PaginationArgs
 */
@ArgsType()
export class PaginationArgs {
    // @Field(type => Int, {nullable: true})
    // $first: number;

    // @Field(type => Int, {nullable: true})
    // $last: number;

    @Field(type => Int, {nullable: true})
    $limit: number;

    @Field(type => Int, {nullable: true})
    $offset: number;
}
