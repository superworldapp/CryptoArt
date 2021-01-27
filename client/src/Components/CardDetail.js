import React, { useEffect, useState } from 'react';
import TableBody from './TableBody';
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardImg,
    CardHeader,
    Table,
    Input,
    Modal,
    ModalHeader
} from 'reactstrap';
import image3 from '../images/image 6.png';
import image4 from '../images/image 23.png';
import image5 from '../images/image 25.png';
import image6 from '../images/image 28.png';
import image7 from '../images/image 29.png';
import annonuser from '../images/user.png';
import Web3 from 'web3';
import Axios from 'axios';

const CardDetail = ({ art, accounts, contract, cre, matchId }) => {
    console.log(art);

    const [ethPrice, setEthPrice] = useState(null);
    const [creValue, setCreValue] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [handleInput, setHandleInput] = useState('');
    const [pay, setPay] = useState(0);

    const ETHER = 1000000000000000000;

    const getEthDollarPrice = () => {
        Axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true`
        ).then((res) => {
            // console.log(typeof res.data.ethereum.usd_24h_change);
            setEthPrice(res.data.ethereum);
        });
        // return <span>{ethPrice.usd}</span>;
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setHandleInput(value);
        console.log(handleInput);
    };

    const AddBid = async () => {
        const res = await contract.methods.addBid(art.tokenIdentifier).send({
            from: accounts,
            gas: 1000000,
            value: (handleInput * ETHER).toString()
        });
        console.log(res);
    };

    const getCreData = async () => {
        let cre = await contract?.getPastEvents('tokencreated', {
            filter: { tokenId: art.tokenIdentifier },
            fromBlock: 0
        });
        //  // Using an array means OR: e.g. 20 or 23
        let tb = await contract?.getPastEvents('tokenbought', {
            filter: { tokenId: art.tokenIdentifier },
            fromBlock: 0
        });
        let tfs = await contract?.getPastEvents('tokenputforsale', {
            filter: { tokenId: art.tokenIdentifier },
            fromBlock: 0
        });
        for (let property in cre) {
            creValue.push(cre[property]);
        }
        for (let property in tb) {
            creValue.push(tb[property]);
        }
        for (let property in tfs) {
            creValue.push(tfs[property]);
        }

        creValue.sort((a, b) => {
            return Number(b.returnValues.times) - Number(a.returnValues.times);
        });

        creValue.forEach((item) => {
            let firstChar = item.event.charAt(0).toUpperCase();
            let restOfStr = item.event.slice(1);
            item.event = firstChar + restOfStr;
        });

        console.log(creValue);
    };

    const isToggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const buyOrSell = () => {
        if (art.isSelling) {
            return (
                <button
                    className='btn btn-primary'
                    onClick={async () => {
                        const res = await contract.methods
                            .buyToken(art.tokenIdentifier)
                            .send({
                                from: accounts,
                                value: art.tokenSellPrice,
                                gas: 1000000
                            });
                        console.log(res);
                    }}
                    style={{
                        width: '50%',
                        alignSelf: 'center'
                    }}>
                    Buy Item
                </button>
            );
        } else if (art.auction.isBidding) {
            return (
                <React.Fragment>
                    <Input type='text' />
                    <Input
                        type='text'
                        id='sellPrice'
                        name='sellPrice'
                        onChange={handleInputChange}></Input>
                    <button
                        className='btn-primary'
                        color='primary'
                        onClick={AddBid}
                        style={{
                            width: '50%',
                            alignSelf: 'center'
                        }}>
                        Place Bid
                    </button>
                    {/* <Modal
                        isOpen={modalOpen}
                        toggle={isToggleModal}
                        className='modal_popup'>
                        <ModalHeader toggle={isToggleModal} className='pl-5'>
                            Start Auction
                        </ModalHeader>
                        <Card className='artCard' style={{ height: '50%' }}>
                            <CardImg
                                top
                                className='displayImage'
                                src={art.imgurl}
                                alt='Card image'
                            />
                            <CardBody>
                                <div
                                    className='ctext'
                                    style={{ padding: '5px', height: '1rem' }}>
                                    <CardSubtitle
                                        style={{
                                            position: 'relative',
                                            fontFamily: 'Gibson',
                                            fontSize: '15px',
                                            color: '#B3B3B3'
                                        }}>
                                        Title
                                    </CardSubtitle>
                                    <CardSubtitle
                                        style={{
                                            position: 'relative',
                                            fontFamily: 'Gibson',
                                            fontSize: '15px',
                                            color: '#B3B3B3'
                                        }}>
                                        Price
                                    </CardSubtitle>
                                </div>
                                <div
                                    className='ctext'
                                    style={{ padding: '5px' }}>
                                    <CardText
                                        style={{
                                            position: 'relative',
                                            fontFamily: 'Gibson',
                                            fontSize: '15px',
                                            color: 'black'
                                        }}>
                                        {art.tokenTitle}
                                    </CardText>
                                    <CardText
                                        style={{
                                            position: 'relative',
                                            fontFamily: 'Gibson',
                                            fontSize: '15px',
                                            color: 'black'
                                        }}>
                                        {Web3.utils.fromWei(
                                            art.tokenSellPrice.toString(),
                                            'ether'
                                        )}{' '}
                                        ETH
                                    </CardText>
                                </div>
                                <div
                                    className='ctext1'
                                    style={{ padding: '2px' }}>
                                    <p
                                        style={{
                                            position: 'relative',
                                            fontFamily: 'Gibson',
                                            fontSize: '15px',
                                            color: 'black',
                                            marginTop: '2%'
                                        }}>
                                        Start Bid :{' '}
                                    </p>
                                    <p>
                                        <Input
                                            style={{ width: '80%' }}
                                            type='text'
                                            id='bidPrice'
                                            name='bidPrice'></Input>
                                    </p>
                                    <p
                                        style={{
                                            position: 'relative',
                                            fontFamily: 'Gibson',
                                            fontSize: '15px',
                                            color: 'black',
                                            marginTop: '2%'
                                        }}>
                                        {' '}
                                        ETH
                                    </p>
                                </div>
                                <div className='ctext1'>
                                    <p
                                        style={{
                                            position: 'relative',
                                            fontFamily: 'Gibson',
                                            fontSize: '15px',
                                            color: 'black',
                                            marginTop: '2%'
                                        }}>
                                        Duration :{' '}
                                    </p>
                                    <p>
                                        <Input
                                            style={{ width: '80%' }}
                                            type='text'
                                            id='bidPrice'
                                            name='bidPrice'></Input>
                                    </p>
                                    <p
                                        style={{
                                            position: 'relative',
                                            fontFamily: 'Gibson',
                                            fontSize: '15px',
                                            color: 'black',
                                            marginTop: '2%'
                                        }}>
                                        Days{' '}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        className='abtn'
                                        style={{
                                            left: '32%',
                                            color: 'white',
                                            backgroundColor: '#5540C7'
                                        }}
                                        type='submit'>
                                        Confirm
                                    </button>{' '}
                                </div>
                            </CardBody>
                        </Card>
                    </Modal> */}
                </React.Fragment>
            );
        }
    };

    useEffect(() => {
        getCreData();
        getEthDollarPrice();
        // console.log(matchId)
        // console.log('Header', myProperties);
    }, []);

    //   const buyItem = async () => {
    //         const res = await contract.methods
    //             .buyToken(art.tokenIdentifier)
    //             .send({
    //                 from: accounts,
    //                 value: art.tokenSellPrice,
    //                 gas: 1000000
    //             });
    //         console.log(res);
    //     };
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-between mt-5 py-5'>
                    <div
                        className='card'
                        style={{
                            width: '50%'
                        }}>
                        <a href={art?.imgurl} target='_blank'>
                            <img
                                src={art?.imgurl}
                                className='card-img'
                                alt='...'
                            />
                        </a>
                    </div>
                    <div className='information d-flex flex-column'>
                        {/* <a href='#'>{match.params.id}</a>
                        <h1>{match.params.id}</h1> */}
                        <p>
                            Owned by{' '}
                            <span class='text-primary'>
                                {art?.tokenCreator}
                            </span>
                        </p>
                        <div
                            className='card py-3'
                            style={{
                                width: '30rem'
                            }}>
                            <p className='text-secondary'>Current price</p>
                            <h4>
                                {Web3.utils.fromWei(
                                    art?.tokenPrice.toString(),
                                    'ether'
                                )}{' '}
                                ETH
                                <small>
                                    <span className='text-secondary'>
                                        (
                                        {(
                                            Web3.utils.fromWei(
                                                art?.tokenPrice.toString(),
                                                'ether'
                                            ) * ethPrice?.usd
                                        ).toFixed(2)}{' '}
                                        USD)
                                    </span>
                                </small>
                            </h4>

                            {buyOrSell()}
                        </div>
                    </div>
                </div>
                <div className='my-5'>
                    <Card
                        className='card'
                        style={{
                            overflow: 'auto'
                        }}>
                        <CardHeader
                            className='text-left'
                            style={{
                                backgroundColor: '#fff'
                            }}>
                            <h4>
                                <i class='fas fa-arrows-alt-v'></i> Trading
                                History
                            </h4>
                        </CardHeader>
                        <React.Fragment>
                            <CardBody>
                                <Table
                                    style={{
                                        width: '100%'
                                    }}>
                                    <thead>
                                        <tr className='text-secondary'>
                                            <th>Event</th>
                                            <th>Price</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <TableBody cre={creValue} />
                                </Table>
                            </CardBody>
                        </React.Fragment>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CardDetail;
