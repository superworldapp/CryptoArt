import React, {Component} from "react";
import {Card, CardBody, CardImg, Modal, ModalBody, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";
import checkmark from "../../images/svg/checkmark.svg";
import loader from "../../images/loader.svg";
import {cardpills, ETHER} from "../MyStoreComponent";
import './style.scss';

class Allpatrender extends Component {
  // let day = moment.unix(art.dateofComp);
  // let xy = art.dateofComp;
  // let date = new Date(xy*1000);
  // let time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
  // let yz = xy != 0?"bg-success text-white":"";
  constructor(props) {
    super(props);
    this.state = {
      docCount: 0,
      art: [],
      isModalOpen: false,
      sellPrice: 0,
      auctionLoading: false,
      putForSaleLoading: false,
      delistLoading: false,
      listForAuctionSuccess: false,
      listForSaleSuccess: false,
      endAuctionLoading: false,
      endAuctionSuccess: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleListForAuction = this.toggleListForAuction.bind(this);
    this.toggleListForSale = this.toggleListForSale.bind(this);
    this.toggleEndAuction = this.toggleEndAuction.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.buyItem = this.buyItem.bind(this);
    this.putForSale = this.putForSale.bind(this);
    this.DeSale = this.DeSale.bind(this);
    this.StartAuction = this.StartAuction.bind(this);
    this.EndAuction = this.EndAuction.bind(this);
    this.refreshMyArt = this.refreshMyArt.bind(this);
    this.mintToken = this.mintToken.bind(this);

    //this.toggleAuction = this.toggleAuction.bind(this);
  }

  buyItem = async () => {

    try {
      //function Sale(uint256 _tokenId,uint _sellprice,bool isListed)
      const res = await this.props.contract.methods
        .buyToken(this.props.art._tokenId)
        .send({from: this.props.accounts, value: this.props.art._sellprice, gas: 5000000});
      console.log('res', res);

    } catch (error) {
      console.error(error)
    }
  };

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleAuction() {
    this.setState({
      isModalAucOpen: !this.state.isModalAucOpen,
    });
  }

  toggleListForAuction() {
    this.setState({listForAuctionSuccess: !this.state.listForAuctionSuccess});
  }

  toggleListForSale() {
    this.setState({listForSaleSuccess: !this.state.listForSaleSuccess});
  }

  toggleEndAuction() {
    this.setState({endAuctionSuccess: !this.state.endAuctionSuccess});
  }

  refreshMyArt() {
    if (
      (!this.state.toggleListForSale && !this.state.listForSaleSuccess) ||
      (!this.state.toggleListForAuction && !this.state.listForAuctionSuccess)
    )
      window.location.reload();
  }

  mintToken() {
    this.props.contract.methods
      .mintToken(this.props.art._batchId)
      .send({ from: this.props.accounts, gas: 5000000 });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  putForSale = async () => {
    this.setState({putForSaleLoading: true});
    const res = await this.props.contract.methods
      .Sale(
        this.props.art._tokenId,
        (this.state.sellPrice * ETHER).toString(),
        true,
      )
      .send({from: this.props.accounts, gas: 1000000});

    console.log('res', res);
    this.setState({putForSaleLoading: false, listForSaleSuccess: true});
    this.toggleModal();
    console.log(res);
  };
  DeSale = async () => {
    this.setState({delistLoading: true});
    const res = await this.props.contract.methods
      .Sale(
        this.props.art._tokenId,
        (this.state.sellPrice * ETHER).toString(),
        false,
      )
      .send({from: this.props.accounts, gas: 1000000});

    console.log('res', res);
    this.setState({delistLoading: false});
    window.location.reload();
    console.log(res);
  };
  StartAuction = async () => {
    this.setState({auctionLoading: true});
    let startprice = "1000000000000000000"
    let times = 1615401942
    const res = await this.props.contract.methods
      .startbid(
        this.props.art._tokenId,
        startprice,
        times
      )
      .send({from: this.props.accounts, gas: 5000000});
    console.log('res', res);
    this.setState({auctionLoading: false, listForAuctionSuccess: true});
    console.log(res);
  };
  EndAuction = async () => {
    this.setState({endAuctionLoading: true});
    const res = await this.props.contract.methods
      .closeBidOwner(
        this.props.art._tokenId,
      )
      .send({from: this.props.accounts, gas: 5000000});
    this.setState({endAuctionLoading: false, endAuctionSuccess: true});
    console.log(res);
  };
  AddBid = async () => {
    const res = await this.props.contract.methods
      .addBid(
        this.props.art._tokenId,
      )
      .send({from: this.props.accounts, gas: 1000000, value: 1000000});
    // window.location.reload();
    console.log(res);
  };
  CloseBid = async () => {
    const res = await this.props.contract.methods
      .closBid(this.props.art._tokenId)
      .send({from: this.props.accounts, gas: 7000000});
    console.log(res);
  };

  render() {
    const { art } = this.props
    let but = this.props.art._isSellings ? ' ' : 'hidden';
    let bak = this.props.art._isSellings ? 'bg-success text-white' : '';
    let buk = this.props.art._isBidding ? 'bg-warning' : '';
    let b = this.props.art._isSellings ? 'hidden' : 'abtn';
    let b1 = this.props.art._isSellings ? 'hidden' : 'abtn1';
    let but1 = this.props.art._isSellings ? 'abtn1' : 'hidden';
    let auc1 = this.props.art._isBidding ? 'hidden' : 'abtn';
    let auc2 = this.props.art._isBidding ? 'hidden' : 'abtn1';
    let forAuc = this.props.art._isBidding ? 'visible' : 'invisible';

    // let pr =
    //   Web3.utils.fromWei(this.props.art._sellprice.toString(), 'ether') == 0
    //     ? 'invisible'
    //     : 'visible';
    // let reSellOrSell = this.props.art._isSellings;
    // let Auc = this.props.art._isBidding;
    let accNum = this.props.art._tokenCreator;

    const accUsername = () => {
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
    const colorpills = () => {
      // if (this.props.art._isSelling) return cardpills[1];
      // else if (this.props.art._isBidding) return cardpills[3];
      // else return cardpills[0];
      return cardpills[0];
    };
    let x = colorpills();

    const img = new Image();
    let orientation;
    img.onload = function () {
      let width = this.width;
      let height = this.height;
      orientation = width < height ? 'portrait' : 'landscape';
    };
    img.src = this.props.art.imgurl;
    img.onload();

    return (
      // <div>
      // {cardpills.map((item) => {
      //   return (
      <Card
        className={buk}//{this.props.art._isBidding ? buk : bak}
        className='mystore-queue-card'
      >
        {/* <a href={this.props.art.imgurl} target='_blank'> */}
        {+art[3] > 1 && <span className='card-counter'>+{art[3]}</span>}
        <div className='mystore-queue-card-img'>
          <Link to={`/batch/${this.props.art._batchId}`}>
            <CardImg
              top
              src={this.props.art._imgurl}
              alt='Card image'
            ></CardImg>
          </Link>
        </div>
        <div className='card-body-wrapper'>
          <CardBody style={{width: '100%'}}>

            <h3>Back Country Fishing</h3>

            <div className='second-section'>
              <button onClick={this.mintToken} className='button_mint'>Mint</button>
            </div>

            <div>
              {/* {reSellOrSell ? (
              <button
                className={auc2}
                //className='abtn' style ={{ color :'white', backgroundColor:"#5540C7"}}
                // color='primary'
                onClick={this.toggleModal}
              >
                Relist
              </button>
            ) : (
              <button
                className={auc1}
                style ={{ color :'white', backgroundColor:'#5540C7', fontSize: '14px', width: '100px', borderRadius: '10px' }}
                // color='primary'
                onClick={this.toggleModal}
              >
                List
              </button>
            )} */}
              {/* <button
              className={auc1}
              //className='abtn' style ={{ color :'white', backgroundColor:"#5540C7"}}
              // color='primary'
              onClick={this.toggleModal}
            >
              {reSellOrSell}
            </button> */}
              {/* <button
              className={but1}
              //className='abtn'
              type='submit'
              onClick={this.DeSale}
            >
              Delist
            </button> */}
              {/* {forAuc === 'visible' ? (
              <button
                style={{
                  color: 'white',
                  border: 'none',
                  backgroundColor: 'white',
                }}
              >
                but
              </button>
            ) : (
              <div></div>
            )} */}
              {/* {Auc ? (
              <button
                className={b1}
                //className={auc1}
                //className='abtn'
                type='submit'
                // color='primary'
                onClick={
                  this.props.art._isBidding
                    ? this.EndAuction
                    : this.StartAuction
                }
                //onClick = {this.toggleAuction}
              >
                End Auction
              </button>
            ) : (
              <button
                className={b}
                //className={auc1}
                //className='abtn'
                type='submit'
                // color='primary'
                onClick={
                  this.props.art._isBidding
                    ? this.EndAuction
                    : this.StartAuction
                }
                //onClick = {this.toggleAuction}
              >
                Auction
              </button>
            )} */}

              {/* <button
              className={b}
              //className={auc1}
              //className='abtn'
              type='submit'
              // color='primary'
              onClick={
                this.props.art.auction.isBidding
                  ? this.EndAuction
                  : this.StartAuction
              }
              //onClick = {this.toggleAuction}
            >
              {Auc}
            </button> */}
              {/* {this.state.endAuctionLoading ? <img src={loader} /> : <div></div>}
            {forAuc === 'visible' ? (
              <button
                style={{
                  color: 'white',
                  border: 'none',
                  backgroundColor: 'white',
                }}
              >
                but
              </button>
            ) : (
              <div></div>
            )} */}

              {/* <Modal
              isOpen={this.state.isModalOpen}
              toggle={this.toggleModal}
              className='modal_popup'
            >
              <ModalHeader toggle={this.toggleModal} className='pl-5'>
                Put For Sale
              </ModalHeader>
              <Card className='artCard' style={{ height: '50%' }}>
                <CardImg
                  top
                  className='displayImage'
                  src={this.props.art._imgurl}
                  alt='Card image'
                />
                <CardBody>
                  <div className='ctext' style={{ padding: '2px' }}>
                    <CardSubtitle
                      style={{
                        position: 'relative',
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: '#B3B3B3',
                      }}
                    >
                      Title
                    </CardSubtitle>
                    <CardSubtitle
                      style={{
                        position: 'relative',
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: '#B3B3B3',
                      }}
                    >
                      Price
                    </CardSubtitle>
                  </div>
                  <div className='ctext' style={{ padding: '2px' }}>
                    <CardText
                      style={{
                        position: 'relative',
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: 'black',
                      }}
                    >
                      {this.props.art._tokenBatchName}
                    </CardText>
                    <CardText
                      style={{
                        position: 'relative',
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: 'black',
                      }}
                    >
                      {Web3.utils.fromWei(
                        this.props.art._sellprice.toString(),
                        'ether'
                      )}{' '}
                      ETH
                    </CardText>
                  </div>
                  <div className='ctext1'>
                    <p
                      style={{
                        position: 'relative',
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: 'black',
                        marginTop: '2%',
                      }}
                    >
                      Sell Price :{' '}
                    </p>
                    <p>
                      {' '}
                      <Input
                        type='text'
                        id='sellPrice'
                        name='sellPrice'
                        onChange={this.handleInputChange}
                      ></Input>
                    </p>
                  </div>
                  <div>
                    <div>
                      <button
                        className='abtn'
                        style={{
                          left: '32%',
                          color: 'white',
                          backgroundColor: '#5540C7',
                        }}
                        type='submit'
                        onClick={this.putForSale}
                      >
                        Confirm
                      </button>{' '}
                    </div>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      {this.state.putForSaleLoading ? (
                        <img src={loader} />
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Modal> */}

              {/* LIST FOR AUCTION MODAL */}
              <Modal
                isOpen={this.state.listForAuctionSuccess}
                toggle={this.toggleListForAuction}
                onClosed={this.refreshMyArt}
                className='modal-xl'
              >
                <ModalHeader toggle={this.toggleListForAuction}>
                  <div></div>
                </ModalHeader>
                <ModalBody
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    font: 'Gibson',
                    height: '20rem',
                    paddingBottom: '5rem',
                  }}
                >
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '1.25rem',
                      fontWeight: '450',
                      marginTop: '1rem',
                    }}
                  >
                    Congratulations!
                  </p>
                  <img src={checkmark}/>
                  <p
                    style={{
                      textAlign: 'center',
                      color: 'gray',
                      fontSize: '12px',
                    }}
                  >
                    Your item has been listed for auction in the marketplace!
                  </p>
                  <button
                    className='upload-more-btn'
                    onClick={this.toggleListForAuction}
                  >
                    BACK TO MY COLLECTIONS
                  </button>
                </ModalBody>
              </Modal>

              {/* LIST FOR SALE MODAL */}
              <Modal
                isOpen={this.state.listForSaleSuccess}
                toggle={this.toggleListForSale}
                onClosed={this.refreshMyArt}
                className='modal-xl'
              >
                <ModalHeader toggle={this.toggleListForSale}>
                  <div></div>
                </ModalHeader>
                <ModalBody
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    font: 'Gibson',
                    height: '20rem',
                    paddingBottom: '5rem',
                  }}
                >
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '1.25rem',
                      fontWeight: '450',
                      marginTop: '1rem',
                    }}
                  >
                    Congratulations!
                  </p>
                  <img src={checkmark}/>
                  <p
                    style={{
                      textAlign: 'center',
                      color: 'gray',
                      fontSize: '12px',
                    }}
                  >
                    Your item has been listed for sale in the marketplace!
                  </p>
                  <button
                    className='upload-more-btn'
                    onClick={this.toggleListForSale}
                  >
                    BACK TO MY COLLECTIONS
                  </button>
                </ModalBody>
              </Modal>

              {/* END AUCTION MODAL */}
              <Modal
                isOpen={this.state.endAuctionSuccess}
                toggle={this.toggleEndAuction}
                onClosed={this.refreshMyArt}
                className='modal-xl'
              >
                <ModalHeader toggle={this.toggleEndAuction}>
                  <div></div>
                </ModalHeader>
                <ModalBody
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    font: 'Gibson',
                    height: '20rem',
                    paddingBottom: '5rem',
                  }}
                >
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '1.25rem',
                      fontWeight: '450',
                      marginTop: '1rem',
                    }}
                  >
                    Done!
                  </p>
                  <img src={checkmark}/>
                  <p
                    style={{
                      textAlign: 'center',
                      color: 'gray',
                      fontSize: '12px',
                    }}
                  >
                    You have ended the auction for your item.
                  </p>
                  <button
                    className='upload-more-btn'
                    onClick={this.toggleEndAuction}
                  >
                    BACK TO MY COLLECTIONS
                  </button>
                </ModalBody>
              </Modal>
              {/* <Modal
                            isOpen={this.state.isModalAucOpen}
                            toggle={this.toggleAuction}
                            className='modal_popup'>
                            <ModalHeader
                                toggle={this.toggleAuction}
                                className='pl-5'>
                                Start Auction
                            </ModalHeader>
                            <Card className='artCard' style={{height:'50%'}}>
                                <CardImg
                                    top
                                    className="displayImage"
                                    src={this.props.art.imgurl}
                                    alt='Card image'
                                />
                                <CardBody
                                >
                                <div className="ctext" style={{padding:'5px', height:'1rem'}}>
                                    <CardSubtitle style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'#B3B3B3',

                                    }}>
                                    Title
                                    </CardSubtitle>
                                    <CardSubtitle
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'#B3B3B3',
                                    }}
                                    >
                                        Price
                                    </CardSubtitle>
                                </div>
                                <div className="ctext" style={{ padding:'5px'}}>
                                    <CardText
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                    }}
                                    >
                                        {this.props.art.tokenTitle}
                                    </CardText>
                                    <CardText
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                    }}
                                    >
                                        {Web3.utils.fromWei(
                                this.props.art.tokenSellPrice.toString(),
                                'ether'
                                )}{' '}
                                ETH
                                    </CardText>
                                </div>
                                <div className="ctext1" style={{ padding:'2px'}}>
                                    <p
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                        marginTop:'2%'
                                    }}
                                    >Start Bid : </p>
                                    <p>
                                        <Input
                                        style= {{ width:'80%'}}
                                            type='text'
                                            id='bidPrice'
                                            name='bidPrice'
                                            onChange={
                                                this.handleInputChange
                                            }></Input>
                                    </p>
                                    <p
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                        marginTop:'2%'
                                    }}
                                    > ETH
                                     </p>
                                </div>
                                 <div className="ctext1">
                                    <p
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                        marginTop:'2%'
                                    }}
                                    >Duration : </p>
                                    <p>

                                        <Input
                                        style= {{ width:'80%'}}
                                            type='text'
                                            id='bidPrice'
                                            name='bidPrice'
                                            onChange={
                                                this.handleInputChange
                                            }></Input>
                                    </p>
                                    <p
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                        marginTop:'2%'
                                    }}
                                    >Days </p>
                                </div>
                                <div>
                                <button
                                    className="abtn" style={{
                                        left:'32%', color: 'white', backgroundColor:'#5540C7'
                                    }}
                                        type='submit'
                                        onClick={this.putForSale}>
                                        Confirm
                                    </button>{' '}
                                </div>
                                </CardBody>
                            </Card>
                        </Modal>  */}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              {this.state.delistLoading ? (
                <img height='35' src={loader}/>
              ) : (
                <div></div>
              )}
              {this.state.auctionLoading ? (
                <img height='35' src={loader}/>
              ) : (
                <div></div>
              )}
            </div>
          </CardBody>
        </div>
      </Card>
    );
  }
}

export default Allpatrender;
