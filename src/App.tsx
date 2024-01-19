import React from 'react';
import styled from "@emotion/styled";
import {Column} from "@components/Flex";
import {observer} from "mobx-react";
import Header from "@components/Header";
import {TEXT_TYPES} from "@components/Text";
import Text from "@components/Text";
import colors from "@components/colors";
import StatusBar from "@components/StatusBar";
import Faucet from "@components/Faucet";


const Root = styled(Column)`
    width: 100%;
    height: 100%;
    background: ${({ theme }) => colors.bgPrimary};
`;

const App: React.FC = observer(() => {
    return (
        <Root>
            <Header/>
            <Faucet/>
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
