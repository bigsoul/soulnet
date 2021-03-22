import ELearningState from "../../enums/ELearningState";
import ILearning from "../../interfaces/ILearning";
import TLearningAction, * as ACT from "../actions/ILearningAction";

type ReduserType = { list: ILearning[] };

const preloadedState: ReduserType = {
	list: [
		{
			id: "1",
			name: "Learning #1",
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
		},
		{
			id: "2",
			name: "Learning #2",
			state: ELearningState.config,
			isArchive: true,
			iterationCount: 800,
			iterationCurrent: 500,
			inputNeuronsCount: 30,
			deepLayersCount: 80,
			datasetLearning: {
				id: "2",
				name: "Dataset #2",
			},
		},
	],
};

for (let i = 0; i < 40; i++) {
	preloadedState.list.push({
		...preloadedState.list[0],
		isArchive: false,
		id: String(i + 1),
		name: "Learning #" + String(i + 1),
	});
	preloadedState.list.push({
		...preloadedState.list[0],
		isArchive: true,
		id: String(i + 101),
		name: "Learning #" + String(i + 101),
	});
}

const userReducer = (
	curState: ReduserType = preloadedState,
	action: TLearningAction
): ReduserType => {
	switch (action.type) {
		case ACT.LEARNING_ADD: {
			return curState;
		}
		default:
			return curState;
	}
};

export default userReducer;
