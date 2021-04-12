import React, {Component} from "react";
import {Card, CardBody, CardImg, Container, Modal, ModalBody, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";
import checkmark from "../../images/svg/checkmark.svg";
import loader from "../../images/loader.svg";
import {cardpills, ETHER} from "../MyStoreComponent";
import './style.scss';
import Sound from 'react-sound';
import ReactPlayer from 'react-player';
import MintModal from "../MintModal/MintModal";
import ModalUploadToMyStore from "../ModalUploadToMyStore/ModalUploadToMyStore";
import ModalListingNft from "../ModalListingNft";
import Loading from "../Loading/loading";
import EditModal from "../EditModal";
import SuccessfulModals from "../SuccessfulModals";


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
			isMintModal: false,
			soundPlaying: false,

			openListModal: false,

			uploadSuccess: false,
			loadingError: false,
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
		this.Sale = this.Sale.bind(this);
		this.mintTokenBatch = this.mintTokenBatch.bind(this);
		this.CloseListModal = this.CloseListModal.bind(this);

		this.handleUploadMore = this.handleUploadMore.bind(this);
		this.handleOpenListModal = this.handleOpenListModal.bind(this);
		this.setLoadingAfterSend = this.setLoadingAfterSend.bind(this);
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

	handleOpenListModal() {
		this.setState({
			openListModal: !this.state.openListModal,
		})
	}

	CloseListModal() {
		this.setState({
			openListModal: false,
		})
	}

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

	mintTokenBatch = async () => {
		// const res = await instance.methods.createtokenBatch().send();
		// console.log(res)
		let tokenBatchId = 1//this.state.artHash.toString();
		let amountToMint = 1 //this.state.title;

		try {
			//function mintTokenBatch(uint256 tokenBatchId, uint256 amountToMint)
			const res = await this.props.contract.methods
				.mintTokenBatch(
					tokenBatchId,
					amountToMint,
				)
				.send({from: this.props.accounts, gas: 5000000});

			console.log('res', res);
			let data;
		} catch (error) {
			console.error(error)
		}
	}

	Sale = async (isListed, sellPrice) => {
		let price = isListed === true ? ((sellPrice) * ETHER).toString() : 0;
		try {

			this.setLoadingAfterSend()
			this.CloseListModal()
			const res = await this.props.contract.methods
				.Sale(
					this.props.art._tokenId,
					price,
					isListed,
				)
				.send({from: this.props.accounts, gas: 5000000});

			console.log('=====>res', res);
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

	StartAuction = async (sellPrice, duration) => {
		try {
			let price = ((sellPrice) * ETHER).toString();
			let times = duration / 1000;

			this.setLoadingAfterSend()
			this.CloseListModal()
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

	handleUploadMore() {
		window.location.reload()
	}

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
		const {art} = this.props
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
				// className={buk}//{this.props.art._isBidding ? buk : bak}
				className='mystore-queue-card'
			>
				{/*<a href={this.props.art.imgUrl} target='_blank'> */}
				{/*{+art[3] > 0 && <span className='card-counter'>+{art[3]}</span>}*/}
				<Link to={`/batch/${this.props.art._refbatch}`}>
					<div className='mystore-queue-card-img'>
						{displayFileType()}
					</div>
				</Link>
				<div className='card-body-wrapper'>
					<CardBody style={{width: '100%'}}>

						<h3>{this.props.art._tokenBatchName}</h3>

						<div className='second-section'>
							<button onClick={this.handleOpenListModal} className='button_mint'>List</button>
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

				{
					this.state.openListModal
						? <ModalListingNft
							imgThumb={this.props.art._imgThumbnail}
							isOpen={this.state.openListModal}
							toggle={this.handleOpenListModal}
							onClose={this.CloseListModal}
							onStartAuction={(sellPrice, duration) => this.StartAuction(sellPrice, duration)}
							onSale={(isListed, sellPrice) => this.Sale(isListed, sellPrice)}
						/>
						: null
				}

				{
					<SuccessfulModals
						isOpen={this.state.uploadSuccess}
						toggle={this.toggleModal2}
						onClose={this.toggleModal2}
						variation={0}
						handleUploadMore={this.handleUploadMore}
					/>
				}

				{
					this.state.loadingAfterSend
						? <Loading name="Uploading File"/>
						: null
				}
			</Card>
		);
	}
}

export default Allpatrender;
