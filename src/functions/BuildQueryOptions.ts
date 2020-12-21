import {DynamicQueryOptions, ORDER, QueryOrder} from "../";

/**
 * @description Builds DynamicQueryOptions
 * @param queryOptions graphql options
 */
export function buildQueryOptions<T>(queryOptions: { [key: string]: any } = {}): DynamicQueryOptions<T> {

    const options: DynamicQueryOptions<T> = {};
    const order: { [P in keyof T]?: QueryOrder} = {};

    Object.entries(queryOptions)
        .forEach(([opt, value]) => {
            switch (opt) {
                case "orderDescBy":
                    order[value] = ORDER.DESCEND;
                    break;
                case "orderAscBy":
                    order[value] = ORDER.ASCEND;
                    break;
                default:
                    break;
            }
        });

    options.order = order;

    return options;
}
