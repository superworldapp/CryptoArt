import { InjectedConnector } from '@web3-react/injected-connector';

// METAMASK
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3],
});
