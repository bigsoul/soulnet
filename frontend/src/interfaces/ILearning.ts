import ELearningState from "../enums/ELearningState";

export interface ILearning {
	id: string;
	name: string;
	state: ELearningState;
	isArchive: boolean;
	iterationCount: number;
	iterationCurrent: number;
	inputNeuronsCount: number;
	deepLayersCount: number;
	datasetId: string;
}

export interface ILearningFilter {
	isArchive?: boolean;
}

export default ILearning;
