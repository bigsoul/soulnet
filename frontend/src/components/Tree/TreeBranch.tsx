import styled from "styled-components";

const TreeBranchDiv = styled.div<ITreeBranchProps>`
	height: 29px;
	background-color: #9f9fbf;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
`;

interface ITreeBranchProps {
	className?: string;
	children?: React.ReactNode;
}

const TreeBranch = (props: ITreeBranchProps) => (
	<TreeBranchDiv className={props.className}>{props.children}</TreeBranchDiv>
);

export default TreeBranch;
