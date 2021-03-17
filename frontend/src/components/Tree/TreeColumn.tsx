import styled from "styled-components";

const TreeColumnDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
`;

interface ITreeColumn {
	children?: React.ReactNode;
}

const TreeColumn = (props: ITreeColumn) => (
	<TreeColumnDiv>{props.children}</TreeColumnDiv>
);

export default TreeColumn;
