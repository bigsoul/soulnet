import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";

import App from "./components/App";
import { Provider } from "react-redux";

import configureStore from "./classes/store";
import { history } from "./classes/reducers/routerReducer";

const store = configureStore();

/* <React.StrictMode> */

console.log(process.env.REACT_APP_SERVICE_URL);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root")
);

/* </React.StrictMode> */
