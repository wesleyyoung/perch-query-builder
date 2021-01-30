import {EqualityOperator, QueryOrder} from "../types";
import {PAGINATE} from "../constants";
import {SearchOperator} from "../types/search-operator";

/**
 * @interface DynamicQueryOptions
 * @description DynamicQueryOptions interface
 */
export interface DynamicQueryOptions<T> {
    paginate?: {
        [P in keyof typeof PAGINATE]?: number;
    };
    order?: {
        [P in keyof T]?: QueryOrder;
    };
    search?: {
        equality?: EqualityOperator;
        operator?: SearchOperator;
    }
}
