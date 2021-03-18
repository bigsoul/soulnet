import styled from "styled-components";

import Content from "../Content";
import Tree from "../Tree/Tree";
import TreeBranch from "../Tree/TreeBranch";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem from "../Tree/TreeItem";
import TreeColumn from "../Tree/TreeColumn";
import ButtonTree from "../ButtonTree";

import treeTree from "./../../assets/svg/tree-tree.svg";
import treeExpand from "./../../assets/svg/tree-expand.svg";
import entityLearning from "./../../assets/svg/entity-learning.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeAdd from "./../../assets/svg/tree-add.svg";

const ButtonTreeStyled = styled(ButtonTree)`
	margin-right: 5px;
`;

const ContentLearning = () => (
	<Content>
		<Tree>
			<TreeHeader svgPath={treeTree}>
				<TreeColumn>Learning</TreeColumn>
				<TreeColumn align="right">
					<ButtonTreeStyled svgPath={treeRefresh} />
					<ButtonTreeStyled svgPath={treeAdd} />
				</TreeColumn>
			</TreeHeader>
			<TreeBranch>
				<TreeColumn>
					<ButtonTreeStyled svgPath={treeExpand} />
					Running
				</TreeColumn>
				<TreeColumn />
			</TreeBranch>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #203
				</TreeColumn>
				<TreeColumn />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #160
				</TreeColumn>
				<TreeColumn />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #177
				</TreeColumn>
				<TreeColumn />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #21
				</TreeColumn>
				<TreeColumn />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #89
				</TreeColumn>
				<TreeColumn />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #314
				</TreeColumn>
				<TreeColumn />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #152
				</TreeColumn>
				<TreeColumn />
			</TreeItem>
			<TreeBranch>
				<TreeColumn>
					<ButtonTreeStyled svgPath={treeExpand} />
					Storing
				</TreeColumn>
				<TreeColumn />
			</TreeBranch>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #99
				</TreeColumn>
				<TreeColumn />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #112
				</TreeColumn>
				<TreeColumn />
			</TreeItem>
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
