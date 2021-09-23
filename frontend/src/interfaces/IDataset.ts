import { IDataItem } from "../components/Tree/TreeItem";

export interface IDataset extends IDataItem {
	name: string;
	isLoaded: boolean;
	description: string;
}

export interface IDatasetFilter {
	id?: string;
}

export default IDataset;
