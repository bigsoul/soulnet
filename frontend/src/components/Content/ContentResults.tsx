import React, { PureComponent } from "react";
import styled from "styled-components";
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
import { doTreeOnLoadEvent } from "../../classes/actions/ITreeAction";

import treeListCreator from "../Tree/TreeList";
import { TreeListEntityFilters } from "../../classes/reducers/treeReducer";
import TreeItem, { ITreeItemProps } from "../Tree/TreeItem";
import store from "../../classes/store";

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

const controller = "/mainresultreport";

const TreeList = treeListCreator<
	ETreeList,
	IMainResultReport,
	TreeListEntityFilters
>(ETreeList.MainResultReport, {
	controller: controller,
});

const ContentStyled = styled(Content)`
	display: block;
`;

interface IContentDatasetProps {
	isLoading: boolean;
}

const mapStateToProps = (state: IStore): IContentDatasetProps => {
	const { tree } = state;

	const list = tree[ETreeList.MainResultReport];

	const props = {
		isLoading: list.isLoading,
	};

	return props;
};

const connector = connect(mapStateToProps);

class ContentResults extends PureComponent<IContentDatasetProps> {
	hendlerTreeRefresh = () => {
		const list = store.getState().tree[ETreeList.MainResultReport];

		doTreeOnLoadEvent<ETreeList.MainResultReport, {}>({
			listKey: ETreeList.MainResultReport,
			dataLimit: list.dataLimit,
			dataOffset: list.dataOffset,
			filter: list,
			controller: controller,
		});
	};

	render = () => {
		const { isLoading } = this.props;

		return (
			<ContentStyled>
				<TreeHeader svgPath={treeTree}>
					<TreeColumn>Main result report</TreeColumn>
					<TreeColumn align="right">
						{isLoading && <IconStyled path={loading} />}
						<ButtonStyled
							template="icon"
							svgPath={treeRefresh}
							onClick={this.hendlerTreeRefresh}
						/>
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
						filter={{}}
						dataItemHeight={30}
						preLoaderUpMaxHeight={150}
						preLoaderDownMaxHeight={150}
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
			</ContentStyled>
		);
	};
}

export default connector(ContentResults);
