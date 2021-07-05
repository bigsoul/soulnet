import React from "react";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import Content from "./Content";
import ContentDataset from "./Content/ContentDataset";
import ContentLearning from "./Content/ContentLearning";
import ContentResults from "./Content/ContentResults";
import ContentSignIn from "./Content/ContentSignIn";
import ContentSignUp from "./Content/ContentSignUp";
import ContentTesting from "./Content/ContentTesting";
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
				<Route exact path="/dataset" component={ContentDataset} />
				<Route exact path="/learning" component={ContentLearning} />
				<Route exact path="/testing" component={ContentTesting} />
				<Route exact path="/results" component={ContentResults} />
				<Redirect to="/" />
			</Switch>
		</Root>
	);
}

export default App;
