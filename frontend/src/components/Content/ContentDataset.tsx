import { PureComponent } from "react";
import styled from "styled-components";
import {
	TreeListEntity,
	TreeListEntityFilters,
} from "../../classes/reducers/treeReducer";
import ETreeList from "../../enums/ETreeList";
import Content from "../Content";
import Tree from "../Tree/Tree";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem, { ITreeItemProps } from "../Tree/TreeItem";
import treeListCreator from "../Tree/TreeList";
import TreeColumn from "../Tree/TreeColumn";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeAdd from "./../../assets/svg/tree-add.svg";

import Button from "../Button";

import treeList from "./../../assets/svg/tree-list.svg";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import TTreeAction, {
	ITreeIsVisibleAction,
	ITreeOnLoadEventAction,
	ITreeOnScrollAction,
	TREE_IS_VISIBLE,
	TREE_ON_LOAD_EVENT,
	TREE_ON_SCROLL,
} from "../../classes/actions/ITreeAction";
import { IDatasetFilter } from "../../interfaces/IDataset";
import IStore from "../../interfaces/IStore";

const ButtonStyled = styled(Button)`
	margin-right: 5px;
`;

const BasisContainer = styled.div`
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	scrollbar-width: none;
`;

const TreeListContainer = styled(BasisContainer)`
	height: "calc(100% - 30px)";
	overflow: hidden;
	position: relative;
`;

interface IDatasetDataItem {
	name: string;
}

const TreeList = treeListCreator<
	ETreeList,
	IDatasetDataItem,
	TreeListEntityFilters
>();

interface IContentDatasetState {
	list: TreeListEntity[];
	isVisible: boolean;
	isLoading: boolean;
	dataOffset: number;
	dataLimit: number;
	scrollOffset: number;
}

interface IContentDatasetDispatch {
	treeOnLoadEvent: (
		key: ETreeList,
		limit: number,
		offset: number,
		filter: IDatasetFilter
	) => void;
	treeOnScrollEvent: (key: ETreeList, offset: number) => void;
	treeIsVisibleEvent: (key: ETreeList, visible: boolean) => void;
}

interface IContentDatasetProps
	extends IContentDatasetState,
		IContentDatasetDispatch {}

class ContentDataset extends PureComponent<IContentDatasetProps> {
	handlerTreeOnLoadEvent = (
		listKey: ETreeList,
		dataOffset: number,
		dataLimit: number,
		filter: TreeListEntityFilters
	) => {
		const { treeOnLoadEvent } = this.props;

		treeOnLoadEvent(listKey, dataLimit, dataOffset, filter);
	};

	handlerTreeOnScrollEvent = (listKey: ETreeList, scrollOffset: number) => {
		const { treeOnScrollEvent } = this.props;

		treeOnScrollEvent(listKey, scrollOffset);
	};

	render = () => {
		const {
			list,
			isVisible,
			isLoading,
			dataOffset,
			dataLimit,
			scrollOffset,
		} = this.props;

		return (
			<Content>
				<Tree>
					<TreeHeader svgPath={treeList}>
						<TreeColumn>Dataset</TreeColumn>
						<TreeColumn align="right">
							<ButtonStyled
								template="icon"
								svgPath={treeRefresh}
							/>
							<ButtonStyled template="icon" svgPath={treeAdd} />
						</TreeColumn>
					</TreeHeader>
					<TreeListContainer>
						<TreeList
							listKey={ETreeList.Dataset}
							filter={{ isArchive: false }}
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
							{(props: ITreeItemProps<IDatasetDataItem>) => {
								return (
									<TreeItem level={1}>
										<TreeColumn>
											{props.dataItem.name}
										</TreeColumn>
									</TreeItem>
								);
							}}
						</TreeList>
					</TreeListContainer>
				</Tree>
			</Content>
		);
	};
}

const mapStateToProps = (state: IStore): IContentDatasetState => {
	const { tree } = state;
	const list = tree[ETreeList.Dataset];

	const props: IContentDatasetState = {
		list: list.list,
		isVisible: list.isVisible,
		isLoading: list.isLoading,
		dataOffset: list.dataOffset,
		dataLimit: list.dataLimit,
		scrollOffset: list.scrollOffset,
	};

	return props;
};

const mapDispatchToProps = (
	dispatch: Dispatch<TTreeAction>
): IContentDatasetDispatch => {
	return {
		treeOnLoadEvent: (
			key: ETreeList,
			limit: number,
			offset: number,
			filter: IDatasetFilter
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentDataset);
