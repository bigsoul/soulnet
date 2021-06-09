import React, { PureComponent } from "react";
import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Content from "../Content";
import Button from "../Button";
import TreeColumn from "../Tree/TreeColumn";
import TreeHeader from "../Tree/TreeHeader";
import TreeBranch from "../Tree/TreeBranch";
import Icon from "../Icon";

import entityLearning from "./../../assets/svg/entity-learning.svg";
import entityTesting from "./../../assets/svg/entity-testing.svg";
import entityDataset from "./../../assets/svg/entity-dataset.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeTree from "./../../assets/svg/tree-tree.svg";
import loading from "./../../assets/gif/loading.gif";
import IMainResultReport from "../../interfaces/IMainResultReport";
import ETreeList from "../../enums/ETreeList";

import IStore from "../../interfaces/IStore";
import TTreeAction, {
	ITreeIsVisibleAction,
	ITreeOnLoadEventAction,
	ITreeOnScrollAction,
	TREE_IS_VISIBLE,
	TREE_ON_LOAD_EVENT,
	TREE_ON_SCROLL,
} from "../../classes/actions/ITreeAction";
import treeListCreator from "../Tree/TreeList";
import { TreeListEntityFilters } from "../../classes/reducers/treeReducer";
import TreeItem, { ITreeItemProps } from "../Tree/TreeItem";

const ButtonStyled = styled(Button)`
	margin-right: 5px;
`;

const IconStyled = styled(Icon)`
	margin-right: 5px;
`;

const TreeColumnStyled = styled(TreeColumn)`
	padding-left: 5px;
	padding-right: 5px;
	border-right: 1px solid #8a8a8a;
`;

const TreeColumnEnd = styled(TreeColumn)`
	padding-left: 5px;
	padding-right: 5px;
`;

const TreeListContainer = styled.div`
	height: calc(100% - 60px);
	overflow: hidden;
	position: relative;
`;

const TreeList = treeListCreator<
	ETreeList,
	IMainResultReport,
	TreeListEntityFilters
>();

interface IContentDatasetState {
	list: IMainResultReport[];
	isLoading: boolean;
	dataOffset: number;
	dataLimit: number;
	scrollOffset: number;
}

interface IContentDatasetDispatch {
	treeOnLoadEvent: (key: ETreeList, limit: number, offset: number) => void;
	treeOnScrollEvent: (key: ETreeList, offset: number) => void;
	treeIsVisibleEvent: (key: ETreeList, visible: boolean) => void;
}

interface IContentDatasetProps
	extends IContentDatasetState,
		IContentDatasetDispatch {}

class ContentResults extends PureComponent<IContentDatasetProps> {
	handlerTreeOnLoadEvent = (
		listKey: ETreeList,
		dataOffset: number,
		dataLimit: number,
		filter: TreeListEntityFilters
	) => {
		const { treeOnLoadEvent } = this.props;

		treeOnLoadEvent(listKey, dataLimit, dataOffset);
	};

	handlerTreeOnScrollEvent = (listKey: ETreeList, scrollOffset: number) => {
		const { treeOnScrollEvent } = this.props;

		treeOnScrollEvent(listKey, scrollOffset);
	};

	render = () => {
		const {
			list,
			isLoading,
			dataOffset,
			dataLimit,
			scrollOffset,
		} = this.props;

		return (
			<Content>
				<TreeHeader svgPath={treeTree}>
					<TreeColumn>Main result report</TreeColumn>
					<TreeColumn align="right">
						{isLoading && <IconStyled path={loading} />}
						<ButtonStyled template="icon" svgPath={treeRefresh} />
					</TreeColumn>
				</TreeHeader>
				<TreeBranch>
					<TreeColumnStyled>
						<IconStyled path={entityLearning} /> Learning
					</TreeColumnStyled>
					<TreeColumnStyled>
						<IconStyled path={entityTesting} /> Testing
					</TreeColumnStyled>
					<TreeColumnStyled>
						<IconStyled path={entityDataset} /> Dataset Learning
					</TreeColumnStyled>
					<TreeColumnStyled>
						<IconStyled path={entityDataset} /> Dataset Testing
					</TreeColumnStyled>
					<TreeColumnStyled>Start Deposit</TreeColumnStyled>
					<TreeColumnStyled>End Deposit</TreeColumnStyled>
					<TreeColumnEnd>Margin, %</TreeColumnEnd>
				</TreeBranch>
				<TreeListContainer>
					<TreeList
						listKey={ETreeList.MainResultReport}
						filter={{}}
						dataList={list}
						dataOffset={dataOffset}
						dataLimit={dataLimit}
						scrollOffset={scrollOffset}
						dataItemHeight={30}
						preLoaderUpMaxHeight={150}
						preLoaderDownMaxHeight={150}
						onLoadUp={this.handlerTreeOnLoadEvent}
						onLoadDown={this.handlerTreeOnLoadEvent}
						onScroll={this.handlerTreeOnScrollEvent}
					>
						{(props: ITreeItemProps<IMainResultReport>) => {
							return (
								<TreeItem>
									<TreeColumnStyled>
										<IconStyled path={entityLearning} />
										{props.dataItem.learningName}
									</TreeColumnStyled>
									<TreeColumnStyled>
										<IconStyled path={entityTesting} />
										{props.dataItem.testingName}
									</TreeColumnStyled>
									<TreeColumnStyled>
										<IconStyled path={entityDataset} />
										{props.dataItem.datasetLearningName}
									</TreeColumnStyled>
									<TreeColumnStyled>
										<IconStyled path={entityDataset} />
										{props.dataItem.datasetTestingName}
									</TreeColumnStyled>
									<TreeColumnStyled align="right">
										{props.dataItem.startDeposit}
									</TreeColumnStyled>
									<TreeColumnStyled align="right">
										{props.dataItem.endDeposit}
									</TreeColumnStyled>
									<TreeColumnEnd align="right">
										{props.dataItem.margin}
									</TreeColumnEnd>
								</TreeItem>
							);
						}}
					</TreeList>
				</TreeListContainer>
			</Content>
		);
	};

	componentDidMount = () => {
		const { dataOffset, dataLimit, treeOnLoadEvent } = this.props;

		treeOnLoadEvent(ETreeList.MainResultReport, dataLimit, dataOffset);
	};
}

const mapStateToProps = (state: IStore): IContentDatasetState => {
	const { tree } = state;
	const list = tree[ETreeList.MainResultReport];

	const props: IContentDatasetState = {
		list: list.list as IMainResultReport[],
		isLoading: list.isLoading,
		dataOffset: list.dataOffset,
		dataLimit: 50,
		scrollOffset: list.scrollOffset,
	};

	return props;
};

const mapDispatchToProps = (
	dispatch: Dispatch<TTreeAction>
): IContentDatasetDispatch => {
	return {
		treeOnLoadEvent: (key: ETreeList, limit: number, offset: number) => {
			dispatch<ITreeOnLoadEventAction>({
				type: TREE_ON_LOAD_EVENT,
				listKey: key,
				dataLimit: limit,
				dataOffset: offset,
				controller: "/mainresultreport",
				filter: {},
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentResults);
