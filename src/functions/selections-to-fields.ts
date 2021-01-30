import {FieldNode, GraphQLResolveInfo, SelectionNode} from "graphql";
import {Field, InlineFragment} from "../constants";
import {FragmentSpread} from "../constants";

/**
 * @description Convert selection nodes into field nodes
 * @param selections SelectionNode[]
 * @param info GraphQLResolveInfo
 */
export function selectionsToFields(
    selections: readonly SelectionNode[],
    info: GraphQLResolveInfo
): FieldNode[] {

    const fields: FieldNode[] = [];

    selections.forEach((sel: SelectionNode) => {
        switch (sel.kind) {
            case Field:
                fields.push(sel);
                break;
            case FragmentSpread:
                const fragment = info.fragments[sel.name.value];
                fields.push.apply(fields, selectionsToFields(fragment.selectionSet.selections, info));
                break;
            case InlineFragment:
                fields.push.apply(fields, selectionsToFields(sel.selectionSet.selections, info));
                break
            default:
                break;
        }
    });

    return fields;
}
