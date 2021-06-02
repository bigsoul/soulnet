import styled from "styled-components";

const TreeColumnDiv = styled.div<{ align: string }>`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: ${(p) => p.align};
`;

interface ITreeColumnProp {
	children?: React.ReactNode;
	className?: string;
	align?: "left" | "center" | "right";
}

const TreeColumn = (props: ITreeColumnProp) => {
	let align = "flex-start";

	if (props.align === "center") {
		align = "center";
	} else if (props.align === "right") {
		align = "flex-end";
	}

	return (
		<TreeColumnDiv className={props.className} align={align}>
			{props.children}
		</TreeColumnDiv>
	);
};

export default TreeColumn;
