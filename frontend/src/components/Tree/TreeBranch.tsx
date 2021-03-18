import styled from "styled-components";

const TreeBranchDiv = styled.div<ITreeBranchProps>`
	height: 29px;
	background-color: #9f9fbf;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	padding-left: calc(6px + ${(p) => (p.level || 0) * 23 + "px"});
`;

interface ITreeBranchProps {
	children?: React.ReactNode;
	level?: number;
}

const TreeBranch = (props: ITreeBranchProps) => (
	<TreeBranchDiv level={props.level || 0}>{props.children}</TreeBranchDiv>
);

export default TreeBranch;
