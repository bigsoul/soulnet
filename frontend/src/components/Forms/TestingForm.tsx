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
import ILearning from "../../interfaces/ILearning";

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

const EditStyled10 = styled(Edit)`
	margin-bottom: 10px;
	width: 101px;
`;

const ButtonSave = styled(Button)`
	margin-top: 10px;
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

const afterWrite = (isNew: boolean, Entity: ITestingFormData) => {
	if (isNew) history.push(`/testing/${Entity.id}`);
	return true;
};

const Form = formCreator<typeof formKey, ITestingFormData>(
	formKey,
	TestingFormDataDefault,
	{
		controller: "/testings",
		afterWrite: afterWrite,
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

const LearningList = treeListCreator<ETreeList, ILearning, {}>(
	ETreeList.TestingLearningSelect,
	{
		controller: "/learnings",
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
				<SelectStyled
					listKey={ETreeList.TestingLearningSelect}
					name="learning"
					type="text"
					placeholder="Select learning"
					autoComplete={"off"}
					value={values.learningName}
					onChange={(value) => change("learningName", value)}
				>
					<TreeListContainer>
						<LearningList
							filter={{}}
							dataItemHeight={30}
							preLoaderUpMaxHeight={150}
							preLoaderDownMaxHeight={150}
						>
							{(props: ITreeItemProps<ILearning>) => {
								return (
									<TreeItemStyled
										level={1}
										onClick={() => {
											change(
												"learningName",
												props.dataItem.name
											);
											change(
												"learningId",
												props.dataItem.id
											);
											doTreeIsVisibleConvert({
												listKey:
													ETreeList.TestingLearningSelect,
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
						</LearningList>
					</TreeListContainer>
				</SelectStyled>
				<EditStyled10
					name="stopLossPercent"
					type="number"
					placeholder="input stop loss percent"
					autoComplete="off"
					value={values.stopLossPercent}
					onChange={(value) => change("stopLossPercent", value)}
					error={errors.stopLossPercent}
				/>
				<EditStyled10
					name="startDeposit"
					type="number"
					placeholder="deep start deposit"
					autoComplete="off"
					value={values.startDeposit}
					onChange={(value) => change("startDeposit", value)}
					error={errors.startDeposit}
				/>
				<label>{"state: " + ETestingState[props.values.state]}</label>
				<ButtonSave type="submit">Save</ButtonSave>
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
