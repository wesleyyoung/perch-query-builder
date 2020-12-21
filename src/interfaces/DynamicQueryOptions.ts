import {QueryOrder} from "../types";

/**
 * @interface DynamicQueryOptions
 * @description DynamicQueryOptions interface
 */
export interface DynamicQueryOptions<T> {
    order?: {
        [P in keyof T]?: QueryOrder;
    };
}
