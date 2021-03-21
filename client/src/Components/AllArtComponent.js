import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Card,
    CardImg,
    CardTitle,
    CardBody,
    CardText,
    Modal,
    ModalHeader,
    ModalBody,
    CardSubtitle
} from 'reactstrap';
import Web3 from 'web3';
import './AllArtComponent.css';
import checkmark from '../images/svg/checkmark.svg';
import anonUser from '../images/user.png';
import image3 from '../images/image 6.png';

let allDocs = [];
//let cre;
class AllArt extends Component {
    constructor(props) {
        super(props);
        this.state = { docCount: 0, art: [], isModalOpen: false, qty: 0 };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.buyItem = this.buyItem.bind(this);
        this.accUsername = this.accUsername.bind(this);
    }

    creData = async () => {
        let cre = await this.props.contract?.getPastEvents('tokencreated', {
            filter: { tokenId: this.props.art._tokenId },
            fromBlock: 7970334
        });
        let tokenBid = await this.props.contract?.getPastEvents('tokenbid', {
            filter: { tokenId: this.props.art._tokenId },
            fromBlock: 7970334
        });

        console.log(tokenBid);
        let bidStarted = await this.props.contract?.getPastEvents('bidstarted', {
            filter: { tokenId: this.props.art._tokenId },
            fromBlock: 7970334
        });
  

        let tb = await this.props.contract?.getPastEvents('tokenbought', {
            filter: { tokenId: this.props.art._tokenId },
            fromBlock: 7970334
        });
        let tfs = await this.props.contract?.getPastEvents('tokenputforsale', {
            filter: { tokenId: this.props.art._tokenId },
            fromBlock: 7970334
        });
        console.log(this.props.art._tokenId, cre);
    };
    componentDidMount = () => {
        this.creData();
    };

    buyItem = async () => {
        const res = await this.props.contract.methods
            .buyToken(this.props.art.tokenIdentifier)
            .send({
                from: this.props.accounts,
                value: this.props.art.tokenSellPrice,
                gas: 5000000
            });
        console.log(res);
    };

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    accUsername = (accNum) => {
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

    render() {
        this.creData();
        let but = this.props.art._isSelling ? 'visible' : 'invisible';
        let bux = this.props.art._isBidding ? 'visible' : 'invisible';
        let bak = this.props.art._isSelling ? 'bg-success text-white' : '';
        let buk = this.props.art._isBidding ? 'bg-warning' : '';
        let pr =
            Web3.utils.fromWei(
                this.props.art._sellprice.toString(),
                'ether'
            ) == 0
                ? 'invisible'
                : 'visible';

        const img = new Image();
        let orientation;
        img.onload = function () {
            let width = this.width;
            let height = this.height;

            orientation = width < height ? 'portrait' : 'landscape';
        };
        img.src = this.props.art._imgurl;
        img.onload();

        return (
            <Card
                // height='300px'
                // width='245px'
                // className={this.props.art.auction.isBidding ? buk : bak}
                className='all-art-card'>
                <Link
                    style={{
                        color: '#212529',
                        textDecoration: 'none'
                    }}
                    to={`/card/${this.props.art._tokenId}`}>
                    <div className='card-img-top-all-art'>
                        <CardImg
                            // className='card-img-top-all-art'
                            className={orientation}
                            top
                            src={this.props.art._imgurl}></CardImg>
                    </div>
                    <CardBody className='all-art-body'>
                        <div style={{ display: 'flex' }}>
                            <CardSubtitle>
                                <img
                                    style={{ marginRight: '30px' }}
                                    width='16px'
                                    height='16px'
                                    className='rounded-circle'
                                    src={anonUser}></img>
                            </CardSubtitle>
                            <CardSubtitle
                                style={{
                                    fontFamily: 'Gibson',
                                    fontSize: '13px',
                                    color: '#888888',
                                    display: 'flex',
                                    alignItems: 'flex-end'
                                }}>
                                Created By{' '}
                                <div className='token-creator'>
                                    {' '}
                                    {this.accUsername(
                                        this.props.art._tokenCreator
                                    )}
                                </div>
                            </CardSubtitle>
                        </div>

                        <div className='ctext'>
                            <CardText
                                style={{
                                    fontFamily: 'Gibson',
                                    fontSize: '13px',
                                    color: 'black',
                                    fontWeight: 'bold'
                                }}>
                                {this.props.art._tokenBatchName}
                            </CardText>
                            {this.props.art._isSelling ? (
                                <CardText
                                    className={but}
                                    style={{
                                        fontFamily: 'Gibson',
                                        fontSize: '13px',
                                        color: '#5540c7'
                                    }}>
                                    {Web3.utils.fromWei(
                                        this.props.art._sellprice.toString(),
                                        'ether'
                                    )}{' '}
                                    ETH
                                </CardText>
                            ) : (
                                <CardText
                                    className={bux}
                                    style={{
                                        fontFamily: 'Gibson',
                                        fontSize: '13px',
                                        color: '#5540c7'
                                    }}>
                                    {Web3.utils.fromWei(
                                        this.props.art._sellprice.toString(),
                                        'ether'
                                    )}{' '}
                                    ETH
                                </CardText>
                            )}
                        </div>

                        <Col sm={{ size: 12 }}>
                            {but === 'visible' ? (
                                <Link
                                    to={`/card/${this.props.art.tokenId}`}>
                                    <Button
                                        className={but}
                                        id='buy-bid-btn'
                                        size='sm'
                                        type='submit'
                                        color='primary'>
                                        Purchase
                                    </Button>
                                </Link>
                            ) : (
                                <div></div>
                            )}
                            {bux === 'visible' ? (
                                <div className='bid-btn-container'>
                                    <div
                                        style={{
                                            color: 'red',
                                            fontSize: '12px',
                                            alignSelf: 'center',
                                            marginLeft: '0.4rem',
                                            fontFamily: 'Gibson'
                                        }}>
                                        time remaining
                                    </div>
                                    <Button
                                        className={bux}
                                        id='buy-bid-btn'
                                        size='md'
                                        type='submit'
                                        color='primary'
                                        style={{ width: '50%' }}>
                                        Bid
                                    </Button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </Col>
                    </CardBody>
                </Link>
            </Card>
            /* <Link
          style={{
            color: '#212529',
            textDecoration: 'none',
          }}
          to={`/card/${this.props.art.tokenIdentifier}`}
        >
          <CardImg
            top
            width='100%'
            src={this.props.art.imgurl}
            alt='Card image'
          />
        </Link>
        <CardBody>
          <Link
            style={{
              color: '#212529',
              textDecoration: 'none',
            }}
            to={`/card/${this.props.art.tokenIdentifier}`}
          >
            <CardTitle>Item Title : {this.props.art.tokenTitle}</CardTitle>
            <CardText>
              <small>Item Creator : {this.props.art.tokenCreator}</small>
            </CardText>
            <CardText>
              <small>Item Owner : {this.props.art.tokenOwner}</small>
            </CardText>
            <CardText className={but}>
              <small>
                Item Sell Price :{' '}
                {Web3.utils.fromWei(
                  this.props.art.tokenSellPrice.toString(),
                  'ether'
                )}{' '}
                ETH
              </small>
            </CardText>
          </Link>
          <Col sm={{ size: 12 }}>
            <Button
              className={but}
              size='sm'
              type='submit'
              color='primary'
              onClick={this.buyItem}
            >
              Buy Item
            </Button>
            {'   '}
            <Button
              className={bux}
              size='md'
              type='submit'
              color='primary'
              style={{ width: '50%' }}
            >
              Bid
            </Button>
          </Col>
        </CardBody>
      </Card> */
        );
    }
}

class AllItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docCount: 0,
            art: [],
            cust: [],
            manuf: [],
            isModalOpen1: false,
            title: '',
            artUrl: '',
            price: '',
            artHash: '',
            perCut: 0
        };
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onAuctionBtn = this.onAuctionBtn.bind(this);
        this.hasSoldBtn = this.hasSoldBtn.bind(this);
        this.allBtn = this.allBtn.bind(this);
    }

    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async componentDidMount() {
        let res = await this.props.contract?.methods.totalSupply().call();
    console.log(res);

    let response = [];
    let createrToken = [];
    
    for (let i = 1; i <= res; i++) {
      let rex = await this.props.contract?.methods.getTokenData(i).call();
      let rex2 = await this.props.contract?.methods.getTokenDataBatch(i).call();
      if (rex._tokenOwner == this.props.accounts) {
      var newBlock = {
        _tokenId : i,
        _tokenOwner : rex._tokenOwner,
        _isSellings : rex._isSellings,
        _sellprice :rex._sellprice,
        _refbatch : rex._refbatch,
        _tokenbidder : rex._tokenbidder,
        _isBidding : rex._isBidding,
        _bidprice : rex._bidprice,
        _tokenHash :rex2._tokenHash,
        _tokenBatchName : rex2._tokenBatchName,
        _tokenCreator : rex2._tokenCreator,
        _imgurl : rex2._imgurl,
        _imgThumbnail : rex2._imgThumbnail,
       
      }
        response.push(newBlock);
        console.log(newBlock)
      }
      if (rex2._tokenCreator == this.props.accounts) {
        createrToken.push(rex);
      }

    }


    console.log(createrToken);
    allDocs = [];
    allDocs = response;
    console.log(response);
    this.setState({ art: allDocs , batchart: createrToken });
    }
    allBtn = () => {
        this.setState({ art: allDocs });
        console.log(allDocs);
    };

    onAuctionBtn = () => {
        let auctionDocs = allDocs.filter((art) => art._isBidding);

        this.setState({ art: auctionDocs });
    };

    hasSoldBtn = () => {
        let soldDocs = allDocs.filter((art) => art._isSelling);
        this.setState({ art: soldDocs });
    };

    render() {
        const menu = this.state.art.map((x) => {
            return (
                <div
                    key={x.tokenIdentifier}
                    className='col-4 col-md-3'
                    id='all-art-card'>
                    <AllArt
                        art={x}
                        contract={this.props.contract}
                        accounts={this.props.accounts}
                    />
                    <br />
                    <br />
                </div>
            );
        });
        return (
            <div className='container'>
                <div className='button-container'>
                    <button onClick={this.allBtn} className='bbtn'>
                        All
                    </button>
                    <button className='bbtn'>New</button>
                    <button onClick={this.onAuctionBtn} className='bbtn'>
                        On Auction
                    </button>
                    <button onClick={this.hasSoldBtn} className='bbtn'>
                        For Sale
                    </button>
                </div>
                <button className='bbtn'>Real Estate</button>
                <button className='bbtn'>AR/VR</button>
                <button className='bbtn'>Animation</button>
                <button className='bbtn'>Landscape</button>
                <Modal
                    isOpen={this.state.isModalOpen1}
                    toggle={this.toggleModal1}
                    className='modal-xl'>
                    <ModalHeader toggle={this.toggleModal1}>
                        <h3>Add Artwork</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='row pl-5 pr-5'>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                            Token Title
                                        </Label>
                                        <Input
                                            type='text'
                                            id='title'
                                            name='title'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='price' className='ml-3'>
                                            Item Price
                                        </Label>
                                        <Input
                                            type='text'
                                            id='price'
                                            name='price'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className='row pl-5 pr-5'>
                                <div className='col-12'>
                                    <FormGroup>
                                        <Label
                                            htmlFor='artHash'
                                            className='ml-3'>
                                            Art Hash
                                        </Label>
                                        <Input
                                            type='text'
                                            id='artHash'
                                            name='artHash'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                            </div>

                            <div className='row pl-5 pr-5'>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='desc' className='ml-3'>
                                            Art URL
                                        </Label>
                                        <Input
                                            type='text'
                                            id='artUrl'
                                            name='artUrl'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label
                                            htmlFor='perCut'
                                            className='ml-3'>
                                            Percentage Cut
                                        </Label>
                                        <Input
                                            type='number'
                                            id='perCut'
                                            name='perCut'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <br />
                            <div className='row pl-5'>
                                <div className='col-6'>
                                    <Button
                                        color='primary'
                                        onClick={this.creatingItems}>
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <br />
                        </Form>
                    </ModalBody>
                </Modal>
                <br />
                <br />
                <div className='row-all-art'>{menu}</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br /> <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default AllItemComponent;
