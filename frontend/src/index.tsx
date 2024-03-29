import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";

import App from "./components/App";
import { Provider } from "react-redux";

import store from "./classes/store";
import { history } from "./classes/reducers/routerReducer";

export const EmptyGuid = "00000000-0000-0000-0000-000000000000";

/* <React.StrictMode> */

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

/* </React.StrictMode> */
