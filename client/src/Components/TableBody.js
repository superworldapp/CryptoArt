import React from 'react';
import Web3 from 'web3';
import axios from 'axios';

const TableBody = ({ cre }) => {
  const calcTime = (timeCreated) => {
    let totalTime = '';
    const currentTime = Date.now() / 1000;

    let milliseconds = Math.abs(currentTime - timeCreated);

    const days = Math.floor(milliseconds / 86400);
    milliseconds -= days * 86400;

    const hours = Math.floor(milliseconds / 3600) % 24;
    milliseconds -= hours * 3600;

    const minutes = Math.floor(milliseconds / 60) % 60;
    milliseconds -= minutes * 60;

    if (days > 0) {
      totalTime += days === 1 ? `${days} day ` : `${days} days `;
    }

    if (hours > 1) {
      totalTime += `${hours} hours `;
    } else if (hours === 1) {
      totalTime += `${hours} hour `;
    }

    totalTime +=
      minutes === 0 || hours === 1
        ? `${minutes} minutes`
        : `${minutes} minutes`;
    return totalTime;
  };

  const accUsername = (accNum) => {
    if (accNum === '0xB4C33fFc72AF371ECaDcF72673D5644B24946256')
      return '@Chitra';
    else if (accNum === '0x0d5567345D3Cb1114471BC07c396Cc32C7CF92ec')
      return '@Arianna';
    else if (accNum === '0xABD82c9B735F2C89f2e62152A9884F4A92414F20')
      return '@CJMain';
    else if (accNum === '0x63611F92FA2d7B7e6625a97E6474b7fA16DbD89F')
      return '@CJ Test';
    else if (accNum === '0x4271AC6Bb565D120e2Ac1C3fb855aE5Dad6aE8ff')
      return '@Swapnil';
    else if (accNum === '0x81B2362F55Ea93f71990d7F446dca80BdD94C6e7')
      return '@SwapnilTest';
    else return '@Annonymous';
  };
  console.log('item in return', cre);
  return (
    <tbody>
      {cre?.map((item) => {
        return (
          <React.Fragment>
            <tr key={item.id}>
              <th scope='row'>
                {item?.event == 'Tokenbid'
                  ? 'Auction Started'
                  : item.event == 'Bidstarted'
                  ? 'Bid Placed'
                  : item.event == 'Tokenputforsale'
                  ? 'Token Listed For Sale'
                  : item.event == 'Tokencreated'
                  ? 'Token Created'
                  : item.event}
              </th>
              <td>
                {item?.returnValues.tokenPrice
                  ? `${Web3.utils.fromWei(
                      Number(item?.returnValues.tokenPrice).toString(),
                      'ether'
                    )} ETH`
                  : item?.returnValues.sellPrice
                  ? `${Web3.utils.fromWei(
                      Number(item?.returnValues.sellPrice).toString(),
                      'ether'
                    )} ETH`
                  : 'null'}
              </td>
              <td>
                {item?.returnValues.tokenCreator
                  ? accUsername(item?.returnValues.tokenCreator)
                  : accUsername(item?.returnValues.seller)}
              </td>
              <td>
                {item?.returnValues.newowner
                  ? accUsername(item?.returnValues.newowner)
                  : 'null'}
              </td>
              <td>{calcTime(item?.returnValues.times)}</td>
            </tr>
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

export default TableBody;
