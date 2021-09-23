import { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IStore } from "../classes/store";
import Button from "./Button";

import treeCancel from "./../assets/svg/tree-cancel.svg";
import { doNotificatioClose } from "../classes/actions/INotificationAction";
import ENotificationStatus from "../enums/ENotificationStatus";

const MainDiv = styled.div<{ color: string }>`
	position: fixed;
	z-index: 2;
	width: 398px;
	height: 88px;
	background-color: ${(p) => p.color};
	right: 24px;
	bottom: 22px;
	//box-sizing: border-box;
	border: 1px solid #8a8a8a;
	overflow: hidden;
`;

const Heading = styled.div`
	width: 100%;
	height: 30px;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
`;

const Span = styled.span`
	margin: 2px;
`;

const Message = styled.div``;

const ButtonStyled = styled(Button)`
	margin-right: 5px;
	margin-left: auto;
`;

interface INotificationProps {
	timeStart: number;
	status: ENotificationStatus;
	heading: string;
	message: string;
}

const mapStateToProps = (state: IStore): INotificationProps => {
	return {
		timeStart: state.notification.timeStart,
		status: state.notification.status,
		heading: state.notification.heading,
		message: state.notification.message,
	};
};

const connector = connect(mapStateToProps);

class Notification extends PureComponent<INotificationProps> {
	success = "#00660a";
	error = "#971919";

	render = () => {
		const { status, heading, message, timeStart } = this.props;

		if (status === ENotificationStatus.none) return null;

		let color = "#000000";

		if (status === ENotificationStatus.success) color = this.success;
		else if (status === ENotificationStatus.error) color = this.error;

		return (
			<MainDiv color={color}>
				<Heading>
					<Span>{heading}</Span>
					<ButtonStyled
						template="icon"
						svgPath={treeCancel}
						onClick={() => {
							doNotificatioClose({
								timeStart: timeStart,
							});
						}}
					/>
				</Heading>
				<Message>
					<Span>{message}</Span>
				</Message>
			</MainDiv>
		);
	};
}

export default connector(Notification);
