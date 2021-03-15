import styled from "styled-components";
import TreeBranch from "./TreeBranch";
import TreeHeader from "./TreeHeader";
import TreeItem from "./TreeItem";

const TreeDiv = styled.div`
	width: 398px;
	height: 100%;
	border-right: 1px solid #8a8a8a;
	font-size: 14px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	scrollbar-width: none;
`;

const Tree = () => (
	<TreeDiv>
		<TreeHeader />
		<TreeBranch />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeBranch />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
		<TreeItem />
	</TreeDiv>
);

export default Tree;
