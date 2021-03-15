import styled from "styled-components";
import TreeColumn from "./TreeColumn";

const TreeBranchDiv = styled.div`
	height: 29px;
	background-color: #b8be93;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
`;

const TreeBranch = () => (
	<TreeBranchDiv>
		<TreeColumn />
	</TreeBranchDiv>
);

export default TreeBranch;
