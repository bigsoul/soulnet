export const LEARNING_ADD = "LEARNING/ADD";

export interface ILearningAddAction {
	type: typeof LEARNING_ADD;
}

export type TLearningAction = ILearningAddAction;

export default TLearningAction;
