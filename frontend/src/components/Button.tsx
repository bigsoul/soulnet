import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import { history } from "./../classes/reducers/routerReducer";
import SvgIcon from "./SvgIcon";

const ButtonStyled = styled.button<{ selected: boolean }>`
	padding-left: 5px;
	padding-right: 5px;
	height: 20px;
	background-color: ${(p) => (p.selected ? "#e5e5e5" : "#191919")};
	border: 1px solid #ffffff;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	color: ${(p) => (p.selected ? "#000000" : "#ffffff")};
	outline: 0;
	outline-offset: 0;
	&:hover {
		color: #ffffff;
		background-color: #666666;
		cursor: pointer;
	}
	&:focus {
		color: ${(p) => (p.selected ? "#000000" : "#ffffff")};
		background-color: ${(p) => (p.selected ? "#e5e5e5" : "#191919")};
		cursor: pointer;
	}
	&:active {
		color: #000000;
		background-color: #e5e5e5;
	}
	&:focus:hover {
		color: ${(p) => (p.selected ? "#000000" : "#ffffff")};
		background-color: ${(p) => (p.selected ? "#e5e5e5" : "#666666")};
		cursor: pointer;
	}
	&:active:focus:hover {
		color: #000000;
		background-color: #e5e5e5;
	}
	&:disabled {
		color: #606060;
		background-color: #1f1e1e;
		border: 1px solid #606060;
		cursor: auto;
	}
`;

const SvgIconStyled = styled(SvgIcon)`
	margin-top: -1px;
	margin-right: 5px;
`;

interface IButtonProps {
	className?: string;
	name?: ReactNode | string;
	path?: string;
	type?: "button" | "submit" | "reset" | undefined;
	selected?: boolean;
	disabled?: boolean;
	svgPath?: string;
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
				className={this.props.className}
				type={this.props.type}
				onClick={this.to}
				selected={this.props.selected || false}
				disabled={this.props.disabled}
			>
				{this.props.svgPath && (
					<SvgIconStyled path={this.props.svgPath} />
				)}
				{this.props.name ? this.props.name : this.props.children}
			</ButtonStyled>
		);
	};
}

export default Button;
