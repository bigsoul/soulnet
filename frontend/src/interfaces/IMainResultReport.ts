import { IDataItem } from "../components/Tree/TreeItem";

export interface IMainResultReport extends IDataItem {
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
