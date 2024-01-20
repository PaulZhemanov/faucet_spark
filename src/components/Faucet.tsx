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
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 16px;
    width: 100%;
    min-height: 100%;
    margin-bottom: 24px;
    margin-top: 40px;
    text-align: left;
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
                        <TokensFaucetTable />
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