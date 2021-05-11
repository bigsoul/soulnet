import ETreeList from "../../enums/ETreeList";
import IDataset from "../../interfaces/IDataset";
import ILearning from "../../interfaces/ILearning";
import TTreeAction, * as ACT from "../actions/ITreeAction";

export type TreeListEntity = IDataset | ILearning;

export type TreeListReducer = {
	list: TreeListEntity[];
	isLoading: boolean;
	scrollOffset: number;
};

export type TreeReducer = {
	[key in ETreeList]: TreeListReducer;
};

const treeList: TreeListReducer = {
	list: [],
	isLoading: false,
	scrollOffset: 0,
};

const preloadedState: TreeReducer = {
	Dataset: { ...treeList },
	LearningRunning: { ...treeList },
	LearningStoring: { ...treeList },
	TestingRunning: { ...treeList },
	TestingStoring: { ...treeList },
	Results: { ...treeList },
};

const treeReducer = (
	curState: TreeReducer = preloadedState,
	action: TTreeAction
): TreeReducer => {
	switch (action.type) {
		case ACT.TREE_ON_LOAD: {
			return curState;
		}
		case ACT.TREE_ON_SCROLL: {
			return curState;
		}
		default:
			return curState;
	}
};

export default treeReducer;
