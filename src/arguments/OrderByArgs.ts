import {ArgsType, Field} from "type-graphql";

/**
 * @class OrderByArgs
 * @description Specify the property to order the results by.
 * example: MyQuery(orderDescBy: "id") { id }
 */
@ArgsType()
export class OrderByArgs {
    @Field(type => String, {nullable: true})
    _orderDescBy: string;

    @Field(type => String, {nullable: true})
    _orderAscBy: string;
}
