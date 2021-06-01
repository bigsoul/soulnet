import ETestingState from "../enums/ETestingState";

export interface ITesting {
	id: string;
	name: string;
	state: ETestingState;
	isArchive: boolean;
	iterationCount: number;
	iterationCurrent: number;
	stopLossPercent: number;
	startDeposit: number;
	endDeposit: number;
	learningId: string;
	datasetId: string;
}

export interface ITestingFilter {
	isArchive?: boolean;
}

export default ITesting;
