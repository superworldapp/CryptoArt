import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import moment from 'moment';
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
  CardImgOverlay,
  Badge,
  CardSubtitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Row,
} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Web3 from 'web3';
import { render } from 'react-dom';
import Axios from 'axios';
<<<<<<< HEAD
import './MyArtComponent.scss';
=======
import './MyArtComponent.css';
import './MyCollections.css'
import './MyStore.css'
>>>>>>> tim
import * as aws from 'aws-sdk';
import * as dotenv from 'aws-sdk';
import * as fs from 'fs';
import * as util from 'util';
import test1img from '../images/image 25.png'
import test2img from '../images/image 11.png'
import test3img from '../images/Nate3.jpg'
import test4img from '../images/image 29.png'
import loader from '../images/loader.svg';
import annonuser from '../images/user.png';
// import { blobToSHA256 } from 'file-to-sha256';
import checkmark from '../images/svg/checkmark.svg';
const SHA256 = require('crypto-js/sha256');

const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');

const path = require('path');

const BUCKET_NAME = 'superworldapp';

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:f7692b7a-0050-4823-9df7-1ab52e23b6c9',
  }),
});
const s3 = new S3();

let allDocs = [];
const ETHER = 1000000000000000000;

const cardpills = [
  {
    title: '',
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
    this.toggleArtModal = this.toggleArtModal.bind(this);
    //this.toggleAuction = this.toggleAuction.bind(this);
  }
  buyItem = async () => {

    try {
    //function Sale(uint256 _tokenId,uint _sellprice,bool isListed)
      const res = await this.props.contract.methods
        .buyToken(this.props.art._tokenId)
        .send({ from: this.props.accounts,value: this.props.art._sellprice, gas: 5000000 });
      console.log('res', res);

    } catch(error){
        console.error(error)
    }
  };
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
    const res = await this.props.contract.methods
      .startbid(this.props.art.tokenIdentifier)
      .send({ from: this.props.accounts, gas: 1000000 });
    this.setState({ auctionLoading: false, listForAuctionSuccess: true });
    console.log(res);
  };
  EndAuction = async () => {
    this.setState({ endAuctionLoading: true });
    const res = await this.props.contract.methods
      .closeBidOwner(this.props.art.tokenIdentifier)
      .send({ from: this.props.accounts, gas: 7000000 });
    this.setState({ endAuctionLoading: false, endAuctionSuccess: true });
    console.log(res);
  };
  AddBid = async () => {
    const res = await this.props.contract.methods
      .addBid(this.props.art.tokenIdentifier)
      .send({ from: this.props.accounts, gas: 1000000, value: 1000000 });
    // window.location.reload();
    console.log(res);
  };
  CloseBid = async () => {
    const res = await this.props.contract.methods
      .closBid(this.props.art.tokenIdentifier)
      .send({ from: this.props.accounts, gas: 7000000 });
    console.log(res);
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

    // console.log(this.props)
    return (
<<<<<<< HEAD
      // <div>
      // {cardpills.map((item) => {
      //   return (
      <Card
        className={buk}//{this.props.art._isBidding ? buk : bak}
        className='card-artcard'
      >
        {/* <a href={this.props.art.imgurl} target='_blank'> */}
        <div className='card-img-top-all-art'>
          {/* <Link to={`/card/${this.props.art._tokenId}`}> */}
          <Link to={`/batch/${this.props.art._batchId}`}>
            <CardImg
              className={orientation}
              top
              src={this.props.art._imgurl}
=======
      <div>
        {/* <a href={this.props.art.imgurl} target='_blank'> */}
        <div className='card-img-top-all-art'>
        <button onClick={this.toggleArtModal} className='my-collection-art-img-box'>
            <CardImg
              src={this.props.art.imgurl}
>>>>>>> tim
              alt='Card image'
            ></CardImg>
          </button>
        </div>

<<<<<<< HEAD
        <CardBody className='all-art-body'>
          <div>
            <div
              style={{
                display: 'flex',
                // justifyContent: 'flex-start',
              }}
            >
              <CardSubtitle>
                <img
                  style={{ marginRight: '30px' }}
                  width='16px'
                  height='16px'
                  className='rounded-circle'
                  src={annonuser}
                ></img>
              </CardSubtitle>
              <CardSubtitle
                style={{
                  fontFamily: 'Gibson',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#888888',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                {' '}
                Created by <div className='token-creator'>{accUsername(this.props.art._tokenCreator)} </div>
              </CardSubtitle>
            </div>

            {/* <CardTitle className="ctext">
                        Item Title : {this.props.art.tokenTitle} {this.props.art.tokenCreator}
                    </CardTitle> */}
            <div className='ctext'>
              <CardText
                style={{
                  position: 'relative',
                  fontFamily: 'Gibson',
                  fontSize: '13px',
                  color: '#B3B3B3',
                  fontWeight: 'bold',
                }}
              >
                {' '}
                Title
              </CardText>
              <CardText
                style={{
                  position: 'relative',
                  fontFamily: 'Gibson',
                  fontSize: '13px',
                  color: '#B3B3B3',
                  fontWeight: 'bold',
                }}
              >
                Price
              </CardText>
            </div>
            <div className='ctext' style={{ height: '2rem' }}>
              <CardText
                style={{
                  position: 'relative',
                  fontFamily: 'Gibson',
                  fontSize: '13px',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                {this.props.art?._tokenBatchName}
              </CardText>
              {/* <CardText
                style={{
                  position: 'relative',
                  fontFamily: 'Gibson',
                  fontSize: '13px',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                {Web3.utils.fromWei(
                  this.props.art._sellprice.toString(),
                  'ether'
                )}{' '}
                ETH
              </CardText> */}
            </div>
            {/* <CardText>
                        <small>
                            Item Creator : {this.props.art.tokenCreator}
                        </small>
                    </CardText>
                    <CardText className={pr}>
                        <small>
                            Item Sell Price :{' '}
                            {Web3.utils.fromWei(
                                this.props.art.tokenSellPrice.toString(),
                                'ether'
                            )}{' '}
                            ETH
                        </small>
                    </CardText> */}
          </div>
          <div
            className='ctext'
            style={{ padding: '0px', height: '2rem', marginTop: '5%' }}
          >
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
                //className='abtn' style ={{ color :'white', backgroundColor:"#5540C7"}}
                // color='primary'
                onClick={this.toggleModal}
              >
                Sell
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
=======
        {/* Art Modal */}
        {this.state.isArtModalOpen && (
            <div className='my-collection-modal-bg'>
            <div className='my-collection-modal-art-img-container'>
                <img src={this.props.art.imgurl} className='my-collection-modal-art-img' alt='my-collection-art' />
            </div>
            <div className='my-collection-modal-art-description-container'>
                <span className='my-collection-modal-art-description-line1'><h3>{this.props.art.tokenTitle}</h3><button className='my-collection-modal-close-btn' onClick={this.toggleArtModal}>X</button></span>
                <span className='my-collection-modal-art-description-line2'><h5 className='my-collection-modal-created'>Created by:</h5><h className='my-collection-modal-user'>{accUsername(artCreator)}</h></span>
                <p className='my-collection-modal-art-description-line3'>Back Country Fishing was Inspired by my regular weekend trips to the mountains. 
                Max, my dog, would love to sit by the fire as I cast my line to try and catch our dinner.</p>
                <span className='my-collection-modal-art-description-line4'><p>Purchased For</p><p className='my-collection-modal-art-price'>
                {Web3.utils.fromWei(
                        this.props.art.tokenSellPrice.toString(),
                        'ether'
                      )}
                 &nbsp; ETH</p></span>
                <span className='my-collection-modal-art-description-line5'><p>Owner {accUsername(artOwner)} #</p><p className='my-collection-modal-art-owner-count'>3</p><p className='my-collection-modal-art-trading-history'>View Trading History</p></span>
                <Link to='/mystore'><button className='my-collection-sell-btn'>Sell</button></Link>
            </div>
        </div>
        )}
      {/* */}

       
      </div>
    );
  }
}

class MyCollections extends Component {
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
      nos: 0,
      isLoading: false,
      loadingError: false,
      uploadSuccess: false,
      selectedGallery: '',
      isGalleryModalOpen: false,
    };
    this.toggleModal1 = this.toggleModal1.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.handleUploadMore = this.handleUploadMore.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.fileAwsHandler = this.fileAwsHandler.bind(this);
    this.refreshMyArt = this.refreshMyArt.bind(this);
    this.dropdown = this.dropdown.bind(this)
    this.toggleGalleryModal = this.toggleGalleryModal.bind(this)
  }

  toggleModal1() {
    this.setState({
      isModalOpen1: !this.state.isModalOpen1,
    });
  }

  toggleModal2() {
    this.setState({
      uploadSuccess: !this.state.uploadSuccess,
    });
  }

  refreshMyArt() {
    if (!this.state.isModalOpen1 && !this.state.uploadSuccess)
      window.location.reload();
  }

  handleUploadMore() {
    this.toggleModal2();
    this.toggleModal1();
  }
  creatingItems = async (x) => {
    let tokenHash = this.state.artHash.toString();
    let tokenTitle = this.state.title;
    let tokenPrice = (this.state.price * ETHER).toString();
    let imgUrl = x;
    let nos = this.state.nos;
    console.log(tokenHash, tokenTitle, tokenPrice, imgUrl, nos);

    try {
      const res = await this.props.contract.methods
        .batchCreator(
          tokenHash,
          tokenTitle,
          (this.state.price * ETHER).toString(),
          imgUrl,
          nos
        )
        .send({ from: this.props.accounts, gas: 5000000 });

      console.log('res', res);
      let data;

      if (Array.isArray(res.events.tokencreated)) {
        data = await res.events.tokencreated.map((token) =>
          Axios.post(`http://geo.superworldapp.com/api/json/token/add`, {
            tokenId: token.returnValues.tokenId.toString(),
            description: 'A unique piece of art',
            image: imgUrl,
            name: tokenTitle,
            blockchain: 'e',
            networkId: 4,
            price: tokenPrice,
          })
        );
      } else {
        data = await Axios.post(
          `http://geo.superworldapp.com/api/json/token/add`,
          {
            tokenId: res.events.tokencreated.returnValues.tokenId.toString(),
            description: 'A unique piece of art',
            image: imgUrl,
            name: tokenTitle,
            blockchain: 'e',
            networkId: 4,
            price: tokenPrice,
          }
        );
      }

      console.log('data', data);
      this.toggleModal1();
      this.setState({ isLoading: false, uploadSuccess: true });
    } catch (err) {
      this.setState({ loadingError: true });
      console.error(err.message);
    }
    this.setState({ isLoading: false });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  async componentDidMount() {
    let res = await this.props.contract?.methods.tokenCount().call();
    console.log(res);

    let response = [];
    let createrToken = [];
    for (let i = 1; i <= res; i++) {
      let rex = await this.props.contract?.methods.Arts(i).call();
      if (rex.tokenOwner == this.props.accounts) {
        response.push(rex);
      } else if (rex.tokenCreator == this.props.accounts) {
        createrToken.push(rex);
      }
    }
    console.log(createrToken);
    allDocs = [];
    allDocs = response;
    console.log(response);
    this.setState({ art: allDocs });
  }
  fileSelectHandler = (event) => {
    console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files[0],
    });
  };
  fileUploadHandler = async (event) => {
    event.preventDefault();
    // const hash = await blobToSHA256(this.state.selectedFile);
    let hash = '';
    this.setState({ isLoading: true, loadingError: false, artHash: hash });
    this.fileAwsHandler(this.state.selectedFile, this.creatingItems);
  };

  fileAwsHandler = async (file, callback) => {
    console.log(file);
    let newfilename = `image_${Date.now()}${path
      .extname(file.name)
      .toLowerCase()}`;
    console.log(newfilename);
    let params = {
      ACL: 'public-read',
      Bucket: BUCKET_NAME,
      Key: 'marketplace/' + newfilename,
      ContentType: file.type,
      Body: file,
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log('error :', err);
      } else {
        callback(
          `https://superworldapp.s3.amazonaws.com/marketplace/${newfilename}`
        );
      }
    });
  };

  toggleGalleryModal() {
      this.setState({
          isGalleryModalOpen: !this.state.isGalleryModalOpen,
      });
  }

  dropdown(e) {
      this.setState({selectGallery: e.target.value})
  }

  render() {
    const Menu = this.state.art.map((x) => {
      return (
        <div key={x.tokenIdentifier} className='col-4 col-md-3'>
          <Allpatrender
            art={x}
            contract={this.props.contract}
            accounts={this.props.accounts}
          />
          <br />
          <br />
        </div>
      );
    });

    let ch = 'visible';
    return (
      <div className='my-collection-container'>

        <div className='my-collection-header'>
            <h1>MyCollection</h1>
            <p>172 &nbsp; NFT's</p>
        </div>

        <div className='my-collection-row'>
          <div className='my-collection-filter-container'>
            <p style={{ fontWeight: '900', fontSize: '18px' }}>SORT BY:</p>
            <select id="dropdown" onChange={this.dropdown} className='dropdown-button'>
                <option value="" className="option-selected">New</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <br />
            <br />
            <p style={{ fontWeight: '900', fontSize: '18px'}}>GALLERIES:</p>
            <p style={{fontSize:'24px', marginTop:'-15px'}}>Abstract</p>
            <p style={{fontSize:'24px'}}>Nature</p>
            <button onClick={this.toggleGalleryModal} className='add-button'>+ Add</button>
        </div>


      <div className='my-collection-art-container'>{Menu}</div>

        <Modal
          isOpen={this.state.isModalOpen1}
          toggle={this.toggleModal1}
          onClosed={this.refreshMyArt}
          className='uploadpopup'
        >
          <ModalHeader toggle={this.toggleModal1}>
            <p
              style={{
                fontFamily: 'Gibson',
                fontSize: '25px',
                fontWeight: '800',
                marginTop: '10px',
                textAlign: 'left',
                marginLeft: '7px',
                marginBottom: '0rem',
                textTransform: 'uppercase',
              }}
            >
              Upload New Item
            </p>
            <p
              style={{
                fontFamily: 'Gibson',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'left',
                marginLeft: '7px',
              }}
            >
              Image, Video, Audio or 3D Model
            </p>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label
                  htmlFor='artHash'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  File to Upload
                </Label>
                <Input
                  //style={{ marginLeft: '1.0rem' }}
                  type='file'
                  onChange={this.fileSelectHandler}
                />
              </FormGroup>

              <FormGroup>
                <Label
                  htmlFor='title'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  Name*
                </Label>
                <Input
                  type='text'
                  id='title'
                  name='title'
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  htmlFor='title'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  Description
                </Label>
                <Input
                  type='textarea'
                  id='des'
                  name='des'
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  htmlFor='price'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  Token Price
                </Label>
                <Input
                  style={{ width: '50%' }}
                  type='text'
                  id='price'
                  name='price'
                  onChange={this.handleInputChange}
                />
                <Label
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  {' '}
                  ETH
                </Label>
              </FormGroup>
              <FormGroup>
                <Label
                  htmlFor='nos'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  No. of Tokens
                </Label>
                <Input
                  style={{ width: '40%', marginRight: '11rem' }}
                  placeholder='1'
                  type='number'
                  id='nos'
                  name='nos'
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <br />
              <button
                className='abtn'
                style={{
                  color: 'white',
                  left: '9rem',
                  backgroundColor: '#5548C7',
                  fontSize: '18px',
                }}
                //color='primary'
                onClick={this.fileUploadHandler}
              >
                Upload
              </button>
              {this.state.isLoading ? (
                <img
                  style={{ display: 'flex', verticalAlign: 'none' }}
                  src={loader}
                />
              ) : (
                <div></div>
              )}
              {this.state.loadingError ? (
                <div style={{ color: 'red', fontFamily: 'Gibson' }}>
                  There was a transaction/processing error. Please try again.
                </div>
              ) : (
                <div></div>
              )}
              <br />
            </Form>
          </ModalBody>
        </Modal>

        {/* UPLOAD SUCCESS MODAL */}

        <Modal
          isOpen={this.state.uploadSuccess}
          onClosed={this.refreshMyArt}
          toggle={this.toggleModal2}
          className='modal-xl'
        >
          <ModalHeader toggle={this.toggleModal2}>
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
            <img src={checkmark} />
            <p
              style={{
                textAlign: 'center',
                fontSize: '1.25rem',
                fontWeight: '450',
                marginTop: '1rem',
              }}
            >
              Hi, your upload was successful!
            </p>
            <p style={{ textAlign: 'center', color: 'gray', fontSize: '12px' }}>
              You can view your recent uploaded file under “MY COLLECTIONS”
            </p>
            <button className='upload-more-btn' onClick={this.handleUploadMore}>
              Upload More
            </button>
          </ModalBody>
        </Modal>

        {/* Gallery Modal */}
        {this.state.isGalleryModalOpen && (
              <div className='my-collection-modal-bg my-collection-gallery-modal '>
                  <h1 className='my-collection-gallery-modal-heading'>Enter Title</h1>
                  <span className='my-collection-gallery-modal-span'><input type='text' className='my-collection-gallery-input' placeholder='Search MyCollection' /><button className='my-collection-gallery-done-btn'>Done</button><button onClick={this.toggleGalleryModal} className='my-collection-gallery-cancel-btn'>Cancel</button></span>
                  <div className='my-collection-gallery-modal-art-container'>
                      <div className='my-collection-gallery-modal-art-img-container'>
                          <img src={test1img } />
                      </div>
                      <div className='my-collection-gallery-modal-art-img-container'>
                          <img src={test2img } />
                      </div>
                      <div className='my-collection-gallery-modal-art-img-container'>
                          <img src={test3img } />
                      </div>
                      <div className='my-collection-gallery-modal-art-img-container'>
                          <img src={test4img } />
                      </div>
                  </div>
              </div>   
          )}
        {/* */}

       
        </div>
      </div>
    );
  }
}

export default MyCollections;



export class MyStore extends Component {
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
      nos: 0,
      isLoading: false,
      loadingError: false,
      uploadSuccess: false,
      artStatus: 'Queue',
      isListModalOpen: false,
      isUploadModalOpen: false,
      isEditModalOpen: false,
      isModalOpen: false,
    };
    this.toggleModal1 = this.toggleModal1.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.handleUploadMore = this.handleUploadMore.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.fileAwsHandler = this.fileAwsHandler.bind(this);
    this.refreshMyArt = this.refreshMyArt.bind(this);
    this.storeQueue = this.storeQueue.bind(this)
    this.storeActive = this.storeActive.bind(this);
    this.listToggleModal = this.listToggleModal.bind(this);
    this.uploadToggleModal = this.uploadToggleModal.bind(this);
    this.editToggleModal = this.editToggleModal.bind(this);
  }

  toggleModal1() {
    this.setState({
      isModalOpen1: !this.state.isModalOpen1,
    });
  }

  toggleModal2() {
    this.setState({
      uploadSuccess: !this.state.uploadSuccess,
    });
  }

  listToggleModal() {
    this.setState({
      isListModalOpen: !this.state.isListModalOpen,
    });
  }

  uploadToggleModal() {
    this.setState({
        isUploadModalOpen: !this.state.isUploadModalOpen,
    });
  }

  editToggleModal() {
    this.setState({
        isEditModalOpen: !this.state.isEditModalOpen,
    });
  }

  storeQueue() {
    this.setState({
        artStatus: 'Queue',
    })
  }

  storeActive() {
      this.setState({
          artStatus: 'Active',
      })
  }

  refreshMyArt() {
    if (!this.state.isModalOpen1 && !this.state.uploadSuccess)
      window.location.reload();
  }

  handleUploadMore() {
    this.toggleModal2();
    this.toggleModal1();
  }
  creatingItems = async (x) => {
    let tokenHash = this.state.artHash.toString();
    let tokenTitle = this.state.title;
    let tokenPrice = (this.state.price * ETHER).toString();
    let imgUrl = x;
    let nos = this.state.nos;
    console.log(tokenHash, tokenTitle, tokenPrice, imgUrl, nos);

    try {
      const res = await this.props.contract.methods
        .batchCreator(
          tokenHash,
          tokenTitle,
          (this.state.price * ETHER).toString(),
          imgUrl,
          nos
        )
        .send({ from: this.props.accounts, gas: 5000000 });

      console.log('res', res);
      let data;

      if (Array.isArray(res.events.tokencreated)) {
        data = await res.events.tokencreated.map((token) =>
          Axios.post(`http://geo.superworldapp.com/api/json/token/add`, {
            tokenId: token.returnValues.tokenId.toString(),
            description: 'A unique piece of art',
            image: imgUrl,
            name: tokenTitle,
            blockchain: 'e',
            networkId: 4,
            price: tokenPrice,
          })
        );
      } else {
        data = await Axios.post(
          `http://geo.superworldapp.com/api/json/token/add`,
          {
            tokenId: res.events.tokencreated.returnValues.tokenId.toString(),
            description: 'A unique piece of art',
            image: imgUrl,
            name: tokenTitle,
            blockchain: 'e',
            networkId: 4,
            price: tokenPrice,
          }
        );
      }

      console.log('data', data);
      this.toggleModal1();
      this.setState({ isLoading: false, uploadSuccess: true });
    } catch (err) {
      this.setState({ loadingError: true });
      console.error(err.message);
    }
    this.setState({ isLoading: false });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  async componentDidMount() {
    let res = await this.props.contract?.methods.tokenCount().call();
    console.log(res);

    let response = [];
    let createrToken = [];
    for (let i = 1; i <= res; i++) {
      let rex = await this.props.contract?.methods.Arts(i).call();
      if (rex.tokenOwner == this.props.accounts) {
        response.push(rex);
      } else if (rex.tokenCreator == this.props.accounts) {
        createrToken.push(rex);
      }
    }
    console.log(createrToken);
    allDocs = [];
    allDocs = response;
    console.log(response);
    this.setState({ art: allDocs });
  }
  fileSelectHandler = (event) => {
    console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files[0],
    });
  };
  fileUploadHandler = async (event) => {
    event.preventDefault();
    // const hash = await blobToSHA256(this.state.selectedFile);
    let hash = '';
    this.setState({ isLoading: true, loadingError: false, artHash: hash });
    this.fileAwsHandler(this.state.selectedFile, this.creatingItems);
  };

  fileAwsHandler = async (file, callback) => {
    console.log(file);
    let newfilename = `image_${Date.now()}${path
      .extname(file.name)
      .toLowerCase()}`;
    console.log(newfilename);
    let params = {
      ACL: 'public-read',
      Bucket: BUCKET_NAME,
      Key: 'marketplace/' + newfilename,
      ContentType: file.type,
      Body: file,
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log('error :', err);
      } else {
        callback(
          `https://superworldapp.s3.amazonaws.com/marketplace/${newfilename}`
        );
      }
    });
  };

  

  render() {


    let ch = 'visible';
    return (
      <div className='mystore-container'>
        <div className='mystore-header'>
              <h1>MyStore</h1>
              <span><p>NFT'S LISTED</p><p>0</p></span>
              <span><p>NFT'S SOLD</p><p>0</p></span>
          </div>

          <div className='mystore-art-container'>
            <div className='mystore-art-container-header'>
                <button onClick={this.storeQueue}><h2 className="mystore-active">QUEUE (1)</h2></button>
                <button onClick={this.storeActive}><h2>ACTIVE</h2></button>
                <button><h2>ENDED</h2></button>
                <button><h2>OFFERS</h2></button>
            </div>
            {this.state.artStatus === 'Queue' && (
                <div className='mystore-art-pieces'>
                    <div className='mystore-art-piece'>
                        <img src={test1img } alt='art-1'/>
                        <div className='mystore-art-caption'>
                            <h2>Back Country Fishing</h2>
                            <button onClick={this.listToggleModal} className='mystore-list-btn'>List</button>
                        </div>
                    </div>
                    <div className='mystore-upload-art'>
                        <button onClick={this.uploadToggleModal} className='mystore-upload-btn'>
                            <div className='mystore-upload-add'>+</div>
                        </button>
                    </div>
                </div>    
            )}

            {this.state.artStatus === 'Active' && (
                <div className='mystore-art-pieces'>
                    <div className='mystore-art-piece'>
                        <img src={test2img } alt='art-1'/>
                        <div className='mystore-art-caption'>
                            <h2>Leopard</h2>
                            <span className='mystore-art-caption-line2'><p>1.00 ETH</p><button onClick={this.editToggleModal} className='mystore-edit-btn'>Edit</button></span>
                            <p className='mystore-art-caption-usd'>($1,580.10 USD)</p>
                        </div>
                    </div>
                </div>  
            )}
        </div>

        {/* List Modal */}
        {this.state.isListModalOpen && (
                <div>
                  <div className='mystore-modal-bg'>
                      <div className='mystore-modal'>
                          <div className='mystore-resale-container'>
                          <span className='mystore-resale-header'>
                              <h3>NFT RESALE</h3>
                              <button onClick={this.listToggleModal} className='mystore-resale-close'>X</button>
                          </span>
                              
                              <p className='mystore-resale-description'>Image, Video, Audio or 3D Model</p>
                              <div className='mystore-body-container'>
                                  <span className='mystore-body-line-1'><h4>File</h4><p className='mystore-body-line-1-p'>BackCountry...png</p></span>
                                  <span className='mystore-body-line-2'><h4>Auction</h4><input type='checkbox' className='mystore-body-line-2-checkbox'></input></span>
                                  <span className='mystore-body-line-3'><h4>Buy Now</h4><input type='checkbox' className='mystore-body-line-3-checkbox'></input></span>
                                  <span className='mystore-body-line-4'><h4>Token Price*</h4><input className='mystore-token-price'></input><p className='mystore-token-type'>ETH &nbsp;</p><p className='mystore-token-usd'>($1,580.10 USD)</p></span>
                                  <p className='mystore-body-line-4-subtitle'>(State Price if Auction)</p>
                                  <span className='mystore-body-line-5'><h4>Duration*</h4><input className='mystore-token-days'></input><p className='mystore-token-duration-subtitle'>Days</p></span>
                                  <button className='mystore-resale-btn'>Confirm</button>
                              </div>
                          </div>
                      </div>
                  </div>
          </div>
            )}
        {/* */}

          {/* Upload Modal */}
          {this.state.isUploadModalOpen && (
                <div className='mystore-modal-bg'>
                    <div className='upload-modal'>
                        <div className='upload-modal-container'>
                            <span className='upload-modal-header'>
                                <h3>UPLOAD TO MYSTORE</h3>
                                <button onClick={this.uploadToggleModal} className='upload-modal-close-btn'>X</button>
                            </span>
                            <p>Image, Video, Audio or 3D Model</p>
                            <span className='upload-modal-line1'><h4>File to Upload*</h4><button>Browse...</button><p>Leopard.png</p></span>
                            <span className='upload-modal-line2'><h4>Name*</h4><input type='text' placeholder='Leopard'/></span>
                            <span className='upload-modal-line3'><h4>Description</h4><input type='text' placeholder='Leopard'/></span>
                            <span className='upload-modal-line4'><h4>No. of Tokens</h4><input type='text' placeholder='Leopard'/></span>
                            <button className='upload-modal-btn'>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        {/* */}
>>>>>>> tim


         {/* Edit Modal */}
         {this.state.isEditModalOpen && (
              <div className='mystore-modal-bg'>
              <div className='mystore-modal edit-modal'>
                  <div className='mystore-resale-container edit-modal-container'>
                          <span className='mystore-edit-modal-header'>
                              <h3>EDIT LISTING</h3>
                              <button onClick={this.editToggleModal} className='mystore-edit-close-btn'>X</button>
                          </span>
                          <p className='mystore-resale-description'>Image, Video, Audio or 3D Model</p>
                          <div className='mystore-body-container'>
                              <span className='mystore-body-line-1'><h4>File</h4><p className='mystore-body-line-1-p'>BackCountry...png</p></span>
                              <span className='mystore-body-line-2'><h4>Auction</h4><input type='checkbox' className='mystore-body-line-2-checkbox'></input></span>
                              <span className='mystore-body-line-3'><h4>Buy Now</h4><input type='checkbox' className='mystore-body-line-3-checkbox'></input></span>
                              <span className='mystore-body-line-4'><h4>Token Price*</h4><input className='mystore-token-price'></input><p className='mystore-token-type'>ETH &nbsp;</p><p className='mystore-token-usd'>($1,580.10 USD)</p></span>
                              <p className='mystore-body-line-4-subtitle'>(State Price if Auction)</p>
                              <span className='mystore-body-line-5'><h4>Duration*</h4><input className='mystore-token-days'></input><p className='mystore-token-duration-subtitle'>Days</p></span>
                              <button className='mystore-relist-btn'>Relist</button>
                              <button className='mystore-takedown-btn'>Take Down</button>
                          </div>
                      </div>
                  </div>
              </div>
          )}
          {/* */}

          {/* Modal Resale */}
          <Modal
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
<<<<<<< HEAD
                  src={this.props.art._imgurl}
=======
                  // src={this.props.art.imgurl}
>>>>>>> tim
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
                    {/* <CardSubtitle
                      style={{
                        position: 'relative',
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: '#B3B3B3',
                      }}
                    >
                      Price
                    </CardSubtitle> */}
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
<<<<<<< HEAD
                      {this.props.art._tokenBatchName}
=======
                      {/* {this.props.art.tokenTitle} */}
>>>>>>> tim
                    </CardText>
                    {/* <CardText
                      style={{
                        position: 'relative',
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: 'black',
                      }}
                    >
<<<<<<< HEAD
                      {Web3.utils.fromWei(
                        this.props.art._sellprice.toString(),
=======
                      {/* {Web3.utils.fromWei(
                        this.props.art.tokenSellPrice.toString(),
>>>>>>> tim
                        'ether'
                      )}{' '} */}
                      ETH
                    </CardText> */}
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
            </Modal>
            {/* */}

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
                <img src={checkmark} />
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
          {/* */}


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
                <img src={checkmark} />
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
            {/* */}

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
                <img src={checkmark} />
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
<<<<<<< HEAD
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {this.state.delistLoading ? (
              <img height='35' src={loader} />
            ) : (
              <div></div>
            )}
            {this.state.auctionLoading ? (
              <img height='35' src={loader} />
            ) : (
              <div></div>
            )}
          </div>
        </CardBody>
      </Card>
    );
  }
}

class MyItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docCount: 0,
      art: [],
      batchart :[],
      cust: [],
      manuf: [],
      isModalOpen1: false,
      title: '',
      artUrl: '',
      price: '',
      artHash: '',
      nos: 0,
      isLoading: false,
      loadingError: false,
      uploadSuccess: false,
    };
    this.toggleModal1 = this.toggleModal1.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.handleUploadMore = this.handleUploadMore.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.fileAwsHandler = this.fileAwsHandler.bind(this);
    this.refreshMyArt = this.refreshMyArt.bind(this);
  }

  toggleModal1() {
    this.setState({
      isModalOpen1: !this.state.isModalOpen1,
    });
  }

  toggleModal2() {
    this.setState({
      uploadSuccess: !this.state.uploadSuccess,
    });
  }

  refreshMyArt() {
    if (!this.state.isModalOpen1 && !this.state.uploadSuccess)
      window.location.reload();
  }

  handleUploadMore() {
    this.toggleModal2();
    this.toggleModal1();
  }
  creatingItems = async (x) => {
    let tokenHash = this.state.artHash.toString();
    let tokenTitle = this.state.title;
    let tokenPrice = (this.state.price * ETHER).toString();
    let imgUrl = x;
    let nos = this.state.nos;
    console.log(tokenHash, tokenTitle, tokenPrice, imgUrl, nos);

    try {
      const res = await this.props.contract.methods
        .createtokenBatch(
          tokenHash,
          tokenTitle,
          nos,
          (this.state.price * ETHER).toString(),
          imgUrl,
          imgUrl

        )
        .send({ from: this.props.accounts, gas: 5000000 });

      console.log('res', res);
      let data;

      // if (Array.isArray(res.events.tokencreated)) {
      //   data = await res.events.tokencreated.map((token) =>
      //     Axios.post(`https://geo.superworldapp.com/api/json/token/add`, {
      //       tokenId: token.returnValues.tokenId.toString(),
      //       description: 'A unique piece of art',
      //       image: imgUrl,
      //       name: tokenTitle,
      //       blockchain: 'e',
      //       networkId: 4,
      //       price: tokenPrice,
      //     })
      //   );
      // } else {
      //   data = await Axios.post(
      //     `https://geo.superworldapp.com/api/json/token/add`,
      //     {
      //       tokenId: res.events.tokencreated.returnValues.tokenId.toString(),
      //       description: 'A unique piece of art',
      //       image: imgUrl,
      //       name: tokenTitle,
      //       blockchain: 'e',
      //       networkId: 4,
      //       price: tokenPrice,
      //     }
      //   );
      // }

      console.log('data', data);
      this.toggleModal1();
      this.setState({ isLoading: false, uploadSuccess: true });
    } catch (err) {
      this.setState({ loadingError: true });
      console.error(err.message);
    }
    this.setState({ isLoading: false });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
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


    // for (let i = 1; i <= response.length; i++) {
    //   let rex = await this.props.contract?.methods.getTokenDataBatch(1).call();
    //   response[i]._tokenHash = '0x454';
    //   response[i]._tokenBatchName = rex._tokenBatchName;
    //   response[i]._tokenCreator = rex._tokenCreator;
    //   response[i]._imgurl = rex._imgurl;
    //   response[i]._imgThumbnail = rex._imgThumbnail;

    //   if (rex._tokenCreator == this.props.accounts) {
    //     createrToken.push(rex);
    //   }
    // }
    console.log(this.props.art);
    console.log(createrToken);
    allDocs = [];
    allDocs = response;
    console.log(response);
    this.setState({ art: allDocs , batchart: createrToken });
  }
  fileSelectHandler = (event) => {
    console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files[0],
    });
  };
  fileUploadHandler = async (event) => {
    event.preventDefault();
    // const hash = await blobToSHA256(this.state.selectedFile);
    let hash = '';
    this.setState({ isLoading: true, loadingError: false, artHash: hash });
    this.fileAwsHandler(this.state.selectedFile, this.creatingItems);
  };

  fileAwsHandler = async (file, callback) => {
    console.log(file);
    let newfilename = `image_${Date.now()}${path
      .extname(file.name)
      .toLowerCase()}`;
    console.log(newfilename);
    let params = {
      ACL: 'public-read',
      Bucket: BUCKET_NAME,
      Key: 'marketplace/' + newfilename,
      ContentType: file.type,
      Body: file,
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log('error :', err);
      } else {
        callback(
          `https://superworldapp.s3.amazonaws.com/marketplace/${newfilename}`
        );
      }
    });
  };

  render() {
    const Menu = this.props.batch?.map((x) => {
      return (
        <div key={x._batchId} className='col-4 col-md-3'>
          <Allpatrender
            art={x}
            contract={this.props.contract}
            accounts={this.props.accounts}
          />
          <br />
          <br />
        </div>
      );
    });

    let ch = 'visible';
    return (
      <div className='artContainer'>
        <div
          style={{
            marginLeft: '2px',
          }}
        >
          <p
            style={{
              fontFamily: 'Gibson',
              fontSize: '30px',
              fontWeight: 'bold',
              marginTop: '10px',
              textAlign: 'left',
            }}
          >
            My Collections
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ marginLeft: '2px', position: 'relative' }}>
              <button className='abtn'>All</button>
              <button className='abtn'>Offer Made </button>
              <button className='abtn'>Offer Received </button>
              <button className='abtn'>My Creations </button>
            </p>
            <p style={{ marginLeft: '2px', position: 'relative' }}>
              <Button
                className='abtn'
                style={{ backgroundColor: '#5548C7', color: 'white' }}
                onClick={this.toggleModal1}
              >
                + {''}UPLOAD
              </Button>
            </p>
          </div>
        </div>
=======
            {/* */}
>>>>>>> tim

        <Modal
          isOpen={this.state.isModalOpen1}
          toggle={this.toggleModal1}
          onClosed={this.refreshMyArt}
          className='uploadpopup'
        >
          <ModalHeader toggle={this.toggleModal1}>
            <p
              style={{
                fontFamily: 'Gibson',
                fontSize: '25px',
                fontWeight: '800',
                marginTop: '10px',
                textAlign: 'left',
                marginLeft: '7px',
                marginBottom: '0rem',
                textTransform: 'uppercase',
              }}
            >
              Upload New Item
            </p>
            <p
              style={{
                fontFamily: 'Gibson',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'left',
                marginLeft: '7px',
              }}
            >
              Image, Video, Audio or 3D Model
            </p>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label
                  htmlFor='artHash'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  File to Upload
                </Label>
                <Input
                  //style={{ marginLeft: '1.0rem' }}
                  type='file'
                  onChange={this.fileSelectHandler}
                />
              </FormGroup>

              <FormGroup>
                <Label
                  htmlFor='title'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  Name*
                </Label>
                <Input
                  type='text'
                  id='title'
                  name='title'
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  htmlFor='title'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  Description
                </Label>
                <Input
                  type='textarea'
                  id='des'
                  name='des'
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  htmlFor='price'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  Token Price
                </Label>
                <Input
                  style={{ width: '50%' }}
                  type='text'
                  id='price'
                  name='price'
                  onChange={this.handleInputChange}
                />
                <Label
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  {' '}
                  ETH
                </Label>
              </FormGroup>
              <FormGroup>
                <Label
                  htmlFor='nos'
                  className='uploadlabel'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  No. of Tokens
                </Label>
                <Input
                  style={{ width: '40%', marginRight: '11rem' }}
                  placeholder='1'
                  type='number'
                  id='nos'
                  name='nos'
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <br />
              <button
                className='abtn'
                style={{
                  color: 'white',
                  left: '9rem',
                  backgroundColor: '#5548C7',
                  fontSize: '18px',
                }}
                //color='primary'
                onClick={this.fileUploadHandler}
              >
                Upload
              </button>
              {this.state.isLoading ? (
                <img
                  style={{ display: 'flex', verticalAlign: 'none' }}
                  src={loader}
                />
              ) : (
                <div></div>
              )}
              {this.state.loadingError ? (
                <div style={{ color: 'red', fontFamily: 'Gibson' }}>
                  There was a transaction/processing error. Please try again.
                </div>
              ) : (
                <div></div>
              )}
              <br />
            </Form>
          </ModalBody>
        </Modal>

        {/* UPLOAD SUCCESS MODAL */}

        <Modal
          isOpen={this.state.uploadSuccess}
          onClosed={this.refreshMyArt}
          toggle={this.toggleModal2}
          className='modal-xl'
        >
          <ModalHeader toggle={this.toggleModal2}>
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
            <img src={checkmark} />
            <p
              style={{
                textAlign: 'center',
                fontSize: '1.25rem',
                fontWeight: '450',
                marginTop: '1rem',
              }}
            >
              Hi, your upload was successful!
            </p>
            <p style={{ textAlign: 'center', color: 'gray', fontSize: '12px' }}>
              You can view your recent uploaded file under “MY COLLECTIONS”
            </p>
            <button className='upload-more-btn' onClick={this.handleUploadMore}>
              Upload More
            </button>
          </ModalBody>
        </Modal>

        
      </div>
    );
  }
}



