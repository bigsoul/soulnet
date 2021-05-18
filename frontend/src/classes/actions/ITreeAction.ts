import ETreeList from "../../enums/ETreeList";
import { TreeListEntity, TreeListEntityFilters } from "../reducers/treeReducer";

export const TREE_ON_LOAD = "TREE/ON-LOAD";
export const TREE_ON_SCROLL = "TREE/ON-SCROLL";

export const TREE_ON_LOAD_EVENT = "TREE/ON-LOAD-EVENT";

export interface ITreeOnLoadAction {
	type: typeof TREE_ON_LOAD;
	list: TreeListEntity[];
	listKey: ETreeList;
	dataOffset: number;
	dataLimit: number;
}

export interface ITreeOnLoadEventAction {
	type: typeof TREE_ON_LOAD_EVENT;
	listKey: ETreeList;
	dataOffset: number;
	dataLimit: number;
	filter: TreeListEntityFilters;
	controller: string;
}

export interface ITreeOnScrollAction {
	type: typeof TREE_ON_SCROLL;
	listKey: ETreeList;
	scrollOffset: number;
}

export type TTreeAction = ITreeOnLoadAction | ITreeOnScrollAction;

export default TTreeAction;
