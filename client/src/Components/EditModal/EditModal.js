import React, {useEffect, useCallback, useRef, useState} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";

import Checkbox from "./checkbox/checkbox";
import Modal from "../Modal";

import './EditModal.scss';
import Loading from "../Loading/loading";
import SuccessfulModals from "../SuccessModal/SuccessfulModals";
import Web3 from "web3";
import Axios from "axios";
import Sound from "react-sound";
import ReactPlayer from "react-player";

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
		disabled: false,
	},
	duration: {
		value: 1,
		isRequired: true,
		isValid: false,
		disabled: false,
	}
}

const EditModal = props => {
	const {
		isOpen,
		toggle,
		onClosed,
		imgThumb,
		onStartAuction,
		onSale,
	} = props
	console.log('=====>props2', props);

	const auctionInputRef = useRef(null)
	const buyNowInputRef = useRef(null)
	const [sellPrice, setSellPrice] = useState(0);
	const [duration, setDuration] = useState(saleTypes.BUY_NOW);
	const [saleType, setSaleType] = useState(saleTypes.BUY_NOW);

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

	const handleSubmit = (event) => {
		event.preventDefault();
		if (saleType === saleTypes.AUCTION) {
			onStartAuction(sellPrice, duration);
		} else {
			onSale(true, sellPrice)
		}
	}

	const handleSubmit2 = (event) => {
		event.preventDefault();
		onSale(false);
	}

	const getEthDollarPrice = () => {
		try {
			Axios.get(
				`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,btc,eur,gpb&include_24hr_change=false`
			).then((res) => {
				// console.log(typeof res.data.ethereum.usd_24h_change);
				setEthPrice(res.data.ethereum);
			});
		} catch {
			console.log('could not get the request');
		}
	};

	useEffect(() => {
		if (saleType === saleTypes.AUCTION) {
			initialControls.tokenPrice.disabled = true
			initialControls.duration.disabled = true
		} else if (saleType === saleTypes.BUY_NOW) {
			initialControls.tokenPrice.disabled = true
			initialControls.duration.disabled = false
		}
	}, [saleType])

	useEffect(() => {
		getEthDollarPrice();
	}, []);

	const usdPrice = (ethprice) => {
		return (Number(Web3.utils.fromWei(ethprice.toString(), 'ether')))
	}

	const displayFileType = () => {
		if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(imgThumb)) {
			return (
				<img style={{width: '95px', margin: '0 auto'}}
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


	return (

		<Modal
			isOpen={isOpen}
			toggle={toggle}
			onClosed={onClosed}
			className='modal-listing-nft'
			unmountOnClose
			header={(
				<>
					<div className='title'>
						EDIT LISTING
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
							<Label
								disabled
								className="sale-type-label form-disabled"
							>
								Auction
							</Label>
							<Checkbox
								disabled
								className='sale-input'
								type='checkbox'
								name='sale-type'
								value={saleTypes.AUCTION}
								innerref={auctionInputRef}
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
								innerref={buyNowInputRef}
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
							<span>
								{`($${(sellPrice * ethPrice.usd).toFixed(2)} USD)`}
							</span>
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
						<span className='after-input-text'/>
					</FormGroup>
					<div className='submit-button-wrapper'>
						<button
							className='abtn submit-button'
							onClick={handleSubmit}
						>
							List/Relist
						</button>
						<button
							className='abtn submit-button-two'
							onClick={handleSubmit2}
						>
							Take Down
						</button>
					</div>
				</Form>
			)}
		/>
	);
};

export default EditModal;
