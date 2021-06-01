import ETreeList from "../../enums/ETreeList";
import IDataset from "../../interfaces/IDataset";
import ILearning, { ILearningFilter } from "../../interfaces/ILearning";
import ITesting, { ITestingFilter } from "../../interfaces/ITesting";
import TTreeAction, * as ACT from "../actions/ITreeAction";

export type TreeListEntity = IDataset | ILearning | ITesting;
export type TreeListEntityFilters = ILearningFilter | ITestingFilter;

export type TreeListReducer = {
	list: TreeListEntity[];
	isVisible: boolean;
	isLoading: boolean;
	scrollOffset: number;
	dataLimit: number;
	dataOffset: number;
};

export type TreeReducer = {
	[key in ETreeList]: TreeListReducer;
};

const treeList: TreeListReducer = {
	list: [],
	isVisible: true,
	isLoading: false,
	scrollOffset: 0,
	dataOffset: 0,
	dataLimit: 50,
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
			const newState = { ...curState };
			newState[action.listKey].list = action.list;
			newState[action.listKey].dataOffset = action.dataOffset;
			newState[action.listKey].dataLimit = action.dataLimit;
			return newState;
		}
		case ACT.TREE_IS_LOADING: {
			const newState = { ...curState };
			newState[action.listKey].isLoading = action.loading;
			return newState;
		}
		case ACT.TREE_IS_VISIBLE: {
			const newState = { ...curState };
			newState[action.listKey].isVisible = action.visible;
			return newState;
		}
		case ACT.TREE_ON_SCROLL: {
			const newState = { ...curState };
			newState[action.listKey].scrollOffset = action.scrollOffset;
			return newState;
		}
		default:
			return curState;
	}
};

export default treeReducer;
