import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";

import App from "./components/App";
import { Provider } from "react-redux";

import store from "./classes/store";
import { history } from "./classes/reducers/routerReducer";

/* <React.StrictMode> */

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root")
);

/* </React.StrictMode> */
