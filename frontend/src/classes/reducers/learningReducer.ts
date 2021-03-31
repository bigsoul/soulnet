import ILearning from "../../interfaces/ILearning";
import TLearningAction, * as ACT from "../actions/ILearningAction";

export class BranchDOMState {
	constructor(
		branchId: "running" | "storing",
		scrollTop?: number,
		clientHeight?: number,
		scrollHeight?: number
	) {
		this.branchId = branchId;
		this.scrollTop = scrollTop || 0;
		this.clientHeight = clientHeight || 0;
		this.scrollHeight = scrollHeight || 0;
	}

	public branchId: "running" | "storing";
	public scrollTop: number;
	public clientHeight: number;
	public scrollHeight: number;
}

export interface ILearningReducer {
	list: ILearning[];
	isInitialized: boolean;
	runningOpen: boolean;
	runningLoading: boolean;
	runningStartFrom: number;
	runningPageSize: number;
	runningWadTop: number;
	runningWadBottom: number;
	runningEmptiness: number;
	runningDOMState: BranchDOMState;
	storingOpen: boolean;
	storingLoading: boolean;
	storingStartFrom: number;
	storingPageSize: number;
	storingWadTop: number;
	storingWadBottom: number;
	storingEmptiness: number;
	storingDOMState: BranchDOMState;
}

const preloadedState: ILearningReducer = {
	list: [],
	isInitialized: false,
	runningOpen: true,
	runningLoading: false,
	runningStartFrom: 0,
	runningPageSize: 50,
	runningWadTop: 50,
	runningWadBottom: 50,
	runningEmptiness: 50,
	runningDOMState: new BranchDOMState("running", 50),
	storingOpen: true,
	storingLoading: false,
	storingStartFrom: 0,
	storingPageSize: 25,
	storingWadTop: 50,
	storingWadBottom: 50,
	storingEmptiness: 0,
	storingDOMState: new BranchDOMState("storing"),
};

const userReducer = (
	curState: ILearningReducer = preloadedState,
	action: TLearningAction
): ILearningReducer => {
	switch (action.type) {
		case ACT.LEARNING_BRANCH_OPEN_EVENT: {
			if (action.branch === "running")
				return { ...curState, runningOpen: !curState.runningOpen };
			if (action.branch === "storing")
				return { ...curState, storingOpen: !curState.storingOpen };
			return curState;
		}
		case ACT.LEARNING_SET_DOM_STATE: {
			const newState = { ...curState };

			for (let i = 0; i < action.branches.length; i++) {
				const item = action.branches[i];
				const newDOMState = new BranchDOMState(
					item.branchId,
					item.scrollTop,
					item.clientHeight,
					item.scrollHeight
				);
				if (item.branchId === "running") {
					newState.runningDOMState = newDOMState;
				}
				if (item.branchId === "storing") {
					newState.storingDOMState = newDOMState;
				}
			}

			return newState;
		}
		case ACT.LEARNING_SET_SECTION: {
			const newState = { ...curState };
			if (action.branch === "running") {
				newState.runningStartFrom = action.startFrom;
				newState.runningPageSize = action.pageSize;
			}
			if (action.branch === "storing") {
				newState.storingStartFrom = action.startFrom;
				newState.storingPageSize = action.pageSize;
			}
			return newState;
		}
		case ACT.LEARNING_BRANCH_LOADING: {
			if (action.branch === "running")
				return { ...curState, runningLoading: action.loading };
			if (action.branch === "storing")
				return { ...curState, storingLoading: action.loading };
			return curState;
		}
		case ACT.LEARNING_LOAD: {
			const newState = { ...curState };
			newState.list = [];
			for (let i = 0; i < action.learnings.length; i++) {
				newState.list.push(action.learnings[i]);
			}
			return newState;
		}
		case ACT.LEARNING_DID_MOUNT: {
			return { ...curState, isInitialized: true };
		}
		case ACT.LEARNING_WILL_UNMOUNT: {
			return { ...curState, isInitialized: false };
		}
		default:
			return curState;
	}
};

export default userReducer;
