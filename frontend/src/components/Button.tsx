import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import { history } from "./../classes/reducers/routerReducer";

const ButtonStyled = styled.button`
	padding-left: 5px;
	padding-right: 5px;
	height: 18px;
	background-color: #191919;
	border: 1px solid #ffffff;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	color: #ffffff;
	&:hover {
		background-color: #666666;
		cursor: pointer;
	}
	&:focus {
		outline: 0;
		outline-offset: 0;
		background-color: #666666;
		cursor: pointer;
	}
	&:disabled {
		outline: 0;
		outline-offset: 0;
		color: #606060;
		background-color: #1f1e1e;
		border: 1px solid #606060;
		cursor: auto;
	}
`;

interface IButtonProps {
	name?: ReactNode | string;
	path?: string;
	type?: "button" | "submit" | "reset" | undefined;
	disabled?: boolean;
	onClick?: () => void;
}
class Button extends Component<IButtonProps> {
	to = () => {
		if (this.props.onClick) this.props.onClick();
		if (this.props.path) history.push(this.props.path);
	};

	render = () => {
		return (
			<ButtonStyled
				type={this.props.type}
				onClick={this.to}
				disabled={this.props.disabled}
			>
				{this.props.name ? this.props.name : this.props.children}
			</ButtonStyled>
		);
	};
}

export default Button;
