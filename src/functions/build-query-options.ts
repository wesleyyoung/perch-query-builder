import {DynamicQueryOptions, ORDER, PAGINATE, QueryOrder, Slice} from "../";

/**
 * @description Builds DynamicQueryOptions
 * @param queryOptions graphql options
 */
export function buildQueryOptions<T>(queryOptions: { [key: string]: any } = {}): DynamicQueryOptions<T> {

    const options: DynamicQueryOptions<T> = {};
    const order: { [P in keyof T]?: QueryOrder} = {};
    const paginate: { [P in keyof typeof PAGINATE]?: number; } = {};
    const connection: { slice?: { [P in keyof typeof Slice]?: string | number; } } = {};

    Object.entries(queryOptions)
        .forEach(([opt, value]) => {

            if (Slice[value]) {
                connection.slice = {
                    ...connection?.slice,
                    [Slice[value]]: value as number
                }

                return;
            }

            switch (opt) {
                case ORDER.descend_arg:
                    order[value] = ORDER.descend;
                    break;
                case ORDER.ascend_arg:
                    order[value] = ORDER.ascend;
                    break;
                case PAGINATE.limit:
                    paginate.limit = value;
                    break;
                case PAGINATE.offset:
                    paginate.offset = value;
                    break;
                default:
                    break;
            }
        });

    options.order = order;
    options.paginate = paginate;

    return options;
}
