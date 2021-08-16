import { PureComponent } from "react";
import styled from "styled-components";
import {
	doTreeClearCurrentRows,
	doTreeIsVisibleConvert,
} from "../../classes/actions/ITreeAction";
import ETestingState from "../../enums/ETestingState";
import ETreeList from "../../enums/ETreeList";
import Button from "../Button";
import formCreator, { IFormDispatch, IFormState } from "../Form/Form";
import Icon from "../Icon";
import TreeColumn from "../Tree/TreeColumn";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem, { IDataItem, ITreeItemProps } from "../Tree/TreeItem";
import treeTree from "./../../assets/svg/tree-tree.svg";
import loading from "./../../assets/gif/loading.gif";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeCancel from "./../../assets/svg/tree-cancel.svg";
import { history } from "../../classes/reducers/routerReducer";
import Edit from "../Edit";
import treeListCreator from "../Tree/TreeList";
import IDataset from "../../interfaces/IDataset";
import Select from "../Select";
import entityDataset from "./../../assets/svg/entity-dataset.svg";

const IconStyled = styled(Icon)`
	margin-right: 5px;
`;

const ButtonStyled = styled(Button)`
	margin-right: 5px;
`;

const FormStyled = styled.form`
	display: flex;
	align-items: start;
	justify-content: center;
	flex-direction: column;
	padding-top: 10px;
	padding-left: 6px;
`;

const NameStyled = styled(Edit)`
	margin-bottom: 10px;
	width: 400px;
	text-align: left;
`;

const SelectStyled = styled(Select)`
	margin-bottom: 10px;
	width: 400px;
	text-align: left;
`;

const BasisContainer = styled.div`
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	scrollbar-width: none;
`;

const TreeListContainer = styled(BasisContainer)`
	height: 200px;
	width: 400px;
	overflow: hidden;
	border: 1px solid #00f0ff;
	border-top: none;
	box-sizing: border-box;
	position: absolute;
	background-color: black;
	z-index: 1;
	margin-top: -10px;
`;

const TreeItemStyled = styled(TreeItem)<{ level: number }>`
	padding-left: calc(6px + ${(p) => (p.level || 0) * 23 + "px"});
`;

interface ITestingFormProps {
	entityId?: string;
}

export interface ITestingFormData extends IDataItem {
	name: string;
	state: ETestingState;
	datasetId: string;
	datasetName: string;
	learningId: string;
	learningName: string;
	stopLossPercent: number;
	startDeposit: number;
}

export const TestingFormDataDefault: ITestingFormData = {
	id: "",
	version: "",
	name: "",
	datasetId: "",
	datasetName: "",
	learningId: "",
	learningName: "",
	stopLossPercent: 0,
	startDeposit: 0,
	state: ETestingState.Config,
};

export const formKey = "TestingForm";

const Form = formCreator<typeof formKey, ITestingFormData>(
	formKey,
	TestingFormDataDefault,
	{
		controller: "/testings",
	}
);

const DatasetList = treeListCreator<ETreeList, IDataset, {}>(
	ETreeList.TestingDatasetSelect,
	{
		controller: "/datasets",
		visible: false,
		selectMode: true,
	}
);

type ChildrenProps = IFormState<ITestingFormData> &
	IFormDispatch<ITestingFormData>;

class TestingForm extends PureComponent<ITestingFormProps> {
	renderHeader = (props: ChildrenProps) => {
		const { isLoading, isSaving, load } = props;

		return (
			<TreeHeader svgPath={treeTree}>
				<TreeColumn>Testing</TreeColumn>
				<TreeColumn align="right">
					{(isLoading || isSaving) && <IconStyled path={loading} />}
					<ButtonStyled
						template="icon"
						svgPath={treeRefresh}
						onClick={load}
					/>
					<ButtonStyled
						template="icon"
						svgPath={treeCancel}
						onClick={() => {
							doTreeClearCurrentRows({
								listKey: ETreeList.TestingRunning,
							});
							doTreeClearCurrentRows({
								listKey: ETreeList.TestingStoring,
							});
							history.push("/testing");
						}}
					/>
				</TreeColumn>
			</TreeHeader>
		);
	};

	renderBody = (props: ChildrenProps) => {
		const { values, errors, change, save } = props;

		return (
			<FormStyled onSubmit={save}>
				<NameStyled
					name="name"
					type="text"
					placeholder="Testing name"
					autoComplete="off"
					value={values.name}
					onChange={(value) => change("name", value)}
					error={errors.name}
				/>
				<SelectStyled
					listKey={ETreeList.TestingDatasetSelect}
					name="dataset"
					type="text"
					placeholder="Select dataset"
					autoComplete={"off"}
					value={values.datasetName}
					onChange={(value) => change("datasetName", value)}
				>
					<TreeListContainer>
						<DatasetList
							filter={{}}
							dataItemHeight={30}
							preLoaderUpMaxHeight={150}
							preLoaderDownMaxHeight={150}
						>
							{(props: ITreeItemProps<IDataset>) => {
								return (
									<TreeItemStyled
										level={1}
										onClick={() => {
											change(
												"datasetName",
												props.dataItem.name
											);
											change(
												"datasetId",
												props.dataItem.id
											);
											doTreeIsVisibleConvert({
												listKey:
													ETreeList.TestingDatasetSelect,
											});
										}}
									>
										<TreeColumn>
											<IconStyled path={entityDataset} />
											{props.dataItem.name}
										</TreeColumn>
									</TreeItemStyled>
								);
							}}
						</DatasetList>
					</TreeListContainer>
				</SelectStyled>
			</FormStyled>
		);
	};

	renderForm = (props: ChildrenProps) => {
		return (
			<>
				{this.renderHeader(props)}
				{this.renderBody(props)}
			</>
		);
	};

	render = () => {
		return <Form entityId={this.props.entityId}>{this.renderForm}</Form>;
	};
}

export default TestingForm;
