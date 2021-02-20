import React, { Component } from "react";
import styled from "styled-components";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Logo from "./../Logo";
import Button from "../Button";
import EditForm from "../EditForm";
import CheckboxForm from "./../CheckboxForm";
import { maxLength15 } from "./../../classes/utils/validators";

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

interface ISignInProps {
	login: string;
	password: string;
	rememberMe: boolean;
}

class SignInForm extends Component<InjectedFormProps<ISignInProps>> {
	onChange = (value: number) => {
		console.log(value);
	};

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
					validate={[maxLength15]}
				/>
				<Field
					name="password"
					type="text"
					placeholder="password"
					component={EditStyled15}
					validate={[maxLength15]}
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
					Sign In
				</Button>
			</Form>
		);
	};
}

export default reduxForm<ISignInProps>({
	form: "signIn",
	initialValues: {
		login: "",
		password: "",
		rememberMe: false,
	},
})(SignInForm);
