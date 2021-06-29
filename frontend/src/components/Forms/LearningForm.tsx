import { Component } from "react";
import {
	Field,
	InjectedFormProps,
	reduxForm,
	WrappedFieldProps,
} from "redux-form";
import styled from "styled-components";
import ELearningState from "../../enums/ELearningState";
import Edit from "../Edit";

type FieldProps = InjectedFormProps<ILearningFormProps> & WrappedFieldProps;

const EditField = (props: FieldProps) => {
	const { error, touched } = props.meta;
	return <Edit {...props.input} {...props} error={touched && error} />;
};

const EditStyled10 = styled(EditField)`
	margin-bottom: 10px;
`;

const FormStyled = styled.form`
	display: flex;
	align-items: start;
	justify-content: center;
	flex-direction: column;
`;

interface ILearningFormProps {
	name: string;
	dataset: string;
	datasetId: string;
	inputNeurons: number;
	deepLayers: number;
	state: ELearningState | string;
}

class Form extends Component<InjectedFormProps<ILearningFormProps>> {
	render = () => {
		return (
			<FormStyled>
				<Field
					name="name"
					type="text"
					placeholder="learning name"
					component={EditStyled10}
				/>
				<Field
					name="dataset"
					type="text"
					placeholder="dataset name"
					component={EditStyled10}
				/>
				<Field
					name="inputNeurons"
					type="number"
					placeholder="input neurons"
					component={EditStyled10}
				/>
				<Field
					name="deepLayers"
					type="number"
					placeholder="deep layers"
					component={EditStyled10}
				/>
				<label>{"state: "}</label>
			</FormStyled>
		);
	};
}

const LearningForm = reduxForm<ILearningFormProps>({
	form: "learningForm",
	destroyOnUnmount: false,
	initialValues: {
		name: "name-field",
		dataset: "",
		datasetId: "",
		inputNeurons: 0,
		deepLayers: 0,
		state: "",
	},
})(Form);

export default LearningForm;
