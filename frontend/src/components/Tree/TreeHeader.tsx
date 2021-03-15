import styled from "styled-components";
import { ReactComponent as Svg } from "./../../assets/svg/tree-list.svg";

const TreeHeaderDiv = styled.div`
	height: 29px;
	background-color: #3b3b51;
	border-bottom: 1px solid #8a8a8a;
	display: flex;
	align-items: center;
`;

const SvgStyled = styled(Svg)`
	width: 18px;
	height: 18px;
	margin-top: -1px;
	margin-left: 6px;
	margin-right: 5px;
`;

const TreeHeader = () => (
	<TreeHeaderDiv>
		<SvgStyled />
		Dataset
	</TreeHeaderDiv>
);

export default TreeHeader;
