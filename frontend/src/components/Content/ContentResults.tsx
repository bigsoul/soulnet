import React, { PureComponent } from "react";
import styled from "styled-components";

import Content from "../Content";
import Tree from "../Tree/Tree";
import Button from "../Button";
import TreeColumn from "../Tree/TreeColumn";
import TreeHeader from "../Tree/TreeHeader";
import TreeBranch from "../Tree/TreeBranch";
import Icon from "../Icon";

import entityLearning from "./../../assets/svg/entity-learning.svg";
import entityTesting from "./../../assets/svg/entity-testing.svg";
import entityDataset from "./../../assets/svg/entity-dataset.svg";
import treeRefresh from "./../../assets/svg/tree-refresh.svg";
import treeTree from "./../../assets/svg/tree-tree.svg";
import loading from "./../../assets/gif/loading.gif";

const ButtonStyled = styled(Button)`
	margin-right: 5px;
`;

const IconStyled = styled(Icon)`
	margin-right: 5px;
`;

const TreeColumnStyled = styled(TreeColumn)`
	padding-left: 5px;
	border-right: 1px solid #8a8a8a;
`;

const TreeColumnEnd = styled(TreeColumn)`
	padding-left: 5px;
`;

class ContentResults extends PureComponent {
	render = () => {
		const isLoading = true;

		return (
			<Content>
				<TreeHeader svgPath={treeTree}>
					<TreeColumn>Main result report</TreeColumn>
					<TreeColumn align="right">
						{isLoading && <IconStyled path={loading} />}
						<ButtonStyled template="icon" svgPath={treeRefresh} />
					</TreeColumn>
				</TreeHeader>
				<TreeBranch>
					<TreeColumnStyled>
						<IconStyled path={entityLearning} /> Learning
					</TreeColumnStyled>
					<TreeColumnStyled>
						<IconStyled path={entityTesting} /> Testing
					</TreeColumnStyled>
					<TreeColumnStyled>
						<IconStyled path={entityDataset} /> Dataset Learning
					</TreeColumnStyled>
					<TreeColumnStyled>
						<IconStyled path={entityDataset} /> Dataset Testing
					</TreeColumnStyled>
					<TreeColumnStyled>Start Deposit</TreeColumnStyled>
					<TreeColumnStyled>End Deposit</TreeColumnStyled>
					<TreeColumnEnd>Margin, %</TreeColumnEnd>
				</TreeBranch>
			</Content>
		);
	};
}

export default ContentResults;
