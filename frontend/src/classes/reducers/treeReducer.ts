import { IDataItemUI } from "../../components/Tree/TreeItem";
import IDataset from "../../interfaces/IDataset";
import ILearning, { ILearningFilter } from "../../interfaces/ILearning";
import IMainResultReport, {
	IMainResultReportFilter,
} from "../../interfaces/IMainResultReport";
import ITesting, { ITestingFilter } from "../../interfaces/ITesting";
import TTreeAction from "../actions/ITreeAction";

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
	isSelectMode: boolean;
	scrollOffset: number;
	dataLimit: number;
	dataOffset: number;
	currentRows: string[];
};

export type TreeReducer<K extends string, T> = {
	[key in K]: TreeListReducer<T & IDataItemUI>;
};

const treeList = {
	list: [],
	isVisible: true,
	isLoading: false,
	isSelectMode: false,
	scrollOffset: 0,
	dataOffset: 0,
	dataLimit: 0,
	currentRows: [],
};

const preloadedState: unknown = {
	Dataset: { ...treeList },
	DatasetLearningSelect: { ...treeList },
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
		case "TREE/INITIALIZE": {
			const newState = { ...curState };
			const treeList = newState[action.listKey];
			treeList.isVisible =
				action.config.visible === undefined
					? true
					: action.config.visible;
			treeList.isSelectMode = !!action.config.selectMode;
			return newState;
		}
		case "TREE/ON-LOAD": {
			const newState = { ...curState };
			const treeList = newState[action.listKey];
			treeList.list = action.list;
			treeList.dataOffset = action.dataOffset;
			treeList.dataLimit = action.dataLimit;
			treeList.list.forEach((item) => {
				item.selected = treeList.currentRows.some(
					(row) => row === item.id
				);
			});
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
		case "TREE/IS-VISIBLE-CONVERT": {
			const newState = { ...curState };
			newState[action.listKey].isVisible = !newState[action.listKey]
				.isVisible;
			return newState;
		}
		case "TREE/ON-SCROLL": {
			const newState = { ...curState };
			newState[action.listKey].scrollOffset = action.scrollOffset;
			return newState;
		}
		case "TREE/ITEM-SELECT": {
			const newState = { ...curState };
			newState[action.listKey].list = [...newState[action.listKey].list];
			newState[action.listKey].list.forEach((item) => {
				item.selected = item.id === action.id;
			});
			return newState;
		}
		case "TREE/SET-CURRENT-ROW": {
			const newState = { ...curState };
			newState[action.listKey].list = [...newState[action.listKey].list];
			newState[action.listKey].currentRows = [];
			newState[action.listKey].currentRows.push(action.id);
			newState[action.listKey].list.forEach((item) => {
				item.selected = item.id === action.id;
			});
			return newState;
		}
		case "TREE/CLEAR-CURRENT-ROWS": {
			const newState = { ...curState };
			newState[action.listKey].list = [...newState[action.listKey].list];
			newState[action.listKey].currentRows = [];
			newState[action.listKey].list.forEach((item) => {
				item.selected = false;
			});
			return newState;
		}
		default:
			return curState;
	}
};

export default treeReducer;
