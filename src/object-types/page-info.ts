import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export abstract class PageInfo {
    @Field((type: void | undefined) => Boolean)
    hasNextPage: boolean;

    @Field((type: void | undefined) => Boolean)
    hasPreviousPage: boolean;

    @Field((type: void | undefined) => String)
    startCursor: string;

    @Field((type: void | undefined) => String)
    endCursor: string;
}
