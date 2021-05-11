export const TREE_ON_LOAD_UP = "TREE/ON-LOAD-UP";
export const TREE_ON_LOAD_DOWN = "TREE/ON-LOAD-DOWN";
export const TREE_ON_SCROLL = "TREE/ON-SCROLL";

export const TREE_ON_LOAD_UP_EVENT = "TREE/ON-LOAD-UP-EVENT";
export const TREE_ON_LOAD_DOWN_EVENT = "TREE/ON-LOAD-DOWN-EVENT";

export interface ITreeOnLoadAction {
	type:
		| typeof TREE_ON_LOAD_UP
		| typeof TREE_ON_LOAD_DOWN
		| typeof TREE_ON_LOAD_UP_EVENT
		| typeof TREE_ON_LOAD_DOWN_EVENT;
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
