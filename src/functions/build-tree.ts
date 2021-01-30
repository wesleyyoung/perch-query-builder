import {FieldNode, GraphQLResolveInfo, SelectionNode} from "graphql";
import {getArgumentValues} from "graphql/execution/values";
import {GraphQLQueryTree, selectionsToFields, getType, buildQueryProperties} from "../";

/**
 * @description This recursive function builds the entire tree
 * @param parent Parent node
 * @param selections Selections of parent node
 * @param info GraphQLResolveInfo
 */
export function buildTree<T>(
    parent: GraphQLQueryTree<T>,
    selections: readonly FieldNode[] | readonly SelectionNode[],
    info: GraphQLResolveInfo,
): void {

    // Initialize child trees (fields)
    const childFields: Array<GraphQLQueryTree<any>> = [];
    // Transform SelectionNodes to FieldNodes
    const fieldNodes = selectionsToFields(selections, info);

    // For each field node
    fieldNodes.forEach((field: FieldNode) => {

        const name = field.name.value;

        if (name === "__typename") {
            return;
        }

        const fieldDef = parent.properties.type.getFields()[name];
        const queryArgs = getArgumentValues(fieldDef, field, info.variableValues);
        const type = getType(fieldDef.type);
        const properties = buildQueryProperties(type, queryArgs);
        const child = new GraphQLQueryTree(name, properties);

        childFields.push(child);

        if (field.selectionSet) {
            buildTree(child, field.selectionSet.selections, info);
        }
    });

    parent.setFields(childFields);
}
