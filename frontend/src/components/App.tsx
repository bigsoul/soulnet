import React from "react";
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
		</Root>
	);
}

export default App;
