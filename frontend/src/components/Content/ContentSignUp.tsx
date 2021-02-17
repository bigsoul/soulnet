import Content from "./../Content";
import styled from "styled-components";

const ContentBoxDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

class ContentSignUn extends Content {
	render = () => {
		return (
			<Content>
				<ContentBoxDiv>Sign Up</ContentBoxDiv>
			</Content>
		);
	};
}

export default ContentSignUn;
