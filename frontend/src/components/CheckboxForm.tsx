import { Component } from "react";
import { InjectedFormProps, WrappedFieldProps } from "redux-form";
import Checkbox from "./Checkbox";

class CheckboxForm extends Component<InjectedFormProps & WrappedFieldProps> {
	render = () => {
		return (
			<Checkbox
				{...this.props.input}
				{...this.props}
				checked={this.props.input.value ? true : false}
				onChange={this.props.input.onChange}
			/>
		);
	};
}

export default CheckboxForm;
