import { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IStore } from "../classes/store";

interface INotificationProps {
	heading?: string;
	message: string;
}

const MainDiv = styled.div`
	position: fixed;
	z-index: 2;
	width: 400px;
	height: 90px;
	background-color: #00660a;
	right: 24px;
	bottom: 22px;
`;

const mapStateToProps = (state: IStore): INotificationProps => {
	return {
		heading: state.notification.heading,
		message: state.notification.message,
	};
};

const connector = connect(mapStateToProps);

class Notification extends PureComponent<INotificationProps> {
	render = () => {
		const { heading, message } = this.props;

		if (!heading) return null;

		return <MainDiv>{message}</MainDiv>;
	};
}

export default connector(Notification);
