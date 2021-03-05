import React from "react";
import styled from "styled-components";
import {
	Field,
	InjectedFormProps,
	reduxForm,
	WrappedFieldProps,
} from "redux-form";
import Logo from "./../Logo";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Edit from "../Edit";
import { required, length } from "redux-form-validators";

type FieldProps = InjectedFormProps<ISignInFormProps> & WrappedFieldProps;

const EditField = (props: FieldProps) => {
	const { error, touched } = props.meta;
	return <Edit {...props.input} {...props} error={touched && error} />;
};

const CheckboxField = (props: FieldProps & { checked: boolean }) => (
	<Checkbox {...props.input} {...props} onChange={props.input.onChange} />
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

const SignInForm = (props: InjectedFormProps<ISignInFormProps>) => {
	const { handleSubmit, submitting } = props;
	return (
		<Form onSubmit={handleSubmit}>
			<LogoStyled />
			<Field
				name="username"
				type="text"
				placeholder="username"
				component={EditStyled10}
				validate={[required()]}
				disabled={submitting}
			/>
			<Field
				name="password"
				type="password"
				placeholder="password"
				component={EditStyled15}
				validate={[required(), length({ min: 8 })]}
				disabled={submitting}
			/>
			<Field
				name="rememberMe"
				id="SignIn-RememberMe"
				component={CheckboxStyled}
				label={"Remember me"}
				type="checkbox"
				disabled={submitting}
			/>
			<Button type="submit" disabled={props.invalid || props.submitting}>
				Sign In {props.error}
			</Button>
		</Form>
	);
};

export default reduxForm<ISignInFormProps>({
	form: "signIn",
	destroyOnUnmount: false,
	initialValues: {
		username: "",
		password: "",
		rememberMe: false,
	},
})(SignInForm);
