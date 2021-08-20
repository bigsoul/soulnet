import { PureComponent } from "react";
import formCreator, { IFormDispatch, IFormState } from "../Form/Form";
import TreeHeader from "../Tree/TreeHeader";
import { IDataItem } from "../Tree/TreeItem";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeCancel from "./../../assets/svg/tree-cancel.svg";
import treeTree from "./../../assets/svg/tree-tree.svg";
import loading from "./../../assets/gif/loading.gif";
import TreeColumn from "../Tree/TreeColumn";
import Button from "../Button";
import styled from "styled-components";
import Icon from "../Icon";
import { doTreeClearCurrentRows } from "../../classes/actions/ITreeAction";
import ETreeList from "../../enums/ETreeList";
import { history } from "../../classes/reducers/routerReducer";
import Edit from "../Edit";
import Upload from "../Upload";

const ButtonStyled = styled(Button)`
	margin-right: 5px;
`;

const IconStyled = styled(Icon)`
	margin-right: 5px;
`;

const ButtonSave = styled(Button)`
	margin-top: 10px;
`;

const NameStyled = styled(Edit)`
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

interface IDatasetFormProps {
	entityId?: string;
}

export interface IDatasetFormData extends IDataItem {
	name: string;
	isLoaded: boolean;
	description: string;
}

export const DatasetFormDataDefault: IDatasetFormData = {
	id: "",
	version: "",
	name: "",
	isLoaded: false,
	description: "",
};

export const formKey = "DatasetForm";

const afterWrite = (isNew: boolean, Entity: IDatasetFormData) => {
	if (isNew) history.push(`/dataset/${Entity.id}`);
	return true;
};

const Form = formCreator<typeof formKey, IDatasetFormData>(
	formKey,
	DatasetFormDataDefault,
	{
		controller: "/datasets",
		afterWrite: afterWrite,
	}
);

type ChildrenProps = IFormState<IDatasetFormData> &
	IFormDispatch<IDatasetFormData>;

class DatasetForm extends PureComponent<IDatasetFormProps> {
	renderHeader = (props: ChildrenProps) => {
		const { isLoading, isSaving, load } = props;

		return (
			<TreeHeader svgPath={treeTree}>
				<TreeColumn>Dataset</TreeColumn>
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
								listKey: ETreeList.Dataset,
							});
							history.push("/dataset");
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
					placeholder="Dataset name"
					autoComplete="off"
					value={values.name}
					onChange={(value) => change("name", value)}
					error={errors.name}
				/>
				<NameStyled
					name="description"
					type="text"
					placeholder="Description"
					autoComplete="off"
					value={values.description}
					onChange={(value) => change("description", value)}
					error={errors.description}
				/>
				<Upload />
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

export default DatasetForm;
