//#region Import Styles

import "./index.css";

//#endregion

//#region Import

import React from "react";
import ReactDOM from "react-dom";

//#endregion

//#region Import Components

import App from "./components/App";
import { Provider } from "react-redux";

//#endregion

//#region Import Clases

import store from "./classes/store";

//#endregion

/* <React.StrictMode> */

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

/* </React.StrictMode> */
