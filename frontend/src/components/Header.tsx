import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IStore } from "../classes/store";
import Button from "./Button";
import Logo from "./Logo";
import Profile from "./Profile";

import entityDataset from "./../assets/svg/entity-dataset.svg";
import entityLearning from "./../assets/svg/entity-learning.svg";
import entityTesting from "./../assets/svg/entity-testing.svg";
import ETreeList from "../enums/ETreeList";

const HeaderDiv = styled.div`
	width: calc(100% - 2px);
	height: 30px;
	background-color: black;
	border: 1px solid #8a8a8a;
	display: flex;
`;

const LogoBoxDiv = styled.div`
	width: 124px;
	height: 30px;
	border-right: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const MenuBoxDiv = styled.div`
	width: calc(100% - 124px - 1px - 1px - 142px);
	border-right: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	justify-content: start;
	overflow: hidden;
`;

const ProfileBoxDiv = styled.div`
	width: 142px;
	height: 30px;
`;

const ButtonStyled = styled(Button)`
	margin-left: 11px;
`;

interface IHeaderProps {
	isAuth: boolean;
	pathname: string;
	learningId: string;
	testingId: string;
	datasetId: string;
}

function Header(props: IHeaderProps) {
	const { pathname } = props;
	const dataset = "/dataset";
	const learning = "/learning";
	const testing = "/testing";
	const results = "/results";

	return (
		<HeaderDiv>
			<LogoBoxDiv>
				<Logo />
			</LogoBoxDiv>
			<MenuBoxDiv>
				{props.isAuth && (
					<>
						<ButtonStyled
							path={`${dataset}${
								props.datasetId && "/" + props.datasetId
							}`}
							svgPath={entityDataset}
							selected={pathname.startsWith(dataset)}
						>
							Dataset
						</ButtonStyled>
						<ButtonStyled
							path={`${learning}${
								props.learningId && "/" + props.learningId
							}`}
							svgPath={entityLearning}
							selected={pathname.startsWith(learning)}
						>
							Learning
						</ButtonStyled>
						<ButtonStyled
							path={`${testing}${
								props.testingId && "/" + props.testingId
							}`}
							svgPath={entityTesting}
							selected={pathname.startsWith(testing)}
						>
							Testing
						</ButtonStyled>
						<ButtonStyled
							path={results}
							selected={pathname.startsWith(results)}
						>
							Results
						</ButtonStyled>
					</>
				)}
			</MenuBoxDiv>
			<ProfileBoxDiv>
				<Profile />
			</ProfileBoxDiv>
		</HeaderDiv>
	);
}

const mapStateToProps = (state: IStore): IHeaderProps => {
	const { user, tree } = state;

	// learning

	const lerningTreeRunning = tree[ETreeList.LearningRunning];
	const lerningTreeStoring = tree[ETreeList.LearningStoring];

	let learningId = "";

	if (lerningTreeRunning.currentRows.length) {
		learningId = lerningTreeRunning.currentRows[0];
	} else if (lerningTreeStoring.currentRows.length) {
		learningId = lerningTreeStoring.currentRows[0];
	}

	// testing

	const testingTreeRunning = tree[ETreeList.TestingRunning];
	const testingTreeStoring = tree[ETreeList.TestingStoring];

	let testingId = "";

	if (testingTreeRunning.currentRows.length) {
		testingId = testingTreeRunning.currentRows[0];
	} else if (testingTreeStoring.currentRows.length) {
		testingId = testingTreeStoring.currentRows[0];
	}

	// dataset

	const datasetTree = tree[ETreeList.Dataset];

	let datasetId = "";

	if (datasetTree.currentRows.length) {
		datasetId = datasetTree.currentRows[0];
	}

	return {
		isAuth: user.isAuth,
		pathname: state.router.location.pathname,
		learningId: learningId,
		testingId: testingId,
		datasetId: datasetId,
	};
};

export default connect(mapStateToProps)(Header);
