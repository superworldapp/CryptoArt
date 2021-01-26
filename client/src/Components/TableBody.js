import React from 'react'
import Web3 from 'web3';

const TableBody = ({cre}) => {
    return (
        <tbody>
            {cre.map((item) => {
                return (
                    <React.Fragment>
                        <tr key={item.id}>
                            <th scope='row'>{item?.event}</th>
                            <td>
                                {item?.returnValues.tokenPrice
                                    ? `${Web3.utils.fromWei(
                                          Number(
                                              item?.returnValues.tokenPrice
                                          ).toString(),
                                          'ether'
                                      )} ETH`
                                    : item?.returnValues.sellPrice
                                    ? `${Web3.utils.fromWei(
                                          Number(
                                              item?.returnValues.sellPrice
                                          ).toString(),
                                          'ether'
                                      )} ETH`
                                    : 'null'}
                            </td>
                            <td>
                                {item?.returnValues.newowner
                                    ? item?.returnValues.newowner
                                    : 'null'}
                            </td>
                            <td>
                                {item?.returnValues.tokenCreator
                                    ? item?.returnValues.tokenCreator
                                    : item?.returnValues.seller}
                            </td>
                            <td>
                                {Math.round(
                                    (Date.now() / 1000 -
                                        item.returnValues.times) /
                                        60
                                )}{' '}
                                minutes ago
                            </td>
                        </tr>
                    </React.Fragment>
                );
            })}
        </tbody>
    );
}

export default TableBody
