import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import { history } from "./../classes/reducers/routerReducer";
import SvgIcon from "./SvgIcon";

// basis

const ButtonBasis = styled.button<{ selected: boolean }>`
	height: 20px;
	font-size: 14px;
	outline: 0;
	outline-offset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		cursor: pointer;
	}
	&:focus {
		cursor: pointer;
	}
	&:focus:hover {
		cursor: pointer;
	}
	&:disabled {
		cursor: auto;
	}
`;

// default

const ButtonDefault = styled(ButtonBasis)`
	padding-left: 5px;
	padding-right: 5px;
	background-color: ${(p) => (p.selected ? "#e5e5e5" : "#191919")};
	border: 1px solid #ffffff;
	color: ${(p) => (p.selected ? "#000000" : "#ffffff")};
	&:hover {
		color: #ffffff;
		background-color: #666666;
	}
	&:focus {
		color: ${(p) => (p.selected ? "#000000" : "#ffffff")};
		background-color: ${(p) => (p.selected ? "#e5e5e5" : "#191919")};
	}
	&:active {
		color: #000000;
		background-color: #e5e5e5;
	}
	&:focus:hover {
		color: ${(p) => (p.selected ? "#000000" : "#ffffff")};
		background-color: ${(p) => (p.selected ? "#e5e5e5" : "#666666")};
	}
	&:active:focus:hover {
		color: #000000;
		background-color: #e5e5e5;
	}
	&:disabled {
		color: #606060;
		background-color: #1f1e1e;
		border: 1px solid #606060;
	}
`;

const SvgIconDefault = styled(SvgIcon)`
	margin-right: 5px;
`;

// icon

const ButtonIcon = styled(ButtonBasis)`
	width: 20px;
	background: rgba(0, 0, 0, 0);
	border: 0px;
	&:hover {
		color: ${(p) => (p.selected ? "#000000" : "#ffffff")};
		background-color: ${(p) => (p.selected ? "#e5e5e5" : "#666666")};
	}
`;

interface IButtonProps {
	className?: string;
	name?: ReactNode | string;
	path?: string;
	svgPath?: string;
	type?: "button" | "submit" | "reset" | undefined;
	template?: "default" | "icon" | undefined;
	selected?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}

class Button extends Component<IButtonProps> {
	to = () => {
		if (this.props.onClick) this.props.onClick();
		if (this.props.path) history.push(this.props.path);
	};

	render = () => {
		let TargetButton = ButtonDefault;
		let TargetSvgIcon:
			| typeof SvgIconDefault
			| typeof SvgIcon = SvgIconDefault;

		if (this.props.template === "icon") {
			TargetButton = ButtonIcon;
			TargetSvgIcon = SvgIcon;
		}

		return (
			<TargetButton
				className={this.props.className}
				type={this.props.type}
				onClick={this.to}
				selected={this.props.selected || false}
				disabled={this.props.disabled}
			>
				{this.props.svgPath && (
					<TargetSvgIcon path={this.props.svgPath} />
				)}
				{this.props.name ? this.props.name : this.props.children}
			</TargetButton>
		);
	};
}

export default Button;
