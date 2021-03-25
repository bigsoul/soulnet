import ELearningState from "../../enums/ELearningState";
import ILearning from "../../interfaces/ILearning";
import TLearningAction, * as ACT from "../actions/ILearningAction";

export interface ILearningReducer {
	list: ILearning[];
	runningOpen: boolean;
	runningScrollTop: number;
	runningLoading: boolean;
	runningPageSize: number;
	runningStartFrom: number;
	storingOpen: boolean;
	storingScrollTop: number;
	storingLoading: boolean;
	storingPageSize: number;
	storingStartFrom: number;
}

const example = {
	id: "0",
	name: "Learning #0",
	state: ELearningState.config,
	isArchive: false,
	iterationCount: 1000,
	iterationCurrent: 200,
	inputNeuronsCount: 50,
	deepLayersCount: 20,
	dataset: {
		id: "1",
		name: "Dataset #1",
	},
};

const preloadedState: ILearningReducer = {
	list: [],
	runningOpen: true,
	storingOpen: true,
	runningScrollTop: 0,
	storingScrollTop: 0,
	runningLoading: false,
	storingLoading: false,
	runningPageSize: 50,
	runningStartFrom: 0,
	storingPageSize: 50,
	storingStartFrom: 0,
};

/*for (let i = 0; i < 50; i++) {
	preloadedState.list.push({
		...example,
		isArchive: false,
		id: String(i),
		name: "Learning #" + String(i),
	});
	preloadedState.list.push({
		...example,
		isArchive: true,
		id: String(i + 100),
		name: "Learning #" + String(i + 100),
	});
}*/

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
