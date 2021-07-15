import { IDataItem } from "../components/Tree/TreeItem";
import ETestingState from "../enums/ETestingState";

export interface ITesting extends IDataItem {
	name: string;
	state: ETestingState;
	isArchive: boolean;
	iterationCount: number;
	iterationCurrent: number;
	stopLossPercent: number;
	startDeposit: number;
	endDeposit: number;
	learningId: string;
	learningName: string;
	datasetId: string;
	datasetName: string;
}

export interface ITestingFilter {
	isArchive?: boolean;
}

export default ITesting;
