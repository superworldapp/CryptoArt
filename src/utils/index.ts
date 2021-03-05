import { BigNumber } from '@ethersproject/bignumber';
import { parseBytes32String } from '@ethersproject/strings';
import { formatEther } from '@ethersproject/units';
import { network } from '../utils/connectors';

export const shortenAddress = (address: string): string => {
  return address.slice(0, 6) + '...' + address.slice(address.length - 4);
};

function truncateDecimals(number: any, decimals: number): number {
  const numberString = number.toString(),
    decimalPosition = numberString.indexOf('.'),
    substrLength =
      decimalPosition === -1
        ? numberString.length
        : 1 + decimalPosition + decimals,
    trimmedResult = numberString.substr(0, substrLength),
    finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
  return parseFloat(finalResult);
}

export function truncateLat(number: number, decimals = 1): number {
  return truncateDecimals(Math.ceil(number * 1000) / 1000, decimals);
}

export function truncateLon(number: number, decimals = 1): number {
  return truncateDecimals(Math.ceil(number * 1000) / 1000, decimals);
}

interface IProperty {
  owner: string;
  price: string;
  coordinates: number[];
  selling: boolean;
}

/**
 * Takes in an array of logs and spits out readable property values that exist on chain
 *
 * @param logs Array of filtered events
 * @param connector How we are currently connected to the dApp
 *
 * @return IProperty[] Returns an array of IProperty, which consists of the owner, current price,
 * the corresponding coordinates, and whether or not this property is selling.
 */
export function NormalizeEvent(logs: any[], connector: any): IProperty[] {
  // console.log('logs:', logs);
  const queriedProperties: any[] = [];
  if (!!(connector === network)) {
    logs.forEach((log: any) => {
      let datas = log.data;
      datas = datas.substring(2); //Strip the 0x prefix
      if (datas === '0x') console.log('here');
      datas = datas.match(/.{1,64}/g); //Separate out by 64 character lengths
    });
  } else {
    logs.forEach((log: any) => {
      let datas = log.data;
      datas = datas.substring(2); //Strip the 0x prefix
      datas = datas.match(/.{1,64}/g); //Separate out by 64 character lengths

      const property: IProperty = {
        owner: '',
        price: '',
        coordinates: [],
        selling: false,
      };

      if (datas.length === 11) {
        const owner = datas[3];
        property.owner = '0x' + owner.slice(24);
        const price = '0x' + datas[5];
        property.price = formatEther(BigNumber.from(price).toString());

        const longitude = parseBytes32String('0x' + datas[8]);
        const longitudeFloat = parseFloat(longitude);

        property.coordinates.push(longitudeFloat);

        const latitude = parseBytes32String('0x' + datas[10]);
        const latitudeFloat = parseFloat(latitude);

        property.coordinates.push(latitudeFloat);
      } else if (datas.length === 12) {
        const owner = datas[4];
        property.owner = '0x' + owner.slice(24);
        const price = '0x' + datas[5];
        property.price = formatEther(BigNumber.from(price).toString());

        const longitude = parseBytes32String('0x' + datas[9]);
        const longitudeFloat = parseFloat(longitude);

        property.coordinates.push(longitudeFloat);

        const latitude = parseBytes32String('0x' + datas[11]);
        const latitudeFloat = parseFloat(latitude);

        property.coordinates.push(latitudeFloat);

        property.selling = true;
      }

      queriedProperties.push(property);
    });
  }
  // console.log('queriedProperties:', queriedProperties);
  return queriedProperties;
}
