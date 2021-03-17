import styled from "styled-components";
import SvgIcon from "../SvgIcon";

const TreeHeaderDiv = styled.div`
	height: 29px;
	background-color: #3b3b51;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
	padding-left: 6px;
`;

const SvgIconStyled = styled(SvgIcon)`
	margin-top: -1px;
	margin-right: 5px;
`;

interface ITreeHeaderProps {
	children?: React.ReactNode;
	svgPath: string;
}

const TreeHeader = (props: ITreeHeaderProps) => {
	return (
		<TreeHeaderDiv>
			<SvgIconStyled path={props.svgPath} />
			{props.children}
		</TreeHeaderDiv>
	);
};

export default TreeHeader;
