import {ArgsType, Field, Int} from "@nestjs/graphql";

/**
 * @class ConnectionArgs
 */
@ArgsType()
export class ConnectionArgs {
    @Field(type => Int, {nullable: true})
    _first: number;

    @Field(type => Int, {nullable: true})
    _last: number;

    @Field(type => String, {nullable: true})
    _before: string;

    @Field(type => String, {nullable: true})
    _after: string;
}
