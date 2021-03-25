import ILearning from "../../interfaces/ILearning";

// UI

export const LEARNING_BRANCH_OPEN_CHANGE = "LEARNING/BRANCH-OPEN-CHANGE";
export const LEARNING_DID_MOUNT = "LEARNING/DID-MOUNT";
export const LEARNING_DID_UPDATE = "LEARNING/DID-UPDATE";

// BLL

export const LEARNING_BRANCH_LOADING = "LEARNING/BRANCH-LOADING";
export const LEARNING_SET_DOM_STATE = "LEARNING/SET-DOM-STATE";
export const LEARNING_INITIALIZE = "LEARNING/INITIALIZE";

// UI

export interface ILearningBranchOpenChangeAction {
	type: typeof LEARNING_BRANCH_OPEN_CHANGE;
	branch: "running" | "storing";
}

export interface ILearningDidMountAction {
	type: typeof LEARNING_DID_MOUNT;
}

export interface ILearningDidUpdateAction {
	type: typeof LEARNING_DID_UPDATE;
	runningScrollTop: number;
	storingScrollTop: number;
	runningClientHeight: number;
	storingClientHeight: number;
}

// BLL

export interface ILearningBranchLoadingAction {
	type: typeof LEARNING_BRANCH_LOADING;
	branch: "running" | "storing";
	loading: boolean;
}

export interface ILearningSetDOMStateAction {
	type: typeof LEARNING_SET_DOM_STATE;
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
	| ILearningBranchOpenChangeAction
	| ILearningDidMountAction
	| ILearningDidUpdateAction
	| ILearningBranchLoadingAction
	| ILearningSetDOMStateAction
	| ILearningInitializeAction;

export default TLearningAction;
