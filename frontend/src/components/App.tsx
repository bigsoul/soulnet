import React from "react";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import Content from "./Content";
import ContentSignIn from "./Content/ContentSignIn";
import ContentSignUp from "./Content/ContentSignUp";
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
				<Route exact path="/" component={Content} />
				<Route exact path="/signin" component={ContentSignIn} />
				<Route exact path="/signup" component={ContentSignUp} />
				<Redirect to="/" />
			</Switch>
		</Root>
	);
}

export default App;
