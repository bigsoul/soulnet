import styled from "styled-components";

const TreeDiv = styled.div`
	width: 398px;
	height: 100%;
	border-right: 1px solid #8a8a8a;
	font-size: 14px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	scrollbar-width: none;
`;

interface ITreeProps {
	children: React.ReactNode;
}

const Tree = (props: ITreeProps) => <TreeDiv>{props.children}</TreeDiv>;

export default Tree;
