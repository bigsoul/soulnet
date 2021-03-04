import { Component } from "react";
import { InjectedFormProps, WrappedFieldProps } from "redux-form";
import Edit from "./Edit";

class EditForm extends Component<InjectedFormProps & WrappedFieldProps> {
	render = () => {
		return (
			<Edit
				{...this.props}
				{...this.props.input}
				error={this.props.meta.error}
			/>
		);
	};
}

export default EditForm;
