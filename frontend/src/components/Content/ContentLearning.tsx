import Content from "../Content";
import Tree from "../Tree/Tree";
import TreeBranch from "../Tree/TreeBranch";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem from "../Tree/TreeItem";
import TreeColumn from "../Tree/TreeColumn";
import ButtonTree from "../ButtonTree";

import treeTree from "./../../assets/svg/tree-tree.svg";
import treeExpand from "./../../assets/svg/tree-expand.svg";
import styled from "styled-components";

const ButtonTreeStyled = styled(ButtonTree)`
	margin-right: 5px;
`;

const ContentLearning = () => (
	<Content>
		<Tree>
			<TreeHeader svgPath={treeTree}>Learning</TreeHeader>
			<TreeBranch>
				<TreeColumn>
					<ButtonTreeStyled svgPath={treeExpand} />
					Running
				</TreeColumn>
				<TreeColumn />
			</TreeBranch>
			<TreeItem />
			<TreeItem />
			<TreeItem />
			<TreeItem />
			<TreeItem />
			<TreeItem />
			<TreeItem />
			<TreeBranch>
				<TreeColumn />
				<TreeColumn />
			</TreeBranch>
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
		</Tree>
	</Content>
);

export default ContentLearning;
