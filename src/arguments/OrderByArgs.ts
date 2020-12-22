import {ArgsType, Field} from "@nestjs/graphql";

/**
 * @class OrderByArgs
 * @description Specify the property to order the results by.
 * example: MyQuery(orderDescBy: "id") { id }
 */
@ArgsType()
export class OrderByArgs {
    @Field(type => String, {nullable: true})
    $orderDescBy: string;

    @Field(type => String, {nullable: true})
    $orderAscBy: string;
}
