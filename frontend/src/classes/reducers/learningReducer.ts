import ELearningState from "../../enums/ELearningState";
import ILearning from "../../interfaces/ILearning";
import TLearningAction, * as ACT from "../actions/ILearningAction";

type ReduserType = {
	list: ILearning[];
	runningOpen: boolean;
	storingOpen: boolean;
	runningScrollTop: number;
	storingScrollTop: number;
};

const example = {
	id: "0",
	name: "Learning #0",
	state: ELearningState.config,
	isArchive: false,
	iterationCount: 1000,
	iterationCurrent: 200,
	inputNeuronsCount: 50,
	deepLayersCount: 20,
	datasetLearning: {
		id: "1",
		name: "Dataset #1",
	},
};

const preloadedState: ReduserType = {
	list: [],
	runningOpen: true,
	storingOpen: true,
	runningScrollTop: 0,
	storingScrollTop: 0,
};

for (let i = 0; i < 50; i++) {
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
}

const userReducer = (
	curState: ReduserType = preloadedState,
	action: TLearningAction
): ReduserType => {
	switch (action.type) {
		case ACT.LEARNING_BRANCH_OPEN_STATE_CHANGE: {
			if (action.branch === "running")
				return { ...curState, runningOpen: !curState.runningOpen };
			if (action.branch === "storing")
				return { ...curState, storingOpen: !curState.storingOpen };
			return curState;
		}
		case ACT.LEARNING_BRANCH_SCROLL_TOP_CHANGE: {
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
		default:
			return curState;
	}
};

export default userReducer;
