import {QueryOrder} from "../types";
import {PAGINATE, Slice} from "../constants";

/**
 * @interface DynamicQueryOptions
 * @description DynamicQueryOptions interface
 */
export interface DynamicQueryOptions<T> {
    paginate?: {
        [P in keyof typeof PAGINATE]?: number;
    };
    connection?: {
        slice: {
            [P in keyof typeof Slice]: P;
        }
    },
    order?: {
        [P in keyof T]?: QueryOrder;
    };
}
