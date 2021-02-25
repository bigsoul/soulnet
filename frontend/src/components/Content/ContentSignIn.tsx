import React from "react";
import styled from "styled-components";
import Content from "./../Content";
import SignInForm from "../Forms/SignInForm";
import { ISignInFormProps } from "./../Forms/SignInForm";

const ContentBoxDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

class ContentSignIn extends Content {
	handleSubmit = (data: ISignInFormProps) => {
		for (let i = 0; i < 10000; i++) {
			console.log(data.login);
		}
		console.log(data);
	};

	render = () => {
		return (
			<Content>
				<ContentBoxDiv>
					<SignInForm onSubmit={this.handleSubmit} />
				</ContentBoxDiv>
			</Content>
		);
	};
}

export default ContentSignIn;
