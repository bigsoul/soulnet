import { PureComponent } from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import {
	doInitialize,
	doChange,
	doFormOnLoadEvent,
	doFormOnSaveEvent,
} from "../../classes/actions/IFormAction";
import { FormReducer } from "../../classes/reducers/formReducer";
import { IStore } from "../../classes/store";
import { IDataItem } from "../Tree/TreeItem";

export interface IFormProps<T> {
	children: (props: IFormState<T> & IFormDispatch<T>) => JSX.Element;
	entityId?: string;
}

export interface IFormState<T> {
	values: T & IDataItem;
	isLoading: boolean;
	isLoaded: boolean;
}

export interface IFormDispatch<T> {
	change: (field: keyof T, value: T[keyof T]) => void;
	submit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface IFormConfig {
	controller: string;
	loading?: boolean;
	loaded?: boolean;
}

const formCreator = function <K extends string, T>(
	formKey: K,
	initialValues: T,
	config: IFormConfig
) {
	doInitialize<K, T>({
		formKey: formKey,
		values: initialValues,
		loading: config.loading,
		loaded: config.loaded,
	});

	const mapStateToProps = (state: IStore): IFormState<T> => {
		const { forms } = state;
		const form = forms[formKey] as FormReducer<T>;
		return {
			values: form.values,
			isLoading: form.isLoading,
			isLoaded: form.isLoaded,
		};
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

		submitHendler = (props: IFormState<T>) => {
			doFormOnSaveEvent({
				formKey: formKey,
				values: props.values,
				controller: config.controller,
			});
		};

		renderProp = (props: IFormState<T>) => {
			const { children: RenderProp } = this.props;
			const { isLoading, isLoaded } = props;

			return (
				<RenderProp
					values={props.values}
					change={this.changeHendler}
					submit={(e) => {
						e.preventDefault();
						this.submitHendler(props);
					}}
					isLoading={isLoading}
					isLoaded={isLoaded}
				/>
			);
		};

		render = () => {
			const Component = connector(this.renderProp);
			return <Component />;
		};

		componentDidMount = () => {
			doFormOnLoadEvent({
				formKey: formKey,
				filter: { id: this.props.entityId },
				controller: config.controller,
			});
		};

		componentDidUpdate = (prevProps: IFormProps<T>) => {
			if (prevProps.entityId !== this.props.entityId)
				doFormOnLoadEvent({
					formKey: formKey,
					filter: { id: this.props.entityId },
					controller: config.controller,
				});
		};
	};
};

export default formCreator;
