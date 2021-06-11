import { Component } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import styled from "styled-components";

const FormStyled = styled.form``;

class Form extends Component<InjectedFormProps<{}, {}, string>> {
	render = () => {
		return <FormStyled>Hi</FormStyled>;
	};
}

const LearningForm = reduxForm({
	form: "learningForm",
})(Form);

export default LearningForm;
