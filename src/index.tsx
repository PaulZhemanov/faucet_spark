import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { loadState, saveState } from "@src/utils/localStorage";
import { autorun } from "mobx";
import RootStore from "@stores/RootStore";
import { storesContext } from "@stores/useStores";
import { HashRouter as Router } from "react-router-dom";
import { MetaMaskProvider } from "@metamask/sdk-react";

const initState = loadState();

const mobxStore = new RootStore(initState);

autorun(
	() => {
		console.dir(mobxStore);
		saveState(mobxStore.serialize());
	},
	{ delay: 1000 }
);
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<storesContext.Provider value={mobxStore}>
			<Router>
				<App />
			</Router>
		</storesContext.Provider>
	</React.StrictMode>
);

