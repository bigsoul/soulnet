import styled from "styled-components";

interface ITreeItemProps {
	children?: React.ReactNode;
	level?: number;
}

const TreeItemDiv = styled.div<ITreeItemProps>`
	height: 29px;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	padding-left: calc(6px + ${(p) => (p.level || 0) * 23 + "px"});
`;

const TreeItem = (props: ITreeItemProps) => (
	<TreeItemDiv level={props.level || 0}>{props.children}</TreeItemDiv>
);

export default TreeItem;
