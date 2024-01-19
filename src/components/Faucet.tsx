import Text, {TEXT_TYPES} from "@components/Text";
import React, {useEffect} from "react";
import {Observer, observer} from "mobx-react";
import styled from "@emotion/styled";
import SizedBox from "@components/SizedBox";
import {FaucetVMProvider, useFaucetVM} from "@components/FaucetVm";
import Skeleton from "react-loading-skeleton";
import TokensFaucetTable from "@components/TokensFaucetTable";
interface IProps {}

const Root = styled.div`
    display: flex;
    box-sizing: border-box;
    padding-left: 12px;
    width: 414px;
`;

const FaucetImpl: React.FC = observer(() => {
    const vm = useFaucetVM();
    useEffect(() => {
        document.title = `Spark | Faucet`;
    }, []);
    return (
        <Observer>
            {() => {
                return (
                    <Root>
                        <Text type={TEXT_TYPES.H} primary>
                            Faucet for Fuel Network
                        </Text>
                        <SizedBox height={16} />
                        {vm.faucetTokens.length === 0 ? <Skeleton height={48} style={{ margin: 4 }} count={4} /> : <TokensFaucetTable />}
                    </Root>
                );
            }}
        </Observer>
    );
})
const Faucet: React.FC<IProps> = () => (
    <FaucetVMProvider>
        <FaucetImpl />
    </FaucetVMProvider>
);
export default Faucet;