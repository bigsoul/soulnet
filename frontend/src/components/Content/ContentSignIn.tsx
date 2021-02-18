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

const LogoStyled = styled(Logo)`
	margin-bottom: 15px;
`;

const EditStyled10 = styled(Edit)`
	margin-bottom: 10px;
`;

const EditStyled15 = styled(Edit)`
	margin-bottom: 15px;
`;

const CheckboxStyled = styled(Checkbox)`
	margin-bottom: 15px;
`;

class ContentSignIn extends Content {
	render = () => {
		return (
			<Content>
				<ContentBoxDiv>
					<LogoStyled />
					<EditStyled10 placeholder="username" />
					<EditStyled15 placeholder="password" />
					<CheckboxStyled
						checked={true}
						onChange={() => {
							console.log("click");
						}}
						label={"Remember me"}
					/>
					<ButtonSignInSubmit path={"/"}>Sign In</ButtonSignInSubmit>
				</ContentBoxDiv>
			</Content>
		);
	};
}

export default ContentSignIn;
