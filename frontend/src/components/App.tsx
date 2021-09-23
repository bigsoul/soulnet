import React from "react";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import { doGlobalClickEvent } from "../classes/actions/IGlobalAction";
import Content from "./Content";
import ContentDataset from "./Content/ContentDataset";
import ContentLearning from "./Content/ContentLearning";
import ContentResults from "./Content/ContentResults";
import ContentSignIn from "./Content/ContentSignIn";
import ContentSignUp from "./Content/ContentSignUp";
import ContentTesting from "./Content/ContentTesting";
import Header from "./Header";
import Notification from "./Notification";

const Root = styled.div`
	width: 100%;
	height: 100%;
	background-color: black;
	color: white;
`;

const clickHendler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
	doGlobalClickEvent({ detail: e.detail });
};

function App() {
	return (
		<Root onClick={clickHendler}>
			<Header />
			<Switch>
				<Route exact path="/" component={Content} />
				<Route exact path="/signin" component={ContentSignIn} />
				<Route exact path="/signup" component={ContentSignUp} />
				<Route exact path="/dataset/:id?" component={ContentDataset} />
				<Route
					exact
					path="/learning/:id?"
					component={ContentLearning}
				/>
				<Route exact path="/testing/:id?" component={ContentTesting} />
				<Route exact path="/results" component={ContentResults} />
				<Redirect to="/" />
			</Switch>
			<Notification />
		</Root>
	);
}

export default App;
