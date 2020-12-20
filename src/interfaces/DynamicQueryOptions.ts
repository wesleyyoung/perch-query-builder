/**
 * @interface DynamicQueryOptions
 * @description query options interface
 */
export interface DynamicQueryOptions<T = any> {
    // skip?: number;
    // take?: number;
    order?: {
        [P in keyof T]?: "ASC" | "DESC" | 1 | -1;
    };
}
