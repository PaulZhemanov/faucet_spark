import styled from "@emotion/styled";
import React, {useState} from "react";
import {observer} from "mobx-react";
import {ReactComponent as Logo} from "@src/assets/logoColoredFalse.svg";
// import {ReactComponent as Gear} from "@src/assets/gear.svg";
import {Row} from "@components/Flex";
import {TEXT_TYPES} from "@components/Text";
import Tab from "@components/Tab";
import Button from "@components/Button";
import colors from "@components/colors";
import {useNavigate} from "react-router-dom";
import YourSvgIcon from "@src/assets/gear.svg";
import SizedBox from "@components/SizedBox";

interface IProps {
}

const Root = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    padding: 0 12px;
    box-sizing: border-box;
    flex-shrink: 0;

    * {
        text-decoration: none;
    }
`;

const Divider = styled.div`
    margin: 0 16px;
    width: 1px;
    height: 32px;
    background: ${({theme}) => colors.bgSecondary};
`;

const Gear = styled(Button)`
    border-radius: 32px;  
    border: 1px solid  #4B4B4B;
    background: url(${YourSvgIcon}) no-repeat center center;
    width: 32px;
    height: 32px;
    //background-size: contain;
`;

type TMenuItem = {
    title: string;
    route?: string;
    link?: string;
};


export const MENU_ITEMS: Array<TMenuItem> = [
    {title: "DASHBOARD"},
    {title: "TRADE"},
    {title: "EARN"},
    {title: "FAUCET"},
    {title: "DOCS"},
    {title: "MORE"},
];

// const SettingsButton = styled(Button)`
//     border-radius: 32px;
//     padding: 2px 4px;
//
//     path {
//         fill: ${({theme}) => colors.iconSecondary};
//     }
//
//     :active {
//         path {
//             fill: ${({theme}) => colors.iconPrimary};
//         }
//     }
//
//     :disabled {
//         path {
//             fill: ${({theme}) => colors.iconDisabled};
//         }
//     }
// `;

const TabContainer = styled(Row)`
    flex-grow: 1;
    & > * {
        margin-right: 28px;
    }
`;
const ROUTES = {
    ROOT: "/",
    CONNECT: "/connect",
    TRADE: "/:marketId",
    FAUCET: "/faucet",
};
const Header: React.FC<IProps> = observer(() => {
    return (
        <Root>
            <a rel="noreferrer noopener" href="/public">
                <Logo/>
            </a>
            <Divider/>
            <TabContainer>
                {MENU_ITEMS.map(({title, link, route}) => (
                    <Tab type={TEXT_TYPES.BUTTON_SECONDARY} key={title}>{title}</Tab>
                ))}
            </TabContainer>
            <Gear />
            <SizedBox width={20} />
            <Button green fitContent>
                Connect wallet
            </Button>

        </Root>
    );
});
export default Header;
