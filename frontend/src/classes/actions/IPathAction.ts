export const PATH_TO_SIGNIN = "PATH/TO_SIGNIN";

export interface IPathToSignInAction {
	type: typeof PATH_TO_SIGNIN;
	path: string;
}

export type TPathAction = IPathToSignInAction;

export default TPathAction;
