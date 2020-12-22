import {ORDER} from "../constants";

export type QueryOrder = typeof ORDER.ascend | typeof ORDER.descend | 1 | -1;
