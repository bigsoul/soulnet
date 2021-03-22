import { LocationChangeAction, RouterState } from "connected-react-router";
import { FormStateMap } from "redux-form";
import ILearning from "./ILearning";
import IUser from "./IUser";

interface IStore {
	user: IUser;
	learning: { list: ILearning[]; runningOpen: boolean; storingOpen: boolean };
	router: RouterState<unknown> & LocationChangeAction<unknown>;
	form: FormStateMap;
}

export default IStore;
