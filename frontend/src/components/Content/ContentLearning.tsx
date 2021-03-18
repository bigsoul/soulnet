import styled from "styled-components";

import Content from "../Content";
import Tree from "../Tree/Tree";
import TreeBranch from "../Tree/TreeBranch";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem from "../Tree/TreeItem";
import TreeColumn from "../Tree/TreeColumn";
import ButtonTree from "../ButtonTree";
import Player from "../Player";

import entityLearning from "./../../assets/svg/entity-learning.svg";
import treeTree from "./../../assets/svg/tree-tree.svg";
import treeExpand from "./../../assets/svg/tree-expand.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeAdd from "./../../assets/svg/tree-add.svg";
import treeFolder from "./../../assets/svg/tree-folder.svg";
import treeDelete from "./../../assets/svg/tree-delete.svg";

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
			</TreeBranch>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #203
				</TreeColumn>
				<TreeColumn align="right">
					<Player />
				</TreeColumn>
				<ButtonTreeStyled svgPath={treeFolder} />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #200
				</TreeColumn>
				<TreeColumn align="right">
					<Player />
				</TreeColumn>
				<ButtonTreeStyled svgPath={treeFolder} />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #185
				</TreeColumn>
				<TreeColumn align="right">
					<Player />
				</TreeColumn>
				<ButtonTreeStyled svgPath={treeFolder} />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #177
				</TreeColumn>
				<TreeColumn align="right">
					<Player />
				</TreeColumn>
				<ButtonTreeStyled svgPath={treeFolder} />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #107
				</TreeColumn>
				<TreeColumn align="right">
					<Player />
				</TreeColumn>
				<ButtonTreeStyled svgPath={treeFolder} />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #99
				</TreeColumn>
				<TreeColumn align="right">
					<Player />
				</TreeColumn>
				<ButtonTreeStyled svgPath={treeFolder} />
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #83
				</TreeColumn>
				<TreeColumn align="right">
					<Player />
				</TreeColumn>
				<ButtonTreeStyled svgPath={treeFolder} />
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
					Learning #14
				</TreeColumn>
				<TreeColumn align="right">
					<ButtonTreeStyled svgPath={treeDelete} />
				</TreeColumn>
			</TreeItem>
			<TreeItem level={1}>
				<TreeColumn>
					<ButtonTreeStyled svgPath={entityLearning} />
					Learning #1
				</TreeColumn>
				<TreeColumn align="right">
					<ButtonTreeStyled svgPath={treeDelete} />
				</TreeColumn>
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
