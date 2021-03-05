import { Component } from "react";
import { InjectedFormProps, WrappedFieldProps } from "redux-form";
import Edit from "./Edit";

class EditForm extends Component<InjectedFormProps & WrappedFieldProps> {
	render = () => {
		console.log(this.props);
		return (
			<Edit
				{...this.props}
				{...this.props.input}
				error={this.props.meta.error}
			/>
		);
	};
}

/*const EditForm = (props: any) => {
	console.log("edit: ", props.meta.touched);
	return <Edit {...props} {...props.input} error={props.meta.error} />;
};*/

export default EditForm;
