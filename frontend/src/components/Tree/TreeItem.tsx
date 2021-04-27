import styled from "styled-components";

const Item = styled.div`
	height: 30px;
	box-sizing: border-box;
	border: 1px solid #46bd50;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export interface IDataItem {
	id: number;
}

export interface ITreeItemProps {
	index: number;
	dataItem: IDataItem;
}

interface ITreeItemPrivateProps {
	children?: React.ReactNode;
	level?: number;
}

const TreeItem = (props: ITreeItemPrivateProps) => {
	return <Item id="tree-item">{props.children}</Item>;
};

export default TreeItem;
