import ILearning from "../../interfaces/ILearning";
import TLearningAction, * as ACT from "../actions/ILearningAction";

export interface ILearningReducer {
	list: ILearning[];
	runningOpen: boolean;
	runningScrollTop: number;
	runningLoading: boolean;
	runningPageSize: number;
	runningStartFrom: number;
	runningClientHeight: number;
	storingOpen: boolean;
	storingScrollTop: number;
	storingLoading: boolean;
	storingPageSize: number;
	storingStartFrom: number;
	storingClientHeight: number;
}

const preloadedState: ILearningReducer = {
	list: [],
	runningOpen: true,
	runningScrollTop: 0,
	runningLoading: false,
	runningPageSize: 50,
	runningStartFrom: 0,
	runningClientHeight: 0,
	storingOpen: true,
	storingScrollTop: 0,
	storingLoading: false,
	storingPageSize: 50,
	storingStartFrom: 0,
	storingClientHeight: 0,
};

const userReducer = (
	curState: ILearningReducer = preloadedState,
	action: TLearningAction
): ILearningReducer => {
	switch (action.type) {
		case ACT.LEARNING_BRANCH_OPEN_CHANGE: {
			if (action.branch === "running")
				return { ...curState, runningOpen: !curState.runningOpen };
			if (action.branch === "storing")
				return { ...curState, storingOpen: !curState.storingOpen };
			return curState;
		}
		case ACT.LEARNING_BRANCH_SCROLL_TOP: {
			if (action.branch === "running")
				return {
					...curState,
					runningScrollTop: action.scrollTop,
				};
			if (action.branch === "storing")
				return {
					...curState,
					storingScrollTop: action.scrollTop,
				};
			return curState;
		}
		case ACT.LEARNING_BRANCH_LOADING: {
			if (action.branch === "running")
				return { ...curState, runningLoading: action.loading };
			if (action.branch === "storing")
				return { ...curState, storingLoading: action.loading };
			return curState;
		}
		case ACT.LEARNING_INITIALIZE: {
			const newState = { ...curState };
			for (let i = 0; i < action.learnings.length; i++) {
				newState.list.push(action.learnings[i]);
			}
			return newState;
		}
		default:
			return curState;
	}
};

export default userReducer;
