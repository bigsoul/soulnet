import React, { Component } from "react";
import styled from "styled-components";

const Styled = styled.div`
	display: inline-block;
	font-size: 14px;

	> input {
		position: absolute;
		z-index: -1;
		opacity: 0;
		display: block;
		top: 2px;
		left: 2px;
	}
	> input + label {
		position: relative;
		padding-left: 25px;
		cursor: pointer;
		&:before {
			content: "";
			position: absolute;
			left: 3px;
			top: 0px;
			width: 13px;
			height: 13px;
			border: 1px solid #ffffff;
			background: #000000;
		}
		&:after {
			content: "✔";
			position: absolute;
			top: -2px;
			left: 5px;
			font-size: 14px;
			color: #09ad7e;
		}
	}
	> input:not(:checked) + label {
		&:after {
			opacity: 0;
		}
	}
	> input:disabled:not(:checked) + label {
		&:before {
			box-shadow: none;
			border-color: #ffffff;
			background-color: #000000;
		}
	}
	> input:checked + label {
		&:after {
			opacity: 1;
		}
	}
	> input:disabled:checked + label {
		&:after {
			color: #999;
		}
	}
	> input:disabled + label {
		color: #aaa;
	}
	> input:checked:focus + label,
	input:not(:checked):focus + label {
		&:before {
			border: 1px dotted #ffffff;
		}
	}
`;

interface ICheckboxProps {
	className?: string;
	id?: string;
	label?: string;
	checked: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
	onChange: (checked: boolean) => void;
}

const Checkbox = (props: ICheckboxProps) => (
	<Styled className={props.className}>
		<input {...props} onChange={(e) => props.onChange(!props.checked)} />
		<label htmlFor={props.id}>
			{props.label ? props.label : props.children}
		</label>
	</Styled>
);

export default Checkbox;
