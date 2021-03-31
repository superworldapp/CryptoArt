import React, { Component ,useEffect} from 'react';
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
import './MyArtComponent.scss';
import './MyCollectionComponent.scss';
import test1img from '../images/image 25.png'
import test2img from '../images/image 11.png'
import test3img from '../images/Nate3.jpg'
import test4img from '../images/image 29.png'
import * as aws from 'aws-sdk';
import * as dotenv from 'aws-sdk';
import * as fs from 'fs';
import * as util from 'util';
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
  _isMounted = false;
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
    this.fetchdata = this.fetchdata.bind(this);
    //this.toggleAuction = this.toggleAuction.bind(this);
  }
  fetchdata = async() => {
    this.setState({art : this.props.art2});
    console.log(this.state.art);
    
  }


  
  componentDidMount = async () => {
    this.fetchdata();
    this._isMounted = true;
  }
  
  buyItem = async () => {

    try {
    //function Sale(uint256 _tokenId,uint _sellprice,bool isListed)
      const res = await this.props.contract.methods
        .buyToken(this.props.art._tokenId)
        .send({ from: this.props.accounts,value: this.state.art._sellprice, gas: 5000000 });
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
        this.state.art._tokenId,
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
    .startbid(
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
  render() {
    let but = this.state.art._isSellings ? ' ' : 'hidden';
    let bak = this.state.art._isSellings ? 'bg-success text-white' : '';
    let buk = this.state.art._isBidding ? 'bg-warning' : '';
    let b = this.state.art._isSellings ? 'hidden' : 'abtn';
    let b1 = this.state.art._isSellings ? 'hidden' : 'abtn1';
    let but1 = this.state.art._isSellings ? 'abtn1' : 'hidden';
    let auc1 = this.state.art._isBidding ? 'hidden' : 'abtn';
    let auc2 = this.state.art._isBidding ? 'hidden' : 'abtn1';
    let forAuc = this.state.art._isBidding ? 'visible' : 'invisible';
    let artCreator = this.state.art._tokenCreator;
    let artOwner = this.state.art._tokenOwner;

    // let pr =
    //   Web3.utils.fromWei(this.state.art._sellprice.toString(), 'ether') == 0
    //     ? 'invisible'
    //     : 'visible';
    // let reSellOrSell = this.state.art._isSellings;
    // let Auc = this.state.art._isBidding;
    // let accNum = this.state.art._tokenCreator;

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
      if (this.state.art._isSelling) return cardpills[1];
      else if (this.state.art._isBidding) return cardpills[3];
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
    // img.src = this.state.art?._imgurl;
    // img.onload();

    return (

      <div>

      <button
        style={{
        border: 'none',
        backgroundColor: 'transparent',
        }}
        onClick={this.toggleArtModal}
      >
        <Card className='mycollection-card'>
          <CardImg
            // src={this.props.art._imgurl}
            src={this.state.art?._imgurl}
            alt='Card image'
            style={{
              width: '98.5%',
            }}
          ></CardImg>
          <CardSubtitle>Bid Price : {this.state.art?._imgurl}</CardSubtitle>
          <CardSubtitle>Bid Price : {this.state.art?._bidprice}</CardSubtitle>
          <CardSubtitle>isBidding? : {this.state.art?._isBidding}</CardSubtitle>
          <CardSubtitle>isSell?{this.state.art?._isSellings}</CardSubtitle>
          <CardSubtitle>sellprice = {this.state.art?._sellprice}</CardSubtitle>
          <CardSubtitle><small>tokenowner = {this.state.art?._tokenOwner}</small></CardSubtitle>
          </Card>
      </button>

      {/* Art Modal */}
      <Modal
        isOpen={this.state.isArtModalOpen}
        toggle={this.toggleArtModal}
        onClosed={this.refreshMyArt}
        className='art-modal-popup'
      >
      <img
        src={this.state.art?._imgurl}
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

class MyCollectionComponent extends Component {
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
      selectGallery: '',
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
    this.dropdown = this.dropdown.bind(this);
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

  toggleGalleryModal() {
    this.setState({
        isGalleryModalOpen: !this.state.isGalleryModalOpen,
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

  dropdown(e) {
    this.setState({selectGallery: e.target.value})
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
//    let Menu = null;
    const Menu = this.state.art.map((x) => {
      return (
        <div key={x._tokenId} className='col-4 col-md-3'>
          <Allpatrender
            art2={x}
            contract={this.props.contract}
            accounts={this.props.accounts}
          />
          <br />
          <br />
        </div>
      );
    });
    console.log(Menu);

    let ch = 'visible';
    return (
      <Container fluid>

      <Row className='first-row-container'>
        <Col>
          <h1 style={{
            fontFamily: 'Gibson',
            fontSize: '50px',
            textAlign: 'left',
          }}>
          MyCollection
          </h1>
          <p style={{
            fontFamily: 'Gibson',
            fontSize: '30px',
            textAlign: 'left',
            fontWeight: '400',
            color: '#5540C7',
          }}>
            172 NFT's
          </p>
        </Col>
      </Row>
      <Row className='second-row-container'>
        <Col md={3} className='second-row-col-1'>
          <h5 style={{
            fontFamily: 'Gibson',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '23.44px',
          }}>
            SORT BY:
          </h5>
          <select
            id="dropdown"
            onChange={this.dropdown}
            style={{
              fontFamily: 'Gibson',
              width: '75%',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              fontSize: '18px',
              marginLeft: '-3px',
            }}
          >
              <option value="" className="option-selected">New</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
          </select>
          <h5 style={{
            fontFamily: 'Gibson',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '23.44px',
            marginTop: '50px',
          }}>
            GALLERIES:
          </h5>
          <p style={{
            fontFamily: 'Gibson',
            fontSize: '24px',
            fontWeight: '400',
          }}>
            Abstract
          </p>
          <p style={{
            fontFamily: 'Gibson',
            fontSize: '24px',
            fontWeight: '400',
            marginTop: '-10px',
          }}>
            Nature
          </p>
          <button
            style={{
            fontFamily: 'Gibson',
            fontSize: '18px',
            fontWeight: '400',
            border: 'none',
            color: '#5540C7',
            backgroundColor: 'white',
            marginLeft: '-5px',
            marginTop: '-7px',
            }}
            onClick={this.toggleGalleryModal}
          >
            +Add
          </button>
        </Col>
        <Col className='second-row-col-2'>
          <div>{Menu}</div>
        </Col>
      </Row>

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
        <br />
        <br />
        <br />
      </Container>
    );
  }
}

export default MyCollectionComponent;
