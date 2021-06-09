import { IDataItem } from "../components/Tree/TreeItem";

export interface IDataset extends IDataItem {
	name: string;
	isLoaded: boolean;
}

export interface IDatasetFilter {}

export default IDataset;
