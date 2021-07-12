import styled from "styled-components";

const EditInput = styled.input<{ error?: string }>`
	height: 20px;
	border: 1px solid ${(p) => (p.error ? "#ff0000" : "#00f0ff")};
	background-color: #001819;
	color: #ffffff;
	font-size: 14px;
	padding-left: 5px;
	padding-right: 5px;
	padding-top: 0px;
	padding-bottom: 0px;
	text-align: inherit;
	box-sizing: border-box;
	&::-webkit-inner-spin-button {
		display: none;
	}
	-moz-appearance: textfield;
	&:hover {
		outline: 0;
		outline-offset: 0;
		border: 1px solid #ebff99;
	}
	&:focus {
		outline: 0;
		outline-offset: 0;
		border: 1px solid ${(p) => (p.error ? "#ff0000" : "#00f0ff")};
		background-color: #006066;
	}
`;

interface IEditProps {
	className?: string;
	placeholder?: string;
	autoComplete?: string;
	name?: string;
	value?: string | number;
	error?: string;
	type?: string;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const Edit = (props: IEditProps) => (
	<EditInput
		className={props.className}
		placeholder={props.placeholder}
		autoComplete={props.autoComplete}
		name={props.name}
		value={props.value}
		error={props.error}
		type={props.type}
		disabled={props.disabled}
		onChange={(e) => props.onChange(e.currentTarget.value)}
	/>
);

export default Edit;
