import { Component } from "react";
import styled from "styled-components";

const EditInput = styled.input`
	width: 154px;
	height: 18px;
	border: 1px solid #00f0ff;
	background-color: #001819;
	color: #ffffff;
	font-size: 14px;
	padding-left: 5px;
	padding-right: 5px;
	padding-top: 0px;
	padding-bottom: 0px;
	text-align: center;
	&:hover {
		outline: 0;
		outline-offset: 0;
		border: 1px solid #ebff99;
	}
	&:focus {
		outline: 0;
		outline-offset: 0;
		border: 1px solid #00f0ff;
		background-color: #006066;
	}
`;

interface EditProps {
	className?: string;
	placeholder?: string;
	onChange: (value: string) => void;
}

class Edit extends Component<EditProps> {
	render = () => {
		return (
			<EditInput
				className={this.props.className}
				placeholder={this.props.placeholder}
				onChange={(e) => this.props.onChange(e.currentTarget.value)}
			/>
		);
	};
}

export default Edit;
