import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Content from "../Content";
import Tree from "../Tree/Tree";
import TreeBranch from "../Tree/TreeBranch";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem, {
	DataItem,
	IDataItem,
	ITreeItemProps,
} from "../Tree/TreeItem";
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

import React, { Component } from "react";
import { BranchDOMState } from "../../classes/reducers/learningReducer";
import treeListCreator from "../Tree/TreeList";

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
	list: ILearning[];
	runningOpen: boolean;
	runningLoading: boolean;
	runningWadTop: number;
	runningWadBottom: number;
	runningEmptiness: number;
	runningDOMState: BranchDOMState;
	storingOpen: boolean;
	storingLoading: boolean;
	storingWadTop: number;
	storingWadBottom: number;
	storingEmptiness: number;
	storingDOMState: BranchDOMState;
}

interface IContentLearningDispatch {
	branchOpenEvent: (branch: "running" | "storing") => void;
	branchScrollEvent: (branches: BranchDOMState[]) => void;
	didMountEvent: (branches: BranchDOMState[]) => void;
	didUpdateEvent: (branches: BranchDOMState[]) => void;
	willUnmountEvent: () => void;
}

interface IContentLearningProps
	extends IContentLearningState,
		IContentLearningDispatch {}

class ContentLearning extends Component<IContentLearningProps> {
	constructor(props: IContentLearningProps) {
		super(props);

		this.runningContainerRef = React.createRef();
		this.storngContainerRef = React.createRef();
	}

	runningContainerRef: React.RefObject<HTMLDivElement>;
	storngContainerRef: React.RefObject<HTMLDivElement>;

	runningIsScrolling: NodeJS.Timeout | undefined;

	runningScrollStop = () => {
		if (this.runningIsScrolling) clearTimeout(this.runningIsScrolling);

		let branchScrollEvent = this.branchScrollEvent;

		this.runningIsScrolling = setTimeout(function () {
			branchScrollEvent();
		}, 64);
	};

	getDOMState = () => {
		let runningClientHeight = 0;
		let storingClientHeight = 0;

		let runningScrollTop = 0;
		let storingScrollTop = 0;

		let runningScrollHeight = 0;
		let storingScrollHeight = 0;

		const runningContainer = this.runningContainerRef.current;
		const storngContainer = this.storngContainerRef.current;

		if (runningContainer) {
			runningClientHeight = runningContainer.clientHeight;
			runningScrollTop = runningContainer.scrollTop;
			runningScrollHeight = runningContainer.scrollHeight;
		}
		if (storngContainer) {
			storingClientHeight = storngContainer.clientHeight;
			storingScrollTop = storngContainer.scrollTop;
			storingScrollHeight = storngContainer.scrollHeight;
		}

		return {
			runningScrollTop,
			runningClientHeight,
			runningScrollHeight,
			storingScrollTop,
			storingClientHeight,
			storingScrollHeight,
		};
	};

	branchScrollEvent = () => {
		const domState = this.getDOMState();

		this.props.branchScrollEvent([
			new BranchDOMState(
				"running",
				domState.runningScrollTop,
				domState.runningClientHeight,
				domState.runningScrollHeight
			),
			new BranchDOMState(
				"storing",
				domState.storingScrollTop,
				domState.storingClientHeight,
				domState.storingScrollHeight
			),
		]);
	};

	componentDidMount = () => {
		const { runningDOMState, storingDOMState } = this.props;

		const runningContainer = this.runningContainerRef.current;
		const storngContainer = this.storngContainerRef.current;

		if (runningContainer && runningDOMState.scrollTop)
			runningContainer.scrollTop = runningDOMState.scrollTop;

		if (storngContainer && storingDOMState.scrollTop)
			storngContainer.scrollTop = storingDOMState.scrollTop;

		const domState = this.getDOMState();

		this.props.didMountEvent([
			new BranchDOMState(
				"running",
				domState.runningScrollTop,
				domState.runningClientHeight,
				domState.runningScrollHeight
			),
			new BranchDOMState(
				"storing",
				domState.storingScrollTop,
				domState.storingClientHeight,
				domState.storingScrollHeight
			),
		]);
	};

	componentDidUpdate = () => {
		const domState = this.getDOMState();

		this.props.didUpdateEvent([
			new BranchDOMState(
				"running",
				domState.runningScrollTop,
				domState.runningClientHeight,
				domState.runningScrollHeight
			),
			new BranchDOMState(
				"storing",
				domState.storingScrollTop,
				domState.storingClientHeight,
				domState.storingScrollHeight
			),
		]);
	};

	componentWillUnmount = () => {
		this.props.willUnmountEvent();
	};

	render = () => {
		const {
			runningOpen,
			runningLoading,
			storingOpen,
			storingLoading,
			branchOpenEvent,
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
								onClick={() => branchOpenEvent("running")}
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
							dataList={[{ id: "1", name: "Learning #1" }]}
							dataOffset={0}
							dataLimit={50}
							scrollOffset={0}
							dataItemHeight={30}
							preLoaderUpMaxHeight={150}
							preLoaderDownMaxHeight={150}
							onLoadUp={(dataOffset, dataLimit) => {}}
							onLoadDown={(dataOffset, dataLimit) => {}}
							onScroll={(scrollOffset) => {}}
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
								onClick={() => branchOpenEvent("storing")}
							/>
							Storing
						</TreeColumn>
						<TreeColumn align="right">
							{storingLoading && <IconStyled path={loading} />}
						</TreeColumn>
					</TreeBranch>
					{storingOpen && (
						<StoringContainer runningOpen={runningOpen}>
							{" "}
							<TreeList
								dataList={[{ id: "2", name: "Learning #2" }]}
								dataOffset={0}
								dataLimit={50}
								scrollOffset={0}
								dataItemHeight={30}
								preLoaderUpMaxHeight={150}
								preLoaderDownMaxHeight={150}
								onLoadUp={(dataOffset, dataLimit) => {}}
								onLoadDown={(dataOffset, dataLimit) => {}}
								onScroll={(scrollOffset) => {}}
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
	const { learning } = state;

	const props: IContentLearningState = {
		list: learning.list,
		runningOpen: learning.runningOpen,
		runningLoading: learning.runningLoading,
		runningWadTop: learning.runningWadTop,
		runningWadBottom: learning.runningWadBottom,
		runningEmptiness: learning.runningEmptiness,
		runningDOMState: learning.runningDOMState,
		storingOpen: learning.storingOpen,
		storingLoading: learning.storingLoading,
		storingWadTop: learning.storingWadTop,
		storingWadBottom: learning.storingWadBottom,
		storingEmptiness: learning.storingEmptiness,
		storingDOMState: learning.storingDOMState,
	};

	return props;
};

const mapDispatchToProps = (
	dispatch: Dispatch<TLearningAction>
): IContentLearningDispatch => {
	return {
		branchOpenEvent: (branch: "running" | "storing"): void => {
			dispatch<ACT.ILearningBranchOpenEventAction>({
				type: ACT.LEARNING_BRANCH_OPEN_EVENT,
				branch: branch,
			});
		},
		branchScrollEvent: (branches: BranchDOMState[]): void => {
			dispatch<ACT.ILearningDOMStateAction>({
				type: ACT.LEARNING_BRANCH_SCROLL_EVENT,
				branches: branches,
			});
		},
		didMountEvent: (branches: BranchDOMState[]): void => {
			dispatch<ACT.ILearningDOMStateAction>({
				type: ACT.LEARNING_DID_MOUNT_EVENT,
				branches: branches,
			});
		},
		didUpdateEvent: (branches: BranchDOMState[]): void => {
			dispatch<ACT.ILearningDOMStateAction>({
				type: ACT.LEARNING_DID_UPDATE_EVENT,
				branches: branches,
			});
		},
		willUnmountEvent: (): void => {
			dispatch<ACT.ILearningMountingAction>({
				type: ACT.LEARNING_WILL_UNMOUNT,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentLearning);
