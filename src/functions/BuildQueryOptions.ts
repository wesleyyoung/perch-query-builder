import {DynamicQueryOptions} from "../interfaces";

/**
 * Builds Dynamic Query Options
 * @param queryOptions graph ql options
 */
export function buildQueryOptions<T>(queryOptions: { [key: string]: any } = {}): DynamicQueryOptions<T> {

    const options: DynamicQueryOptions<T> = {};
    const order: { [P in keyof T]?: "ASC" | "DESC" | 1 | -1 } = {};

    Object.entries(queryOptions).forEach(([op, value]) => {
        switch (op) {
            case "orderDescBy":
                order[value] = "DESC";
                break;
            case "orderAscBy":
                order[value] = "ASC";
                break;
            default:
                break;
        }
    });

    options.order = order;

    return options;
}
