import styled from "styled-components";

const Item = styled.div`
	height: 29px;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	&:hover {
		background-color: #1d1c1c;
	}
`;

export interface IDataItem {
	id: string;
	version: string;
}

export type DataItem<T, U = IDataItem> = {
	[K in keyof (T & U)]: (T & U)[K];
};

export interface ITreeItemProps<T> {
	index: number;
	dataItem: DataItem<T>;
}

interface ITreeItemPrivateProps {
	className?: string;
	children?: React.ReactNode;
}

const TreeItem = (props: ITreeItemPrivateProps) => {
	return <Item className={props.className}>{props.children}</Item>;
};

export default TreeItem;
