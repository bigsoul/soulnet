export const TREE_ON_LOAD = "TREE/ON-LOAD";
export const TREE_ON_SCROLL = "TREE/ON-SCROLL";

export const TREE_ON_LOAD_EVENT = "TREE/ON-LOAD-EVENT";

export interface ITreeOnLoadAction {
	type: typeof TREE_ON_LOAD | typeof TREE_ON_LOAD_EVENT;
	listKey: string;
	dataOffset: number;
	dataLimit: number;
}

export interface ITreeOnScrollAction {
	type: typeof TREE_ON_SCROLL;
	listKey: string;
	scrollOffset: number;
}

export type TTreeAction = ITreeOnLoadAction | ITreeOnScrollAction;

export default TTreeAction;
