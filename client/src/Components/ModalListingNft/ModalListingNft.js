import React, {useEffect, useCallback, useRef, useState} from 'react';
import Modal from "../Modal";
import {Form, FormGroup, Input, Label} from "reactstrap";
import './style.scss';
import Checkbox from "./checkbox/checkbox";
//import SuccessfulModals from "../SuccessfulModals";
import Loading from "../Loading/loading";
import Axios from "axios";
import Web3 from "web3";
import Sound from "react-sound";
import ReactPlayer from "react-player";
const ETHER = '1000000000000000000'
const saleTypes = {
	AUCTION: 'AUCTION',
	BUY_NOW: 'BUY_NOW',
}

const initialControls = {
	saleType: {
		value: saleTypes.BUY_NOW,
		isRequired: false,
		isValid: true,
	},
	tokenPrice: {
		value: 1,
		isRequired: true,
		isValid: false,
	},
	duration: {
		value: 1,
		isRequired: true,
		isValid: false,
		disabled: false,
	}
}


const ModalListingNft = props => {
	const {
		toggle,
		onClose,
		isOpen,
		tokenID,
		imgThumb,
		onSale,
		onStartAuction,
		contract,
		accounts
	} = props

	console.log('=====>props1', props);

	const auctionInputRef = useRef(null)
	const buyNowInputRef = useRef(null)

	const [saleType, setSaleType] = useState(saleTypes.BUY_NOW);
	const [duration, setDuration] = useState(saleTypes.BUY_NOW);
	const [sellPrice, setSellPrice] = useState(0);

	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [loadingAfterSend, setLoadingAfterSend] = useState(false);

	const [ethPrice, setEthPrice] = useState({});

	const [soundPlaying, setSoundPlaying] = useState('');

	const onSaleTypeChange = useCallback(e => {
		setSaleType(e.target.value);
	}, [])

	const handleInputChange = (e) => {
		const target = e.target;
		setSellPrice(target.value);
		console.log(target.value);
	}

	const handleInputChange2 = (e) => {
		const target = e.target;

		const timestamp = new Date(target.value.split(".").reverse().join(".")).getTime();
		setDuration(timestamp);
		console.log(timestamp);
	}


	useEffect(() => {
		if (saleType === saleTypes.AUCTION) {
			initialControls.tokenPrice.disabled = true
			initialControls.duration.disabled = true
		} else if (saleType === saleTypes.BUY_NOW) {
			initialControls.tokenPrice.disabled = true
			initialControls.duration.disabled = false
		}
	}, [saleType])

	const handleSubmit = (event) => {
		event.preventDefault();

		if (saleType === saleTypes.AUCTION) {
			onStartAuction(sellPrice, duration);
		} else {
			onSale(true, sellPrice)
		}
	}

	const toggleModal2 = () => {
		setUploadSuccess(false);
		setLoadingAfterSend(false);
	}
	const handleUploadMore = () => {
		window.location.reload()
	}

	const StartAuction = async () => {
		try {
			let price = ((sellPrice) * ETHER).toString();
			let times = duration / 1000;

			setLoadingAfterSend(!loadingAfterSend);
			const res = await contract.methods
				.startbid(
					tokenID,
					price,
					times
				)
				.send({from: accounts, gas: 5000000});

			console.log('res1', res);
			toggleModal2();
			setUploadSuccess(!uploadSuccess);
		} catch (err) {
			setLoadingAfterSend(!loadingAfterSend)
		}
	};

	const Sale = async (isListed) => {
		let price = isListed === true ? ((sellPrice) * ETHER).toString() : 0;
		try {

			setLoadingAfterSend(!loadingAfterSend);
			const res = await contract.methods
				.Sale(
					tokenID,
					price,
					isListed,
				)
				.send({from: accounts, gas: 5000000});

			console.log('res', res);
			toggleModal2();
			setUploadSuccess(!uploadSuccess);

		} catch (error) {
			setLoadingAfterSend(!loadingAfterSend)
		}
	}

	const displayFileType = () => {
		if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(imgThumb)) {
			return (
				<img
					style={{width: '92px', margin: '0 auto'}}
					className='control-preview-img'
					src={imgThumb}
					alt={imgThumb}
				/>
			);
		} else if (/\.(?:wav|mp3)$/i.test(imgThumb)) {
			return (
				<>
					<button
						style={{
							zIndex: '1'
						}}
						onClick={() => setSoundPlaying(soundPlaying)}>
						{soundPlaying ? 'Pause' : 'Play'}
					</button>
					<Sound
						url={imgThumb}
						playStatus={
							soundPlaying
								? Sound.status.PLAYING
								: ''
						}
						playFromPosition={300 /* in milliseconds */}
						// onLoading={this.handleSongLoading}
						// onPlaying={this.handleSongPlaying}
						// onFinishedPlaying={this.handleSongFinishedPlaying}
					/>
				</>
			);
		} else if (
			/\.(?:mov|avi|wmv|flv|3pg|mp4|mpg)$/i.test(
				imgThumb
			)
		) {
			return (
				<ReactPlayer
					className="video-card"
					loop={true}
					playing={true}
					url={imgThumb}
				/>
			);
		}
	};

	const getEthDollarPrice = () => {
		try {
			Axios.get(
				`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,btc,eur,gpb&include_24hr_change=false`
			).then((res) => {
				console.log(typeof res.data.ethereum.usd_24h_change);
				setEthPrice(res.data.ethereum);
			});
		} catch {
			console.log('could not get the request');
		}
	};

	useEffect(() => {
		getEthDollarPrice();
	}, []);


	return (
		<Modal
			toggle={toggle}
			onClosed={onClose}
			isOpen={isOpen}
			className='modal-listing-nft'
			unmountOnClose
			header={(
				<>
					<div className='title'>
						Listing NFT
					</div>
					<div className='subtitle'>
						Image, Video, Audio or 3D Model
					</div>
				</>
			)}
			body={(
				<Form>
					<FormGroup className='form-group-preview'>
						{displayFileType()}
					</FormGroup>
					<FormGroup>
						<div className="sale-block">
							<Label className='sale-type-label'>
								Auction
							</Label>
							<Checkbox
								className='sale-input'
								type='checkbox'
								name='sale-type'
								value={saleTypes.AUCTION}
								innerRef={auctionInputRef}
								onChange={onSaleTypeChange}
								checked={saleTypes.AUCTION === saleType}
								id="one"
							/>
						</div>
					</FormGroup>
					<FormGroup>
						<div className="sale-block">
							<Label className='sale-type-label'>
								Buy Now
							</Label>
							<Checkbox
								className='sale-input'
								type='checkbox'
								name='sale-type'
								value={saleTypes.BUY_NOW}
								innerRef={buyNowInputRef}
								onChange={onSaleTypeChange}
								checked={saleTypes.BUY_NOW === saleType}
								id="two"
							/>
						</div>
					</FormGroup>
					<FormGroup>
						<div className='label-token-price'>
							<Label className='label' htmlFor='buy1now'>
								Token Price
							</Label>
							<span className='custom-tooltip'>(Start Price if Auction)</span>
						</div>
						<Input
							className='text-input'
							type='text'
							onChange={handleInputChange}
						/>
						<span className='after-input-text'>
              ETH
							<span>{`($${(sellPrice * ethPrice.usd).toFixed(2)} USD)`}</span>
						</span>
					</FormGroup>
					<FormGroup className={saleType === saleTypes.BUY_NOW ? 'form-disabled' : ''}>
						<Label className='label' htmlFor='buynow'>
							End Date
						</Label>
						<Input
							disabled={saleType === saleTypes.BUY_NOW}
							className='text-input date'
							type='datetime-local'
							onChange={handleInputChange2}
						/>

					</FormGroup>
					<div className='submit-button-wrapper'>
						<button
							className='abtn submit-button'
							onClick={handleSubmit}
						>
							Confirm
						</button>
					</div>
				</Form>
			)}
		/>
	);
};

export default ModalListingNft;
