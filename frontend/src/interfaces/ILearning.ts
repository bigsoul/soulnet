import { IDataItem } from "../components/Tree/TreeItem";
import EPlayerState from "../enums/EPlayerState";

export interface ILearning extends IDataItem {
	name: string;
	state: EPlayerState;
	isArchive: boolean;
	iterationCount: number;
	iterationCurrent: number;
	inputNeuronsCount: number;
	deepLayersCount: number;
	datasetId: string;
	datasetName: string;
}

export interface ILearningFilter {
	id?: string;
	isArchive?: boolean;
}

export default ILearning;
