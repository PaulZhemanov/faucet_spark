import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import { observer } from "mobx-react";
import Text, {TEXT_TYPES, TEXT_TYPES_MAP} from "@components/Text";
import { DesktopRow, Row } from "@components/Flex";
import colors from "@components/colors";

interface IProps {}

const Root = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 26px;
	box-sizing: border-box;
	padding: 0 16px;
`;
const Chip = styled(Text)`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	height: 18px;
	border-radius: 4px;
	color: ${colors.textSecondary};
	background: ${colors.bgSecondary};
	padding: 0 4px;
	max-width: fit-content;
	box-sizing: border-box;
	${TEXT_TYPES_MAP[TEXT_TYPES.SUPPORTING]};
`;
const Indicator = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: ${({}) => (colors.greenLight)};
`;

const Divider = styled.div`
	width: 1px;
	height: 18px;
	background: ${colors.bgSecondary};
	margin: 0 8px;
`;

const StatusBar: React.FC<IProps> = observer(() => {
	return (
		<Root>
			<Row alignItems="center" mainAxisSize="fit-content">
				<Indicator />
				<SizedBox width={8} />
				<Text type={TEXT_TYPES.SUPPORTING}> Stable Connection</Text>
			</Row>
			<Divider />
			<Row alignItems="center" mainAxisSize="fit-content">
				<Indicator />
				<SizedBox width={8} />
				<Text type={TEXT_TYPES.SUPPORTING}> Response Time Name holder (xxxms)</Text>
			</Row>
			<DesktopRow>
				<Divider />
				<Text type={TEXT_TYPES.SUPPORTING}>XX,XXX TPS</Text>
				<Divider />
				<Text type={TEXT_TYPES.SUPPORTING}>Average Gas Prices:</Text>
				<SizedBox width={8} />
				<Chip>SPOT:&nbsp;X,XXXX€</Chip>
				<SizedBox width={8} />
				<Chip >PERP:&nbsp;X,XXXX€</Chip>
			</DesktopRow>
		</Root>
	);
});
export default StatusBar;
