import { LocationChangeAction, RouterState } from "connected-react-router";
import { FormStateMap } from "redux-form";
import IUser from "./IUser";
import { ILearningReducer } from "../classes/reducers/learningReducer";
import { TreeListEntity, TreeReducer } from "../classes/reducers/treeReducer";

interface IStore {
	user: IUser;
	learning: ILearningReducer;
	tree: TreeReducer<TreeListEntity>;
	router: RouterState<unknown> & LocationChangeAction<unknown>;
	form: FormStateMap;
}

export default IStore;
