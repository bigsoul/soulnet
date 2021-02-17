import { Component } from "react";
import styled from "styled-components";

const CheckboxInput = styled.input``;

class Checkbox extends Component {
	render = () => {
		return <CheckboxInput type={"checkbox"} />;
	};
}

export default Checkbox;
