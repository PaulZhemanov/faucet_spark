import React from "react";
import { useStores } from "@stores/useStores";
import { Column, Row } from "@components/Flex";
import Text, { TEXT_TYPES, TEXT_TYPES_MAP } from "@components/Text";
import Button from "@components/Button";
import { FAUCET_URL, TOKENS_BY_SYMBOL } from "@src/constants";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Chip from "@components/Chip";
import colors from "@components/colors";
import { useFaucetVM } from "@components/FaucetVm";

interface IProps {
}

const Root = styled.div`
    background: ${colors.bgSecondary};
    display: flex;
    width: 100%;
    flex-direction: column;
    box-sizing: border-box;
    border: 1px solid ${colors.bgSecondary};
    border-radius: 10px;
    max-width: 100%;
`;
export const TableTitle = styled(Text)`
    flex: 1;
    white-space: nowrap;
    ${TEXT_TYPES_MAP[TEXT_TYPES.SUPPORTING]}
`;

export const TableText = styled(Text)`
    flex: 1;
    display: flex;
    align-items: center;
`;

export const TableRow = styled(Row)`
    margin-bottom: 1px;
    height: 32px;
    flex-shrink: 0;
    background: ${colors.bgPrimary};
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
`;

export const TableBody = styled(Column)`
    //overflow: scroll;
    width: 100%;
    box-sizing: border-box;
`;
const StyledTableRow = styled(TableRow)`
    height: 48px;
`;

const TokensFaucetTable: React.FC<IProps> = observer(() => {
	const { accountStore } = useStores();
	const vm = useFaucetVM();
	const navigate = useNavigate();
	const ethBalance = accountStore.getBalance(TOKENS_BY_SYMBOL.ETH);
	return (
		<Root>
			<StyledTableRow>
				<TableTitle>Asset</TableTitle>
				<TableTitle>Mint amount</TableTitle>
				<TableTitle>My balance</TableTitle>
				<TableTitle>
					<Row justifyContent="flex-end">{/*<Button style={{ width: 120 }}>Mint all</Button>*/}</Row>
				</TableTitle>
			</StyledTableRow>
			<TableBody>
				{vm.faucetTokens.map((token) => (
					<StyledTableRow key={token.assetId}>
						<TableText primary type={TEXT_TYPES.BUTTON_SECONDARY}>
							{token.name}
						</TableText>
						<TableText primary type={TEXT_TYPES.BUTTON_SECONDARY}>
							{token.mintAmount.toFormat()} &nbsp;<Chip>{token.symbol}</Chip>
						</TableText>
						<TableText primary type={TEXT_TYPES.BUTTON_SECONDARY}>
							{token.formatBalance?.toFormat(2)} &nbsp;<Chip>{token.symbol}</Chip>
						</TableText>
						<Row justifyContent="flex-end" style={{ flex: 1 }}>
							{(() => {
								if (!accountStore.isLoggedIn && token.symbol !== "ETH")
									return (
										<Button style={{ width: 120 }} green onClick={() => navigate("/")}>
											Connect wallet
										</Button>
									);
								if (!vm.initialized)
									return (
										<Button green disabled>
											Loading...
										</Button>
									);
								if (ethBalance?.eq(0) && token.symbol !== "ETH") return <Button disabled>Mint</Button>;
								return (
									<Button
										style={{ width: 120 }}
										disabled={vm.loading || !vm.initialized}
										onClick={() => {
											if (token.symbol === "ETH") {
												window.open(
													accountStore.address == null ? FAUCET_URL : `${FAUCET_URL}/?address=${accountStore.address}`,
													"blank"
												);
											} else {
												vm.mint(token.assetId);
											}
										}}
									>
										{vm.loading && vm.actionTokenAssetId === token.assetId ? "Loading..." : "Mint"}
									</Button>
								);
							})()}
						</Row>
					</StyledTableRow>
				))}
			</TableBody>
		</Root>
	);
});
export default TokensFaucetTable;
