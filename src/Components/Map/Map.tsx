import React, { useEffect, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';

import { truncateLat, truncateLon, NormalizeEvent } from '../../utils';
import MapGL from './MapGL';
import { TokenContext } from '../../state/Token/context';

interface IProperty {
  owner: any;
  price: any;
  coordinates: number[];
  selling?: any;
}

const Map = ({ triedEager }: { triedEager: boolean }): JSX.Element => {
  const { tokenInstance } = useContext(TokenContext);
  const { chainId, connector } = useWeb3React();
  // const [properties, setProperties] = useState<IProperty[]>([]);

  useEffect(() => {
    const LATITUDE = 40.757158181885984;
    const LONGITUDE = -73.98974299133785;

    let isStale = false;
    if (!isStale && !!tokenInstance && !!chainId) {
      const getTokenId = (long: number, lat: number) => {
        return keccak256(toUtf8Bytes(long + ',' + lat));
      };

      const tokenIndex = getTokenId(
        truncateLon(LONGITUDE),
        truncateLat(LATITUDE)
      );

      const startBlock = chainId === 3 ? 3530378 : 5877613;

      // tokenInstance
      //     .queryFilter(
      //         {
      //             topics: [null, tokenIndex],
      //         },
      //         startBlock,
      //     )
      //     .then((logs: any) => NormalizeEvent(logs, connector))
      //     .then((queriedProperties: IProperty[]) => console.log(queriedProperties));

      tokenInstance
        .queryFilter(
          {
            topics: [null, tokenIndex],
          },
          startBlock
        )
        .then((logs: any) => NormalizeEvent(logs, connector))
        // .then((queriedProperties: IProperty[]) => setProperties(queriedProperties))
        .catch((error: Error) => console.error(error));
    }
    return () => {
      isStale = true;
    };
  }, [tokenInstance, chainId, connector]);

  return <MapGL />;
};

export default Map;
