import styled from "styled-components";

const TreeColumnDiv = styled.div`
	display: flex;
	align-items: center;
`;

interface ITreeColumn {
	children?: React.ReactNode;
}

const TreeColumn = (props: ITreeColumn) => (
	<TreeColumnDiv>_TREECOLUMN_</TreeColumnDiv>
);

export default TreeColumn;
