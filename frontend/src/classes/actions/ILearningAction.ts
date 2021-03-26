import ILearning from "../../interfaces/ILearning";

// UI

export const LEARNING_BRANCH_OPEN_EVENT = "LEARNING/BRANCH-OPEN-EVENT";
export const LEARNING_BRANCH_SCROLL_EVENT = "LEARNING/BRANCH-SCROLL-EVENT";
export const LEARNING_DID_MOUNT = "LEARNING/DID-MOUNT";
export const LEARNING_DID_UPDATE = "LEARNING/DID-UPDATE";

// BLL

export const LEARNING_BRANCH_LOADING = "LEARNING/BRANCH-LOADING";
export const LEARNING_SET_DOM_STATE = "LEARNING/SET-DOM-STATE";
export const LEARNING_CHECK_LOAD = "LEARNING/CHECK-LOAD";
export const LEARNING_INITIALIZE = "LEARNING/INITIALIZE";

export interface ILearningBranchOpenEventAction {
	type: typeof LEARNING_BRANCH_OPEN_EVENT;
	branch: "running" | "storing";
}

export interface ILearningBranchLoadingAction {
	type: typeof LEARNING_BRANCH_LOADING;
	branch: "running" | "storing";
	loading: boolean;
}

export interface ILearningDOMStateAction {
	type:
		| typeof LEARNING_BRANCH_SCROLL_EVENT
		| typeof LEARNING_DID_MOUNT
		| typeof LEARNING_DID_UPDATE
		| typeof LEARNING_SET_DOM_STATE
		| typeof LEARNING_CHECK_LOAD;
	runningScrollTop: number;
	storingScrollTop: number;
	runningClientHeight: number;
	storingClientHeight: number;
}

export interface ILearningInitializeAction {
	type: typeof LEARNING_INITIALIZE;
	learnings: ILearning[];
}

export type TLearningAction =
	| ILearningBranchOpenEventAction
	| ILearningBranchLoadingAction
	| ILearningDOMStateAction
	| ILearningInitializeAction;

export default TLearningAction;
