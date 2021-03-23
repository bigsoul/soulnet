import React from "react";
import styled from "styled-components";

interface IIconProps {
	className?: string;
	path: string;
}

const IconStyled = styled.div<IIconProps>`
	width: 18px;
	height: 18px;
	content: url(${(p) => p.path});
`;

const Icon = (props: IIconProps) => {
	return <IconStyled className={props.className} path={props.path} />;
};

export default Icon;
