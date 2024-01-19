import styled from "@emotion/styled";
import Text, { TEXT_TYPES, TEXT_TYPES_MAP } from "@components/Text";
import colors from "@components/colors";

const Chip = styled(Text)`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	height: 18px;
	border-radius: 4px;
	color: ${({ theme }) => colors.textSecondary};
	background: ${({ theme }) => colors.bgSecondary};
	padding: 0 4px;
	max-width: fit-content;
	box-sizing: border-box;
	${TEXT_TYPES_MAP[TEXT_TYPES.SUPPORTING]};
`;

export default Chip;
