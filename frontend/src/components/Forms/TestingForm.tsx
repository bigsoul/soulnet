import { PureComponent } from "react";
import styled from "styled-components";
import { doTreeClearCurrentRows } from "../../classes/actions/ITreeAction";
import ETestingState from "../../enums/ETestingState";
import ETreeList from "../../enums/ETreeList";
import Button from "../Button";
import formCreator, { IFormDispatch, IFormState } from "../Form/Form";
import Icon from "../Icon";
import TreeColumn from "../Tree/TreeColumn";
import TreeHeader from "../Tree/TreeHeader";
import { IDataItem } from "../Tree/TreeItem";
import treeTree from "./../../assets/svg/tree-tree.svg";
import loading from "./../../assets/gif/loading.gif";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeCancel from "./../../assets/svg/tree-cancel.svg";
import { history } from "../../classes/reducers/routerReducer";
import Edit from "../Edit";

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
					placeholder="Learning name"
					autoComplete="off"
					value={values.name}
					onChange={(value) => change("name", value)}
					error={errors.name}
				/>
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
