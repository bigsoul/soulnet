import IDataset from "../../interfaces/IDataset";
import ILearning, { ILearningFilter } from "../../interfaces/ILearning";
import IMainResultReport, {
	IMainResultReportFilter,
} from "../../interfaces/IMainResultReport";
import ITesting, { ITestingFilter } from "../../interfaces/ITesting";
import TTreeAction, * as ACT from "../actions/ITreeAction";

export type TreeListEntity =
	| IDataset
	| ILearning
	| ITesting
	| IMainResultReport;

export type TreeListEntityFilters =
	| ILearningFilter
	| ITestingFilter
	| IMainResultReportFilter;

export type TreeListReducer<T> = {
	list: T[];
	isVisible: boolean;
	isLoading: boolean;
	scrollOffset: number;
	dataLimit: number;
	dataOffset: number;
};

export type TreeReducer<K extends string, T> = {
	[key in K]: TreeListReducer<T>;
};

const treeList = {
	list: [],
	isVisible: true,
	isLoading: false,
	scrollOffset: 0,
	dataOffset: 0,
	dataLimit: 0,
};

const preloadedState: unknown = {
	Dataset: { ...treeList },
	LearningRunning: { ...treeList },
	LearningStoring: { ...treeList },
	TestingRunning: { ...treeList },
	TestingStoring: { ...treeList },
	MainResultReport: { ...treeList },
};

const treeReducer = <K extends string, T, F>(
	curState: TreeReducer<K, T> = preloadedState as TreeReducer<K, T>,
	action: TTreeAction<K, T, F>
): TreeReducer<K, T> => {
	switch (action.type) {
		case "TREE/ON-LOAD": {
			const newState = { ...curState };
			newState[action.listKey].list = action.list;
			newState[action.listKey].dataOffset = action.dataOffset;
			newState[action.listKey].dataLimit = action.dataLimit;
			return newState;
		}
		case "TREE/IS-LOADING": {
			const newState = { ...curState };
			newState[action.listKey].isLoading = action.loading;
			return newState;
		}
		case "TREE/IS-VISIBLE": {
			const newState = { ...curState };
			newState[action.listKey].isVisible = action.visible;
			return newState;
		}
		case "TREE/ON-SCROLL": {
			const newState = { ...curState };
			newState[action.listKey].scrollOffset = action.scrollOffset;
			return newState;
		}
		default:
			return curState;
	}
};

export default treeReducer;
