import styled from "styled-components";

const TreeBranchDiv = styled.div<{ level: number }>`
	height: 29px;
	background-color: #9f9fbf;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	padding-left: 6px;
`;

interface ITreeBranch {
	children?: React.ReactNode;
	level?: number;
}

const TreeBranch = (props: ITreeBranch) => (
	<TreeBranchDiv level={props.level || 0}>{props.children}</TreeBranchDiv>
);

export default TreeBranch;
