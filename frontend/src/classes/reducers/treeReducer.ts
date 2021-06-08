import ETreeList from "../../enums/ETreeList";
import IDataset from "../../interfaces/IDataset";
import ILearning, { ILearningFilter } from "../../interfaces/ILearning";
import IMainResultReport from "../../interfaces/IMainResultReport";
import ITesting, { ITestingFilter } from "../../interfaces/ITesting";
import TTreeAction, * as ACT from "../actions/ITreeAction";

export type TreeListEntity =
	| IDataset
	| ILearning
	| ITesting
	| IMainResultReport;

export type TreeListEntityFilters = ILearningFilter | ITestingFilter;

export type TreeListReducer<T> = {
	list: T[];
	isVisible: boolean;
	isLoading: boolean;
	scrollOffset: number;
	dataLimit: number;
	dataOffset: number;
};

export type TreeReducer<T> = {
	[key in ETreeList]: TreeListReducer<T>;
};

/*export type TreeReducer<T> = {
	Dataset: TreeListReducer<T>;
	LearningRunning: TreeListReducer<T>;
	LearningStoring: TreeListReducer<T>;
	TestingRunning: TreeListReducer<T>;
	TestingStoring: TreeListReducer<T>;
	MainResultReport: TreeListReducer<T>;
};*/

const treeList = {
	list: [],
	isVisible: true,
	isLoading: false,
	scrollOffset: 0,
	dataOffset: 0,
	dataLimit: 0,
};

const preloadedState: TreeReducer<TreeListEntity> = {
	Dataset: { ...treeList },
	LearningRunning: { ...treeList },
	LearningStoring: { ...treeList },
	TestingRunning: { ...treeList },
	TestingStoring: { ...treeList },
	MainResultReport: { ...treeList },
};

const treeReducer = (
	curState: TreeReducer<TreeListEntity> = preloadedState,
	action: TTreeAction
): TreeReducer<TreeListEntity> => {
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
