import styled from "styled-components";

const TreeBranchDiv = styled.div`
	height: 29px;
	background-color: #9f9fbf;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
`;

interface ITreeBranch {
	children?: React.ReactNode;
}

const TreeBranch = (props: ITreeBranch) => (
	<TreeBranchDiv>{props.children}</TreeBranchDiv>
);

export default TreeBranch;
