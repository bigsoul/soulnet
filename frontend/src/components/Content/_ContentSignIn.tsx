/*import React from "react";
import styled from "styled-components";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Logo from "./../Logo";
import Edit from "./../Edit";
import Checkbox from "./../Checkbox";
import Content from "./../Content";
import Button from "../Button";

const ContentFormDiv = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const LogoStyled = styled(Logo)`
	margin-bottom: 15px;
`;

const EditStyled10 = styled(Edit)`
	margin-bottom: 10px;
`;

const EditStyled15 = styled(Edit)`
	margin-bottom: 15px;
`;

const CheckboxStyled = styled(Checkbox)`
	margin-bottom: 15px;
`;

interface IContentSignInState {
	login: string;
	password: string;
	rememberMe: boolean;
}

class ContentSignIn extends Content<
	InjectedFormProps<IContentSignInState>,
	IContentSignInState
> {
	constructor(props: InjectedFormProps<IContentSignInState>) {
		super(props);

		this.state = {
			login: "",
			password: "",
			rememberMe: false,
		};
	}

	loginOnChange = (value: string) => {
		this.setState({ login: value });
	};

	passwordOnChange = (value: string) => {
		this.setState({ password: value });
	};

	rememberMeOnChange = () => {
		this.setState({ rememberMe: !this.state.rememberMe });
	};

	render = () => {
		const { handleSubmit } = this.props;
		return (
			<Content>
				<ContentFormDiv onSubmit={handleSubmit}>
					<LogoStyled />
					<EditStyled10
						placeholder="username"
						onChange={this.loginOnChange}
					/>
					<EditStyled15
						placeholder="password"
						onChange={this.passwordOnChange}
					/>
					<CheckboxStyled
						checked={this.state.rememberMe}
						onChange={this.rememberMeOnChange}
						label={"Remember me"}
					/>
					<Button path={"/"}>Sign In</Button>
				</ContentFormDiv>
			</Content>
		);
	};
}

const SignInForm = reduxForm<IContentSignInState>({
	form: "signIn",
})(ContentSignIn);

export default SignInForm;
*/
export default null;
