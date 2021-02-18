import Content from "./../Content";
import styled from "styled-components";
import Logo from "./../Logo";
import Edit from "./../Edit";
import Checkbox from "./../Checkbox";
import ButtonSignInSubmit from "../Button/ButtonSignInSubmit";
import { timeStamp } from "console";
import ButtonSignUp from "../Button/ButtonSignUp";

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

interface ContentSignInState {
	login: string;
	password: string;
	rememberMe: boolean;
}

class ContentSignIn extends Content<{}, ContentSignInState> {
	constructor(props: {}) {
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
		console.log(this.state);
		return (
			<Content>
				<ContentBoxDiv>
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
					<ButtonSignInSubmit path={"/"}>Sign In</ButtonSignInSubmit>
				</ContentBoxDiv>
			</Content>
		);
	};
}

export default ContentSignIn;
