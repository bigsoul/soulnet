import React, { PureComponent } from "react";
import styled from "styled-components";
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

import IDataset from "../../interfaces/IDataset";

import treeListCreator from "../Tree/TreeList";
import ETreeList from "../../enums/ETreeList";

import {
	doTreeClearCurrentRows,
	doTreeOnDeleteEvent,
	doTreeOnLoadEvent,
} from "../../classes/actions/ITreeAction";
import store, { IStore } from "../../classes/store";
import DatasetForm from "../Forms/DatasetForm";
import { match } from "react-router";
import { history } from "../../classes/reducers/routerReducer";
import { EmptyGuid } from "../..";

const IconStyled = styled(Icon)`
	margin-right: 5px;
`;

const ButtonStyled = styled(Button)`
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

const TreeListContainer = styled(BasisContainer)`
	height: calc(100% - 30px);
	overflow: hidden;
	position: relative;
`;

const ItemContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const TreeList = treeListCreator<ETreeList, IDataset>(ETreeList.Dataset, {
	controller: "/datasets",
});

interface IContentDatasetProps {
	isLoading: boolean;
	match?: match<{ id: string }>;
}

const mapStateToProps = (state: IStore): IContentDatasetProps => {
	const { tree } = state;
	const list = tree[ETreeList.Dataset];

	const props = {
		isLoading: list.isLoading,
	};

	return props;
};

const controller = "/datasets";
const connector = connect(mapStateToProps);

class ContentDataset extends PureComponent<IContentDatasetProps> {
	hendlerTreeRefresh = () => {
		const list = store.getState().tree[ETreeList.Dataset];

		doTreeOnLoadEvent<ETreeList.Dataset, {}>({
			listKey: ETreeList.Dataset,
			dataLimit: list.dataLimit,
			dataOffset: list.dataOffset,
			filter: {},
			controller: controller,
		});
	};

	hendlerTreeAdd = () => {
		history.push(`/dataset/${EmptyGuid}`);
	};

	render = () => {
		const { isLoading, match } = this.props;

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
								onClick={this.hendlerTreeRefresh}
							/>
							<ButtonStyled
								template="icon"
								svgPath={treeAdd}
								onClick={this.hendlerTreeAdd}
							/>
						</TreeColumn>
					</TreeHeader>
					<TreeListContainer>
						<TreeList
							filter={{}}
							dataItemHeight={30}
							preLoaderUpMaxHeight={150}
							preLoaderDownMaxHeight={150}
							currentRow={match?.params.id}
						>
							{(props: ITreeItemProps<IDataset>) => {
								return (
									<TreeItemStyled
										level={1}
										selected={props.dataItem.selected}
										onClick={() => {
											doTreeClearCurrentRows({
												listKey: ETreeList.Dataset,
											});
											history.push(
												`/dataset/${props.dataItem.id}`
											);
										}}
									>
										<TreeColumn>
											<IconStyled path={entityDataset} />
											{props.dataItem.name}
										</TreeColumn>
										<ButtonStyled
											template="icon"
											svgPath={treeDelete}
											onClick={() => {
												doTreeOnDeleteEvent({
													listKey: ETreeList.Dataset,
													id: props.dataItem.id,
													controller: controller,
												});
											}}
										/>
									</TreeItemStyled>
								);
							}}
						</TreeList>
					</TreeListContainer>
				</Tree>
				<ItemContainer>
					<DatasetForm
						entityId={this.props.match?.params.id}
					></DatasetForm>
				</ItemContainer>
			</Content>
		);
	};
}

export default connector(ContentDataset);
