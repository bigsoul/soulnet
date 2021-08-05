import store from "../store";

export const GLOBAL_CLICK_EVENT = "GLOBAL/CLICK-EVENT";

export interface IGlobalClickEventAction {
	type: typeof GLOBAL_CLICK_EVENT;
	detail: number;
}

export type TGlobal = IGlobalClickEventAction;

export const doGlobalClickEvent = (
	payload: Omit<IGlobalClickEventAction, "type">
) => {
	store.dispatch<IGlobalClickEventAction>({
		type: GLOBAL_CLICK_EVENT,
		detail: payload.detail,
	});
};
