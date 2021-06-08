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

export default IMainResultReport;
