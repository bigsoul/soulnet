import styled from "styled-components";
import { connect } from "react-redux";

import Content from "../Content";
import Tree from "../Tree/Tree";
import TreeBranch from "../Tree/TreeBranch";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem from "../Tree/TreeItem";
import TreeColumn from "../Tree/TreeColumn";
import Button from "../Button";
import Player from "../Player";
import SvgIcon from "../SvgIcon";

import entityLearning from "./../../assets/svg/entity-learning.svg";
import treeTree from "./../../assets/svg/tree-tree.svg";
import treeExpand from "./../../assets/svg/tree-expand.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeAdd from "./../../assets/svg/tree-add.svg";
import treeFolder from "./../../assets/svg/tree-folder.svg";
import treeDelete from "./../../assets/svg/tree-delete.svg";
import IStore from "../../interfaces/IStore";

import ILearning from "../../interfaces/ILearning";

const ButtonStyled = styled(Button)`
	margin-right: 5px;
`;

const SvgIconStyled = styled(SvgIcon)`
	margin-right: 5px;
`;

const RunningContainer = styled.div`
	height: calc(35% - 30px - 30px);
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	scrollbar-width: none;
`;

const StoringContainer = styled.div`
	height: calc(65% - 30px);
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	scrollbar-width: none;
`;

interface IContentLearningState {
	list: ILearning[];
}

const ContentLearning = (props: IContentLearningState) => {
	const { list } = props;
	return (
		<Content>
			<Tree>
				<TreeHeader svgPath={treeTree}>
					<TreeColumn>Learning</TreeColumn>
					<TreeColumn align="right">
						<ButtonStyled template="icon" svgPath={treeRefresh} />
						<ButtonStyled template="icon" svgPath={treeAdd} />
					</TreeColumn>
				</TreeHeader>
				<TreeBranch>
					<TreeColumn>
						<ButtonStyled template="icon" svgPath={treeExpand} />
						Running
					</TreeColumn>
				</TreeBranch>
				<RunningContainer>
					{list.map((item) => {
						if (!item.isArchive) return false;
						return (
							<TreeItem level={1}>
								<TreeColumn>
									<SvgIconStyled path={entityLearning} />
									{item.name}
								</TreeColumn>
								<TreeColumn align="right">
									<Player />
								</TreeColumn>
								<ButtonStyled
									template="icon"
									svgPath={treeFolder}
								/>
							</TreeItem>
						);
					})}
				</RunningContainer>
				<TreeBranch>
					<TreeColumn>
						<ButtonStyled template="icon" svgPath={treeExpand} />
						Storing
					</TreeColumn>
					<TreeColumn />
				</TreeBranch>
				<StoringContainer>
					{list.map((item) => {
						if (item.isArchive) return false;
						return (
							<TreeItem level={1}>
								<TreeColumn>
									<SvgIconStyled path={entityLearning} />
									{item.name}
								</TreeColumn>
								<TreeColumn align="right">
									<ButtonStyled
										template="icon"
										svgPath={treeDelete}
									/>
								</TreeColumn>
							</TreeItem>
						);
					})}
				</StoringContainer>
			</Tree>
		</Content>
	);
};

const mapStateToProps = (state: IStore): IContentLearningState => {
	const { list } = state.learning;
	return {
		list: list,
	};
};

export default connect(mapStateToProps)(ContentLearning);
