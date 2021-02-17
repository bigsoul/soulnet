import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

const baseUrl = document
	.getElementsByTagName("base")[0]
	.getAttribute("href") as string;

const browserHistory = createBrowserHistory({ basename: baseUrl });
const routerReducer = connectRouter(browserHistory);

export const history = browserHistory;
export default routerReducer;
