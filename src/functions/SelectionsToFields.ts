import {FieldNode, GraphQLResolveInfo, SelectionNode} from "graphql";

/**
 * @description Convert selection nodes into field nodes
 * @param selections field selections
 * @param info GraphQLResolveInfo
 */
export function selectionsToFields(
    selections: readonly SelectionNode[],
    info: GraphQLResolveInfo
): FieldNode[] {

    const fields: FieldNode[] = [];

    selections.forEach((sel: SelectionNode) => {
        if (sel.kind === "Field") {
            fields.push(sel);
        } else if (sel.kind === "FragmentSpread") {
            const fragment = info.fragments[sel.name.value];
            fields.push.apply(fields, selectionsToFields(fragment.selectionSet.selections, info));
        } else if (sel.kind === "InlineFragment") {
            fields.push.apply(fields, selectionsToFields(sel.selectionSet.selections, info));
        }
    });

    return fields;
}
