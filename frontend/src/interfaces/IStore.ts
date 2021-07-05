/*import { LocationChangeAction, RouterState } from "connected-react-router";
import { FormStateMap } from "redux-form";
import IUser from "./IUser";
import { TreeListEntity, TreeReducer } from "../classes/reducers/treeReducer";

interface IStore {
	user: IUser;
	tree: TreeReducer<K, T>;
	router: RouterState<unknown> & LocationChangeAction<unknown>;
	form: FormStateMap;
}*/

import store from "../classes/store";

type IStore = ReturnType<typeof store.getState>;

export default IStore;
