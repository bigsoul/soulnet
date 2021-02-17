import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import { history } from "./../classes/reducers/routerReducer";

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
	&:hover {
		background-color: #666666;
		cursor: pointer;
	}
`;

interface ButtonProps {
	name?: ReactNode | string;
	path: string;
}
class Button extends Component<ButtonProps> {
	to = () => {
		history.push(this.props.path);
	};

	render = () => {
		return <ButtonDiv onClick={this.to}>{this.props.name}</ButtonDiv>;
	};
}

export default Button;
