import React from "react";
import styled from "styled-components";

interface ISvgIconProps {
	className?: string;
	path: string;
}

const Svg = styled.div<ISvgIconProps>`
	width: 18px;
	height: 18px;
	content: url(${(p) => p.path});
`;

const SvgIcon = (props: ISvgIconProps) => {
	return <Svg className={props.className} path={props.path} />;
};

export default SvgIcon;
