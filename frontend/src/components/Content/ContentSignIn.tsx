import Content from "./../Content";
import styled from "styled-components";
import Logo from "./../Logo";
import Edit from "./../Edit";
import Checkbox from "./../Checkbox";
import ButtonSignInSubmit from "../Button/ButtonSignInSubmit";

const ContentBoxDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

class ContentSignIn extends Content {
	render = () => {
		return (
			<Content>
				<ContentBoxDiv>
					<Logo />
					<Edit />
					<Edit />
					<Checkbox />
					<ButtonSignInSubmit path={"/"}>Submit</ButtonSignInSubmit>
				</ContentBoxDiv>
			</Content>
		);
	};
}

export default ContentSignIn;
