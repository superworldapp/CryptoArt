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
} from 'reactstrap';
import {BrowserRouter, NavLink} from 'react-router-dom';
import Web3 from 'web3';
import {render} from 'react-dom';
import Axios from 'axios';
import '../MyArtComponent.scss';
import * as aws from 'aws-sdk';
import * as dotenv from 'aws-sdk';
import * as fs from 'fs';
import * as util from 'util';
import loader from '../../images/loader.svg';
import annonuser from '../../images/user.png';
import Sound from 'react-sound';
import ReactPlayer from 'react-player';
// import { blobToSHA256 } from 'file-to-sha256';
import checkmark from '../../images/svg/checkmark.svg';
import MyCollectionCards from "../MyCollectionCards";
import burger from "../../images/svg/burger-recently-list.svg";
import SimpleMenu from "../Marketplace/menu/MenuListed";
import arrow from "../../images/svg/arrow.svg";
import SortLayout from "./SortLayout";
import {connect} from "react-redux";
import { setAllGallery } from "../../redux/myCollection/actions";
import Loading from '../Loading/loading';




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

		//this.toggleAuction = this.toggleAuction.bind(this);
	}

	buyItem = async () => {

		try {
			//function Sale(uint256 _tokenId,uint _sellprice,bool isListed)
			const res = await this.props.contract.methods
				.buyToken(this.props.art._tokenId)
				.send({from: this.props.accounts, value: this.props.art._sellPrice, gas: 5000000});
			// console.log('res', res);

		} catch (error) {
			// console.error(error)
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

		// console.log('res', res);
		this.setState({putForSaleLoading: false, listForSaleSuccess: true});
		this.toggleModal();
		// console.log(res);
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

		// console.log('res', res);
		this.setState({delistLoading: false});
		window.location.reload();
		// console.log(res);
	};

	StartAuction = async () => {
		this.setState({auctionLoading: true});
		const res = await this.props.contract.methods
			.startbid(this.props.art.tokenIdentifier)
			.send({from: this.props.accounts, gas: 1000000});
		this.setState({auctionLoading: false, listForAuctionSuccess: true});
		// console.log(res);
	};

	EndAuction = async () => {
		this.setState({endAuctionLoading: true});
		const res = await this.props.contract.methods
			.closeBidOwner(this.props.art.tokenIdentifier)
			.send({from: this.props.accounts, gas: 7000000});
		this.setState({endAuctionLoading: false, endAuctionSuccess: true});
		// console.log(res);
	};

	AddBid = async () => {
		const res = await this.props.contract.methods
			.addBid(this.props.art.tokenIdentifier)
			.send({from: this.props.accounts, gas: 1000000, value: 1000000});
		// window.location.reload();
		// console.log(res);
	};

	CloseBid = async () => {
		const res = await this.props.contract.methods
			.closBid(this.props.art.tokenIdentifier)
			.send({from: this.props.accounts, gas: 7000000});
		// console.log(res);
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
		const displayFileType = () => {
			console.log(this.props.art._imgUrl);
			if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(this.props.art._imgUrl)) {
				return (
					<CardImg
						className={orientation}
						top
						src={this.props.art._imgUrl}
						alt='Card image'
					/>
				);
			} else if (/\.(?:wav|mp3)$/i.test(this.props.art._imgUrl)) {
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
							url={this.props.art._imgUrl}
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
					this.props.art._imgUrl
				)
			) {
				return (
					<ReactPlayer
						class={orientation}
						style={{maxWidth: '270px'}}
						loop={true}
						playing={true}
						url={this.props.art._imgUrl}
					/>
				);
			}
		};

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
		img.src = this.props.art.imgUrl;
		img.onload();

		return (
			// <div>
			// {cardpills.map((item) => {
			//   return (
			<Card
				className='card-artcard'
			>
				{/* <a href={this.props.art.imgUrl} target='_blank'> */}
				<div className='card-img-top-all-art'>
					{/* <Link to={`/card/${this.props.art._tokenId}`}> */}

					<Link to={`/card/${this.props.art._tokenId}`}>

						{displayFileType()}

						<CardImgOverlay>
							<Badge pill className={x.class}>
								{x.title}
							</Badge>
						</CardImgOverlay>
					</Link>
				</div>

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
									style={{marginRight: '30px'}}
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
						<div className='ctext' style={{height: '2rem'}}>
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

						</div>

					</div>
					<div
						className='ctext'
						style={{padding: '0px', height: '2rem', marginTop: '5%'}}
					>


						<Modal
							isOpen={this.state.isModalOpen}
							toggle={this.toggleModal}
							className='modal_popup'
						>
							<ModalHeader toggle={this.toggleModal} className='pl-5'>
								Put For Sale
							</ModalHeader>
							<Card className='artCard' style={{height: '50%'}}>
								<CardImg
									top
									className='displayImage'
									src={this.props.art._imgUrl}
									alt='Card image'
								/>
								<CardBody>
									<div className='ctext' style={{padding: '2px'}}>
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

									</div>
									<div className='ctext' style={{padding: '2px'}}>
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
											/>
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
											</button>
											{' '}
										</div>
										<div
											style={{display: 'flex', justifyContent: 'flex-end'}}
										>
											{this.state.putForSaleLoading ? (
												<img src={loader}/>
											) : (
												<div></div>
											)}
										</div>
									</div>
								</CardBody>
							</Card>
						</Modal>

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
			batchart: [],
			cust: [],
			manuf: [],
			isModalOpen1: false,
			title: '',
			artUrl: '',
			price: '',
			artHash: '',
			nos: 1,
			isLoading: false,
			loadingError: false,
			uploadSuccess: false,
			sortLayout: false,
			searchCollectionValue: '',
			parsedSearchCollectionValue: [],
			parsedSearchCollectionValueTitle: [],
			filteredCollectionItems: [],
			filteredCollectionTitle: [],
			searchTitle: 'Enter Title',
		};

		// this.toggleModal1 = this.toggleModal1.bind(this);
		this.toggleModal2 = this.toggleModal2.bind(this);
		this.handleUploadMore = this.handleUploadMore.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.fileSelectHandler = this.fileSelectHandler.bind(this);
		this.fileUploadHandler = this.fileUploadHandler.bind(this);
		this.fileAwsHandler = this.fileAwsHandler.bind(this);
		this.handleClickAdd = this.handleClickAdd.bind(this);
		this.refreshMyArt = this.refreshMyArt.bind(this);
	}

	// toggleModal1() {
	// 	this.setState({
	// 		isModalOpen1: !this.state.isModalOpen1,
	// 	});
	// }

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
		// this.toggleModal1();
	}

	creatingItems = async (x) => {
		let tokenHash = this.state.artHash.toString();
		let tokenTitle = this.state.title;
		let tokenPrice = (this.state.price * ETHER).toString();
		let imgUrl = x;
		let nos = this.state.nos;
		// console.log(tokenHash, tokenTitle, tokenPrice, imgUrl, nos);

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

			// console.log('res', res);
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
			// this.toggleModal1();
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
		// console.log(res);

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
					_tokenHash: rex2._tokenHash,
					_tokenBatchName: rex2._tokenBatchName,
					_tokenCreator: rex2._tokenCreator,
					_imgUrl: rex2._imgUrl,
					_imgThumbnail: rex2._imgThumbnail,

				}
				response.push(newBlock);
				console.log('=====>response!!!!!!!!!!', response);
				// console.log(newBlock)
			}
			if (rex2._tokenCreator == this.props.accounts) {
				createrToken.push(rex);
			}

		}

		allDocs = [];
		allDocs = response;
		console.log(response);
		this.setState({art: allDocs, batchart: createrToken});
		this.setState({filteredCollectionItems: allDocs});
		this.setState({filteredCollectionTitle: allDocs});
	}

	componentDidUpdate(prevProps, prevState) {
		const { parsedSearchCollectionValue, parsedSearchCollectionValueTitle, art } = this.state

		if (prevState.parsedSearchCollectionValue !== parsedSearchCollectionValue) {
			this.setState({
				filteredCollectionItems: parsedSearchCollectionValue.length === 0
					? art
					: art.filter((word) => {
						const wordParts = word._tokenBatchName.split(/[, ]+/g);
						return wordParts.find((wordPart) => {
							return parsedSearchCollectionValue.find((parsedWordFromSearcher) => {
								return wordPart.toLowerCase().includes(parsedWordFromSearcher);
							});
						});
					})
			})
		}

		if (prevState.parsedSearchCollectionValueTitle !== parsedSearchCollectionValueTitle) {
			this.setState({
				filteredCollectionTitle: parsedSearchCollectionValueTitle.length === 0
					? art
					: art.filter((word) => {
						const wordParts = word._tokenBatchName.split(/[, ]+/g);
						return wordParts.find((wordPart) => {
							return parsedSearchCollectionValueTitle.find((parsedWordFromSearcher) => {
								return wordPart.toLowerCase().includes(parsedWordFromSearcher);
							});
						});
					})
			})
		}
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
		this.setState({isLoading: true, loadingError: false, artHash: hash});
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

	handleClickAdd = () => {
		this.setState({sortLayout: !this.state.sortLayout})
	}

	onSearchCollectionChange = (event) => {
		const { value } = event.target;
		const parsedSearchCollectionValue = Array.from(
			value.match(/[^, ]+/g) || []
		).map((item) => item.toLowerCase());
		this.setState({
			searchCollectionValue: value,
			parsedSearchCollectionValue,
		})
	}

	onChangeTitleCollection = (event) => {
		const { value } = event.target;
		this.setState({searchTitle: value});
	}

	addGalleryTitle = () => {
		this.props.setAllGallery([...this.props.gallery, {name: this.state.searchTitle}]);
		this.setState({sortLayout: !this.state.sortLayout});
	}

	filterMyCollectionTitle = (e, name) => {
		const parsedSearchCollectionValueTitle = Array.from(
			name.match(/[^, ]+/g) || []
		).map((item) => item.toLowerCase());

		if (name === 'All Cards') {
			this.setState({
				filteredCollectionTitle: this.state.art
			})
		} else {
			this.setState({
				parsedSearchCollectionValueTitle
			})
		}
	}

	render() {
		const { filteredCollectionItems,filteredCollectionTitle, searchTitle } = this.state;

		const Menu = filteredCollectionTitle?.map((x) => {
			return (
				<div key={x._tokenId} className='item-nft'>
					<MyCollectionCards
						art={x}
						contract={this.props.contract}
						accounts={this.props.accounts}
					/>
				</div>
			);
		});

		const SortLayoutWrapper = filteredCollectionItems.map((x) => {
			return (
				<div key={x._batchId} className='item-nft'>
					<SortLayout
						art={x}
						contract={this.props.contract}
						accounts={this.props.accounts}
					/>
				</div>
			);
		});

		const ch = 'visible';
		return (
			<div className='artContainer'>
				{filteredCollectionTitle && filteredCollectionTitle.length > 0
					? (
						<div>
							<p
								style={{
									fontFamily: 'Gibson',
									fontSize: '64px',
									marginTop: '53px',
									textAlign: 'left',
									lineHeight: "64px",
									color: "#000000",
								}}
							>
								MyCollection
							</p>

							<p
								style={{
									fontFamily: 'Gibson',
									fontSize: '24px',
									marginTop: '15px',
									textAlign: 'left',
									lineHeight: "24px",
									color: "#5540C7",
								}}
							>
								{this.state.art.length} NFTs
							</p>
							<div
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									minHeight: '800px',
								}}
							>
								<div
									style={{
										marginTop: '65px',
										maxWidth: '300px',
										width: '100%',
										display: 'flex',
										alignItems: 'end',
										flexDirection: 'column',
										marginRight: '120px',
									}}
								>
									<p
										style={{
											textTransform: 'uppercase',
											fontSize: '18px',
											fontWeight: 'bold',
											lineHeight: '23px',
											marginBottom: '10px',
											color: '#000000',
										}}
									>
										sort by:
									</p>
									<p
										style={{
											marginBottom: '50px',
											width: '100%',
											display: 'flex',
										}}
									>
										<select
											id="dropdown"
											// onChange={}
											style={{
												fontFamily: 'Gibson',
												width: '75%',
												borderTop: 'none',
												borderLeft: 'none',
												borderRight: 'none',
												fontSize: '18px',
												marginLeft: '-3px',
												background: 'none',
											}}
										>
											<option value="" className="option-selected">New</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select>
									</p>
									<p
										style={{
											textTransform: 'uppercase',
											fontWeight: 'bold',
											fontSize: '18px',
											lineHeight: '23px',
											marginBottom: '10px',
											color: '#000000',
										}}
									>
										Galleries:
									</p>
									{this.props.gallery.map(({name}) => (
										<p
											style={{
												textTransform: 'capitalize',
												fontSize: '16px',
												lineHeight: '24px',
												marginBottom: '24px',
												color: '#000000',
												cursor: 'pointer',
											}}
											onClick={(e) => this.filterMyCollectionTitle(e, name)}
										>
											{name}
										</p>
									))}

									<button
										style={{
											fontSize: '18px',
											lineHeight: '18px',
											color: '#5540C7',
											background: 'none',
											border: '0',
										}}
										onClick={this.handleClickAdd}
									>
										+ Add
									</button>
								</div>
								<div className='my-art-row'>{Menu}</div>
							</div>
						</div>
					)
					: <Loading name=''/>
				}


				{this.state.sortLayout
					? <div className="sort-layout-wrapper">
						<div className="input-title-wrapper">
							<input
								type="text"
								className="input-title"
								value={searchTitle}
								onChange={this.onChangeTitleCollection}
							/>
						</div>
						{/*<p className="enter-title-text">Enter Tiltle</p>*/}
						<div className="enter-title">
							<input
								type="text"
								className="input-enter-title"
								placeholder='Search MyCollection'
								onChange={this.onSearchCollectionChange}
							/>
							<button
								className="button-done"
								onClick={(e) => this.addGalleryTitle(e)}
							>
								Done
							</button>
							<button
								onClick={this.handleClickAdd}
								className="button-cancel"
							>Cancel
							</button>
						</div>
						<div className="my-art-row scroll">
							{SortLayoutWrapper}
						</div>
					</div>
					: null}


				<Modal
					isOpen={this.state.uploadSuccess}
					onClosed={this.refreshMyArt}
					toggle={this.toggleModal2}
					className='modal-xl'
				>
					<ModalHeader toggle={this.toggleModal2}>
						<></>
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
							Hi, your upload was successful!
						</p>
						<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>
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

const mapStateToProps = (state) => ({
	gallery: state.myCollection.galleryValue,
});

const mapDispatchToProps = (dispatch) => ({
	setAllGallery: (data) => dispatch(setAllGallery(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyItemComponent);
