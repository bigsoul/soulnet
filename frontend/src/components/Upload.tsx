import { PureComponent } from "react";
import styled from "styled-components";

const Input = styled.input`
	opacity: 0;
	visibility: hidden;
	position: absolute;
`;

const Label = styled.label<{ selected: boolean }>`
	height: 18px;
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

const LabelDefault = styled(Label)`
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

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LabelName = styled.label`
	margin-left: 5px;
`;

class Upload extends PureComponent {
	render = () => {
		return (
			<Wrapper>
				<Input type="file" id="input__file" />
				<LabelDefault htmlFor="input__file" selected={false}>
					Select file
				</LabelDefault>
				<LabelName>file-name.csv - 100%</LabelName>
			</Wrapper>
		);
	};
}

export default Upload;
