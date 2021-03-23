export const LEARNING_BRANCH_OPEN_STATE_CHANGE =
	"LEARNING/BRANCH-OPEN-STATE-CHANGE";
export const LEARNING_BRANCH_SCROLL_TOP_CHANGE =
	"LEARNING/BRANCH-SCROLL-TOP-CHANGE";

export interface ILearningBranchOpenStateChangeAction {
	type: typeof LEARNING_BRANCH_OPEN_STATE_CHANGE;
	branch: "running" | "storing";
}

export interface ILearningBranchScrollTopChangeAction {
	type: typeof LEARNING_BRANCH_SCROLL_TOP_CHANGE;
	branch: "running" | "storing";
	scrollTop: number;
}

export type TLearningAction =
	| ILearningBranchOpenStateChangeAction
	| ILearningBranchScrollTopChangeAction;

export default TLearningAction;
