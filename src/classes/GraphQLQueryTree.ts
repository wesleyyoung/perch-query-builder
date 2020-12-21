import {GraphQLResolveInfo} from "graphql";
import {buildQueryTree, GraphQLQueryTreeProperties} from "../";


/**
 * @class GraphQLQueryTree
 * @description Represents GraphQL query with an object tree, each node has its own arguments and options.
 * Each node is related to the next as its child/parent relationship.
 * If a field does not have children, then it is a simple field (Int, String)
 */
export class GraphQLQueryTree<T> {

    constructor(
        public name: string,
        public properties: GraphQLQueryTreeProperties<T> = null,
        public fields: Array<GraphQLQueryTree<T>> = []
    ) {}

    /**
     * @description Creates the QueryTree
     * @param info GraphQLResolveInfo
     */
    public static createTree<X>(info: GraphQLResolveInfo): GraphQLQueryTree<X> {
        return buildQueryTree<X>(info);
    }

    /**
     * @description Sets the node child trees
     * @param fields childFields
     */
    public setFields(fields: Array<GraphQLQueryTree<T>>): void {
        this.fields = fields;
    }

    /**
     * @description Sets the node properties
     * @param properties field properties
     */
    public setProperties(properties: GraphQLQueryTreeProperties<T>): void {
        this.properties = properties;
    }

    /**
     * @description Returns a child field
     *
     * @param name fieldName
     */
    public getField(name: string): GraphQLQueryTree<T> {
        return this.fields.find((field: GraphQLQueryTree<T>) => field.name === name);
    }

    /**
     * @description Check if this field is a relation
     */
    public isRelation(): boolean {
        return !!(this.fields && this.fields.length);
    }

    /**
     * @description Transforms the entire tree recursively into a printable object
     */
    public toObject(): { [key: string]: any } {
        const obj = {};

        obj["__args"] = this.properties.args;
        obj["__options"] = this.properties.options;
        obj["__type"] = this.properties.type.name;

        this.fields.forEach((field: GraphQLQueryTree<T>) => {
            obj[field.name] = field.toObject();
        });

        return obj;
    }
}
