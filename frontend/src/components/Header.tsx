import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Profile from "./Profile";

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
`;

const ProfileBoxDiv = styled.div`
	width: 142px;
	height: 30px;
`;

function Header() {
	return (
		<HeaderDiv>
			<LogoBoxDiv>
				<Logo />
			</LogoBoxDiv>
			<MenuBoxDiv></MenuBoxDiv>
			<ProfileBoxDiv>
				<Profile />
			</ProfileBoxDiv>
		</HeaderDiv>
	);
}

export default Header;
