import styled from "styled-components";

const EditInput = styled.input<{ error?: string }>`
	width: 154px;
	height: 18px;
	border: 1px solid ${(p) => (p.error ? "#ff0000" : "#00f0ff")};
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
		border: 1px solid ${(p) => (p.error ? "#ff0000" : "#00f0ff")};
		background-color: #006066;
	}
`;

interface IEditProps {
	className?: string;
	placeholder?: string;
	name?: string;
	value?: string;
	error?: string;
	type?: string;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const Edit = (props: IEditProps) => (
	<EditInput
		{...props}
		onChange={(e) => props.onChange(e.currentTarget.value)}
	/>
);

export default Edit;
