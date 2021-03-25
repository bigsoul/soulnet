import ILearning from "../../interfaces/ILearning";

export const LEARNING_BRANCH_OPEN_CHANGE = "LEARNING/BRANCH-OPEN-CHANGE";
export const LEARNING_BRANCH_SCROLL_TOP_CHANGE =
	"LEARNING/BRANCH-SCROLL-TOP-CHANGE";
export const LEARNING_BRANCH_SCROLL_TOP = "LEARNING/BRANCH-SCROLL-TOP";
export const LEARNING_BRANCH_LOADING = "LEARNING/BRANCH-LOADING";
export const LEARNING_COMPONENT_DID_MOUNT = "LEARNING/COMPONENT-DID-MOUNT";
export const LEARNING_INITIALIZE = "LEARNING/INITIALIZE";

export interface ILearningBranchOpenChangeAction {
	type: typeof LEARNING_BRANCH_OPEN_CHANGE;
	branch: "running" | "storing";
}

export interface ILearningBranchScrollTopChangeAction {
	type: typeof LEARNING_BRANCH_SCROLL_TOP_CHANGE;
	branch: "running" | "storing";
	scrollTop: number;
}

export interface ILearningBranchScrollTopAction {
	type: typeof LEARNING_BRANCH_SCROLL_TOP;
	branch: "running" | "storing";
	scrollTop: number;
}

export interface ILearningBranchLoadingAction {
	type: typeof LEARNING_BRANCH_LOADING;
	branch: "running" | "storing";
	loading: boolean;
}

export interface ILearningComponentDidMountAction {
	type: typeof LEARNING_COMPONENT_DID_MOUNT;
}

export interface ILearningInitializeAction {
	type: typeof LEARNING_INITIALIZE;
	learnings: ILearning[];
}

export type TLearningAction =
	| ILearningBranchOpenChangeAction
	| ILearningBranchScrollTopChangeAction
	| ILearningBranchScrollTopAction
	| ILearningBranchLoadingAction
	| ILearningComponentDidMountAction
	| ILearningInitializeAction;

export default TLearningAction;
