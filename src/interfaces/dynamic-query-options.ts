import {QueryOrder} from "../types";
import {PAGINATE} from "../constants";

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
}
