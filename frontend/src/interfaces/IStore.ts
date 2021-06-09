import { LocationChangeAction, RouterState } from "connected-react-router";
import { FormStateMap } from "redux-form";
import IUser from "./IUser";
import { TreeListEntity, TreeReducer } from "../classes/reducers/treeReducer";

interface IStore {
	user: IUser;
	tree: TreeReducer<TreeListEntity>;
	router: RouterState<unknown> & LocationChangeAction<unknown>;
	form: FormStateMap;
}

export default IStore;
