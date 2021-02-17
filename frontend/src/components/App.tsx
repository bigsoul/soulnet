import React from "react";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import Header from "./Header";

const Root = styled.div`
	width: 100%;
	height: 100%;
	background-color: black;
	color: white;
`;

function App() {
	return (
		<Root>
			<Header />
			<Switch>
				<Route exact path="/" component={() => <>Home</>} />
				<Route exact path="/signin" component={() => <>LogIn</>} />
				<Route exact path="/signup" component={() => <>LogUp</>} />
				<Redirect to="/" />
			</Switch>
		</Root>
	);
}

export default App;
