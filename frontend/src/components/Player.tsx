import { PureComponent } from "react";
import styled from "styled-components";
import Button from "./Button";

import EPlayerState from "../enums/EPlayerState";

import playerStart from "../assets/svg/player-start.svg";
import playerPlay from "../assets/svg/player-play.svg";
import playerPause from "../assets/svg/player-pause.svg";
import playerStop from "../assets/svg/player-stop.svg";

const PlayerDiv = styled.div`
	width: 45px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin-right: 10px;
`;

interface IPlayerProps {
	state: EPlayerState;
}

class Player extends PureComponent<Partial<IPlayerProps>, IPlayerProps> {
	constructor(props: Partial<IPlayerProps>) {
		super(props);
		this.state = {
			state: EPlayerState.Config,
		};
	}

	static getDerivedStateFromProps = (
		props: Partial<IPlayerProps>,
		state: IPlayerProps
	): IPlayerProps => {
		return {
			state: props.state ? props.state : state.state,
		};
	};

	hendlerButtonLeft = () => {
		const { state } = this.state;

		if (state === EPlayerState.Config || state === EPlayerState.Paused) {
			this.setState({ state: EPlayerState.Playing });
		} else if (state === EPlayerState.Playing) {
			this.setState({ state: EPlayerState.Paused });
		}
	};

	hendlerButtonRight = () => {
		this.setState({ state: EPlayerState.Config });
	};

	render = () => {
		const { state } = this.state;

		let buttonLeft = playerStart;
		let buttonStop = playerStop;

		if (state === EPlayerState.Playing) {
			buttonLeft = playerPause;
			buttonStop = playerStop;
		} else if (state === EPlayerState.Paused) {
			buttonLeft = playerPlay;
			buttonStop = playerStop;
		} else if (state === EPlayerState.Completed) {
			buttonLeft = playerStart;
			buttonStop = playerStop;
		}

		return (
			<PlayerDiv>
				<Button
					template="icon"
					svgPath={buttonLeft}
					onClick={this.hendlerButtonLeft}
				/>
				<Button
					template="icon"
					svgPath={buttonStop}
					onClick={this.hendlerButtonRight}
				/>
			</PlayerDiv>
		);
	};
}

export default Player;
