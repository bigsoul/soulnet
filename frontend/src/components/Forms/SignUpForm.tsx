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
import { required, email, length, confirmation } from "redux-form-validators";
import Edit from "../Edit";
import Checkbox from "../Checkbox";

type FieldProps = InjectedFormProps<ISignUpFormProps> & WrappedFieldProps;

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
	text-align: center;
`;

const EditStyled10 = styled(EditField)`
	margin-bottom: 10px;
	text-align: center;
`;

const EditStyled15 = styled(EditField)`
	margin-bottom: 15px;
	text-align: center;
`;

const CheckboxStyled = styled(CheckboxField)`
	margin-bottom: 15px;
`;

export interface ISignUpFormProps {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	rememberMe: boolean;
}

const SignUpForm = (props: InjectedFormProps<ISignUpFormProps>) => {
	const { handleSubmit, submitting } = props;
	return (
		<Form onSubmit={handleSubmit}>
			<LogoStyled />
			<Field
				name="username"
				type="text"
				placeholder="username"
				component={EditStyled10}
				validate={[required(), length({ min: 4, max: 16 })]}
				disabled={submitting}
			/>
			<Field
				name="email"
				type="text"
				placeholder="e-mail"
				component={EditStyled10}
				validate={[required(), email()]}
				disabled={submitting}
			/>
			<Field
				name="password"
				type="password"
				placeholder="password"
				component={EditStyled10}
				validate={[required(), length({ min: 8 })]}
				disabled={submitting}
			/>
			<Field
				name="confirmPassword"
				type="password"
				placeholder="confirm password"
				component={EditStyled15}
				validate={[
					required(),
					length({ min: 8 }),
					confirmation({
						field: "password",
						fieldLabel: "confirmPassword",
					}),
				]}
				disabled={submitting}
			/>
			<Field
				name="rememberMe"
				id="SignUp-RememberMe"
				component={CheckboxStyled}
				label={"Remember me"}
				type="checkbox"
				disabled={submitting}
			/>
			<Button type="submit" disabled={props.invalid || props.submitting}>
				Sign Up {props.error}
			</Button>
		</Form>
	);
};

export default reduxForm<ISignUpFormProps>({
	form: "signUp",
	initialValues: {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		rememberMe: false,
	},
})(SignUpForm);
