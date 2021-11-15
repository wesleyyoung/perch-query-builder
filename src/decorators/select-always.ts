import {SELECT_ALWAYS} from "../constants";

/**
 * @description Force-selects columns, even if they are not in the GraphQL query. Handy if you use e.g. an `@AfterLoad()` that depends on a column.
 */
export function SelectAlways() {
    return (target, property) => {
        const metadata = Reflect.getMetadata(SELECT_ALWAYS, target) || [];
        metadata.push(property);
        Reflect.defineMetadata(SELECT_ALWAYS, metadata, target);
    };
}
