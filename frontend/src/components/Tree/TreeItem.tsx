import styled from "styled-components";

const Item = styled.div<ITreeItemPrivateProps>`
	height: 29px;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	padding-left: calc(6px + ${(p) => (p.level || 0) * 23 + "px"});
`;

export interface IDataItem {
	id: string;
}

export type DataItem<T, U = { id: string }> = {
	[K in keyof (T & U)]: (T & U)[K];
};

export interface ITreeItemProps<T> {
	index: number;
	dataItem: DataItem<T>;
}

interface ITreeItemPrivateProps {
	children?: React.ReactNode;
	level?: number;
}

const TreeItem = (props: ITreeItemPrivateProps) => {
	return (
		<Item id="tree-item" level={props.level || 0}>
			{props.children}
		</Item>
	);
};

export default TreeItem;
