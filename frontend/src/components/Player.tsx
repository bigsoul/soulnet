import styled from "styled-components";
import ButtonTree from "./ButtonTree";

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
			<ButtonTree svgPath={playerPlay} />
			<ButtonTree svgPath={playerStop} />
		</PlayerDiv>
	);
};

export default Player;
