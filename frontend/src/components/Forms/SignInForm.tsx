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

export interface ISignInFormProps {
	username: string;
	password: string;
	rememberMe: boolean;
}

class SignInForm extends Component<InjectedFormProps<ISignInFormProps>> {
	render = () => {
		const {
			handleSubmit,
			invalid,
			pristine,
			submitting,
			error,
		} = this.props;
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
				/>
				<Field
					name="password"
					type="password"
					placeholder="password"
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
					Sign In {error}
				</Button>
			</Form>
		);
	};
}

export default reduxForm<ISignInFormProps>({
	form: "signIn",
	initialValues: {
		username: "",
		password: "",
		rememberMe: false,
	},
})(SignInForm);
