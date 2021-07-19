import { PureComponent } from "react";
import { connect } from "react-redux";
import { EmptyGuid } from "../..";
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
	isSaving: boolean;
	isSaved: boolean;
}

export interface IFormDispatch<T> {
	change: (field: keyof T, value: T[keyof T]) => void;
	load: () => void;
	save: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface IFormConfig {
	controller: string;
	loading?: boolean;
	loaded?: boolean;
	saving?: boolean;
	saved?: boolean;
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
		saving: config.saving,
		saved: config.saved,
	});

	const mapStateToProps = (state: IStore): IFormState<T> => {
		const { forms } = state;
		const form = forms[formKey] as FormReducer<T>;
		return {
			values: form.values,
			isLoading: form.isLoading,
			isLoaded: form.isLoaded,
			isSaving: form.isSaving,
			isSaved: form.isSaved,
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

		loadHendler = () => {
			doFormOnLoadEvent({
				formKey: formKey,
				filter: { id: this.props.entityId },
				controller: config.controller,
			});
		};

		saveHendler = (props: IFormState<T>) => {
			doFormOnSaveEvent({
				formKey: formKey,
				values: props.values,
				controller: config.controller,
			});
		};

		renderProp = (props: IFormState<T>) => {
			const { children: RenderProp } = this.props;
			const { isLoading, isLoaded } = props;
			const { isSaving, isSaved } = props;

			if (!this.props.entityId) return null;

			return (
				<RenderProp
					values={props.values}
					change={this.changeHendler}
					load={this.loadHendler}
					save={(e) => {
						e.preventDefault();
						this.saveHendler(props);
					}}
					isLoading={isLoading}
					isLoaded={isLoaded}
					isSaving={isSaving}
					isSaved={isSaved}
				/>
			);
		};

		render = () => {
			const Component = connector(this.renderProp);
			return <Component />;
		};

		componentDidMount = () => {
			const { entityId } = this.props;

			if (entityId && entityId !== EmptyGuid) {
				this.loadHendler();
			} else if (entityId === EmptyGuid) {
				doInitialize<typeof formKey, T>({
					formKey: formKey,
					values: initialValues,
				});
			}
		};

		componentDidUpdate = (prevProps: IFormProps<T>) => {
			const { entityId } = this.props;

			if (
				entityId &&
				entityId !== EmptyGuid &&
				prevProps.entityId !== entityId
			) {
				this.loadHendler();
			} else if (entityId === EmptyGuid) {
				doInitialize<typeof formKey, T>({
					formKey: formKey,
					values: initialValues,
				});
			}
		};
	};
};

export default formCreator;
