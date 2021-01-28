import React from 'react';
import Web3 from 'web3';

const TableBody = ({ cre }) => {
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
    else return '@Annonymous';
  };

  return (
    <tbody>
      {cre?.map((item) => {
        return (
          <React.Fragment>
            <tr key={item.id}>
              <th scope='row'>{item?.event}</th>
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
              <td>
                {Math.round(
                  (Date.now() / 1000 - item?.returnValues.times) / 60
                )}{' '}
                minutes ago
              </td>
            </tr>
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

export default TableBody;
