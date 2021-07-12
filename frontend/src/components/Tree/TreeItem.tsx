import styled from "styled-components";

const Item = styled.div<{ selected?: boolean }>`
	height: 29px;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	background-color: ${(p) => (p.selected ? "#5C5C5C" : "#000000")};
	&:hover {
		background-color: #1d1c1c;
	}
`;

export interface IDataItem {
	id: string;
	version: string;
	selected: boolean;
}

export interface ITreeItemProps<T> {
	index: number;
	dataItem: T & IDataItem;
	select: () => void;
}

interface ITreeItemPrivateProps {
	className?: string;
	children?: React.ReactNode;
	selected?: boolean;
	onClick?: () => void;
}

const TreeItem = (props: ITreeItemPrivateProps) => {
	return (
		<Item
			className={props.className}
			onClick={props.onClick}
			selected={props.selected}
		>
			{props.children}
		</Item>
	);
};

export default TreeItem;
