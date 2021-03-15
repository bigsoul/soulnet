import styled from "styled-components";
import TreeColumn from "./TreeColumn";

const TreeItemDiv = styled.div`
	height: 29px;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
`;

const TreeItem = () => (
	<TreeItemDiv>
		<TreeColumn />
	</TreeItemDiv>
);

export default TreeItem;
