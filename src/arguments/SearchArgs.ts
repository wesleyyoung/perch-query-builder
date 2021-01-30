import {ArgsType, Field, Int} from "@nestjs/graphql";
import {EqualityOperator} from "../types";
import {SearchOperator} from "../types/search-operator";

/**
 * @class PaginationArgs
 */
@ArgsType()
export class SearchArgs {

    /**
     * @description _equalityOperator decides whether to use LIKE or EQUAL.
     * Valid values are 'like' and 'exact'
     * @example _equalityOperator: name: "Henry%", _equalityOperator: 'like'
     */
    @Field(type => String, {nullable: true})
    _equalityOperator: EqualityOperator;

    /**
     * @description _searchOperator decides where or not to use AND WHERE or OR WHERE when specifying multiple arguments
     * default behavior is AND WHERE
     * Valid values are 'and' and 'or'
     */
    @Field(type => String, {nullable: true})
    _searchOperator: SearchOperator;
}
