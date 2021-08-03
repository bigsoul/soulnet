import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Content from "../Content";
import Tree from "../Tree/Tree";
import TreeBranch from "../Tree/TreeBranch";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem, { ITreeItemProps } from "../Tree/TreeItem";
import TreeColumn from "../Tree/TreeColumn";
import Button from "../Button";
import Player from "../Player";
import Icon from "../Icon";

import entityLearning from "./../../assets/svg/entity-learning.svg";
import treeTree from "./../../assets/svg/tree-tree.svg";
import treeExpand from "./../../assets/svg/tree-expand.svg";
import treeCollapse from "./../../assets/svg/tree-collapse.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeAdd from "./../../assets/svg/tree-add.svg";
import treeFolder from "./../../assets/svg/tree-folder.svg";
import treeDelete from "./../../assets/svg/tree-delete.svg";
import loading from "./../../assets/gif/loading.gif";

import ILearning, { ILearningFilter } from "../../interfaces/ILearning";

import treeListCreator from "../Tree/TreeList";
import ETreeList from "../../enums/ETreeList";

import LearningForm, { formKey } from "../Forms/LearningForm";
import store, { IStore } from "../../classes/store";

import {
	doTreeClearCurrentRows,
	doTreeIsVisible,
	doTreeOnDeleteEvent,
	doTreeOnLoadEvent,
} from "../../classes/actions/ITreeAction";
import { history } from "../../classes/reducers/routerReducer";
import { match } from "react-router";
import { EmptyGuid } from "../..";
import { doFormOnSaveEvent } from "../../classes/actions/IFormAction";

const ButtonStyled = styled(Button)`
	margin-right: 5px;
`;

const IconStyled = styled(Icon)`
	margin-right: 5px;
`;

const TreeItemStyled = styled(TreeItem)<{ level: number }>`
	padding-left: calc(6px + ${(p) => (p.level || 0) * 23 + "px"});
`;

const BasisContainer = styled.div`
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	scrollbar-width: none;
`;

const TreeBranchStyled = styled(TreeBranch)`
	padding-left: 6px;
`;

const RunningContainer = styled(BasisContainer)<{
	storingOpen: boolean;
	runningOpen: boolean;
}>`
	height: ${(p) => {
		if (!p.runningOpen) return "0px";
		return p.storingOpen
			? "calc(35% - 30px - 30px)"
			: "calc(100% - 30px - 30px - 30px)";
	}};
	overflow: hidden;
	position: relative;
`;

const StoringContainer = styled(BasisContainer)<{
	storingOpen: boolean;
	runningOpen: boolean;
}>`
	height: ${(p) => {
		if (!p.storingOpen) return "0px";
		return p.runningOpen
			? "calc(65% - 30px)"
			: "calc(100% - 30px - 30px - 30px)";
	}};
	overflow: hidden;
	position: relative;
`;

const ItemContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const controller = "/learnings";
const filterRunning = { isArchive: false };
const filterStoring = { isArchive: true };

const TreeListRunning = treeListCreator<ETreeList, ILearning, ILearningFilter>(
	ETreeList.LearningRunning,
	{ controller: controller }
);

const TreeListStoring = treeListCreator<ETreeList, ILearning, ILearningFilter>(
	ETreeList.LearningStoring,
	{ controller: controller }
);

interface IContentLearningProps {
	runningIsVisible: boolean;
	runningIsLoading: boolean;
	storingIsVisible: boolean;
	storingIsLoading: boolean;
	match?: match<{ id: string }>;
}

const mapStateToProps = (state: IStore): IContentLearningProps => {
	const { tree } = state;

	const runningList = tree[ETreeList.LearningRunning];
	const storingList = tree[ETreeList.LearningStoring];

	const props: IContentLearningProps = {
		runningIsVisible: runningList.isVisible,
		runningIsLoading: runningList.isLoading,
		storingIsVisible: storingList.isVisible,
		storingIsLoading: storingList.isLoading,
	};

	return props;
};

const connector = connect(mapStateToProps);

class ContentLearning extends PureComponent<IContentLearningProps> {
	hendlerRunningIsVisibleEvent = () => {
		const listRunning = store.getState().tree[ETreeList.LearningRunning];

		doTreeIsVisible<ETreeList.LearningRunning>({
			listKey: ETreeList.LearningRunning,
			visible: !listRunning.isVisible,
		});
	};

	hendlerStoringIsVisibleEvent = () => {
		const listStoring = store.getState().tree[ETreeList.LearningStoring];

		doTreeIsVisible<ETreeList.LearningStoring>({
			listKey: ETreeList.LearningStoring,
			visible: !listStoring.isVisible,
		});
	};

	hendlerTreeRefresh = () => {
		const listRunning = store.getState().tree[ETreeList.LearningRunning];

		doTreeOnLoadEvent<ETreeList.LearningRunning, {}>({
			listKey: ETreeList.LearningRunning,
			dataLimit: listRunning.dataLimit,
			dataOffset: listRunning.dataOffset,
			filter: filterRunning,
			controller: controller,
		});

		const listStoring = store.getState().tree[ETreeList.LearningStoring];

		doTreeOnLoadEvent<ETreeList.LearningStoring, {}>({
			listKey: ETreeList.LearningStoring,
			dataLimit: listStoring.dataLimit,
			dataOffset: listStoring.dataOffset,
			filter: filterStoring,
			controller: controller,
		});
	};

	hendlerTreeAdd = () => {
		history.push(`/learning/${EmptyGuid}`);
	};

	render = () => {
		const {
			runningIsVisible,
			runningIsLoading,
			storingIsVisible,
			storingIsLoading,
			match,
		} = this.props;

		const result = (
			<Content>
				<Tree>
					<TreeHeader svgPath={treeTree}>
						<TreeColumn>Learning</TreeColumn>
						<TreeColumn align="right">
							<ButtonStyled
								template="icon"
								svgPath={treeRefresh}
								onClick={this.hendlerTreeRefresh}
							/>
							<ButtonStyled
								template="icon"
								svgPath={treeAdd}
								onClick={this.hendlerTreeAdd}
							/>
						</TreeColumn>
					</TreeHeader>
					<TreeBranchStyled>
						<TreeColumn>
							<ButtonStyled
								template="icon"
								svgPath={treeCollapse}
								svgPathSelected={treeExpand}
								selected={runningIsVisible}
								onClick={this.hendlerRunningIsVisibleEvent}
							/>
							Running
						</TreeColumn>
						<TreeColumn align="right">
							{runningIsLoading && <IconStyled path={loading} />}
						</TreeColumn>
					</TreeBranchStyled>
					<RunningContainer
						runningOpen={runningIsVisible}
						storingOpen={storingIsVisible}
					>
						<TreeListRunning
							filter={filterRunning}
							dataItemHeight={30}
							preLoaderUpMaxHeight={150}
							preLoaderDownMaxHeight={150}
							currentRow={match?.params.id}
						>
							{(props: ITreeItemProps<ILearning>) => {
								return (
									<TreeItemStyled
										level={1}
										selected={props.dataItem.selected}
										onClick={() => {
											doTreeClearCurrentRows({
												listKey:
													ETreeList.LearningStoring,
											});
											history.push(
												`/learning/${props.dataItem.id}`
											);
										}}
									>
										<TreeColumn>
											<IconStyled path={entityLearning} />
											{props.dataItem.name}
										</TreeColumn>
										<TreeColumn align="right">
											<Player />
										</TreeColumn>
										<ButtonStyled
											template="icon"
											svgPath={treeFolder}
											onClick={() => {
												doFormOnSaveEvent({
													formKey: formKey,
													values: {
														...props.dataItem,
														isArchive: true,
													},
													controller: controller,
												});
											}}
										/>
									</TreeItemStyled>
								);
							}}
						</TreeListRunning>
					</RunningContainer>
					<TreeBranchStyled>
						<TreeColumn>
							<ButtonStyled
								template="icon"
								svgPath={treeCollapse}
								svgPathSelected={treeExpand}
								selected={storingIsVisible}
								onClick={this.hendlerStoringIsVisibleEvent}
							/>
							Storing
						</TreeColumn>
						<TreeColumn align="right">
							{storingIsLoading && <IconStyled path={loading} />}
						</TreeColumn>
					</TreeBranchStyled>
					<StoringContainer
						runningOpen={runningIsVisible}
						storingOpen={storingIsVisible}
					>
						<TreeListStoring
							filter={filterStoring}
							dataItemHeight={30}
							preLoaderUpMaxHeight={150}
							preLoaderDownMaxHeight={150}
							currentRow={match?.params.id}
						>
							{(props: ITreeItemProps<ILearning>) => {
								return (
									<TreeItemStyled
										level={1}
										selected={props.dataItem.selected}
										onClick={() => {
											doTreeClearCurrentRows({
												listKey:
													ETreeList.LearningRunning,
											});
											history.push(
												`/learning/${props.dataItem.id}`
											);
										}}
									>
										<TreeColumn>
											<IconStyled path={entityLearning} />
											{props.dataItem.name}
										</TreeColumn>

										<ButtonStyled
											template="icon"
											svgPath={treeDelete}
											onClick={() => {
												doTreeOnDeleteEvent({
													listKey:
														ETreeList.LearningStoring,
													id: props.dataItem.id,
													controller: controller,
												});
											}}
										/>
									</TreeItemStyled>
								);
							}}
						</TreeListStoring>
					</StoringContainer>
				</Tree>
				<ItemContainer>
					<LearningForm entityId={this.props.match?.params.id} />
				</ItemContainer>
			</Content>
		);

		return result;
	};
}

export default connector(ContentLearning);
