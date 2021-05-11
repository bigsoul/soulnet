import ELearningState from "../enums/ELearningState";

interface ILearning {
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

export default ILearning;
