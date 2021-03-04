import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import TPathAction, {
	IPathToSignInAction,
	PATH_TO_SIGNIN,
} from "../classes/actions/IPathAction";
import TUserAction, {
	IUserSignOutAction,
	USER_SIGNOUT,
} from "../classes/actions/IUserAction";
import IStore from "../interfaces/IStore";
import Button from "./Button";

const PrfileDiv = styled.div<IProfileProps>`
	width: calc(100% - ${(props) => (props.isAuth ? "8px" : "0px")});
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: ${(props) => (props.isAuth ? "flex-end" : "space-evenly")};
`;

interface IProfileProps {
	isAuth: boolean;
}

interface IProfileDispatch {
	signOutAction: () => void;
	pathToSignIn: () => void;
}

class Prfile extends Component<IProfileProps & IProfileDispatch> {
	hendleSignOut = () => {
		this.props.signOutAction();
	};

	render = () => {
		return (
			<PrfileDiv {...this.props}>
				{this.props.isAuth ? (
					<Button onClick={this.hendleSignOut}>Sign Out</Button>
				) : (
					<>
						<Button onClick={this.props.pathToSignIn}>
							Sign In
						</Button>
						<Button path={"/signup"}>Sign Un</Button>
					</>
				)}
			</PrfileDiv>
		);
	};
}

const mapStateToProps = (state: IStore): IProfileProps => {
	const { user } = state;
	return {
		isAuth: user.isAuth,
	};
};

const mapDispatchToProps = (
	dispatch: Dispatch<TUserAction | TPathAction>
): IProfileDispatch => {
	return {
		signOutAction: (): void => {
			dispatch<IUserSignOutAction>({
				type: USER_SIGNOUT,
			});
		},
		pathToSignIn: (): void => {
			dispatch<IPathToSignInAction>({
				type: PATH_TO_SIGNIN,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Prfile);
