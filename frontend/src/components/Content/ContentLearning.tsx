import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Content from "../Content";
import Tree from "../Tree/Tree";
import TreeBranch from "../Tree/TreeBranch";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem from "../Tree/TreeItem";
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
import { timeStamp } from "node:console";

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

const RunningContainer = styled(BasisContainer)<{ storingOpen: boolean }>`
	height: ${(p) =>
		p.storingOpen
			? "calc(35% - 30px - 30px)"
			: "calc(100% - 30px - 30px - 30px)"};
`;

const StoringContainer = styled(BasisContainer)<{ runningOpen: boolean }>`
	height: ${(p) =>
		p.runningOpen ? "calc(65% - 30px)" : "calc(100% - 30px - 30px - 30px)"};
`;

interface IContentLearningState {
	list: ILearning[];
	runningOpen: boolean;
	storingOpen: boolean;
	runningScrollTop: number;
	storingScrollTop: number;
	runningLoading: boolean;
	storingLoading: boolean;
	runningClientHeight: number;
	storingClientHeight: number;
}

interface IContentLearningDispatch {
	branchOpenChange: (branch: "running" | "storing") => void;
	didMount: () => void;
	didUpdate: (
		runningClientHeight: number,
		storingClientHeight: number,
		runningScrollTop: number,
		storingScrollTop: number
	) => void;
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

	runningIsScrolling: any;

	runningScrollStop = () => {
		clearTimeout(this.runningIsScrolling);

		let componentDidUpdate = this.componentDidUpdate;

		this.runningIsScrolling = setTimeout(function () {
			componentDidUpdate();
		}, 50);
	};

	componentDidMount = () => {
		const { runningScrollTop, storingScrollTop } = this.props;

		const runningContainer = this.runningContainerRef.current;
		const storngContainer = this.storngContainerRef.current;

		if (runningContainer) runningContainer.scrollTop = runningScrollTop;
		if (storngContainer) storngContainer.scrollTop = storingScrollTop;

		this.componentDidUpdate();
	};

	componentDidUpdate = () => {
		let runningClientHeight = 0;
		let storingClientHeight = 0;

		let runningScrollTop = 0;
		let storingScrollTop = 0;

		const runningContainer = this.runningContainerRef.current;
		const storngContainer = this.storngContainerRef.current;

		if (runningContainer) {
			runningClientHeight = runningContainer.clientHeight;
			runningScrollTop = runningContainer.scrollTop;
		}
		if (storngContainer) {
			storingClientHeight = storngContainer.clientHeight;
			storingScrollTop = storngContainer.scrollTop;
		}

		if (
			runningScrollTop === this.props.runningScrollTop &&
			storingScrollTop === this.props.storingScrollTop &&
			runningClientHeight === this.props.runningClientHeight &&
			storingClientHeight === this.props.storingClientHeight
		)
			return;

		this.props.didUpdate(
			runningClientHeight,
			storingClientHeight,
			runningScrollTop,
			storingScrollTop
		);
	};

	render = () => {
		const {
			list,
			runningOpen,
			storingOpen,
			branchOpenChange,
			runningLoading,
			storingLoading,
		} = this.props;

		return (
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
								onClick={() => branchOpenChange("running")}
							/>
							Running
						</TreeColumn>
						<TreeColumn align="right">
							{runningLoading && <IconStyled path={loading} />}
						</TreeColumn>
					</TreeBranch>
					{runningOpen && (
						<RunningContainer
							ref={this.runningContainerRef}
							storingOpen={storingOpen}
							onScroll={this.runningScrollStop}
						>
							{list.map((item) => {
								if (!item.isArchive) return false;
								return (
									<TreeItem key={item.id} level={1}>
										<TreeColumn>
											<IconStyled path={entityLearning} />
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
					)}
					<TreeBranch>
						<TreeColumn>
							<ButtonStyled
								template="icon"
								svgPath={treeCollapse}
								svgPathSelected={treeExpand}
								selected={storingOpen}
								onClick={() => branchOpenChange("storing")}
							/>
							Storing
						</TreeColumn>
						<TreeColumn align="right">
							{storingLoading && <IconStyled path={loading} />}
						</TreeColumn>
					</TreeBranch>
					{storingOpen && (
						<StoringContainer
							ref={this.storngContainerRef}
							runningOpen={runningOpen}
							onScroll={this.runningScrollStop}
						>
							{list.map((item) => {
								if (item.isArchive) return false;
								return (
									<TreeItem key={item.id} level={1}>
										<TreeColumn>
											<IconStyled path={entityLearning} />
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
					)}
				</Tree>
			</Content>
		);
	};
}

const mapStateToProps = (state: IStore): IContentLearningState => {
	const { learning } = state;
	return {
		list: learning.list,
		runningOpen: learning.runningOpen,
		storingOpen: learning.storingOpen,
		runningScrollTop: learning.runningScrollTop,
		storingScrollTop: learning.storingScrollTop,
		runningLoading: learning.runningLoading,
		storingLoading: learning.storingLoading,
		runningClientHeight: learning.runningClientHeight,
		storingClientHeight: learning.storingClientHeight,
	};
};

const mapDispatchToProps = (
	dispatch: Dispatch<TLearningAction>
): IContentLearningDispatch => {
	return {
		branchOpenChange: (branch: "running" | "storing"): void => {
			dispatch<ACT.ILearningBranchOpenChangeAction>({
				type: ACT.LEARNING_BRANCH_OPEN_CHANGE,
				branch: branch,
			});
		},
		didMount: (): void => {
			dispatch<ACT.ILearningDidMountAction>({
				type: ACT.LEARNING_DID_MOUNT,
			});
		},
		didUpdate: (
			runningClientHeight,
			storingClientHeight,
			runningScrollTop,
			storingScrollTop
		): void => {
			dispatch<ACT.ILearningDidUpdateAction>({
				type: ACT.LEARNING_DID_UPDATE,
				runningScrollTop,
				storingScrollTop,
				runningClientHeight,
				storingClientHeight,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentLearning);
