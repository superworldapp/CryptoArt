import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import moment from 'moment';
import {
	Button,
	Col,
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
import UploadsTab from "./UploadsTab";
import Loading from "./Loading/loading";
import SuccessfulModals from "./SuccessModal/SuccessfulModals";
import {connect} from "react-redux";

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
			batch:[],
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

			loadingAfterSend : false,
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
		this.accUsername = this.accUsername.bind(this);

		this.setLoadingAfterSend = this.setLoadingAfterSend.bind(this);
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

	setLoadingAfterSend() {
		this.setState({
			loadingAfterSend: !this.state.loadingAfterSend,
		})
	}

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
			uploadSuccess: false,
			loadingAfterSend: false,
		});
	}


	refreshMyArt() {
		return this.setState({
			isModalOpen1: false,
		})
		// window.location.reload()
		// if (!this.state.isModalOpen1 && !this.state.uploadSuccess)
		 	window.location.reload();
	}

	onArtStatusChange(e, artStatus) {
		this.setState({artStatus})
	}

	handleUploadMore() {
		// this.toggleModal2();
		// this.toggleModal1();
		window.location.reload()
	}


	creatingItems = async (x) => {
		console.log("------>")
		let tokenHash = this.state.artHash.toString();
		let tokenTitle = this.state.title;
		let tokenPrice = (this.state.price * ETHER).toString();
		let imgUrl = x;
		let nos = 30;

		try {
			this.setLoadingAfterSend()
			const res = await this.props.contract.methods
				.createTokenBatch(
					tokenHash,
					tokenTitle,
					nos,
					(this.state.price * ETHER).toString(),
					imgUrl,
					imgUrl
				)
				.send({from: this.props.accounts, gas: 5000000});
			this.toggleModal2()
			let data ;
			// if (Array.isArray(res.events.tokenCreated)) {
			//   data = await res.events.tokenCreated.map((token) =>
			//     Axios.post(`https://geo.superworldapp.com/api/json/token/add`, {
			//       tokenId: token.returnValues.tokenId.toString(),
			//       description: this.state.description,
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
			//       tokenId: res.events.tokenCreated.returnValues.tokenId.toString(),
			//       description: this.state.description,
			//       image: imgUrl,
			//       name: tokenTitle,
			//       blockchain: 'e',
			//       networkId: 4,
			//       price: tokenPrice,
			//     }
			//   );
			// }

			this.setState({isLoading: false, uploadSuccess: true});
		} catch (err) {
			this.setLoadingAfterSend()
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
		let response3 = [];
		let resx1 = await this.props.contract?.methods.tokenBatchIndex().call();
			for (let i = 1; i <= resx1; i++) {
				const rexx = await this.props.contract?.methods.getTokenBatchData(i).call();
				if(rexx._tokenCreator == this.props.accounts){
				response3.push(rexx);
				}
			}
			
			this.setState({batch: response3});
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
					_sellPrice: rex._sellPrice,
					_refBatch: rex._refBatch,
					_tokenBidder: rex._tokenBidder,
					_isBidding: rex._isBidding,
					_bidPrice: rex._bidPrice,
					_bidEnd: rex._bidEnd,
					_tokenHash: rex2._tokenHash,
					_tokenBatchName: rex2._tokenBatchName,
					_tokenCreator: rex2._tokenCreator,
					_imgUrl: rex2._imgUrl,
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
		console.log('=====>')
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
		console.log("---------->>>")
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
		// console.log('=====>batch', batch);
		const {artStatus} = this.state
		const {art2} = this.props
		let menuTwoCount = 0;
		let menuThreeCount = 0;
		let menuFourCount = 0;
		// TODO optimize
		const nftsListed = batch.reduce((count, item) => +item._mintedEditions + count, 0)

		const Menu1 = this.state.batch?.map((x) => {
			return (
				<UploadsTab
					key={x._batchId}
					art={x}
					contract={this.props.contract}
					accounts={this.props.accounts}
				/>
			);
		});

		const Menu2 = this.props.art3?.map((x) => {
			if ((x._isSellings === false) && (x._isBidding === false)) {
				menuTwoCount++;
				return (
					// need <Allpatrender
					<Allpatrender
						key={x._tokenId}
						art={x}
						contract={this.props.contract}
						accounts={this.props.accounts}
						type={1}
					/>
				)
			}
		});

		const Menu3 = this.props.art3?.map((x) => {
			if (x._isSellings === true || (x._isBidding === true && !((x._bidEnd * 1000) <= Date.now() && x._bidEnd !== 0)) || (x._tokenBidder == this.props.accounts)) {
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

		const Menu4 = this.props.art3?.map((x) => {
			if (x._isBidding === true && ((x._bidEnd * 1000) <= Date.now())) {
				cntended++;
				menuFourCount++;
				return (
					<Allpatrender2
						key={x._tokenId}
						art={x}
						contract={this.props.contract}
						accounts={this.props.accounts}
						type={3}
					/>
				);
			}
		});

		let ch = 'visible';
		return (
			<Container fluid>

				<Row className='mystore-first-row-container'>
					<Col className='col-mystore-first'>
						<h1 className="head-mystore-first">
							MyStore
						</h1>
						<div className='mystore-nft-status-container'>
							<div className='mystore-nft-status-container-row'>
								<h5>NFTs Minted:</h5>
								<span>{nftsListed}</span>
							</div>
							<div className='mystore-nft-status-container-row'>
								<h5>NFTs Owned:</h5>
								<span>{menuTwoCount+menuThreeCount+menuFourCount}</span>
							</div>
						</div>
					</Col>
				</Row>
				<Row className='mystore-second-row-container'>
					<Col className='mystore-art-container'>
						<StyledTabs value={artStatus} onChange={this.onArtStatusChange}>
							<StyledTab
								label={`Uploads${this.props.batch.length > 0 ? ` (${this.props.batch.length})` : ' (0)'}`}
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

						{/*{batch && batch.length > 0*/}
						{this.props.batch && this.props.batch.length >= 0
							? (
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
							: <Loading name=''/>
						}

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

				<SuccessfulModals
					isOpen={this.state.uploadSuccess}
					toggle={this.toggleModal2}
					onClose={this.toggleModal2}
					variation={0}
					handleUploadMore={this.handleUploadMore}
				/>

				{
					this.state.loadingAfterSend
						? <Loading name="Uploading File" />
						: null
				}
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
};

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
		'@media screen and (max-width: 1340px)': {
			marginRight: '0',
		},
		'@media screen and (max-width: 770px)': {
			fontSize: '10px',
			lineHeight: '10px',
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

const mapStateToProps = (state) => ({
	art3: state.myStoreComponent.art3,
});

export default connect(mapStateToProps, null)(MyStoreComponent);
