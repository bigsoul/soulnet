import { PureComponent } from "react";
import styled from "styled-components";
import { doTreeIsVisibleConvert } from "../../classes/actions/ITreeAction";
import ELearningState from "../../enums/ELearningState";
import ETreeList from "../../enums/ETreeList";
import IDataset from "../../interfaces/IDataset";
import Edit from "../Edit";
import formCreator, { IFormDispatch, IFormState } from "../Form/Form";
import Icon from "../Icon";
import Select from "../Select";
import TreeColumn from "../Tree/TreeColumn";
import TreeHeader from "../Tree/TreeHeader";
import TreeItem, { ITreeItemProps } from "../Tree/TreeItem";
import treeListCreator from "../Tree/TreeList";
import entityDataset from "./../../assets/svg/entity-dataset.svg";
import treeTree from "./../../assets/svg/tree-tree.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeCancel from "./../../assets/svg/tree-cancel.svg";
import Button from "./../Button";
import { history } from "../../classes/reducers/routerReducer";

const ButtonStyled = styled(Button)`
	margin-right: 5px;
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

interface ILearningFormProps {
	entityId?: string;
}

interface ILearningFormData {
	name: string;
	dataset: string;
	datasetId: string;
	inputNeurons: number;
	deepLayers: number;
	state: ELearningState;
}

const Form = formCreator<"LearningForm", ILearningFormData>("LearningForm", {
	name: "",
	dataset: "",
	datasetId: "",
	inputNeurons: 0,
	deepLayers: 0,
	state: ELearningState.Config,
});

const DatasetList = treeListCreator<ETreeList, IDataset, {}>(
	ETreeList.DatasetLearningSelect,
	{
		controller: "/datasets",
		visible: false,
	}
);

class LearningForm extends PureComponent<ILearningFormProps> {
	formBodyRender = (
		props: IFormState<ILearningFormData> & IFormDispatch<ILearningFormData>
	) => {
		const { values, change } = props;

		return (
			<FormStyled
				onSubmit={() => {
					console.log("submit");
				}}
			>
				<NameStyled
					name="name"
					type="text"
					placeholder="Learning name"
					autoComplete="off"
					value={values.name}
					onChange={(value) => change("name", value)}
				/>

				<SelectStyled
					listKey={ETreeList.DatasetLearningSelect}
					name="dataset"
					type="text"
					placeholder="Select dataset"
					autoComplete={"off"}
					value={values.dataset}
					onChange={(value) => change("dataset", value)}
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
												"dataset",
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
					value={values.inputNeurons}
					onChange={(value) => change("inputNeurons", value)}
				/>
				<EditStyled10
					name="deepLayers"
					type="number"
					placeholder="deep layers"
					autoComplete="off"
					value={values.deepLayers}
					onChange={(value) => change("deepLayers", value)}
				/>
				<label>{"state: " + props.values.state.toString()}</label>
			</FormStyled>
		);
	};

	render = () => {
		if (!this.props.entityId) return null;
		return (
			<>
				<TreeHeader svgPath={treeTree}>
					<TreeColumn>Learning</TreeColumn>
					<TreeColumn align="right">
						<ButtonStyled
							template="icon"
							svgPath={treeRefresh}
							onClick={undefined}
						/>
						<ButtonStyled
							template="icon"
							svgPath={treeCancel}
							onClick={() => {
								history.push("/learning");
							}}
						/>
					</TreeColumn>
				</TreeHeader>
				<Form render={this.formBodyRender} />
			</>
		);
	};
}

export default LearningForm;
