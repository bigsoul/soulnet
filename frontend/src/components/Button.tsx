import React, { Component } from "react";
import styled from "styled-components";

const ButtonDiv = styled.div`
	padding-left: 5px;
	padding-right: 5px;
	height: 18px;
	background-color: #191919;
	border: 1px solid #ffffff;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
`;

class Button extends Component {
	render = (): JSX.Element | null => {
		return (
			<>
				<ButtonDiv>Sign In</ButtonDiv>
				<ButtonDiv>Sign Up</ButtonDiv>
			</>
		);
	};
}

export default Button;
