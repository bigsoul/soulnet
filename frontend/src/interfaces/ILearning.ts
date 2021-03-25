import ELearningState from "../enums/ELearningState";
import IDatasetRef from "./IDatasetRef";

interface ILearning {
	id: string;
	name: string;
	state: ELearningState;
	isArchive: boolean;
	iterationCount: number;
	iterationCurrent: number;
	inputNeuronsCount: number;
	deepLayersCount: number;
	dataset: IDatasetRef;
}

export default ILearning;
