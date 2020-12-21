import {ORDER} from "../constants";

export type QueryOrder = typeof ORDER.ASCEND | typeof ORDER.DESCEND | 1 | -1;
