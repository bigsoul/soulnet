import { Component } from "react";
import styled from "styled-components";

const CheckboxInput = styled.input``;

interface CheckboxProps {
	className?: string;
}

class Checkbox extends Component<CheckboxProps> {
	render = () => {
		return (
			<div>
				<CheckboxInput
					className={this.props.className}
					type={"checkbox"}
				/>
				Remember me
			</div>
		);
	};
}

export default Checkbox;
