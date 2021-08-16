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

import entityTesting from "./../../assets/svg/entity-testing.svg";
import treeTree from "./../../assets/svg/tree-tree.svg";
import treeExpand from "./../../assets/svg/tree-expand.svg";
import treeCollapse from "./../../assets/svg/tree-collapse.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeAdd from "./../../assets/svg/tree-add.svg";
import treeFolder from "./../../assets/svg/tree-folder.svg";
import treeDelete from "./../../assets/svg/tree-delete.svg";
import loading from "./../../assets/gif/loading.gif";

import ITesting, { ITestingFilter } from "../../interfaces/ITesting";

import treeListCreator from "../Tree/TreeList";
import ETreeList from "../../enums/ETreeList";
import store, { IStore } from "../../classes/store";
import {
	doTreeClearCurrentRows,
	doTreeIsVisible,
	doTreeOnLoadEvent,
} from "../../classes/actions/ITreeAction";
import TestingForm, { formKey } from "../Forms/TestingForm";
import { match } from "react-router";
import { EmptyGuid } from "../..";
import { history } from "../../classes/reducers/routerReducer";
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

const controller = "/testings";
const filterRunning = { isArchive: false };
const filterStoring = { isArchive: true };

const TreeListRunning = treeListCreator<ETreeList, ITesting, ITestingFilter>(
	ETreeList.TestingRunning,
	{
		controller: controller,
	}
);

const TreeListStoring = treeListCreator<ETreeList, ITesting, ITestingFilter>(
	ETreeList.TestingStoring,
	{
		controller: controller,
	}
);

interface IContentTestingProps {
	runningIsVisible: boolean;
	runningIsLoading: boolean;
	storingIsVisible: boolean;
	storingIsLoading: boolean;
	match?: match<{ id: string }>;
}

const mapStateToProps = (state: IStore): IContentTestingProps => {
	const { tree } = state;

	const runningList = tree[ETreeList.TestingRunning];
	const storingList = tree[ETreeList.TestingStoring];

	const props = {
		runningIsVisible: runningList.isVisible,
		runningIsLoading: runningList.isLoading,
		storingIsVisible: storingList.isVisible,
		storingIsLoading: storingList.isLoading,
	};

	return props;
};

const connector = connect(mapStateToProps);

class ContentTesting extends PureComponent<IContentTestingProps> {
	hendlerRunningIsVisibleEvent = () => {
		const listRunning = store.getState().tree[ETreeList.TestingRunning];

		doTreeIsVisible<ETreeList.TestingRunning>({
			listKey: ETreeList.TestingRunning,
			visible: !listRunning.isVisible,
		});
	};

	hendlerStoringIsVisibleEvent = () => {
		const listStoring = store.getState().tree[ETreeList.TestingStoring];

		doTreeIsVisible<ETreeList.TestingStoring>({
			listKey: ETreeList.TestingStoring,
			visible: !listStoring.isVisible,
		});
	};

	hendlerTreeRefresh = () => {
		const listRunning = store.getState().tree[ETreeList.TestingRunning];

		doTreeOnLoadEvent<ETreeList.TestingRunning, {}>({
			listKey: ETreeList.TestingRunning,
			dataLimit: listRunning.dataLimit,
			dataOffset: listRunning.dataOffset,
			filter: filterRunning,
			controller: controller,
		});

		const listStoring = store.getState().tree[ETreeList.TestingStoring];

		doTreeOnLoadEvent<ETreeList.TestingStoring, {}>({
			listKey: ETreeList.TestingStoring,
			dataLimit: listStoring.dataLimit,
			dataOffset: listStoring.dataOffset,
			filter: filterStoring,
			controller: controller,
		});
	};

	hendlerTreeAdd = () => {
		history.push(`/testing/${EmptyGuid}`);
	};

	render = () => {
		const {
			runningIsVisible,
			runningIsLoading,
			storingIsVisible,
			storingIsLoading,
			match,
		} = this.props;

		return (
			<Content>
				<Tree>
					<TreeHeader svgPath={treeTree}>
						<TreeColumn>Testing</TreeColumn>
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
							{(props: ITreeItemProps<ITesting>) => {
								return (
									<TreeItemStyled
										level={1}
										selected={props.dataItem.selected}
										onClick={() => {
											doTreeClearCurrentRows({
												listKey:
													ETreeList.TestingStoring,
											});
											history.push(
												`/testing/${props.dataItem.id}`
											);
										}}
									>
										<TreeColumn>
											<IconStyled path={entityTesting} />
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
							{(props: ITreeItemProps<ITesting>) => {
								return (
									<TreeItemStyled
										level={1}
										selected={props.dataItem.selected}
										onClick={() => {
											doTreeClearCurrentRows({
												listKey:
													ETreeList.TestingRunning,
											});
											history.push(
												`/testing/${props.dataItem.id}`
											);
										}}
									>
										<TreeColumn>
											<IconStyled path={entityTesting} />
											{props.dataItem.name}
										</TreeColumn>
										<ButtonStyled
											template="icon"
											svgPath={treeDelete}
										/>
									</TreeItemStyled>
								);
							}}
						</TreeListStoring>
					</StoringContainer>
				</Tree>
				<ItemContainer>
					<TestingForm entityId={this.props.match?.params.id} />
				</ItemContainer>
			</Content>
		);
	};
}

export default connector(ContentTesting);
