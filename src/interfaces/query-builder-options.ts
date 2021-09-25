import {SelectQueryBuilder} from "typeorm";

/**
 * @interface QueryBuilderOptions
 * @description QueryBuilderOptions interface
 */
export interface QueryBuilderOptions<T> {
    qb?: SelectQueryBuilder<T>;
    /**
     * Set a custom field that should be treated as the starting field for the automatic query builder.
     * Can be a path.
     * Examples: `field`, `field.subfield`
     *
     * @see https://github.com/wesleyyoung/perch-query-builder/issues/10
     */
    rootField?: string;
}