import { LocationChangeAction, RouterState } from "connected-react-router";
import { FormStateMap } from "redux-form";
import IUser from "./IUser";
import { ILearningReducer } from "../classes/reducers/learningReducer";

interface IStore {
	user: IUser;
	learning: ILearningReducer;
	router: RouterState<unknown> & LocationChangeAction<unknown>;
	form: FormStateMap;
}

export default IStore;
