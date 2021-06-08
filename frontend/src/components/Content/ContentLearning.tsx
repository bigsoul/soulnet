import React, { PureComponent } from "react";
import styled from "styled-components";
import { Dispatch } from "redux";
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

import IStore from "../../interfaces/IStore";
import ILearning, { ILearningFilter } from "../../interfaces/ILearning";

import treeListCreator from "../Tree/TreeList";
import ETreeList from "../../enums/ETreeList";
import TTreeAction, {
	ITreeIsVisibleAction,
	ITreeOnLoadEventAction,
	ITreeOnScrollAction,
	TREE_IS_VISIBLE,
	TREE_ON_LOAD_EVENT,
	TREE_ON_SCROLL,
} from "../../classes/actions/ITreeAction";

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

const TreeList = treeListCreator<ETreeList, ILearning, ILearningFilter>();

interface IContentLearningState {
	runningList: ILearning[];
	runningIsVisible: boolean;
	runningIsLoading: boolean;
	runningDataOffset: number;
	runningDataLimit: number;
	runningScrollOffset: number;
	storingList: ILearning[];
	storingIsVisible: boolean;
	storingIsLoading: boolean;
	storingDataOffset: number;
	storingDataLimit: number;
	storingScrollOffset: number;
}

interface IContentLearningDispatch {
	treeOnLoadEvent: (
		key: ETreeList,
		limit: number,
		offset: number,
		filter: ILearningFilter
	) => void;
	treeOnScrollEvent: (key: ETreeList, offset: number) => void;
	treeIsVisibleEvent: (key: ETreeList, visible: boolean) => void;
}

interface IContentLearningProps
	extends IContentLearningState,
		IContentLearningDispatch {}

class ContentLearning extends PureComponent<IContentLearningProps> {
	handlerTreeOnLoadEvent = (
		listKey: ETreeList,
		dataOffset: number,
		dataLimit: number,
		filter: ILearningFilter
	) => {
		const { treeOnLoadEvent } = this.props;

		treeOnLoadEvent(listKey, dataLimit, dataOffset, filter);
	};

	handlerTreeOnScrollEvent = (listKey: ETreeList, scrollOffset: number) => {
		const { treeOnScrollEvent } = this.props;

		treeOnScrollEvent(listKey, scrollOffset);
	};

	hendlerRunningIsVisibleEvent = () => {
		const { runningIsVisible, treeIsVisibleEvent } = this.props;
		treeIsVisibleEvent(ETreeList.LearningRunning, !runningIsVisible);
	};

	hendlerStoringIsVisibleEvent = () => {
		const { storingIsVisible, treeIsVisibleEvent } = this.props;
		treeIsVisibleEvent(ETreeList.LearningStoring, !storingIsVisible);
	};

	render = () => {
		const {
			runningList,
			runningIsVisible,
			runningIsLoading,
			runningDataOffset,
			runningDataLimit,
			runningScrollOffset,
			storingList,
			storingIsVisible,
			storingIsLoading,
			storingDataOffset,
			storingDataLimit,
			storingScrollOffset,
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
						<TreeList
							listKey={ETreeList.LearningRunning}
							filter={{ isArchive: false }}
							dataList={runningList}
							dataOffset={runningDataOffset}
							dataLimit={runningDataLimit}
							scrollOffset={runningScrollOffset}
							dataItemHeight={30}
							preLoaderUpMaxHeight={150}
							preLoaderDownMaxHeight={150}
							onLoadUp={this.handlerTreeOnLoadEvent}
							onLoadDown={this.handlerTreeOnLoadEvent}
							onScroll={this.handlerTreeOnScrollEvent}
						>
							{(props: ITreeItemProps<ILearning>) => {
								return (
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
								);
							}}
						</TreeList>
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
						<TreeList
							listKey={ETreeList.LearningStoring}
							filter={{ isArchive: true }}
							dataList={storingList}
							dataOffset={storingDataOffset}
							dataLimit={storingDataLimit}
							scrollOffset={storingScrollOffset}
							dataItemHeight={30}
							preLoaderUpMaxHeight={150}
							preLoaderDownMaxHeight={150}
							onLoadUp={this.handlerTreeOnLoadEvent}
							onLoadDown={this.handlerTreeOnLoadEvent}
							onScroll={this.handlerTreeOnScrollEvent}
						>
							{(props: ITreeItemProps<ILearning>) => {
								return (
									<TreeItem level={1}>
										<TreeColumn>
											<IconStyled path={entityLearning} />
											{props.dataItem.name}
										</TreeColumn>

										<ButtonStyled
											template="icon"
											svgPath={treeDelete}
										/>
									</TreeItem>
								);
							}}
						</TreeList>
					</StoringContainer>
				</Tree>
			</Content>
		);

		return result;
	};

	componentDidMount = () => {
		const {
			runningDataOffset,
			runningDataLimit,
			storingDataOffset,
			storingDataLimit,
			treeOnLoadEvent,
		} = this.props;

		treeOnLoadEvent(
			ETreeList.LearningRunning,
			runningDataLimit,
			runningDataOffset,
			{
				isArchive: false,
			}
		);
		treeOnLoadEvent(
			ETreeList.LearningStoring,
			storingDataLimit,
			storingDataOffset,
			{
				isArchive: true,
			}
		);
	};
}

const mapStateToProps = (state: IStore): IContentLearningState => {
	const { tree } = state;
	const runningList = tree[ETreeList.LearningRunning];
	const storingList = tree[ETreeList.LearningStoring];

	const props: IContentLearningState = {
		runningList: runningList.list as ILearning[],
		runningIsVisible: runningList.isVisible,
		runningIsLoading: runningList.isLoading,
		runningDataOffset: runningList.dataOffset,
		runningDataLimit: 50,
		runningScrollOffset: runningList.scrollOffset,
		storingList: storingList.list as ILearning[],
		storingIsVisible: storingList.isVisible,
		storingIsLoading: storingList.isLoading,
		storingDataOffset: storingList.dataOffset,
		storingDataLimit: 50,
		storingScrollOffset: storingList.scrollOffset,
	};

	return props;
};

const mapDispatchToProps = (
	dispatch: Dispatch<TTreeAction>
): IContentLearningDispatch => {
	return {
		treeOnLoadEvent: (
			key: ETreeList,
			limit: number,
			offset: number,
			filter: ILearningFilter
		) => {
			dispatch<ITreeOnLoadEventAction>({
				type: TREE_ON_LOAD_EVENT,
				listKey: key,
				dataLimit: limit,
				dataOffset: offset,
				controller: "/learnings",
				filter: filter,
			});
		},
		treeOnScrollEvent: (key: ETreeList, offset: number) => {
			dispatch<ITreeOnScrollAction>({
				type: TREE_ON_SCROLL,
				listKey: key,
				scrollOffset: offset,
			});
		},
		treeIsVisibleEvent: (key: ETreeList, visible: boolean) => {
			dispatch<ITreeIsVisibleAction>({
				type: TREE_IS_VISIBLE,
				listKey: key,
				visible: visible,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentLearning);
