import React from "react";
import styled from "styled-components";
import Content from "./../Content";
import SignInForm from "../Forms/SignInForm";
import { ISignInFormProps } from "./../Forms/SignInForm";
import { connect } from "react-redux";
import IStore from "../../interfaces/IStore";
import {
	IUserSignInAction,
	TUserAction,
	USER_SIGNIN,
} from "../../classes/actions/IUserAction";
import IUser from "../../interfaces/IUser";
import { Dispatch } from "redux";

const ContentBoxDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

interface IContentSignInState {
	user: IUser;
}

interface IContentSignInDispatch {
	signInAction: (data: ISignInFormProps) => void;
}

class ContentSignIn extends Content<
	IContentSignInState & IContentSignInDispatch
> {
	render = () => {
		return (
			<Content>
				<ContentBoxDiv>
					<SignInForm onSubmit={this.props.signInAction} />
				</ContentBoxDiv>
			</Content>
		);
	};
}

const mapStateToProps = (state: IStore): IContentSignInState => {
	const { user } = state;
	return {
		user: user,
	};
};

const mapDispatchToProps = (
	dispatch: Dispatch<TUserAction>
): IContentSignInDispatch => {
	return {
		signInAction: (data: ISignInFormProps): void => {
			dispatch<IUserSignInAction>({
				type: USER_SIGNIN,
				login: data.login,
				password: data.password,
				rememberMe: data.rememberMe,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentSignIn);
