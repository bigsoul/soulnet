import Button from "../Button";

class ButtonSignUp extends Button {
	render = () => {
		return (
			<Button
				name={this.props.name ? this.props.name : this.props.children}
				path={this.props.path}
			/>
		);
	};
}

export default ButtonSignUp;
