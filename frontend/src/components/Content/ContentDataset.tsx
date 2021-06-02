import React, { PureComponent } from "react";
import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Content from "../Content";
import Tree from "../Tree/Tree";
import Icon from "../Icon";
import Button from "../Button";
import TreeColumn from "../Tree/TreeColumn";
import TreeItem, { ITreeItemProps } from "../Tree/TreeItem";
import TreeHeader from "../Tree/TreeHeader";

import entityDataset from "./../../assets/svg/entity-dataset.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeAdd from "./../../assets/svg/tree-add.svg";
import treeDelete from "./../../assets/svg/tree-delete.svg";
import treeList from "./../../assets/svg/tree-list.svg";
import loading from "./../../assets/gif/loading.gif";

import IStore from "../../interfaces/IStore";
import { IDatasetFilter } from "../../interfaces/IDataset";

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

import {
	TreeListEntity,
	TreeListEntityFilters,
} from "../../classes/reducers/treeReducer";

const IconStyled = styled(Icon)`
	margin-right: 5px;
`;

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
	height: calc(100% - 30px);
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
							{isLoading && <IconStyled path={loading} />}
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
							{(props: ITreeItemProps<IDatasetDataItem>) => {
								return (
									<TreeItem level={1}>
										<TreeColumn>
											<IconStyled path={entityDataset} />
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
					</TreeListContainer>
				</Tree>
			</Content>
		);
	};

	componentDidMount = () => {
		const { dataOffset, dataLimit, treeOnLoadEvent } = this.props;

		treeOnLoadEvent(ETreeList.Dataset, dataLimit, dataOffset, {});
	};
}

const mapStateToProps = (state: IStore): IContentDatasetState => {
	const { tree } = state;
	const list = tree[ETreeList.Dataset];

	const props: IContentDatasetState = {
		list: list.list,
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
				controller: "/datasets",
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
