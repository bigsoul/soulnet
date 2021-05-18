import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Content from "../Content";
import Tree from "../Tree/Tree";
import TreeBranch from "../Tree/TreeBranch";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem, { DataItem, ITreeItemProps } from "../Tree/TreeItem";
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

import IStore from "../../interfaces/IStore";
import ILearning from "../../interfaces/ILearning";
import TLearningAction, * as ACT from "../../classes/actions/ILearningAction";

import React, { Component, PureComponent } from "react";
import { BranchDOMState } from "../../classes/reducers/learningReducer";
import treeListCreator from "../Tree/TreeList";
import {
	ITreeOnLoadEventAction,
	ITreeOnScrollAction,
	TREE_ON_LOAD_EVENT,
	TREE_ON_SCROLL,
} from "../../classes/actions/ITreeAction";
import ETreeList from "../../enums/ETreeList";
import { TreeListEntity } from "../../classes/reducers/treeReducer";

const ButtonStyled = styled(Button)`
	margin-right: 5px;
`;

const IconStyled = styled(Icon)`
	margin-right: 5px;
`;

const BasisContainer = styled.div`
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	scrollbar-width: none;
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

const StoringContainer = styled(BasisContainer)<{ runningOpen: boolean }>`
	height: ${(p) =>
		p.runningOpen ? "calc(65% - 30px)" : "calc(100% - 30px - 30px - 30px)"};
	position: relative;
`;

interface ILearningDataItem {
	name: string;
}

const TreeList = treeListCreator<ILearningDataItem>();

interface IContentLearningState {
	runningList: TreeListEntity[];
	runningOpen: boolean;
	runningLoading: boolean;
	runningDataOffset: number;
	runningDataLimit: number;
	storingList: TreeListEntity[];
	storingOpen: boolean;
	storingLoading: boolean;
	storingDataOffset: number;
	storingDataLimit: number;
}

interface IContentLearningDispatch {
	treeOnLoadEvent: (key: ETreeList, limit: number, offset: number) => void;
	treeOnScroll: (key: ETreeList, offset: number) => void;
}

interface IContentLearningProps
	extends IContentLearningState,
		IContentLearningDispatch {}

class ContentLearning extends PureComponent<IContentLearningProps> {
	render = () => {
		const {
			runningList,
			runningOpen,
			runningLoading,
			runningDataOffset,
			runningDataLimit,
			storingList,
			storingOpen,
			storingLoading,
			storingDataOffset,
			storingDataLimit,
			treeOnLoadEvent,
			treeOnScroll,
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
							/>
							<ButtonStyled template="icon" svgPath={treeAdd} />
						</TreeColumn>
					</TreeHeader>
					<TreeBranch>
						<TreeColumn>
							<ButtonStyled
								template="icon"
								svgPath={treeCollapse}
								svgPathSelected={treeExpand}
								selected={runningOpen}
								onClick={() => null}
							/>
							Running
						</TreeColumn>
						<TreeColumn align="right">
							{runningLoading && <IconStyled path={loading} />}
						</TreeColumn>
					</TreeBranch>
					<RunningContainer
						runningOpen={runningOpen}
						storingOpen={storingOpen}
					>
						<TreeList
							dataList={runningList}
							dataOffset={runningDataOffset}
							dataLimit={runningDataLimit}
							scrollOffset={0}
							dataItemHeight={30}
							preLoaderUpMaxHeight={150}
							preLoaderDownMaxHeight={150}
							onLoadUp={(dataOffset, dataLimit) => {
								treeOnLoadEvent(
									ETreeList.LearningRunning,
									dataLimit,
									dataOffset
								);
							}}
							onLoadDown={(dataOffset, dataLimit) => {
								treeOnLoadEvent(
									ETreeList.LearningRunning,
									dataLimit,
									dataOffset
								);
							}}
							onScroll={(scrollOffset) => {
								treeOnScroll(
									ETreeList.LearningRunning,
									scrollOffset
								);
							}}
						>
							{(props: ITreeItemProps<ILearningDataItem>) => (
								<TreeItem level={1}>
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
									/>
								</TreeItem>
							)}
						</TreeList>
					</RunningContainer>
					<TreeBranch>
						<TreeColumn>
							<ButtonStyled
								template="icon"
								svgPath={treeCollapse}
								svgPathSelected={treeExpand}
								selected={storingOpen}
								onClick={() => null}
							/>
							Storing
						</TreeColumn>
						<TreeColumn align="right">
							{storingLoading && <IconStyled path={loading} />}
						</TreeColumn>
					</TreeBranch>
					{storingOpen && (
						<StoringContainer runningOpen={runningOpen}>
							<TreeList
								dataList={storingList}
								dataOffset={storingDataOffset}
								dataLimit={storingDataLimit}
								scrollOffset={0}
								dataItemHeight={30}
								preLoaderUpMaxHeight={150}
								preLoaderDownMaxHeight={150}
								onLoadUp={(dataOffset, dataLimit) => {
									treeOnLoadEvent(
										ETreeList.LearningStoring,
										dataLimit,
										dataOffset
									);
								}}
								onLoadDown={(dataOffset, dataLimit) => {
									treeOnLoadEvent(
										ETreeList.LearningStoring,
										dataLimit,
										dataOffset
									);
								}}
								onScroll={(scrollOffset) => {
									treeOnScroll(
										ETreeList.LearningStoring,
										scrollOffset
									);
								}}
							>
								{(props: ITreeItemProps<ILearningDataItem>) => (
									<TreeItem level={1}>
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
										/>
									</TreeItem>
								)}
							</TreeList>
						</StoringContainer>
					)}
				</Tree>
			</Content>
		);

		return result;
	};
}

const mapStateToProps = (state: IStore): IContentLearningState => {
	const { tree } = state;
	const target = tree[ETreeList.LearningRunning];

	const props: IContentLearningState = {
		runningList: target.list,
		runningOpen: target.isVisible,
		runningLoading: target.isLoading,
		runningDataOffset: target.dataOffset,
		runningDataLimit: target.dataLimit,
		storingList: target.list,
		storingOpen: target.isVisible,
		storingLoading: target.isLoading,
		storingDataOffset: target.dataOffset,
		storingDataLimit: target.dataLimit,
	};

	return props;
};

const mapDispatchToProps = (
	dispatch: Dispatch<
		TLearningAction | ITreeOnLoadEventAction | ITreeOnScrollAction
	>
): IContentLearningDispatch => {
	return {
		treeOnLoadEvent: (key: ETreeList, limit: number, offset: number) => {
			dispatch<ITreeOnLoadEventAction>({
				type: TREE_ON_LOAD_EVENT,
				listKey: key,
				dataLimit: limit,
				dataOffset: offset,
			});
		},
		treeOnScroll: (key: ETreeList, offset: number) => {
			dispatch<ITreeOnScrollAction>({
				type: TREE_ON_SCROLL,
				listKey: key,
				scrollOffset: offset,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentLearning);
