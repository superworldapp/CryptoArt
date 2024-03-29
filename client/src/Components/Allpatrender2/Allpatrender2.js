import React, {Component} from "react";
import {Card, CardBody, CardImg, Modal, ModalBody, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";
import checkmark from "../../images/svg/checkmark.svg";
import loader from "../../images/loader.svg";
import {cardpills, ETHER} from "../MyStoreComponent";
import Web3 from 'web3';
import Sound from 'react-sound';
import ReactPlayer from 'react-player';
import EditModal from "../EditModal";
import Axios from "axios";
import SuccessfulModals from "../SuccessModal/SuccessfulModals";
import Loading from "../Loading/loading";
import ModalListingNft from "../ModalListingNft";

class Allpatrender2 extends Component {
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
			sellPrice: '2.00 ETH',
			auctionLoading: false,
			putForSaleLoading: false,
			delistLoading: false,
			listForAuctionSuccess: false,
			listForSaleSuccess: false,
			endAuctionLoading: false,
			endAuctionSuccess: false,
			isEditModal: false,
			ethPrice: {},

			uploadSuccess: false,
			loadingError: false,
			uploadError: false,
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
		this.closeEditToken = this.closeEditToken.bind(this);
		this.refreshMyArt = this.refreshMyArt.bind(this);
		this.Sale = this.Sale.bind(this);
		//this.toggleAuction = this.toggleAuction.bind(this);

		this.CloseEditModal = this.CloseEditModal.bind(this);
		this.handleUploadMore = this.handleUploadMore.bind(this);
		this.handleOpenListModal = this.handleOpenListModal.bind(this);
		this.setLoadingAfterSend = this.setLoadingAfterSend.bind(this);

		this.CloseLoadingError = this.CloseLoadingError.bind(this);
	}

	componentDidMount = async () => {
		//;'let newArr = await this.props.art?.filter((x) => x._isSellings);
		this.setState({art: this.props.art});
		const getEthDollarPrice = () => {
			try {
				Axios.get(
					`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,btc,eur,gpb&include_24hr_change=false`
				).then((res) => {
					// console.log(typeof res.data.ethereum.usd_24h_change);
					this.setState({ethPrice: res.data.ethereum});
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
				.buyToken(this.state.art._tokenId)
				.send({from: this.props.accounts, value: this.state.art._sellPrice, gas: 5000000});
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

	toggleModal2() {
		this.setState({
			uploadSuccess: false,
			loadingAfterSend: false,
		});
	}

	handleUploadMore() {
		window.location.reload()
	}

	handleOpenListModal() {
		this.setState({
			openListModal: !this.state.openListModal,
		})
	}

	CloseEditModal() {
		this.setState({
			isEditModal: false,
		})
	}

	CloseLoadingError() {
		this.setState({
			uploadError: false,
		})
	}

	setLoadingAfterSend() {
		this.setState({
			loadingAfterSend: !this.state.loadingAfterSend,
		})
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

	Sale = async (isListed, sellPrice) => {
		let price = isListed === true ? ((sellPrice) * ETHER).toString() : 0;
		try {

			this.setLoadingAfterSend()
			this.CloseEditModal()
			const res = await this.props.contract.methods
				.Sale(
					this.props.art._tokenId,
					price,
					isListed,
				)
				.send({from: this.props.accounts, gas: 5000000});

			console.log('res', res);
			this.toggleModal2();
			this.setState({isLoading: false, uploadSuccess: true});
		} catch (err) {
			this.setLoadingAfterSend()
			this.setState({loadingError: true});
		}
		this.setState({isLoading: false});
	}

	putForSale = async () => {
		this.setState({putForSaleLoading: true});
		const res = await this.props.contract.methods
			.Sale(
				this.state.art._tokenId,
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
				this.state.art._tokenId,
				(this.state.sellPrice * ETHER).toString(),
				false,
			)
			.send({from: this.props.accounts, gas: 1000000});

		console.log('res', res);
		this.setState({delistLoading: false});
		window.location.reload();
		console.log(res);
	};
	// closeBidowner = async() => {
	// 	let tokenId = 1
	// 	try {
	// 	  const res = await this.props.methods
	// 		.closeBidOwner(
	// 			this.state.art._tokenId
	// 		)
	// 		.send({ from: this.props.accounts, gas: 5000000 });
	// 	  console.log('res', res);
	// 	} catch(error){
	// 		console.error(error)
	// 	}
	//   }

	StartAuction = async (sellPrice, duration) => {
		try {
			let price = ((sellPrice) * ETHER).toString();
			let times = duration / 1000;

			this.setLoadingAfterSend()
			this.CloseEditModal()
			const res = await this.props.contract.methods
				.startBid(
					this.props.art._tokenId,
					price,
					times
				)
				.send({from: this.props.accounts, gas: 5000000});

			console.log('resStartAuction', res);
			this.toggleModal2();
			this.setState({isLoading: false, uploadSuccess: true});
		} catch (err) {
			this.setLoadingAfterSend()
			this.setState({loadingError: true});
		}
		this.setState({isLoading: false});
	};

	EndAuction = async () => {
		try {
			//this.setLoadingAfterSend()

			const res = await this.props.contract.methods
				.closeBidOwner(
					this.props.art._tokenId
				)
				.send({from: this.props.accounts, gas: 5000000});

			console.log(res);
			this.toggleModal2();
			this.setState({isLoading: false, uploadSuccess: true});
		} catch (err) {
			// this.setState({uploadError: true})
			// this.setLoadingAfterSend()
			// this.setState({loadingError: true});
		}
		this.setState({isLoading: false});
	};

	AddBid = async () => {
		const res = await this.props.contract.methods
			.addBid(
				this.state.art._tokenId,
			)
			.send({from: this.props.accounts, gas: 1000000, value: 1000000});
		// window.location.reload();
		console.log(res);
	};
	CloseBid = async () => {
		console.log(this.state.art._tokenId)
		const res = await this.props.contract.methods
			.closeBid(this.state.art._tokenId)
			.send({from: this.props.accounts, gas: 5000000});
		console.log(res);
	};

	closeEditToken() {
		this.setState({
			isEditModal: !this.state.isEditModal,
		});
	}

	render() {
		let but = this.state.art._isSellings ? 'mystore-active-card' : 'hidden';
		let bak = this.state.art._isSellings ? 'bg-success text-white' : '';
		let buk = this.state.art._isBidding ? 'bg-warning' : '';
		let b = this.state.art._isSellings ? 'hidden' : 'hidden';
		let b1 = this.state.art._isSellings ? 'hidden' : 'abtn1';
		let but1 = this.state.art._isSellings ? 'abtn1' : 'hidden';
		let auc1 = this.state.art._isBidding ? 'hidden' : 'abtn';
		let auc2 = this.state.art._isBidding ? 'hidden' : 'abtn1';
		let forAuc = this.state.art._isBidding ? 'visible' : 'invisible';

		// if(this.props.type == 2){
		// 	newarr = this.state.art?.filter((x) => x._isSellings);
		// 	this.setState({art : newarr});
		// }

		// let pr =
		//   Web3.utils.fromWei(this.props.art._sellprice.toString(), 'ether') == 0
		//     ? 'invisible'
		//     : 'visible';
		// let reSellOrSell = this.props.art._isSellings;
		// let Auc = this.props.art._isBidding;
		let accNum = this.state.art._tokenCreator;

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

		const displayFileType = () => {
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


		const colorpills = () => {
			// if (this.props.art._isSelling) return cardpills[1];
			// else if (this.props.art._isBidding) return cardpills[3];
			// else return cardpills[0];
			return cardpills[0];

		};
		let x = colorpills();

		const setDate = () => {
			const milliSec = Number(this.state.art._bidEnd * 1000) - Date.now();
			console.log('=====>milliSec', milliSec);
			let hours = Math.floor((milliSec / (1000 * 60 * 60))).toFixed(0);
			let minutes = ((milliSec / (1000 * 60)) % 60).toFixed(0)
			hours = (hours < 10) ? "0" + hours : hours;
			minutes = (minutes < 10) ? "0" + minutes : minutes;

			return `${hours} Hrs ${minutes} Min Remaining`
		}

		const usdPrice = (ethprice) => {
			return (Number(Web3.utils.fromWei(ethprice.toString(), 'ether')))
		}

		const img = new Image();
		let orientation;
		img.onload = function () {
			let width = this.width;
			let height = this.height;
			orientation = width < height ? 'portrait' : 'landscape';
		};
		img.src = this.state.art.imgUrl;
		img.onload();

		return (
			<Card
				className='mystore-active-card'
			>
				<div className='mystore-active-card-img'>
					<Link to={`/card/${this.state.art._tokenId}`}>
						{/* <CardImg
							top
							src={this.props.art._imgurl}
							alt='Card image'
						/> */}
						{displayFileType()}
					</Link>
				</div>
				<div className='card-body-wrapper'>
					<CardBody style={{width: '100%'}}>
						<h3>{this.state.art._tokenBatchName}</h3>
						<div className='second-section'>
							<span>
								<p style={{
									fontFamily: 'Gibson',
									lineHeight: '16px',
									fontSize: '16px',
									color: '#5540C7',
									margin: '0px',
								}}>
									{
										this.props.art._isSellings
											? Number(Web3.utils.fromWei(this.props.art._sellPrice.toString(), 'ether')).toFixed(2) + ' ' + 'ETH'
											: Number(Web3.utils.fromWei(this.props.art._bidPrice.toString(), 'ether')).toFixed(2) + ' ' + 'ETH'
									}
								</p>
								<p
									style={{
										fontFamily: 'Gibson',
										lineHeight: '12px',
										fontSize: '12px',
										color: '#5540C7',
										margin: '0px'
									}}>
									  {
											Number(Web3.utils.fromWei(this.props.art._sellPrice.toString(), 'ether')) === 0
												? `($${(usdPrice(this.props.art._bidPrice) * this.state.ethPrice.usd).toFixed(2)} USD)`
												: `($${(usdPrice(this.props.art._sellPrice) * this.state.ethPrice.usd).toFixed(2)} USD)`
										}
								</p>
							</span>
							{
								this.state.art._bidEnd === '0'
									? (
										(
											<button
												onClick={this.props.type === 3 ? this.EndAuction : this.closeEditToken}
												className="button_mint"
											>
												Edit
											</button>
										)
									)
									: Date.now() / 1000 < this.state.art._bidEnd
									? (
										(
											<button
												onClick={this.props.type === 3 ? this.EndAuction : this.closeEditToken}
												className="button_mint_end"
												disabled
											>
												End
											</button>
										)
									)
									: (
										<button
											onClick={this.props.type === 3 ? this.EndAuction : this.closeEditToken}
											className={this.props.type === 2 ? "button_mint_end" : "button_mint"}
											disabled={this.props.type === 2}
										>
											End
										</button>
									)
							}
						</div>
						<p className="card-body-time">
							{
								this.state.art._bidEnd === '0'
									? ''
									: Date.now() / 1000 < this.state.art._bidEnd
									? setDate()
									: (<p className="red">Auction Timer Ended</p>)
							}
						</p>
						<div style={{display: 'flex', justifyContent: 'center'}}>
							{this.state.delistLoading ? (
								<img height='35' src={loader} alt="load"/>
							) : (
								<></>
							)}
							{this.state.auctionLoading ? (
								<img height='35' src={loader} alt="load"/>
							) : (
								<></>
							)}
						</div>
					</CardBody>
				</div>

				{
					this.state.isEditModal
						? <EditModal
							price={this.state.art._sellPrice}
							tokenID={this.state.art._tokenId}
							contract={this.props.contract}
							accounts={this.props.accounts}
							isOpen={this.state.isEditModal}
							toggle={this.closeEditToken}
							onClose={this.CloseEditModal}
							imgThumb={this.state.art._imgThumbnail}
							fileName="BackCountry.png"
							onStartAuction={(sellPrice, duration) => this.StartAuction(sellPrice, duration)}
							onSale={(isListed, sellPrice) => this.Sale(isListed, sellPrice)}
						/>
						: null
				}
				
					<SuccessfulModals
						isOpen={this.state.uploadSuccess}
						toggle={this.toggleModal2}
						onClose={this.toggleModal2}
						variation={this.props.type === 2 ? 3 : 4}
						handleUploadMore={this.handleUploadMore}
					/>

				{
					this.state.loadingAfterSend
						? <Loading name={this.props.type === 2 ? 'Relisting' : 'Ending Auction'}/>
						: null
				}

				{
					this.state.uploadError
					? <Loading name='Error Uploading' type='error' onClose={this.CloseLoadingError}/>
					: null
				}
				
			</Card>
		);
	}
}

export default Allpatrender2;
