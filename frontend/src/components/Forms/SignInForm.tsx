import React, { Component } from "react";
import styled from "styled-components";
import {
	Field,
	InjectedFormProps,
	reduxForm,
	WrappedFieldProps,
} from "redux-form";
import Logo from "./../Logo";
import Button from "../Button";
import { maxLength20 } from "../../classes/utils/validators";
import Checkbox from "../Checkbox";
import Edit from "../Edit";

type FieldProps = InjectedFormProps<ISignInFormProps> & WrappedFieldProps;

const EditField = (props: FieldProps) => <Edit {...props.input} {...props} />;

const CheckboxField = (props: FieldProps) => (
	<Checkbox
		{...props.input}
		{...props}
		checked={props.input.value ? true : false}
		onChange={props.input.onChange}
	/>
);

const SubmitField = (props: FieldProps) => (
	<Button
		type="submit"
		disabled={props.meta.invalid || props.meta.submitting}
	>
		Sign In {props.error}
	</Button>
);

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const LogoStyled = styled(Logo)`
	margin-bottom: 15px;
`;

const EditStyled10 = styled(EditField)`
	margin-bottom: 10px;
`;

const EditStyled15 = styled(EditField)`
	margin-bottom: 15px;
`;

const CheckboxStyled = styled(CheckboxField)`
	margin-bottom: 15px;
`;

export interface ISignInFormProps {
	username: string;
	password: string;
	rememberMe: boolean;
}

class SignInForm extends Component<InjectedFormProps<ISignInFormProps>> {
	render = () => {
		const { handleSubmit, submitting } = this.props;
		console.log(this.props);
		return (
			<Form onSubmit={handleSubmit}>
				<LogoStyled />
				<Field
					name="username"
					type="text"
					placeholder="username"
					component={EditStyled10}
					validate={[maxLength20]}
					disabled={submitting}
				/>
				<Field
					name="password"
					type="password"
					placeholder="password"
					component={EditStyled15}
					validate={[maxLength20]}
					disabled={submitting}
				/>
				<Field
					name="rememberMe"
					type="checkbox"
					checked={true}
					label={"Remember me"}
					component={CheckboxStyled}
					disabled={submitting}
				/>
				<Field
					name="button"
					type="button"
					component={SubmitField}
					validate={[submitValidate]}
					{...this.props}
				/>
			</Form>
		);
	};
}

const submitValidate = (value: undefined, previousValue: ISignInFormProps) =>
	previousValue.username && previousValue.password
		? undefined
		: "invalid form values";

export default reduxForm<ISignInFormProps>({
	form: "signIn",
	destroyOnUnmount: false,
	initialValues: {
		username: "",
		password: "",
		rememberMe: false,
	},
})(SignInForm);
