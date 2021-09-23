import { IDataItem } from "../components/Tree/TreeItem";
import EPlayerState from "../enums/EPlayerState";

export interface ITesting extends IDataItem {
	name: string;
	state: EPlayerState;
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
	id?: string;
	isArchive?: boolean;
}

export default ITesting;
