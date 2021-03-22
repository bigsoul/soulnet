export const LEARNING_BRANCH_OPEN_STATE_CHANGE =
	"LEARNING/BRANCH-OPEN-STATE-CHANGE";

export interface ILearningBranchOpenStateChangeAction {
	type: typeof LEARNING_BRANCH_OPEN_STATE_CHANGE;
	branch: "running" | "storing";
}

export type TLearningAction = ILearningBranchOpenStateChangeAction;

export default TLearningAction;
