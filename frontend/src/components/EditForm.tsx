import { Component } from "react";
import { InjectedFormProps, WrappedFieldProps } from "redux-form";
import Edit from "./Edit";

// version 1

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

// version 2

/*const EditField = (
	props: InjectedFormProps<ISignInFormProps> & WrappedFieldProps
) => <Edit {...props} {...props.input} error={props.meta.error} />;*/

export default EditForm;
