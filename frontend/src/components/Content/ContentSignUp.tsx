import Content from "./../Content";
import styled from "styled-components";
import Logo from "./../Logo";
import Edit from "./../Edit";
import Checkbox from "./../Checkbox";
import React from "react";
import Button from "../Button";

const ContentBoxDiv = styled.div`
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

interface ContentSignUpState {
	login: string;
	email: string;
	password: string;
	confirmPassword: string;
	rememberMe: boolean;
}

class ContentSignUn extends Content<{}, ContentSignUpState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			login: "",
			email: "",
			password: "",
			confirmPassword: "",
			rememberMe: false,
		};
	}

	loginOnChange = (value: string) => {
		this.setState({ login: value });
	};

	emailOnChange = (value: string) => {
		this.setState({ email: value });
	};

	passwordOnChange = (value: string) => {
		this.setState({ password: value });
	};

	confirmPasswordOnChange = (value: string) => {
		this.setState({ confirmPassword: value });
	};

	rememberMeOnChange = () => {
		this.setState({ rememberMe: !this.state.rememberMe });
	};

	render = () => {
		return (
			<Content>
				<ContentBoxDiv>
					<LogoStyled />
					<EditStyled10
						placeholder="username"
						onChange={this.loginOnChange}
					/>
					<EditStyled10
						placeholder="e-mail"
						onChange={this.emailOnChange}
					/>
					<EditStyled10
						placeholder="password"
						onChange={this.passwordOnChange}
					/>
					<EditStyled15
						placeholder="confirm password"
						onChange={this.confirmPasswordOnChange}
					/>
					<CheckboxStyled
						checked={this.state.rememberMe}
						onChange={this.rememberMeOnChange}
						label={"Remember me"}
					/>
					<Button path={"/"}>Sign Up</Button>
				</ContentBoxDiv>
			</Content>
		);
	};
}

export default ContentSignUn;
