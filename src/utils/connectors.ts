// https://github.com/NoahZinsmeister/web3-react/tree/v6/docs/connectors
import { NetworkConnector } from '@web3-react/network-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import Fortmatic from 'fortmatic';
import Portis from '@portis/web3';
import Web3 from 'web3';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

const RPC_URLS: { [chainId: number]: string } = {
  1: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  3: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  137: `https://rpc-mainnet.matic.network`,
};

//custom node options
const customNodeOptions = {
  rpcUrl: 'https://alpha.ethereum.matic.network', // your own node url
  chainId: 137, // chainId of your own node
};

// INFURA
export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 3: RPC_URLS[3] },
  defaultChainId: 1,
});

// METAMASK
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3],
});

// FORTMATIC
export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_ROPSTEN_API_KEY as string,
  chainId: 1,
});

// export const fortmatic_mainnet = new Fortmatic(
//   process.env.REACT_APP_FORTMATIC_MAINNET_API_KEY as string,
//   customNodeOptions
// );

// PORTIS
export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
  networks: [1],
});

// export const portis_mainnet = new Portis(process.env.REACT_APP_PORTIS_DAPP_ID as string, 'mainnet');
