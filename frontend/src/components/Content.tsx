import React, { Component } from "react";
import styled from "styled-components";

const ContentDiv = styled.div`
	width: calc(100% - 2px);
	height: calc(100% - 33px);
	border-left: 1px solid #8a8a8a;
	border-bottom: 1px solid #8a8a8a;
	border-right: 1px solid #8a8a8a;
	font-size: 14px;
	display: flex;
`;

interface IContentProps {
	className?: string;
}

class Content<P = {}, S = {}, SS = {}> extends Component<
	P & IContentProps,
	S,
	SS
> {
	render = () => {
		return (
			<ContentDiv className={this.props.className}>
				{this.props.children}
			</ContentDiv>
		);
	};
}

export default Content;
