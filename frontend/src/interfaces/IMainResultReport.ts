export interface IMainResultReport {
	id: string;
	learningName: string;
	testingName: string;
	datasetLearningName: string;
	datasetTestingName: string;
	startDeposit: number;
	endDeposit: number;
	margin: number;
}

export interface IMainResultReportFilter {}

export default IMainResultReport;
