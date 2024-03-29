import { PureComponent } from "react";
import { connect } from "react-redux";
import { EmptyGuid } from "../..";
import {
	doInitialize,
	doFormChange,
	doFormOnLoadEvent,
	doFormOnSaveEvent,
} from "../../classes/actions/IFormAction";
import { FormReducer, IFormConfig } from "../../classes/reducers/formReducer";
import { IStore } from "../../classes/store";
import { IDataItem } from "../Tree/TreeItem";

export interface IFormProps<T> {
	children: (props: IFormState<T> & IFormDispatch<T>) => JSX.Element;
	entityId?: string;
}

export interface IFormState<T> {
	config: IFormConfig<T>;
	values: T & IDataItem;
	errors: { [key in keyof T]?: string[] };
	isMutated: boolean;
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

const formCreator = function <K extends string, T>(
	formKey: K,
	initialValues: T,
	config: IFormConfig<T>
) {
	doInitialize<K, T>({
		formKey: formKey,
		values: initialValues,
		config: config,
	});

	const mapStateToProps = (state: IStore): IFormState<T> => {
		const { forms } = state;
		const form = forms[formKey] as FormReducer<T>;
		return {
			config: form.config,
			values: form.values,
			errors: form.errors,
			isMutated: form.isMutated,
			isLoading: form.isLoading,
			isLoaded: form.isLoaded,
			isSaving: form.isSaving,
			isSaved: form.isSaved,
		};
	};

	const connector = connect(mapStateToProps);

	return class Form extends PureComponent<IFormProps<T>> {
		isMutated = false;

		changeHendler = (field: keyof T, value: T[keyof T]) => {
			doFormChange<K, T>({
				formKey: formKey,
				field: field,
				value: value,
			});
		};

		loadHendler = () => {
			doFormOnLoadEvent({
				formKey: formKey,
				filter: { id: this.props.entityId },
			});
		};

		saveHendler = (props: IFormState<T>) => {
			doFormOnSaveEvent({
				formKey: formKey,
				values: props.values,
			});
		};

		renderProp = (props: IFormState<T>) => {
			const { children: RenderProp } = this.props;
			const { isMutated } = props;
			const { isLoading, isLoaded } = props;
			const { isSaving, isSaved } = props;

			this.isMutated = isMutated;

			if (!this.props.entityId) return null;

			return (
				<RenderProp
					config={props.config}
					values={props.values}
					errors={props.errors}
					change={this.changeHendler}
					load={this.loadHendler}
					save={(e) => {
						e.preventDefault();
						this.saveHendler(props);
					}}
					isMutated={isMutated}
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
				if (!this.isMutated) this.loadHendler();
			} else if (entityId === EmptyGuid) {
				doInitialize<typeof formKey, T>({
					formKey: formKey,
					values: initialValues,
					config: config,
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
					config: config,
				});
			}
		};
	};
};

export default formCreator;
