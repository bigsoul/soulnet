import styled from "styled-components";
import Button from "./Button";
import combobox from "./../assets/svg/combobox.svg";
import { IStore } from "../classes/store";
import ETreeList from "../enums/ETreeList";
import { connect } from "react-redux";
import { doTreeIsVisibleConvert } from "../classes/actions/ITreeAction";

const SelectContainer = styled.div<{ isVisible?: boolean; error?: string }>`
	height: 20px;
	border: 1px solid ${(p) => (p.error ? "#ff0000" : "#00f0ff")};
	background-color: #001819;
	color: #ffffff;
	box-sizing: border-box;
	display: flex;
	position: relative;
	&:hover {
		outline: 0;
		outline-offset: 0;
		${(p) => !p.isVisible && "border: 1px solid #ebff99"};
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

const ButtonStyled = styled(Button)<{ error?: string }>`
	width: 24px;
	height: 18px;
`;

export interface ISelectProps {
	children: JSX.Element;
	listKey: ETreeList;
	className?: string;
	placeholder?: string;
	autoComplete?: string;
	name?: string;
	value?: string | number;
	error?: string;
	type?: string;
	disabled?: boolean;
	path?: string;
	onChange: (value: string) => void;
}

export interface ISelectState {
	isVisible?: boolean;
}

const selectClickHandler = (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
	e.detail = 101;
};

const mapStateToProps = (
	state: IStore,
	ownProps: ISelectProps
): ISelectState => {
	const { tree } = state;
	const list = tree[ownProps.listKey];

	const props = {
		isVisible: list.isVisible,
	};

	return props;
};

const connector = connect(mapStateToProps);

const Select = (props: ISelectProps & ISelectState) => {
	const buttonClickHandler = () => {
		doTreeIsVisibleConvert({
			listKey: props.listKey,
		});
	};

	return (
		<div onClick={selectClickHandler}>
			<SelectContainer
				className={props.className}
				isVisible={props.isVisible}
				error={props.error}
			>
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
					clearFocus
					svgPath={combobox}
					path={props.path}
					onClick={buttonClickHandler}
				/>
			</SelectContainer>
			{props.isVisible && props.children}
		</div>
	);
};

export default connector(Select);
