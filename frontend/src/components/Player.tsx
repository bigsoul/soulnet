import styled from "styled-components";
import Button from "./Button";

import playerPlay from "../assets/svg/player-play.svg";
import playerStop from "../assets/svg/player-stop.svg";

const PlayerDiv = styled.div`
	width: 45px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin-right: 10px;
`;

const Player = () => {
	return (
		<PlayerDiv>
			<Button template="icon" svgPath={playerPlay} />
			<Button template="icon" svgPath={playerStop} />
		</PlayerDiv>
	);
};

export default Player;
