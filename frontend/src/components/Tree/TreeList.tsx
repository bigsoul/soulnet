import {
	createElement,
	ReactNode,
	FunctionComponent,
	createRef,
	PureComponent,
	FunctionComponentElement,
} from "react";
import styled from "styled-components";
import { DataItem } from "./TreeItem";
import { ITreeItemProps } from "./TreeItem";

const ListBox = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	//border: 1px solid white;
	box-sizing: border-box;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	scrollbar-width: none;
`;

/*const PreLoader = styled.div<{ top: number; height: number }>`
	position: absolute;
	top: ${p => p.top}px;
	left: 0px;
	height: ${p => p.height}px;
	width: 100%;
	background: rgba(166, 89, 160, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: none;
`*/

type MutationState<K, T, F> = {
	listKey: K;
	filter: F;
	dataOffset: number;
	dataLimit: number;
	dataListHeight: number;
	dataListLength: number;
	listBoxHeight: number;
	scrollOffset: number;
	scrollStep: number;
	listBoxRef: React.RefObject<HTMLDivElement>;
	items: FunctionComponentElement<ITreeItemProps<T>>[];
	eventTimers: EventTimers;
};

type EventTimers = {
	onLoadUpTimer: EventTimer;
	onLoadDownTimer: EventTimer;
};

type EventTimer = {
	lockTime: number;
	leftToWaitMs: number;
	leftToWaitTry: number;
};

const calculateNewDataOffset = (
	dataOffset: number,
	dataLimit: number,
	isUpward: boolean
) => {
	const percent = 60;
	const offset = dataLimit * (percent / 100);

	if (isUpward && dataOffset - offset < 0) return 0;
	if (isUpward) return dataOffset - offset;
	if (!isUpward) return dataOffset + offset;

	return 0;
};

const treeListCreator = function <K, T, F>() {
	type TreeListProps = {
		children: FunctionComponent<ITreeItemProps<T>>;
		listKey: K;
		filter: F;
		dataList: DataItem<T>[];
		dataOffset: number;
		dataLimit: number;
		dataItemHeight: number;
		scrollOffset: number;
		preLoaderUpMaxHeight: number;
		preLoaderDownMaxHeight: number;
		onLoadUp?: OnLoad;
		onLoadDown?: OnLoad;
		onScroll?: OnScroll;
	};

	type TreeListState = {
		dataListHeight: number;
		preLoaderUpTop: number;
		preLoaderDownTop: number;
		preLoaderUpHeight: number;
		preLoaderDownHeight: number;
		mutationState: MutationState<K, T, F>;
	};

	type OnLoad = (
		listKey: K,
		dataOffset: number,
		dataLimit: number,
		filter: F
	) => void;

	type OnScroll = (listKey: K, scrollOffset: number) => void;

	const eventIsLocked = (
		eventKey: keyof EventTimers,
		mutationState: MutationState<K, T, F>
	) => {
		const timer = mutationState.eventTimers[eventKey];
		const time = Date.now();

		let isLocked = false;

		if (timer.lockTime + timer.leftToWaitMs >= time) {
			timer.leftToWaitMs -= timer.lockTime - time;
			if (timer.leftToWaitMs < 0) timer.leftToWaitMs = 0;
			isLocked = true;
		}

		if (timer.leftToWaitTry > 0) {
			timer.leftToWaitTry -= 1;
			isLocked = true;
		}

		return isLocked;
	};

	const eventLock = (
		eventKey: keyof EventTimers,
		mutationState: MutationState<K, T, F>
	) => {
		const timer = mutationState.eventTimers[eventKey];
		const time = Date.now();

		timer.lockTime = time;
		timer.leftToWaitMs = 250;
		timer.leftToWaitTry = 15;
	};

	const eventClearLock = (mutationState: MutationState<K, T, F>) => {
		let key: keyof EventTimers;

		for (key in mutationState.eventTimers) {
			const timer = mutationState.eventTimers[key];
			timer.lockTime = 0;
			timer.leftToWaitMs = 0;
			timer.leftToWaitTry = 0;
		}
	};

	const onLoadUpDoNotRush = (
		onLoadUp: OnLoad,
		dataOffset: number,
		dataLimit: number,
		mutationState: MutationState<K, T, F>
	) => {
		if (eventIsLocked("onLoadUpTimer", mutationState)) {
			return;
		}
		eventLock("onLoadUpTimer", mutationState);
		onLoadUp(
			mutationState.listKey,
			dataOffset,
			dataLimit,
			mutationState.filter
		);
	};

	const onLoadDownDoNotRush = (
		onLoadDown: OnLoad,
		dataOffset: number,
		dataLimit: number,
		mutationState: MutationState<K, T, F>
	) => {
		if (eventIsLocked("onLoadDownTimer", mutationState)) {
			return;
		}
		eventLock("onLoadDownTimer", mutationState);
		onLoadDown(
			mutationState.listKey,
			dataOffset,
			dataLimit,
			mutationState.filter
		);
	};
	return class TreeList extends PureComponent<TreeListProps, TreeListState> {
		resizeObserver: ResizeObserver;

		constructor(props: TreeListProps) {
			super(props);

			const eventTimer: EventTimer = {
				lockTime: 0,
				leftToWaitMs: 0,
				leftToWaitTry: 0,
			};

			this.state = {
				dataListHeight: 0,
				preLoaderUpTop: 0,
				preLoaderDownTop: 0,
				preLoaderUpHeight: 0,
				preLoaderDownHeight: 0,
				mutationState: {
					listKey: props.listKey,
					filter: props.filter,
					dataOffset: props.dataOffset,
					dataLimit: props.dataLimit,
					dataListHeight:
						props.dataItemHeight * props.dataList.length,
					dataListLength: props.dataList.length,
					listBoxHeight: 0,
					scrollOffset: props.scrollOffset,
					scrollStep: 0,
					listBoxRef: createRef<HTMLDivElement>(),
					items: [],
					eventTimers: {
						onLoadUpTimer: { ...eventTimer },
						onLoadDownTimer: { ...eventTimer },
					},
				},
			};

			const { mutationState } = this.state;

			this.resizeObserver = new ResizeObserver(
				(entries: ResizeObserverEntry[]) => {
					mutationState.listBoxHeight = Math.round(
						entries[0].contentRect.height
					);
					this.setState({});
				}
			);
		}

		static getDerivedStateFromProps = (
			props: TreeListProps,
			state: TreeListState
		): TreeListState => {
			//console.debug('TreeList - getDerivedStateFromProps')

			const { mutationState } = state;

			// basic properties of the calculation algorithm

			const dataListHeight = props.dataItemHeight * props.dataList.length;

			// pre-loaders height of the calculation algorithm

			let preLoaderUpHeight = 0;
			let preLoaderDownHeight = 0;

			if (dataListHeight > mutationState.listBoxHeight) {
				const availableHeights =
					dataListHeight - mutationState.listBoxHeight;

				const halfHeight = Math.floor(availableHeights / 2);

				preLoaderUpHeight =
					halfHeight > props.preLoaderUpMaxHeight
						? props.preLoaderUpMaxHeight
						: halfHeight;

				preLoaderDownHeight =
					halfHeight > props.preLoaderDownMaxHeight
						? props.preLoaderDownMaxHeight
						: halfHeight;
			}

			// pre-loaders position of the calculation algorithm

			const preLoaderUpTop = 0;
			const preLoaderDownTop = dataListHeight - preLoaderDownHeight;

			const scrollStart = 0;
			const scrollEnd = dataListHeight - mutationState.listBoxHeight;

			// calculation offset of data list position

			const diffAbsDataOffset = Math.abs(
				props.dataOffset - mutationState.dataOffset
			);

			let scrollTop = scrollStart;

			if (diffAbsDataOffset > props.dataList.length) {
				mutationState.dataOffset = props.dataOffset;
				mutationState.scrollOffset = scrollStart;
			}

			if (!props.dataList.length) {
				mutationState.dataListLength = 0;
				mutationState.scrollOffset = scrollStart;
			}

			if (dataListHeight < mutationState.listBoxHeight) {
				mutationState.scrollOffset = scrollStart;
			}

			// calculation offset of new scroll-top position

			const itemsOffset = props.dataOffset - mutationState.dataOffset;

			scrollTop = mutationState.scrollOffset;
			scrollTop += mutationState.scrollStep * props.dataItemHeight;
			scrollTop -= itemsOffset * props.dataItemHeight;

			if (scrollTop < 0) {
				scrollTop = scrollStart;
			}

			if (scrollTop >= scrollEnd) {
				scrollTop = scrollEnd;
				if (scrollTop < 0) scrollTop = scrollStart;
			}

			if (scrollTop > preLoaderUpTop && scrollTop < scrollEnd) {
				const residual = scrollTop % props.dataItemHeight;
				if (residual)
					scrollTop = scrollTop - residual + props.dataItemHeight;
			}

			// calculation of the event observer

			if (
				dataListHeight === state.dataListHeight &&
				props.dataOffset === mutationState.dataOffset
			) {
				if (
					scrollTop >= preLoaderUpTop &&
					scrollTop < preLoaderUpHeight
				) {
					if (mutationState.scrollOffset - scrollTop > 0) {
						if (props.onLoadUp) {
							const newDataOffset = calculateNewDataOffset(
								props.dataOffset,
								props.dataLimit,
								true
							);
							onLoadUpDoNotRush(
								props.onLoadUp,
								newDataOffset,
								props.dataLimit,
								mutationState
							);
						}
					}
				}

				if (
					scrollTop + mutationState.listBoxHeight >
						preLoaderDownTop &&
					scrollTop + mutationState.listBoxHeight <=
						preLoaderDownTop + preLoaderDownHeight
				)
					if (mutationState.scrollOffset - scrollTop < 0) {
						if (props.onLoadDown) {
							const newDataOffset = calculateNewDataOffset(
								props.dataOffset,
								props.dataLimit,
								false
							);
							onLoadDownDoNotRush(
								props.onLoadDown,
								newDataOffset,
								props.dataLimit,
								mutationState
							);
						}
					}
			}

			// applay to DOM

			if (mutationState.listBoxRef.current)
				mutationState.listBoxRef.current.scrollTop = scrollTop;

			// fix the state

			mutationState.listKey = props.listKey;
			mutationState.filter = props.filter;
			mutationState.dataOffset = props.dataOffset;
			mutationState.dataLimit = props.dataLimit;
			mutationState.dataListHeight = dataListHeight;
			mutationState.dataListLength = props.dataList.length;
			mutationState.scrollOffset = scrollTop;
			mutationState.scrollStep = 0;

			/*if (mutationState.listBoxRef.current)
			console.debug(
				'debug: ' +
					mutationState.listBoxRef.current.scrollTop +
					'/' +
					mutationState.scrollOffset
			)*/

			return {
				dataListHeight: dataListHeight,
				preLoaderUpTop: preLoaderUpTop,
				preLoaderDownTop: preLoaderDownTop,
				preLoaderUpHeight: preLoaderUpHeight,
				preLoaderDownHeight: preLoaderDownHeight,
				mutationState: mutationState,
			};
		};

		handlerOnScroll = (scrollTop: number) => {
			//console.debug("TreeList - handlerOnScrollStop");

			const { mutationState } = this.state;

			let scroll = mutationState.scrollOffset - scrollTop;

			if (scroll === 0) return;

			mutationState.scrollStep += scroll > 0 ? -1 : 1;

			this.setState({});
		};

		handlerOnWheel = (deltaY: number) => {
			//console.debug('TreeList - handlerOnWheel: ', deltaY)

			const { mutationState } = this.state;

			const { props, state } = this;

			if (
				mutationState.scrollOffset === 0 &&
				deltaY < 0 &&
				props.onLoadUp
			) {
				const newDataOffset = calculateNewDataOffset(
					props.dataOffset,
					props.dataLimit,
					true
				);
				onLoadUpDoNotRush(
					props.onLoadUp,
					newDataOffset,
					props.dataLimit,
					mutationState
				);
			}

			if (
				mutationState.scrollOffset >=
					state.dataListHeight - mutationState.listBoxHeight &&
				deltaY > 0 &&
				props.onLoadDown
			) {
				const newDataOffset = calculateNewDataOffset(
					props.dataOffset,
					props.dataLimit,
					false
				);
				onLoadDownDoNotRush(
					props.onLoadDown,
					newDataOffset,
					props.dataLimit,
					mutationState
				);
			}
		};

		render = () => {
			//console.debug('TreeList - render')

			const { props } = this;
			const { mutationState } = this.state;

			const newItems: FunctionComponentElement<ITreeItemProps<T>>[] = [];
			const items: ReactNode[] = [];

			for (let i = 0; i < props.dataList.length; i++) {
				const dataItem = props.dataList[i];

				let element = mutationState.items.find(
					(item) => item.key === dataItem.id
				);

				if (!element) {
					element = createElement<ITreeItemProps<T>>(props.children, {
						key: dataItem.id,
						index: i,
						dataItem: dataItem,
					});
				}
				items.push(element);
				newItems.push(element);
			}

			mutationState.items = newItems;

			/*const { state } = this

		items.push(
			<PreLoader
				id='pre-loader-up'
				key='pre-loader-up'
				height={state.preLoaderUpHeight}
				top={state.preLoaderUpTop}
			/>
		)
		items.push(
			<PreLoader
				id='pre-loader-down'
				key='pre-loader-down'
				height={state.preLoaderDownHeight}
				top={state.preLoaderDownTop}
			/>
		)*/

			return (
				<ListBox
					onScroll={(e) =>
						this.handlerOnScroll(e.currentTarget.scrollTop)
					}
					onWheel={(e) => this.handlerOnWheel(e.deltaY)}
					ref={mutationState.listBoxRef}
					id="tree-list"
				>
					{items}
				</ListBox>
			);
		};

		componentDidUpdate = () => {
			const { props } = this;
			const { mutationState } = this.state;

			const dataListHeight = props.dataItemHeight * props.dataList.length;
			const diffHeight = dataListHeight - mutationState.dataListHeight;

			if (!diffHeight) mutationState.scrollOffset += diffHeight;

			if (mutationState.listBoxRef.current)
				mutationState.listBoxRef.current.scrollTop =
					mutationState.scrollOffset;

			eventClearLock(mutationState);
		};

		componentDidMount = () => {
			const { mutationState } = this.state;

			if (mutationState.listBoxRef.current) {
				mutationState.listBoxHeight = Math.round(
					mutationState.listBoxRef.current.clientHeight
				);

				mutationState.listBoxRef.current.scrollTop =
					mutationState.scrollOffset;

				this.resizeObserver.observe(mutationState.listBoxRef.current);
				this.setState({});
			}
		};

		componentWillUnmount = () => {
			const { mutationState } = this.state;

			if (mutationState.listBoxRef.current)
				this.resizeObserver.unobserve(mutationState.listBoxRef.current);

			if (this.props.onScroll)
				this.props.onScroll(
					mutationState.listKey,
					mutationState.scrollOffset
				);
		};
	};
};

export default treeListCreator;
