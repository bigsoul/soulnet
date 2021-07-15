import { PureComponent } from "react";
import { connect } from "react-redux";
import { doInitialize, doChange } from "../../classes/actions/IFormAction";
import { FormReducer } from "../../classes/reducers/formReducer";
import { IStore } from "../../classes/store";

export interface IFormProps<T> {
	children: (props: IFormState<T> & IFormDispatch<T>) => JSX.Element;
}

export interface IFormState<T> {
	values: T;
}

export interface IFormDispatch<T> {
	change: (field: keyof T, value: T[keyof T]) => void;
}

export interface IFormConfig {
	controller: string;
}

const formCreator = function <K extends string, T>(
	formKey: K,
	initialValues: T,
	config: IFormConfig
) {
	doInitialize<K, T>({
		formKey: formKey,
		values: initialValues,
	});

	const mapStateToProps = (state: IStore): IFormState<T> => {
		const { forms } = state;
		const form = forms[formKey] as FormReducer<T>;
		return { values: form.values };
	};

	const connector = connect(mapStateToProps);

	return class Form extends PureComponent<IFormProps<T>> {
		changeHendler = (field: keyof T, value: T[keyof T]) => {
			doChange<K, T>({
				formKey: formKey,
				field: field,
				value: value,
			});
		};

		renderProp = (props: IFormState<T>) => {
			const { children: RenderProp } = this.props;

			return (
				<RenderProp values={props.values} change={this.changeHendler} />
			);
		};

		render = () => {
			const Component = connector(this.renderProp);
			return <Component />;
		};
	};
};

export default formCreator;
