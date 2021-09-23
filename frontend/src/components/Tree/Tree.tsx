import styled from "styled-components";

const TreeDiv = styled.div`
	min-width: 398px;
	height: 100%;
	border-right: 1px solid #8a8a8a;
	//overflow-y: hidden;
`;

interface ITreeProps {
	children: React.ReactNode;
}

const Tree = (props: ITreeProps) => <TreeDiv>{props.children}</TreeDiv>;

export default Tree;
