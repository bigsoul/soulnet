import { PureComponent } from "react";
import styled from "styled-components";
import {
	doTreeClearCurrentRows,
	doTreeIsVisibleConvert,
} from "../../classes/actions/ITreeAction";
import EPlayerState from "../../enums/EPlayerState";
import ETreeList from "../../enums/ETreeList";
import IDataset from "../../interfaces/IDataset";
import Edit from "../Edit";
import formCreator, { IFormDispatch, IFormState } from "../Form/Form";
import Icon from "../Icon";
import Select from "../Select";
import TreeColumn from "../Tree/TreeColumn";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem, { IDataItem, ITreeItemProps } from "../Tree/TreeItem";
import treeListCreator from "../Tree/TreeList";
import entityDataset from "./../../assets/svg/entity-dataset.svg";
import treeTree from "./../../assets/svg/tree-tree.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeCancel from "./../../assets/svg/tree-cancel.svg";
import loading from "./../../assets/gif/loading.gif";
import Button from "./../Button";
import { history } from "../../classes/reducers/routerReducer";

const ButtonStyled = styled(Button)`
	margin-right: 5px;
`;

const ButtonSave = styled(Button)`
	margin-top: 10px;
`;

const EditStyled10 = styled(Edit)`
	margin-bottom: 10px;
	width: 101px;
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

const FormStyled = styled.form`
	display: flex;
	align-items: start;
	justify-content: center;
	flex-direction: column;
	padding-top: 10px;
	padding-left: 6px;
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

export const formKey = "LearningForm";

interface ILearningFormProps {
	entityId?: string;
}

export interface ILearningFormData extends IDataItem {
	name: string;
	datasetId: string;
	datasetName: string;
	inputNeuronsCount: number;
	deepLayersCount: number;
	state: EPlayerState;
}

export const LearningFormDataDefault: ILearningFormData = {
	id: "",
	version: "",
	name: "",
	datasetId: "",
	datasetName: "",
	inputNeuronsCount: 0,
	deepLayersCount: 0,
	state: EPlayerState.Config,
};

const afterWrite = (isNew: boolean, Entity: ILearningFormData) => {
	if (isNew) history.push(`/learning/${Entity.id}`);
	return true;
};

const Form = formCreator<typeof formKey, ILearningFormData>(
	formKey,
	LearningFormDataDefault,
	{
		controller: "/learnings",
		afterWrite: afterWrite,
	}
);

const DatasetList = treeListCreator<ETreeList, IDataset, {}>(
	ETreeList.DatasetLearningSelect,
	{
		controller: "/datasets",
		visible: false,
		selectMode: true,
	}
);

type ChildrenProps = IFormState<ILearningFormData> &
	IFormDispatch<ILearningFormData>;

class LearningForm extends PureComponent<ILearningFormProps> {
	renderHeader = (props: ChildrenProps) => {
		const { isLoading, isSaving, load } = props;

		return (
			<TreeHeader svgPath={treeTree}>
				<TreeColumn>Learning</TreeColumn>
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
								listKey: ETreeList.LearningRunning,
							});
							doTreeClearCurrentRows({
								listKey: ETreeList.LearningStoring,
							});
							history.push("/learning");
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
					placeholder="Learning name"
					autoComplete="off"
					value={values.name}
					onChange={(value) => change("name", value)}
					error={errors.name}
				/>

				<SelectStyled
					listKey={ETreeList.DatasetLearningSelect}
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
													ETreeList.DatasetLearningSelect,
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
				<EditStyled10
					name="inputNeurons"
					type="number"
					placeholder="input neurons"
					autoComplete="off"
					value={values.inputNeuronsCount}
					onChange={(value) => change("inputNeuronsCount", value)}
					error={errors.inputNeuronsCount}
				/>
				<EditStyled10
					name="deepLayers"
					type="number"
					placeholder="deep layers"
					autoComplete="off"
					value={values.deepLayersCount}
					onChange={(value) => change("deepLayersCount", value)}
					error={errors.deepLayersCount}
				/>
				<label>{"state: " + EPlayerState[props.values.state]}</label>
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

export default LearningForm;
