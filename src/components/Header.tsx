import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {observer} from "mobx-react";
import {ReactComponent as Logo} from "@src/assets/logoColoredFalse.svg";
import {Row} from "@components/Flex";
import {TEXT_TYPES} from "@components/Text";
import Tab from "@components/Tab";
import Button from "@components/Button";
import colors from "@components/colors";
import gear from "@src/assets/gear.svg";
import { ReactComponent as Account } from "@src/assets/account.svg";
import { ReactComponent as ArrowUp } from "@src/assets/arrowUp.svg";
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
    background: ${colors.bgSecondary};
`;

const Gear = styled(Button)`
    border-radius: 32px;  
    border: 1px solid  #4B4B4B;
    background: url(${gear}) no-repeat center center;
    width: 32px;
    height: 32px;
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

const TabContainer = styled(Row)`
    flex-grow: 1;
    & > * {
        margin-right: 28px;
    }
`;

const Header: React.FC<IProps> = observer(() => {
 const [isWalletInstalled, setIsWalletInstalled] = useState(false);
 const [account, setAccount] = useState<string | null>(null);

 useEffect(() => {
  const walletInstalled = window.ethereum !== undefined;
  setIsWalletInstalled(walletInstalled);

  if (walletInstalled) {
   const storedAccount = localStorage.getItem("walletAccount");
   if (storedAccount) {
    setAccount(storedAccount);
   }
  }
 }, [window.ethereum]);

 const connectWallet = async () => {
  try {
   const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
   setAccount(accounts[0]);
  } catch (error) {
   console.error("Error connecting to MetaMask:", error);
   alert("Something went wrong");
  }
 };

 const disconnectWallet = async () => {
  try {
   if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    if (accounts && accounts.length > 0) {
     window.ethereum._metamask.removeAllListeners();
     window.ethereum.on("accountsChanged", (newAccounts) => {
      if (newAccounts.length === 0) {
       setAccount(null);
      }
     });

     await window.ethereum.request({ method: "eth_disconnect" });
    }
   }
  } catch (error) {
   console.error("Error disconnecting from MetaMask:", error);
   alert("Something went wrong");
  }
 };

 const getAddressPreview = () => {
  return account ? (
   <>
    <Account style={{ marginRight: "8px" }} />{" "}
    {`${account.slice(0, 5)}...${account.slice(-4)}`}
    <ArrowUp style={{ marginLeft: "8px" }} />{" "}
   </>
  ) : (
   ""
  );
 };

 return (
  <Root>
   <a rel="noreferrer noopener" href="/public">
    <Logo />
   </a>
   <Divider />
   <TabContainer>
    {MENU_ITEMS.map(({ title, link, route }) => (
     <Tab type={TEXT_TYPES.BUTTON_SECONDARY} key={title}>
      {title}
     </Tab>
    ))}
   </TabContainer>
   <Gear />
   <SizedBox width={20} />
   {isWalletInstalled ? (
    <Button
     green={isWalletInstalled && !account}
     fitContent
     onClick={isWalletInstalled && account ? disconnectWallet : connectWallet}
    >
     {getAddressPreview() || "Connect wallet"}
    </Button>
   ) : (
    <p>Install MetaMask wallet</p>
   )}
  </Root>
 );
});

export default Header;

