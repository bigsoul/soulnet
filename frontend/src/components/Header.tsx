import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import IStore from "../interfaces/IStore";
import Button from "./Button";
import Logo from "./Logo";
import Profile from "./Profile";

import treeList from "./../assets/svg/tree-list.svg";
import treeTree from "./../assets/svg/tree-tree.svg";

const HeaderDiv = styled.div`
	width: calc(100% - 2px);
	height: 30px;
	background-color: black;
	border: 1px solid #8a8a8a;
	display: flex;
`;

const LogoBoxDiv = styled.div`
	width: 124px;
	height: 30px;
	border-right: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const MenuBoxDiv = styled.div`
	width: calc(100% - 124px - 1px - 1px - 142px);
	border-right: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	justify-content: start;
	overflow: hidden;
`;

const ProfileBoxDiv = styled.div`
	width: 142px;
	height: 30px;
`;

const ButtonStyled = styled(Button)`
	margin-left: 11px;
`;

interface IHeaderProps {
	isAuth: boolean;
	pathname: string;
}

function Header(props: IHeaderProps) {
	const { pathname } = props;
	const dataset = "/dataset";
	const learning = "/learning";
	const testing = "/testing";
	const results = "/results";

	return (
		<HeaderDiv>
			<LogoBoxDiv>
				<Logo />
			</LogoBoxDiv>
			<MenuBoxDiv>
				{props.isAuth && (
					<>
						<ButtonStyled
							path={dataset}
							svgPath={treeList}
							selected={pathname === dataset}
						>
							Dataset
						</ButtonStyled>
						<ButtonStyled
							path={learning}
							svgPath={treeTree}
							selected={pathname === learning}
						>
							Learning
						</ButtonStyled>
						<ButtonStyled
							path={testing}
							selected={pathname === testing}
						>
							Testing
						</ButtonStyled>
						<ButtonStyled
							path={results}
							selected={pathname === results}
						>
							Results
						</ButtonStyled>
					</>
				)}
			</MenuBoxDiv>
			<ProfileBoxDiv>
				<Profile />
			</ProfileBoxDiv>
		</HeaderDiv>
	);
}

const mapStateToProps = (state: IStore): IHeaderProps => {
	const { user } = state;
	return {
		isAuth: user.isAuth,
		pathname: state.router.location.pathname,
	};
};

export default connect(mapStateToProps)(Header);
