import React, { Component } from "react";
import styled from "styled-components";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Logo from "./../Logo";
import Button from "../Button";
import EditForm from "../EditForm";
import CheckboxForm from "./../CheckboxForm";
import { maxLength20 } from "../../classes/utils/validators";

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const LogoStyled = styled(Logo)`
	margin-bottom: 15px;
`;

const EditStyled10 = styled(EditForm)`
	margin-bottom: 10px;
`;

const EditStyled15 = styled(EditForm)`
	margin-bottom: 15px;
`;

const CheckboxStyled = styled(CheckboxForm)`
	margin-bottom: 15px;
`;

export interface ISignUpFormProps {
	login: string;
	email: string;
	password: string;
	confirmPassword: string;
	rememberMe: boolean;
}

class SignUpForm extends Component<InjectedFormProps<ISignUpFormProps>> {
	render = () => {
		const { handleSubmit, invalid, pristine, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit}>
				<LogoStyled />
				<Field
					name="login"
					type="text"
					placeholder="username"
					component={EditStyled10}
					validate={[maxLength20]}
				/>
				<Field
					name="email"
					type="text"
					placeholder="e-mail"
					component={EditStyled10}
					validate={[maxLength20]}
				/>
				<Field
					name="password"
					type="password"
					placeholder="password"
					component={EditStyled10}
					validate={[maxLength20]}
				/>
				<Field
					name="confirmPassword"
					type="password"
					placeholder="confirm password"
					component={EditStyled15}
					validate={[maxLength20]}
				/>
				<Field
					name="rememberMe"
					type="checkbox"
					checked={true}
					label={"Remember me"}
					component={CheckboxStyled}
				/>
				<Button
					type="submit"
					disabled={invalid || pristine || submitting}
				>
					Sign Up
				</Button>
			</Form>
		);
	};
}

export default reduxForm<ISignUpFormProps>({
	form: "signUp",
	initialValues: {
		login: "",
		email: "",
		password: "",
		confirmPassword: "",
		rememberMe: false,
	},
})(SignUpForm);
