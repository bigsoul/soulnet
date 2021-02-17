import React from "react";
import styled from "styled-components";
import ButtonSignIn from "./Button/ButtonSignIn";
import ButtonSignUp from "./Button/ButtonSignUp";

const PrfileDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

function Prfile() {
	return (
		<PrfileDiv>
			<ButtonSignIn path={"/signin"}>Sign In</ButtonSignIn>
			<ButtonSignUp path={"/signup"}>Sign Un</ButtonSignUp>
		</PrfileDiv>
	);
}

export default Prfile;
