import { IDataItem } from "../components/Tree/TreeItem";
import ELearningState from "../enums/ELearningState";

export interface ILearning extends IDataItem {
	name: string;
	state: ELearningState;
	isArchive: boolean;
	iterationCount: number;
	iterationCurrent: number;
	inputNeuronsCount: number;
	deepLayersCount: number;
	datasetId: string;
	datasetName: string;
}

export interface ILearningFilter {
	isArchive?: boolean;
}

export default ILearning;
