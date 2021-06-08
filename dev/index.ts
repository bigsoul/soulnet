interface Prop {
	base: boolean
	isProp: boolean
}

interface Second {
	base: boolean
	isSecond: boolean
}

enum ETreeList {
	Prop = 'Prop',
	Second = 'Second',
}

type TreeListEntity = Prop | Second

const TREE_IS_LOADING = 'TREE/IS-LOADING'
const TREE_IS_VISIBLE = 'TREE/IS-VISIBLE'

interface ITreeIsLoadingAction<T> {
	type: typeof TREE_IS_LOADING
	listKey: ETreeList
	loading: boolean
	list: T[]
}

interface ITreeIsVisibleAction<T> {
	type: typeof TREE_IS_VISIBLE
	listKey: ETreeList
	visible: boolean
	list: T[]
}

type TTreeAction =
	| ITreeIsLoadingAction<TreeListEntity>
	| ITreeIsVisibleAction<TreeListEntity>

type Reducer<T> = {
	[key in ETreeList]: {
		list: T[]
		isLoading: boolean
		isVisible: boolean
	}
}

const treeReducer = (
	curState: Reducer<TreeListEntity>,
	action: TTreeAction
): Reducer<TreeListEntity> => {
	switch (action.type) {
		case TREE_IS_LOADING: {
			const newState = { ...curState }
			const list = newState[action.listKey]
			list.isLoading = action.loading
			list.list = action.list
			return newState
		}
		case TREE_IS_VISIBLE: {
			const newState = { ...curState }
			const list = newState[action.listKey]
			list.isVisible = action.visible
			list.list = action.list
			return newState
		}
		default:
			return curState
	}
}
