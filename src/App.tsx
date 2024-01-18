import React from 'react';
import styled from "@emotion/styled";
import {Column} from "@components/Flex";
import {observer} from "mobx-react";
import Header from "@components/Header";
import {TEXT_TYPES} from "@components/Text";
import Text from "@components/Text";
import colors from "@components/colors";
import StatusBar from "@components/StatusBar";


const Root = styled(Column)`
    width: 100%;
    height: 100%;
    //align-items: center;
    background: ${({ theme }) => colors.bgPrimary};
    //max-height: 100vh;
    //padding: 0 12px; ????
`;

const Faucet = styled.div`
    display: flex;
    box-sizing: border-box;
    //justify-content: flex-start;
    padding-left: 12px;
    width: 414px;
    //min-height: 100%;
    //margin-bottom: 4px;
    //margin-top: 4px;
    //text-align: left;
    
`;
const App: React.FC = observer(() => {
    return (
        <Root>
            <Header/>
            <Faucet>
                <Text type={TEXT_TYPES.H} primary>
                    Faucet for Fuel Network
                </Text>
            </Faucet>
            <StatusBar />

            {/*<SizedBox height={16} />*/}
            {/*<Header />*/}
            {/*<Routes>*/}
            {/*  <Route path={ROUTES.CONNECT} element={<ConnectWallet />} />*/}
            {/*  <Route path={ROUTES.TRADE} element={<TradeScreen />} />*/}
            {/*  <Route path={ROUTES.ROOT} element={<TradeScreen />} />*/}
            {/*  <Route path={ROUTES.FAUCET} element={<Faucet />} />*/}
            {/*</Routes>*/}
        </Root>
    );
});

export default App;
