import React from "react";
import styled from "styled-components";
import Button from "./Button";

const PrfileDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

function Prfile() {
	return (
		<PrfileDiv>
			<Button />
		</PrfileDiv>
	);
}

export default Prfile;
