import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
import {BrowserRouter, NavLink} from 'react-router-dom';
import Web3 from 'web3';
import {render} from 'react-dom';
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
import ModalUploadToMyStore from "./ModalUploadToMyStore/ModalUploadToMyStore";
import ModalListingNft from "./ModalListingNft/ModalListingNft";
import UploadsTab from "./UploadsTab";

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
let cntupload = 0;
let cntqueue = 0;
let cntactive = 0;
let cntended = 0;

class MyStoreComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			docCount: 0,
			art: [],
			batchart: [],
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
			indextab: 7,
			cntactive: 0,

			isListModalOpen: false,
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
		this.toggleListModal = this.toggleListModal.bind(this);
		this.onListButtonClick = this.onListButtonClick.bind(this);
		this.onListModalClosed = this.onListModalClosed.bind(this);
		this.accUsername = this.accUsername.bind(this)
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
		else if (accNum === '0xE337525DD5d34fC683f43CbBDF3e1EDe0833B744')
			return '@Viktor';
		else if (accNum === '0x32c93d70E9813fFe62a2fCf6189F14A4ff2e8cB3')
			return '@Alex';
		else return '@Annonymous';
	};


	toggleListModal() {
		this.setState({
			isListModalOpen: !this.state.isListModalOpen,
		})
	}

	onListModalClosed() {
		this.setState({
			isListModalOpen: false,
		})
	}

	onListButtonClick() {
		this.setState({
			isListModalOpen: true,
		})
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
		return this.setState({
			isModalOpen1: false,
		})
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
		let nos = 30;

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
				.send({from: this.props.accounts, gas: 5000000});

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

			// console.log('data', data);
			this.toggleModal1();
			this.setState({isLoading: false, uploadSuccess: true});
		} catch (err) {
			this.setState({loadingError: true});
			// console.error(err.message);
		}
		this.setState({isLoading: false});
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

		let response = [];
		let createrToken = [];

		for (let i = 1; i <= res; i++) {
			let rex = await this.props.contract?.methods.getTokenData(i).call();
			let rex2 = await this.props.contract?.methods.getTokenDataBatch(i).call();
			if (rex._tokenOwner === this.props.accounts) {
				var newBlock = {
					_tokenId: i,
					_tokenOwner: rex._tokenOwner,
					_isSellings: rex._isSellings,
					_sellprice: rex._sellprice,
					_refbatch: rex._refbatch,
					_tokenbidder: rex._tokenbidder,
					_isBidding: rex._isBidding,
					_bidprice: rex._bidprice,
					_bidend: rex._bidend,
					_tokenHash: rex2._tokenHash,
					_tokenBatchName: rex2._tokenBatchName,
					_tokenCreator: rex2._tokenCreator,
					_imgurl: rex2._imgurl,
					_imgThumbnail: rex2._imgThumbnail,
					__mintedEditions: rex2._mintedEditions

				}
				response.push(newBlock);
				// console.log(newBlock)
			}
			if (rex2._tokenCreator === this.props.accounts) {
				createrToken.push(rex);
			}

		}
		this.setState({art3: response, batchart: createrToken});

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
		// console.log(event.target.files);
		this.setState({
			selectedFile: event.target.files[0],
		});
	};

	fileUploadHandler = async (event, controls) => {
		this.setState({
			title: controls.name.value,
			description: controls.description.value,
		});
		event.preventDefault();
		// const hash = await blobToSHA256(this.state.selectedFile);
		let hash = '';
		await this.setState({isLoading: true, loadingError: false, artHash: hash});
		await this.fileAwsHandler(controls.file.value, this.creatingItems);
	};

	fileAwsHandler = async (file, callback) => {
		// console.log(file);
		let newfilename = `image_${Date.now()}${path
			.extname(file.name)
			.toLowerCase()}`;
		// console.log(newfilename);
		let params = {
			ACL: 'public-read',
			Bucket: BUCKET_NAME,
			Key: 'marketplace/' + newfilename,
			ContentType: file.type,
			Body: file,
		};

		s3.putObject(params, function (err, data) {
			if (err) {
				// console.log('error :', err);
			} else {
				callback(
					`https://superworldapp.s3.amazonaws.com/marketplace/${newfilename}`
				);
			}
		});
	};


	render() {
		const {batch} = this.props
		const {artStatus} = this.state
		const {art2} = this.props
		let menuTwoCount = 0;
		let menuThreeCount = 0;
		let menuFourCount = 0;
		// TODO optimize
		const nftsListed = batch.reduce((count, item) => +item._mintedEditions + count, 0)

		const Menu1 = batch?.map((x) => {

			return (
				<UploadsTab
					key={x._tokenId}
					art={x}
					contract={this.props.contract}
					accounts={this.props.accounts}
				/>
			);
		});

		const Menu2 = this.state.art3?.map((x) => {
			if ((x._isSellings === false) && (x._isBidding === false)) {
				menuTwoCount++;

				return (
					<Allpatrender2
						key={x._tokenId}
						art={x}
						contract={this.props.contract}
						accounts={this.props.accounts}
						type={1}
					/>
				)
			}
		});

		const Menu3 = this.state.art3?.map((x) => {
			if (x._isSellings === true || (x._isBidding === true && !((x._bidend * 1000) <= Date.now() && x._bidend !== 0))) {
				cntactive++;
				menuThreeCount++;

				return (
					<Allpatrender2
						key={x._tokenId}
						art={x}
						contract={this.props.contract}
						accounts={this.props.accounts}
						type={2}
					/>
				);
			}
		});

		const Menu4 = this.state.art3?.map((x) => {
			if (x._isBidding === true && ((x._bidend * 1000) <= Date.now()) ) {
				cntended++;
				menuFourCount++;
				return (
					<Allpatrender2
						key={x._tokenId}
						art={x}
						contract={this.props.contract}
						accounts={this.props.accounts}
					/>
				);
			}
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
						{console.log('========>this.state!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', this.state)}
						<StyledTabs value={artStatus} onChange={this.onArtStatusChange}>
							<StyledTab
								label={`Uploads${this.props.batch.length > 0 ? ` (${this.props.batch.length})` : ''}`}
								{...artStatusTabPropsByIndex(0)}
							/>
							<StyledTab
								label={`Queue (${menuTwoCount})`}
								// label={`Queue${nftsListed > 0 ? ` (${nftsListed})` : ''}`}
								{...artStatusTabPropsByIndex(1)}
							/>
							<StyledTab
								// label={`Active (${this.state.cntactive})`}
								label={`Active (${menuThreeCount})`}
								{...artStatusTabPropsByIndex(2)}
							/>
							<StyledTab label={`Ended (${menuFourCount}) `} {...artStatusTabPropsByIndex(3)} />
							{/*<StyledTab label={'Offers'} {...artStatusTabPropsByIndex(4)} />*/}
						</StyledTabs>

						{/*{this.props.state.batch && this.props.state.batch.length > 0 ? (*/}
						{batch.length >= 0 ? (
								<TabPanel value={artStatus} index={0}>
									<div className='mystore-art-queue-container row'>
										<div className='mystore-upload-art'>
											<Button className='mystore-upload-btn' onClick={this.toggleModal1}>
												<div className='mystore-upload-add'>+</div>
											</Button>
										</div>
										{Menu1}
									</div>
								</TabPanel>
							)
							: null}

						<TabPanel value={artStatus} index={1}>
							<div className='mystore-art-queue-container row'>
								{Menu2}
							</div>
						</TabPanel>

						<TabPanel value={artStatus} index={2}>
							<div className='mystore-art-active-container row'>
								{Menu3}
							</div>
						</TabPanel>

						<TabPanel value={artStatus} index={3}>
							<div className='mystore-art-active-container row'>
								{Menu4}
							</div>
						</TabPanel>
					</Col>
				</Row>

				<ModalUploadToMyStore
					isOpen={this.state.isModalOpen1}
					toggle={this.toggleModal1}
					onClosed={this.refreshMyArt}
					onConfirm={this.fileUploadHandler}
				/>

				{/*<ModalListingNft*/}
				{/*	onOpen={this.onListModalOpen}*/}
				{/*	onClose={this.onListModalClosed}*/}
				{/*	toggle={this.toggleListModal}*/}
				{/*	fileName='Leopard.png'*/}
				{/*/>*/}

				{batch && batch.length >= 0
					? null
					: (
						<img
							style={
								{
									width: '300px',
									height: '300px',
									position: 'absolute',
									zIndex: '100000000',
									top: '300px',
								}
							}
							src={loader}
						/>
					)}
				{/*<Modal*/}
				{/*  isOpen={this.state.isModalOpen1}*/}
				{/*  toggle={this.toggleModal1}*/}
				{/*  onClosed={this.refreshMyArt}*/}
				{/*  className='uploadpopup'*/}
				{/*>*/}
				{/*  <ModalHeader toggle={this.toggleModal1}>*/}
				{/*    <div className='title'>*/}
				{/*      Upload New Item*/}
				{/*    </div>*/}
				{/*    <div className='subtitle'>*/}
				{/*      Image, Video, Audio or 3D Model*/}
				{/*    </div>*/}
				{/*  </ModalHeader>*/}
				{/*  <ModalBody>*/}
				{/*    <Form>*/}
				{/*      <FormGroup>*/}
				{/*        <Label*/}
				{/*          htmlFor='artHash'*/}
				{/*          className='uploadlabel'*/}
				{/*        >*/}
				{/*          File to Upload*/}
				{/*        </Label>*/}
				{/*        <Input*/}
				{/*          //style={{ marginLeft: '1.0rem' }}*/}
				{/*          type='file'*/}
				{/*          onChange={this.fileSelectHandler}*/}
				{/*        />*/}
				{/*      </FormGroup>*/}

				{/*      <FormGroup>*/}
				{/*        <Label*/}
				{/*          htmlFor='title'*/}
				{/*          className='uploadlabel'*/}
				{/*        >*/}
				{/*          Name**/}
				{/*        </Label>*/}
				{/*        <Input*/}
				{/*          type='text'*/}
				{/*          id='title'*/}
				{/*          name='title'*/}
				{/*          onChange={this.handleInputChange}*/}
				{/*        />*/}
				{/*      </FormGroup>*/}
				{/*      <FormGroup>*/}
				{/*        <Label*/}
				{/*          htmlFor='title'*/}
				{/*          className='uploadlabel'*/}
				{/*        >*/}
				{/*          Description*/}
				{/*        </Label>*/}
				{/*        <Input*/}
				{/*          type='textarea'*/}
				{/*          id='des'*/}
				{/*          name='des'*/}
				{/*          onChange={this.handleInputChange}*/}
				{/*        />*/}
				{/*      </FormGroup>*/}
				{/*      <FormGroup>*/}
				{/*        <Label*/}
				{/*          htmlFor='price'*/}
				{/*          className='uploadlabel'*/}
				{/*        >*/}
				{/*          Token Price*/}
				{/*        </Label>*/}
				{/*        <Input*/}
				{/*          style={{ width: '50%' }}*/}
				{/*          type='text'*/}
				{/*          id='price'*/}
				{/*          name='price'*/}
				{/*          onChange={this.handleInputChange}*/}
				{/*        />*/}
				{/*        <Label*/}
				{/*          className='uploadlabel token-price'*/}
				{/*        >*/}
				{/*          ETH*/}
				{/*        </Label>*/}
				{/*      </FormGroup>*/}
				{/*      <FormGroup>*/}
				{/*        <Label*/}
				{/*          htmlFor='nos'*/}
				{/*          className='uploadlabel'*/}
				{/*        >*/}
				{/*          No. of Tokens*/}
				{/*        </Label>*/}
				{/*        <Input*/}
				{/*          style={{ width: '40%', marginRight: '11rem' }}*/}
				{/*          placeholder='1'*/}
				{/*          type='number'*/}
				{/*          id='nos'*/}
				{/*          name='nos'*/}
				{/*          onChange={this.handleInputChange}*/}
				{/*        />*/}
				{/*      </FormGroup>*/}
				{/*      <br />*/}
				{/*      <button*/}
				{/*        className='abtn'*/}
				{/*        style={{*/}
				{/*          color: 'white',*/}
				{/*          left: '9rem',*/}
				{/*          backgroundColor: '#5548C7',*/}
				{/*          fontSize: '18px',*/}
				{/*        }}*/}
				{/*        //color='primary'*/}
				{/*        onClick={this.fileUploadHandler}*/}
				{/*      >*/}
				{/*        Upload*/}
				{/*      </button>*/}
				{/*      {this.state.isLoading ? (*/}
				{/*        <img*/}
				{/*          style={{ display: 'flex', verticalAlign: 'none' }}*/}
				{/*          src={loader}*/}
				{/*        />*/}
				{/*      ) : (*/}
				{/*        <div></div>*/}
				{/*      )}*/}
				{/*      {this.state.loadingError ? (*/}
				{/*        <div style={{ color: 'red', fontFamily: 'Gibson' }}>*/}
				{/*          There was a transaction/processing error. Please try again.*/}
				{/*        </div>*/}
				{/*      ) : (*/}
				{/*        <div></div>*/}
				{/*      )}*/}
				{/*      <br />*/}
				{/*    </Form>*/}
				{/*  </ModalBody>*/}
				{/*</Modal>*/}

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
						<img src={checkmark}/>
						<p
							style={{
								textAlign: 'center',
								fontSize: '1.25rem',
								fontWeight: '450',
								marginTop: '1rem',
							}}
						>
							Hey @megan462, your upload was successful!
						</p>
						<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>
							You can view your recent uploaded file in “MyStore”
						</p>
						<button className='upload-more-btn' onClick={this.handleUploadMore}>
							UPLOAD MORE
						</button>
					</ModalBody>
				</Modal>
			</Container>
		);
	}
}

const TabPanel = props => {
	const {children, value, index, ...other} = props;

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
		marginRight: '70px',
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
})((props) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);

const artStatusTabPropsByIndex = index => {
	//setState({indextab : index});
	return {
		id: `art-status-tab-${index}`,
		'aria-controls': `art-status-tabpanel-${index}`,
	};
}

export default MyStoreComponent;
