import TTreeAction, * as ACT from "../actions/ITreeAction";

export interface ITreeReducer {}

const preloadedState: ITreeReducer = {};

const treeReducer = (
	curState: ITreeReducer = preloadedState,
	action: TTreeAction
): ITreeReducer => {
	switch (action.type) {
		case ACT.TREE_ON_LOAD_UP: {
			return curState;
		}
		case ACT.TREE_ON_LOAD_DOWN: {
			return curState;
		}
		case ACT.TREE_ON_SCROLL: {
			return curState;
		}
		default:
			return curState;
	}
};

export default treeReducer;
