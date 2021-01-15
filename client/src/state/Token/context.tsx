import React, { createContext, ReactNode } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

import { useContract } from '../../hooks';
import SuperWorldToken from '../../contracts/SuperWorldToken.min.json';
const ROPSTEN_ADDRESS = '0x79813b8894910e1f72a972cd339c07c45a09f806';
const MAINNET_ADDRESS = '0xfd89ea92f6ec07d955e2adbba2400ca1a6369028';
const RINKEBY_ADDRESS = '0xeb4b0b1b1484f15ecf40a4c22822d278bf2d76dc';

export const TokenContext = createContext<any>({});

export function TokenProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { chainId } = useWeb3React<Web3Provider>();

  const CURRENT_ADDRESS =
    chainId === 1
      ? MAINNET_ADDRESS
      : chainId === 3
      ? ROPSTEN_ADDRESS
      : RINKEBY_ADDRESS;

  const tokenInstance = useContract(CURRENT_ADDRESS, SuperWorldToken.abi, true);

  return (
    <TokenContext.Provider value={{ tokenInstance }}>
      {children}
    </TokenContext.Provider>
  );
}
