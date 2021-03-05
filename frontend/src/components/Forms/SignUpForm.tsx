import React, { Component } from "react";
import styled from "styled-components";
import {
	Field,
	InjectedFormProps,
	reduxForm,
	WrappedFieldProps,
} from "redux-form";
import Logo from "./../Logo";
import Button from "../Button";
import { maxLength20 } from "../../classes/utils/validators";
import { required, email } from "redux-form-validators";
import Edit from "../Edit";
import Checkbox from "../Checkbox";

type FieldProps = InjectedFormProps<ISignUpFormProps> & WrappedFieldProps;

const EditField = (props: FieldProps) => <Edit {...props.input} {...props} />;

const CheckboxField = (props: FieldProps) => (
	<Checkbox
		{...props.input}
		{...props}
		checked={props.input.value ? true : false}
		onChange={props.input.onChange}
	/>
);

const SubmitField = (props: FieldProps) => (
	<Button
		type="submit"
		disabled={props.meta.invalid || props.meta.submitting}
	>
		Sign Up {props.error}
	</Button>
);

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const LogoStyled = styled(Logo)`
	margin-bottom: 15px;
`;

const EditStyled10 = styled(EditField)`
	margin-bottom: 10px;
`;

const EditStyled15 = styled(EditField)`
	margin-bottom: 15px;
`;

const CheckboxStyled = styled(CheckboxField)`
	margin-bottom: 15px;
`;

export interface ISignUpFormProps {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	rememberMe: boolean;
}

class SignUpForm extends Component<InjectedFormProps<ISignUpFormProps>> {
	render = () => {
		const { handleSubmit } = this.props;
		console.log(this.props);
		return (
			<Form onSubmit={handleSubmit}>
				<LogoStyled />
				<Field
					name="username"
					type="text"
					placeholder="username"
					component={EditStyled10}
					validate={[maxLength20]}
				/>
				<Field
					name="email"
					type="text"
					placeholder="e-mail"
					component={EditStyled10}
					validate={[required(), email()]}
				/>
				<Field
					name="password"
					type="password"
					placeholder="password"
					component={EditStyled10}
					validate={[maxLength20]}
				/>
				<Field
					name="confirmPassword"
					type="password"
					placeholder="confirm password"
					component={EditStyled15}
					validate={[maxLength20]}
				/>
				{/*<Field
					name="rememberMe"
					type="checkbox"
					checked={true}
					label={"Remember me"}
					component={CheckboxStyled}
				/>*/}
				<div>
					<label htmlFor="rememberMe">Has Email?</label>
					<div>
						<Field
							name="rememberMe"
							id="rememberMe"
							component="input"
							type="checkbox"
						/>
					</div>
				</div>
				<Field
					name="button"
					type="button"
					component={SubmitField}
					validate={[submitValidate]}
					{...this.props}
				/>
			</Form>
		);
	};
}

const submitValidate = (value: undefined, previousValue: ISignUpFormProps) =>
	previousValue.username &&
	previousValue.email &&
	previousValue.password &&
	previousValue.confirmPassword
		? undefined
		: "invalid form values";

export default reduxForm<ISignUpFormProps>({
	form: "signUp",
	initialValues: {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		rememberMe: false,
	},
})(SignUpForm);
