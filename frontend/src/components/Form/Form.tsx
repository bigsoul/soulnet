import { PureComponent } from "react";
import { connect } from "react-redux";
import { doInitialize, doChange } from "../../classes/actions/IFormAction";
import { IStore } from "../../classes/store";

export interface IFormProps<T> {
	render: (props: IFormState<T> & IFormDispatch<T>) => JSX.Element;
}

export interface IFormState<T> {
	values: T;
}

export interface IFormDispatch<T> {
	change: (field: keyof T, value: T[keyof T]) => void;
}

const formCreator = function <K extends string, T>(
	formKey: K,
	initialValues: T
) {
	doInitialize<K, T>({
		formKey: formKey,
		values: initialValues,
	});

	const mapStateToProps = (state: IStore): IFormState<T> => {
		const { forms } = state;
		const form = forms[formKey] as T;
		return { values: form };
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
			const { render: RenderProp } = this.props;

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
