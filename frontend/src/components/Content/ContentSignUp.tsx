import Content from "./../Content";
import styled from "styled-components";
import React from "react";
import SignUnForm, { ISignUpFormProps } from "../Forms/SignUpForm";
import IUser from "../../interfaces/IUser";
import { IStore } from "../../classes/store";
import { Dispatch } from "redux";
import {
	IUserSignUpAction,
	TUserAction,
	USER_SIGNUP,
} from "../../classes/actions/IUserAction";
import { connect } from "react-redux";

const ContentBoxDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

interface IContentSignUpState {
	user: IUser;
}

interface IContentSignUpDispatch {
	signUpAction: (data: ISignUpFormProps) => void;
}

const ContentSignUp = (props: IContentSignUpState & IContentSignUpDispatch) => {
	return (
		<Content>
			<ContentBoxDiv>
				{props.user.isAuth ? (
					"The user is authorized."
				) : (
					<SignUnForm onSubmit={props.signUpAction} />
				)}
			</ContentBoxDiv>
		</Content>
	);
};

const mapStateToProps = (state: IStore): IContentSignUpState => {
	const { user } = state;
	return {
		user: user,
	};
};

const mapDispatchToProps = (
	dispatch: Dispatch<TUserAction>
): IContentSignUpDispatch => {
	return {
		signUpAction: (data: ISignUpFormProps): void => {
			dispatch<IUserSignUpAction>({
				type: USER_SIGNUP,
				username: data.username,
				email: data.email,
				password: data.password,
				rememberMe: data.rememberMe,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentSignUp);
