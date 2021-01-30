import {DynamicQueryOptions, ORDER, PAGINATE, QueryOrder} from "../";

/**
 * @description Builds DynamicQueryOptions
 * @param queryOptions graphql options
 */
export function buildQueryOptions<T>(queryOptions: { [key: string]: any } = {}): DynamicQueryOptions<T> {

    const options: DynamicQueryOptions<T> = {};
    const order: { [P in keyof T]?: QueryOrder} = {};
    const paginate: { [P in keyof typeof PAGINATE]?: number; } = {};

    Object.entries(queryOptions)
        .forEach(([opt, value]) => {
            switch (opt) {
                case ORDER.descend_arg:
                    order[value] = ORDER.descend;
                    break;
                case ORDER.ascend_arg:
                    order[value] = ORDER.ascend;
                    break;
                // case PAGINATE.first:
                //     paginate.first = value;
                //     delete paginate.last;
                //     delete paginate.limit;
                //     break;
                // case PAGINATE.last:
                //     paginate.last = value;
                //     delete paginate.first;
                //     delete paginate.limit;
                //     break;
                case PAGINATE.limit:
                    paginate.limit = value;
                    // delete paginate.first;
                    // delete paginate.last;
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
