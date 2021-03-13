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
  4: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
};

// INFURA
export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 3: RPC_URLS[3], 4: RPC_URLS[4] },
  defaultChainId: 1,
});

// METAMASK
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3],
});

// FORTMATIC
export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_API_KEY as string,
  chainId: 1,
});

export const fortmatic_ropsten = new Fortmatic(
  process.env.REACT_APP_FORTMATIC_ROPSTEN_API_KEY as string,
  'ropsten'
);

export const fortmatic_rinkeby = new Fortmatic(
  process.env.REACT_APP_FORTMATIC_RINKEBY_API_KEY as string,
  'rinkeby'
);
// export const fortmatic_mainnet = new Fortmatic(
//   process.env.REACT_APP_FORTMATIC_MAINNET_API_KEY as string,
//   'mainnet'
// );

// PORTIS
export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
  networks: [1],
});

export const portis_ropsten = new Portis(
  process.env.REACT_APP_PORTIS_DAPP_ID as string,
  'ropsten'
);

export const portis_rinkeby = new Portis(
  process.env.REACT_APP_PORTIS_DAPP_ID as string,
  'rinkeby'
);
// export const portis_mainnet = new Portis(process.env.REACT_APP_PORTIS_DAPP_ID as string, 'mainnet');
