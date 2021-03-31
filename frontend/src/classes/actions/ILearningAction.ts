import ILearning from "../../interfaces/ILearning";
import { BranchDOMState } from "../reducers/learningReducer";

// UI

export const LEARNING_BRANCH_SCROLL_EVENT = "LEARNING/BRANCH-SCROLL-EVENT";
export const LEARNING_WILL_UNMOUNT_EVENT = "LEARNING/WILL-UNMOUNT-EVENT";
export const LEARNING_BRANCH_OPEN_EVENT = "LEARNING/BRANCH-OPEN-EVENT";
export const LEARNING_DID_UPDATE_EVENT = "LEARNING/DID-UPDATE-EVENT";
export const LEARNING_DID_MOUNT_EVENT = "LEARNING/DID-MOUNT-EVENT";

// BLL

export const LEARNING_BRANCH_LOADING = "LEARNING/BRANCH-LOADING";
export const LEARNING_SET_DOM_STATE = "LEARNING/SET-DOM-STATE";
export const LEARNING_WILL_UNMOUNT = "LEARNING/WILL-UNMOUNT";
export const LEARNING_SET_SECTION = "LEARNING/SET-SECTION";
export const LEARNING_CHECK_LOAD = "LEARNING/CHECK-LOAD";
export const LEARNING_DID_MOUNT = "LEARNING/DID-MOUNT";
export const LEARNING_LOAD = "LEARNING/LOAD";

export interface ILearningBranchOpenEventAction {
	type: typeof LEARNING_BRANCH_OPEN_EVENT;
	branch: "running" | "storing";
}

export interface ILearningBranchLoadingAction {
	type: typeof LEARNING_BRANCH_LOADING;
	branch: "running" | "storing";
	loading: boolean;
}

export interface ILearningMountingAction {
	type: typeof LEARNING_DID_MOUNT | typeof LEARNING_WILL_UNMOUNT;
}

export interface ILearningSetSectionAction {
	type: typeof LEARNING_SET_SECTION;
	branch: "running" | "storing";
	startFrom: number;
	pageSize: number;
}

export interface ILearningDOMStateAction {
	type:
		| typeof LEARNING_BRANCH_SCROLL_EVENT
		| typeof LEARNING_DID_MOUNT_EVENT
		| typeof LEARNING_DID_UPDATE_EVENT
		| typeof LEARNING_SET_DOM_STATE
		| typeof LEARNING_CHECK_LOAD;
	branches: BranchDOMState[];
}

export interface ILearningLoadAction {
	type: typeof LEARNING_LOAD;
	learnings: ILearning[];
}

export type TLearningAction =
	| ILearningBranchOpenEventAction
	| ILearningBranchLoadingAction
	| ILearningSetSectionAction
	| ILearningMountingAction
	| ILearningDOMStateAction
	| ILearningLoadAction;

export default TLearningAction;
