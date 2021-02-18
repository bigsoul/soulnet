import React, { Component } from "react";
import styled from "styled-components";
import { history } from "./../classes/reducers/routerReducer";

const LogoDiv = styled.div`
	font-size: 24px;
	&:hover {
		cursor: pointer;
	}
`;

interface LogoProps {
	className?: string;
}

class Logo extends Component<LogoProps> {
	to = () => {
		history.push("/");
	};

	render = () => {
		return (
			<LogoDiv className={this.props.className} onClick={this.to}>
				SOULNET
			</LogoDiv>
		);
	};
}

export default Logo;
