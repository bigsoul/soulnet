import styled from "styled-components";
import Button from "./Button";
import combobox from "./../assets/svg/combobox.svg";

const Div = styled.div<{ error?: string }>`
	height: 20px;
	border: 1px solid ${(p) => (p.error ? "#ff0000" : "#00f0ff")};
	background-color: #001819;
	color: #ffffff;
	box-sizing: border-box;
	display: flex;
	&:hover {
		outline: 0;
		outline-offset: 0;
		border: 1px solid #ebff99;
	}
	&:focus-within {
		outline: 0;
		outline-offset: 0;
		border: 1px solid ${(p) => (p.error ? "#ff0000" : "#00f0ff")};
		background-color: #006066;
	}
`;

const SelectInput = styled.input`
	width: 100%;
	height: 18px;
	border: none;
	background-color: #001819;
	color: #ffffff;
	font-size: 14px;
	padding-left: 5px;
	padding-right: 5px;
	padding-top: 0px;
	padding-bottom: 0px;
	text-align: inherit;
	&:hover {
		outline: 0;
		outline-offset: 0;
		border: none;
	}
	&:focus {
		outline: 0;
		outline-offset: 0;
		border: none;
		background-color: #006066;
	}
`;

export interface ISelect {
	className?: string;
	placeholder?: string;
	autoComplete?: string;
	name?: string;
	value?: string | number;
	error?: string;
	type?: string;
	disabled?: boolean;
	path?: string;
	onClick?: () => void;
	onChange: (value: string) => void;
}

const ButtonStyled = styled(Button)`
	width: 24px;
	height: 18px;
`;

const Select = (props: ISelect) => {
	return (
		<Div className={props.className} error={props.error}>
			<SelectInput
				placeholder={props.placeholder}
				autoComplete={props.autoComplete}
				name={props.name}
				value={props.value}
				type={props.type}
				disabled={props.disabled}
				onChange={(e) => props.onChange(e.currentTarget.value)}
			/>
			<ButtonStyled
				template={"icon"}
				svgPath={combobox}
				path={props.path}
				onClick={props.onClick}
			/>
		</Div>
	);
};

export default Select;
