import ETreeList from "../../enums/ETreeList";
import { TreeListEntity, TreeListEntityFilters } from "../reducers/treeReducer";

export const TREE_ON_LOAD = "TREE/ON-LOAD";
export const TREE_ON_SCROLL = "TREE/ON-SCROLL";
export const TREE_IS_LOADING = "TREE/IS-LOADING";
export const TREE_IS_VISIBLE = "TREE/IS-VISIBLE";

export const TREE_ON_LOAD_EVENT = "TREE/ON-LOAD-EVENT";

export interface ITreeOnLoadEventAction {
	type: typeof TREE_ON_LOAD_EVENT;
	listKey: ETreeList;
	dataOffset: number;
	dataLimit: number;
	filter: TreeListEntityFilters;
	controller: string;
}

export interface ITreeOnLoadAction {
	type: typeof TREE_ON_LOAD;
	list: TreeListEntity[];
	listKey: ETreeList;
	dataOffset: number;
	dataLimit: number;
}

export interface ITreeOnScrollAction {
	type: typeof TREE_ON_SCROLL;
	listKey: ETreeList;
	scrollOffset: number;
}

export interface ITreeIsLoadingAction {
	type: typeof TREE_IS_LOADING;
	listKey: ETreeList;
	loading: boolean;
}

export interface ITreeIsVisibleAction {
	type: typeof TREE_IS_VISIBLE;
	listKey: ETreeList;
	visible: boolean;
}

export type TTreeAction =
	| ITreeOnLoadEventAction
	| ITreeOnLoadAction
	| ITreeOnScrollAction
	| ITreeIsLoadingAction
	| ITreeIsVisibleAction;

export default TTreeAction;
