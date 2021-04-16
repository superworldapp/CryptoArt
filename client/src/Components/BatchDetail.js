import React, { Component, useEffect, useState } from 'react';
import TableBody from './TableBody';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardImg,
  CardTitle,
  CardImgOverlay,
  CardHeader,
  Col,
  Collapse,
  Table,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import loader from '../images/loader.svg';
import anonUser from '../images/user.png';
import heart from '../images/svg/batchHeart.svg';
import avatar from '../images/svg/batchAvatar.svg';
import heartCard from '../images/svg/heartSvg.svg';
import profileCard from '../images/svg/avatar.svg';
import "./BatchDetail.scss";
import Sound from 'react-sound';
import ReactPlayer from 'react-player';
import arrow from '../images/svg/arrow-up.svg';
// import heart from "../images/svg/Heart.svg";
import dropdownarrow from "../assets/svg/Drop down arrow.svg";
import Web3 from 'web3';
import Axios from "axios";

const ETHER = 1000000000000000000;
export const cardpills = [
  {
    title: 'Ready For Sale',
    class: 'class1',
  },
  {
    title: 'Listing For Sale',
    class: 'class2',
  },
  {
    title: 'Biding',
    class: 'class2',
  },
  {
    title: 'Auction Ongoing',
    class: 'class2',
  },
  {
    title: 'Owned by',
    class: 'class3',
  },
];
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
      BatchDet : [],
      isModalOpen: false,
      sellPrice: 0,
      auctionLoading: false,
      putForSaleLoading: false,
      delistLoading: false,
      listForAuctionSuccess: false,
      listForSaleSuccess: false,
      endAuctionLoading: false,
      endAuctionSuccess: false,
      isArtModalOpen: false,
      ethPrice: {},
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleArtModal = this.toggleArtModal.bind(this);
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

    //this.toggleAuction = this.toggleAuction.bind(this);
  }

  componentDidMount() {
    const getEthDollarPrice = () => {
      try {
        Axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,btc,eur,gpb&include_24hr_change=false`
        ).then((res) => {
          // console.log(typeof res.data.ethereum.usd_24h_change);
          this.setState({ethPrice:res.data.ethereum});
        });
      } catch {
        console.log('could not get the request');
      }
    };
    getEthDollarPrice();
  }

  buyItem = async () => {

    try {
    //function Sale(uint256 _tokenId,uint _sellprice,bool isListed)
      const res = await this.props.contract.methods
        .buyToken(this.props.art._tokenId)
        .send({ from: this.props.accounts,value: this.props.art._sellPrice, gas: 5000000 });
      console.log('res', res);

    } catch(error){
        console.error(error)
    }
  };

  toggleModal1() {
    this.setState({
      isModalOpen1: !this.state.isModalOpen1,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleArtModal() {
    this.setState({
      isArtModalOpen: !this.state.isArtModalOpen,
    });
  }

  toggleAuction() {
    this.setState({
      isModalAucOpen: !this.state.isModalAucOpen,
    });
  }

  toggleListForAuction() {
    this.setState({ listForAuctionSuccess: !this.state.listForAuctionSuccess });
  }

  toggleListForSale() {
    this.setState({ listForSaleSuccess: !this.state.listForSaleSuccess });
  }

  toggleEndAuction() {
    this.setState({ endAuctionSuccess: !this.state.endAuctionSuccess });
  }

  refreshMyArt() {
    if (
      (!this.state.toggleListForSale && !this.state.listForSaleSuccess) ||
      (!this.state.toggleListForAuction && !this.state.listForAuctionSuccess)
    )
      window.location.reload();
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
    this.setState({ putForSaleLoading: true });
    const res = await this.props.contract.methods
      .Sale(
        this.props.art._tokenId,
        (this.state.sellPrice * ETHER).toString(),
        true,
      )
      .send({ from: this.props.accounts, gas: 1000000 });

    console.log('res', res);
    this.setState({ putForSaleLoading: false, listForSaleSuccess: true });
    this.toggleModal();
    console.log(res);
  };
  DeSale = async () => {
    this.setState({ delistLoading: true });
    const res = await this.props.contract.methods
      .Sale(
        this.props.art._tokenId,
        (this.state.sellPrice * ETHER).toString(),
        false,
      )
      .send({ from: this.props.accounts, gas: 1000000 });

    console.log('res', res);
    this.setState({ delistLoading: false });
    window.location.reload();
    console.log(res);
  };
  StartAuction = async () => {
    this.setState({ auctionLoading: true });
    let startprice = "1000000000000000000"
   let times = 1615401942
    const res = await this.props.contract.methods
    .startBid(
      this.props.art._tokenId,
      startprice,
      times
    )
    .send({ from: this.props.accounts, gas: 5000000 });
  console.log('res', res);
    this.setState({ auctionLoading: false, listForAuctionSuccess: true });
    console.log(res);
  };
  EndAuction = async () => {
    this.setState({ endAuctionLoading: true });
    const res = await this.props.contract.methods
    .closeBidOwner(
      this.props.art._tokenId,
    )
      .send({ from: this.props.accounts, gas: 5000000 });
    this.setState({ endAuctionLoading: false, endAuctionSuccess: true });
    console.log(res);
  };
  AddBid = async () => {
    const res = await this.props.contract.methods
    .addBid(
      this.props.art._tokenId,
    )
      .send({ from: this.props.accounts, gas: 1000000, value: 1000000 });
    // window.location.reload();
    console.log(res);
  };
  CloseBid = async () => {
    const res = await this.props.contract.methods
      .closBid(this.props.art._tokenId)
      .send({ from: this.props.accounts, gas: 7000000 });
    console.log(res);
  };

  accUsernameCard = (accNum) => {
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
    else if (accNum === '0xE337525DD5d34fC683f43CbBDF3e1EDe0833B744')
      return '@Viktor';
    else if (accNum === '0x32c93d70E9813fFe62a2fCf6189F14A4ff2e8cB3')
      return '@Alex';
      else if (accNum === '0x483C8624a26acc7C1d5baA6c3648E4A5B64164e0')
      return '@Magdalena';
    else if (accNum === '0xA64a71dAC0F4F61FD1e569F59a31c0860c0A33d5')
      return '@MagdalenaTest';
    else return '@Annonymous';
  };
  render() {
    let but = this.props.art._isSellings ? ' ' : 'hidden';
    let bak = this.props.art._isSellings ? 'bg-success text-white' : '';
    let buk = this.props.art._isBidding ? 'bg-warning' : '';
    let b = this.props.art._isSellings ? 'hidden' : 'abtn';
    let b1 = this.props.art._isSellings ? 'hidden' : 'abtn1';
    let but1 = this.props.art._isSellings ? 'abtn1' : 'hidden';
    let auc1 = this.props.art._isBidding ? 'hidden' : 'abtn';
    let auc2 = this.props.art._isBidding ? 'hidden' : 'abtn1';
    let forAuc = this.props.art._isBidding ? 'visible' : 'invisible';
    let artCreator = this.props.art.tokenCreator;
    let artOwner = this.props.art.tokenOwner;

    let pr =
      Web3.utils.fromWei(this.props.art._sellPrice.toString(), 'ether') == 0
        ? 'invisible'
        : 'visible';
    let reSellOrSell = this.props.art._isSellings;
    let Auc = this.props.art._isBidding;
    let accNum = this.props.art._tokenCreator;
    const displayFileType = () => {
			if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(this.props.BatchCreated._imgUrl)) {
				return (
					<CardImg
            top
            className="card-background-image"
						src={this.props.BatchCreated._imgUrl}
						alt='Card image'
					/>
				);
			} else if (/\.(?:wav|mp3)$/i.test(this.props.BatchCreated._imgUrl)) {
				return (
					<>
						<button
							style={{
								zIndex: '1'
							}}
							onClick={() =>
								this.setState({
									soundPlaying: !this.state.soundPlaying
								})
							}>
							{this.state.soundPlaying ? 'Pause' : 'Play'}
						</button>
						<Sound
							url={this.props.BatchCreated._imgUrl}
							playStatus={
								this.state.soundPlaying
									? Sound.status.PLAYING
									: ''
							}
							playFromPosition={300 /* in milliseconds */}
							onLoading={this.handleSongLoading}
							onPlaying={this.handleSongPlaying}
							onFinishedPlaying={this.handleSongFinishedPlaying}
						/>
					</>
				);
			} else if (
				/\.(?:mov|avi|wmv|flv|3pg|mp4|mpg)$/i.test(
					this.props.BatchCreated._imgUrl
				)
			) {
				return (
					<ReactPlayer
            className="cardVideo"
						// style={{maxWidth: '200px', maxheight:'200px'}}
						loop={true}
						playing={true}
						url={this.props.BatchCreated._imgUrl}
					/>
				);
			}
		};

    const usdPrice = (ethprice) => {
      return (Number(Web3.utils.fromWei(ethprice.toString(), 'ether')))
    }

    const setDate = () => {
    	const milliSec = Number(this.props.art._bidEnd * 1000) - Date.now();
    	let hours = Math.floor((milliSec / (1000 * 60 * 60))).toFixed(0);
    	let minutes = ((milliSec / (1000 * 60)) % 60).toFixed(0)
    	hours = (hours < 10) ? "0" + hours : hours;
    	minutes = (minutes < 10) ? "0" + minutes : minutes;

    	return `${hours} Hrs ${minutes} Min Remaining`
    }

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
    const colorpills = () => {
      if (this.props.art._isSelling) return cardpills[1];
      else if (this.props.art._isBidding) return cardpills[3];
      else return cardpills[0];
    };
    let x = colorpills();

    const img = new Image();
    let orientation;
    img.onload = function () {
      let width = this.width;
      let height = this.height;
      orientation = width < height ? 'portrait' : 'landscape';
    };
    img.src = this.props.BatchCreated._imgUrl;
    img.onload();
// console.log(`==========>this.props.art`, this.props.art);
// console.log(`==========>this.props.BatchCreated`, this.props.BatchCreated);
    return (

      <div>

      {/* <button
        style={{
        border: 'none',
        backgroundColor: 'transparent',
        }}
        onClick={this.toggleArtModal}
      > */}
        <Card className="cardBatchWrapper">
          <Link
            style={{
              color: '#212529',
              textDecoration: 'none'
            }}
            to={`/card/${this.props.art._tokenId}`}>
          {/* <CardImg
            top
            className="card-background-image"
            src={this.props.BatchCreated._imgurl}
            alt='image3'
          /> */}
          {displayFileType()}
          <CardImgOverlay className="cardImgOverlay">
            <div className="userImg">
              <img src={this.props.profileImage || profileCard} alt="userImg"/>
            </div>
            <div className="card-user-heart">
              <img src={heartCard} alt="heart"/>
            </div>
            <CardTitle className="card-user-title">
              {this.props.BatchCreated._tokenBatchName || 'none'}
            </CardTitle>
          </CardImgOverlay>
          <CardBody className="card-body">
            <div className="card-user-body">
              <CardSubtitle className="card-created-by">
                by
              </CardSubtitle>
              <CardSubtitle className="card-subtitle-name">
                {this.accUsernameCard(this.props.BatchCreated._tokenCreator) || ''}
              </CardSubtitle>
            </div>
            <div className='card-text-info'>
              <CardText className="card-text-info-price">
                {
                  Number(Web3.utils.fromWei(this.props.art._sellPrice.toString(), 'ether')) === 0
                  ? Number(Web3.utils.fromWei(this.props.art._bidPrice.toString(), 'ether')).toFixed(2) + ' ' + 'ETH'
                  : Number(Web3.utils.fromWei(this.props.art._sellPrice.toString(), 'ether')).toFixed(2) + ' ' + 'ETH'
                }
                <p className="card-text-info-usd">
                  {
                    Number(Web3.utils.fromWei(this.props.art._sellPrice.toString(), 'ether')) === 0
                  ? `($${(usdPrice(this.props.art._bidPrice)*this.state.ethPrice.usd).toFixed(2)} USD)`
                  : `($${(usdPrice(this.props.art._sellPrice)*this.state.ethPrice.usd).toFixed(2)} USD)`
                  }
                </p>
              </CardText>
              <div>
                <button className='card-buy-button'>{this.props.art._isSellings?'BUY':(this.props.art._isBidding?'BID':'NA')}</button>
              </div>
            </div>
            <div className='card-buy-time'>
              <p className='card-buy-time-text'>
                {/* {this.props.art._bidend} */}
                {
                	(this.props.art._bidEnd === '0') 
                		? ''
                		: Date.now() / 1000 < this.props.art._bidEnd 
                		? setDate()
                		:(this.props.art._isBidding)?(<p className="red">Auction Timer Ended</p>) : ''
                }
              </p>
            </div>
          </CardBody>
          </Link>
        </Card>
      {/*  <Card className='mycollection-card'>*/}
      {/*  <Link*/}
      {/*              style={{*/}
      {/*                  color: '#212529',*/}
      {/*                  textDecoration: 'none'*/}
      {/*              }}*/}
      {/*              to={`/card/${this.props.art._refbatch}`}>*/}
      {/*    <CardImg*/}
      {/*      top*/}
      {/*      // src={this.props.art._imgurl}*/}
      {/*      src={this.props.BatchCreated._imgurl}*/}
      {/*      alt='Card image'*/}
      {/*      style={{*/}
      {/*        width: '98.5%',*/}
      {/*      }}*/}
      {/*    ></CardImg>*/}
      {/*    <CardSubtitle>Bid Price : {this.props.art._bidprice}</CardSubtitle>*/}
      {/*    <CardSubtitle>isBidding? : {this.props.art._isBidding}</CardSubtitle>*/}
      {/*    <CardSubtitle>isSell?{this.props.art._isSellings}</CardSubtitle>*/}
      {/*    <CardSubtitle>sellprice = {this.props.art._sellprice}</CardSubtitle>*/}
      {/*    <CardSubtitle><small>tokenowner = {this.props.art._tokenOwner}</small></CardSubtitle>*/}

      {/*    </Link>*/}
      {/*</Card>*/}
      {/* </button> */}

      {/* Art Modal */}
      <Modal
        isOpen={this.state.isArtModalOpen}
        toggle={this.toggleArtModal}
        onClosed={this.refreshMyArt}
        className='art-modal-popup'
      >
      <img
        src={this.props.art._imgUrl}
        style={{
          height: '75%',
        }} />

      <ModalBody
        style={{
          backgroundColor: '#808080',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
          background: '#FFFFFF',
          borderRadius: '10px',
          width: '600px',
          height: '240px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <p
            style={{
              fontFamily: 'Gibson',
              fontWeight: '700',
              fontSize: '25px',
              lineHeight: '32.55px',
              marginTop: '10px',
            }}
          >
          Back Country Fishing
          </p>
          <p
            style={{
              fontFamily: 'Gibson',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '32.55px',
              marginTop: '-15px'
            }}
          >
            Created By: <span style={{color: '#5540C7'}}>Username</span>
          </p>
          <p
            style={{
              fontFamily: 'Gibson',
              fontWeight: '700',
              fontSize: '14px',
              lineHeight: '18.23px',
              width: '85%',
            }}
          >
            Back Country Fishing was Inspired by my regular weekend trips to the mountains. Max, my dog, would love to sit by the fire as I cast my line to try and catch our dinner.
          </p>
            <div
              style={{display: 'flex', justifyContent: 'space-between', width: '50%', position: 'relative', right: '105px'}}
            >
              <p style={{fontFamily: 'Gibson', fontSize: '14px', fontWeight: '400'}}>Purchased For</p>
              <p style={{fontFamily: 'Gibson', fontSize: '14px', fontWeight: '400'}}>55 &nbsp; ETH</p>
            </div>
            <div
              style={{display: 'flex', justifyContent: 'space-between', width: '50%', position: 'relative', top: '3px', right: '105px'}}
            >
              <p style={{fontFamily: 'Gibson', fontSize: '14px', fontWeight: '400'}}>Owner  #</p>
              <p style={{fontFamily: 'Gibson', fontSize: '14px', fontWeight: '400'}}>3</p>
              <a style={{color: '#5540C7'}}>View Trading History</a>
            </div>
            <Link to='/mystore'><button style={{borderRadius: '10px', backgroundColor: '#5540C7', color: 'white', width: '100px', position: 'relative', top: '-55px', left: '180px'}}>Sell</button></Link>

          </div>
      </ModalBody>


      </Modal>
      {/* */}


      </div>
    );
  }
}


class BatchDetail extends Component{ 
  constructor(props) {
    super(props);
    this.state = {
      readMore: true,
      viewMore: false,
      viewMoreMobile: false,
    }
this.accUsername = this.accUsername.bind(this);
this.displayFileType2 = this.displayFileType2.bind(this);
//this.getCreData = this.getCreData.bind(this);
  }
  // console.log(art);

  // const [ethPrice, setEthPrice] = useState({});
  // const [creValue, setCreValue] = useState([]);
  // const [batchCreated, setBatchCreated] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [handleInput, setHandleInput] = useState('');
  // const [pay, setPay] = useState(0);
  // const [loadingPurchase, setLoadingPurchase] = useState(false);
  // const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  // const [loadingPlaceBid, setLoadingPlaceBid] = useState(false);
  // const [bidSuccess, setBidSuccess] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [dropdownValue, setDropdownValue] = useState('');
  // const changeValue = (e) => {
  //   setDropdownValue(e.currentTarget.textContent);
  // };
  // const [isOpen, setIsOpen] = useState(false);

  // const collapsetoggle = () => setIsOpen(!isOpen);

  // const toggle = () => setDropdownOpen((prevState) => !prevState);
 

  displayFileType2 = () => {
    if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(this.props.BatchCreated[0]?._imgUrl)) {
      return (
       
        <img src={this.props.BatchCreated[0]?._imgUrl} className="batchImg" alt='batch img'/>
      );
    } else if (/\.(?:wav|mp3)$/i.test(this.props.BatchCreated[0]?._imgUrl)) {
      return (
        <>
          <button
            style={{
              zIndex: '1'
            }}
            onClick={() =>
              this.setState({
                soundPlaying: !this.state.soundPlaying
              })
            }>
            {this.state.soundPlaying ? 'Pause' : 'Play'}
          </button>
          <Sound
            url={this.props.BatchCreated[0]?._imgUrl}
            playStatus={
              this.state.soundPlaying
                ? Sound.status.PLAYING
                : ''
            }
            playFromPosition={300 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
          />
        </>
      );
    } else if (
      /\.(?:mov|avi|wmv|flv|3pg|mp4|mpg)$/i.test(
        this.props.BatchCreated[0]?._imgUrl
      )
    ) {
      return (
        <ReactPlayer
          className="batchVideo"
          loop={true}
          playing={true}
          url={this.props.BatchCreated[0]?._imgUrl}
        />
      );
    }
  };
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

  scrollUp = () => {
    window.scrollTo(0,0);
  }

render(){
  const isMobile = window.innerWidth < 500;

  let tokenInBatch;
console.log(`==========>this.props`, this.props);
    //getCreData();
    
     console.log(this.props.BatchCreated[0])
     let batchID = this.props.matchId; 
     tokenInBatch = this.props.allTokens?.filter((x) => x._refBatch == batchID);
     console.log('Header', tokenInBatch);
      let newTokenBatch;
      let newTokenBatchMobile;

     if(!this.state.viewMore){
       newTokenBatch = tokenInBatch?.slice(0,15)
     }
     if(!this.state.viewMoreMobile) {
       newTokenBatchMobile = tokenInBatch?.slice(0,4)
     }
     const Menu = (!isMobile
       ? this.state.viewMore ? tokenInBatch : newTokenBatch
       : this.state.viewMoreMobile ? tokenInBatch : newTokenBatchMobile)?.map((x) => {
      return (
        <div key={1}>
          <Allpatrender
            art={x}
            contract={this.props.contract}
            accounts={this.props.accounts}
            BatchCreated={this.props.BatchCreated[0]}
          />
        </div>
      );
    });
  const text = 'The exhibition titled ‘Goliaths, Tanks’ is an amalgamation of her paintings and objects A together in her site-specific ' +
    'installations and multi-media projections, accompanied by performance pieces. The movement in each object resonating with the sound ' +
    'of ticking clocks serenely draws out the muted anxiety underlying the division of Korean peninsula following the war in the 1950’s. ' +
    'The ensemble takes place at the Peace Culture Bunker The exhibition titled ‘Goliaths, Tanks’ is an amalgamation of her paintings and objects ' +
    'A together in her site-specific installations and multi-media projections, accompanied by performance pieces. The movement in each object ' +
    'resonating with the sound of ticking clocks serenely draws out the muted anxiety underlying the division of Korean peninsula following the ' +
    'war in the 1950’s. The ensemble takes place at the Peace Culture Bunker'

  return (
    <>
      <div className="batchWrapper">
        <div className="batchView">
          <div className="batchImgBlock">
            <a href={this.props.BatchCreated[0]?._imgUrl} target='_blank'>
              {this.displayFileType2()}
            </a>
          </div>
          <div className="batchInfo">
            <div className="batchHeader">
              <div className="batchName">
                {this.props.BatchCreated[0]?._tokenBatchName}
              </div>
              <div><img src={heart} alt="heart" className="imgHeart"/></div>
            </div>
            <div className="batchSell">
              <div className="batchStart">
                Starting from 6.5ETH
              </div>
              <div className="batchRemain">
                x of {this.props.BatchCreated[0]?._mintedEditions} Remaining
              </div>
            </div>
            <div className="batchCreator">
              <div className="batchImgCreator">
                <img src={avatar} alt="avatar"/>
              </div>
              <div className="batchName">
                Created by&nbsp;
                <div className="batchNameArtist">{this.accUsername(this.props.BatchCreated[0]?._tokenCreator)}</div>
              </div>
            </div>
            <div className="batchDesc">
              <div className="batchDescTitle">Description</div>
              <div className={`${this.state.readMore ? 'batchTextContent' : 'batchTextContent batchTextContentActive'}`}>
                <div className={`${!this.state.readMore ? 'batchDescText' : 'batchDescTextActive'}`}>{text}</div>
                {text.length > 800 && <span className="batchTextReadMore" onClick={() => {
                  this.setState({
                    readMore: !this.state.readMore
                  })
                }}>... <span>Read More</span></span>}
              </div>
            </div>
          </div>
        </div>
        {!isMobile ? (
          <div className="batchCards">
            <div className="batchCardsHead">
              <div className="batchToken">All Tokens</div>
              <div className="batchViewMore">{tokenInBatch?.length > 15
                ? <div onClick={() => this.setState({viewMore: !this.state.viewMore})}>
                  View More
                </div>
                : ''}
              </div>
            </div>
            <div className="batchCards">
              {Menu}
            </div>
          </div>
        ) : (
          <div className="batchCards">
            <div className="batchCardsHead">
              <div className="batchToken">All Tokens</div>
            </div>
            <div className="batchCards">
              {Menu}
            </div>
            <div className="batchViewMore">{tokenInBatch?.length > 4
              ? <button
                className={`${!this.state.viewMoreMobile ? 'buttonViewMore' : 'buttonViewMoreM'}`}
                onClick={() => this.setState({viewMoreMobile: !this.state.viewMoreMobile})}>
                more
              </button>
              : ''}
            </div>
            {this.state.viewMoreMobile &&
              <button className="buttonUp" onClick={this.scrollUp}>
                <img src={arrow} alt="arrow"/>
              </button>
            }
          </div>
        )}
      </div>
      
    </>
  );
};
}

export default BatchDetail;
