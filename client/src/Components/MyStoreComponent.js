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
import {withStyles} from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Web3 from 'web3';
import { render } from 'react-dom';
import Axios from 'axios';
import './MyArtComponent.scss';
import './MyStoreComponent.scss'
import * as aws from 'aws-sdk';
import * as dotenv from 'aws-sdk';
import * as fs from 'fs';
import * as util from 'util';
import loader from '../images/loader.svg';
import annonuser from '../images/user.png';
// import { blobToSHA256 } from 'file-to-sha256';
import checkmark from '../images/svg/checkmark.svg';
import Allpatrender from "./Allpatrender";
import Allpatrender2 from "./Allpatrender2";

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
export const ETHER = 1000000000000000000;

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

const artStatuses = {
  'Queue': 0,
  'Active': 1,
  'Ended': 2,
  'Offers': 3,
}

class MyStoreComponent extends Component {
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
      artStatus: artStatuses['Queue'],
      indextab : 7
    };
    this.toggleModal1 = this.toggleModal1.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.handleUploadMore = this.handleUploadMore.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.fileAwsHandler = this.fileAwsHandler.bind(this);
    this.refreshMyArt = this.refreshMyArt.bind(this);
    this.onArtStatusChange = this.onArtStatusChange.bind(this);

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

  onArtStatusChange(e, artStatus) {
    this.setState({artStatus})
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
    this.setState({ art3: response , batchart: createrToken });

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

    // console.log(createrToken);
    // allDocs = [];
    // allDocs = response;
    // console.log(response);
    // this.setState({ art: allDocs , batchart: createrToken });
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
    const { batch } = this.props
    const { artStatus } = this.state
    const {art2} = this.props
    console.log(art2);
    // TODO optimize
    const nftsListed = batch.reduce((count, item) => +item[3] + count, 0)

    const Menu1 = batch?.map((x) => {
      return (
        <Allpatrender
          key={x._batchId}
          art={x}
          contract={this.props.contract}
          accounts={this.props.accounts}
        />
      )
    });

    const Menu2 = this.state.art3?.map((x) => {
        return (
          <Allpatrender2
            key={x._tokenId}
            art={x}
            contract={this.props.contract}
            accounts={this.props.accounts}
          />
        );
      });

    let ch = 'visible';
    return (
      <Container fluid>

        <Row className='mystore-first-row-container'>
            <Col>
                <h1
                    style={{
                        fontFamily: 'Gibson',
                        fontSize: '64px',
                        textAlign: 'left',
                    }}
                >MyStore</h1>
            </Col>
        </Row>
        <Row className='mystore-second-row-container'>
            <div className='mystore-nft-status-container'>
                <div className='mystore-nft-status-container-row'>
                    <h5>NFT's Listed:</h5><span>{nftsListed}</span>
                </div>
                <div className='mystore-nft-status-container-row'>
                    <h5>NFT's Sold:</h5><span>0</span>
                </div>
            </div>
            <Col className='mystore-art-container'>
              <StyledTabs value={artStatus} onChange={this.onArtStatusChange}>
                <StyledTab label={`Queue${nftsListed > 0 ? ` (${nftsListed})` : ''}`} {...artStatusTabPropsByIndex(0)} />
                <StyledTab label={'Active'} {...artStatusTabPropsByIndex(1)} />
                <StyledTab label={'Ended'} {...artStatusTabPropsByIndex(2)} />
                <StyledTab label={'Offers'} {...artStatusTabPropsByIndex(3)} />
              </StyledTabs>

              <TabPanel value={artStatus} index={0}>
                <div className='mystore-art-queue-container row'>
                  {Menu1}
                  <div className='mystore-upload-art'>
                    <Button className='mystore-upload-btn' onClick={this.toggleModal1}>
                      <div className='mystore-upload-add'>+</div>
                    </Button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={artStatus} index={1}>
                <div className='mystore-art-active-container row'>
                  {Menu2}
                </div>
              </TabPanel>
            </Col>
        </Row>



        <Modal
          isOpen={this.state.isModalOpen1}
          toggle={this.toggleModal1}
          onClosed={this.refreshMyArt}
          className='uploadpopup'
        >
          <ModalHeader toggle={this.toggleModal1}>
            <div className='title'>
              Upload New Item
            </div>
            <div className='subtitle'>
              Image, Video, Audio or 3D Model
            </div>
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
                  className='uploadlabel token-price'
                  style={{
                    fontFamily: 'Gibson',
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
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

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`art-status-tabpanel-${index}`}
      aria-labelledby={`art-status-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const StyledTab = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: ['Gibson'],
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '1.5rem',
    lineHeight: '24px',
    '&:focus': {
      outline: 'none',
    },
    opacity: 1,
},
})((props) => <Tab indicatorColor='black' {...props} />);

const StyledTabs = withStyles({
  root: {
    justifyContent: 'space-between',
    paddingLeft: '90px',
    '@media screen and (max-width: 1024px)': {
      paddingLeft: 0,
    }
  },
  scroller: {
    overflowX: 'scroll !important',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    '-ms-overflow-style': 'none',
    overflow: '-moz-scrollbars-none',
  },
  flexContainer: {
    justifyContent: 'space-between',
    maxWidth: '774px',
    width: '100%',
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 132,
      width: '100%',
      backgroundColor: 'black',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const artStatusTabPropsByIndex = index => {
  //setState({indextab : index});
  return {
    id: `art-status-tab-${index}`,
    'aria-controls': `art-status-tabpanel-${index}`,
  };
}

export default MyStoreComponent;
