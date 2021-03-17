import Button from "./Button";

class ButtonTree extends Button {
	render = () => {
		return <Button {...this.props} styleType="buttonTree" />;
	};
}

export default ButtonTree;
