import React, {useEffect, useCallback, useRef, useState} from 'react';
import Modal from "../Modal";
import {Form, FormGroup, Input, Label} from "reactstrap";
import './style.scss';
import Checkbox from "./checkbox/checkbox";

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
		imgThumb,
		onSale,
		onStartAuction
	} = props

	console.log('=====>props1', props);

	const auctionInputRef = useRef(null)
	const buyNowInputRef = useRef(null)

	const [saleType, setSaleType] = useState(saleTypes.BUY_NOW);
	const [duration, setDuration] = useState(saleTypes.BUY_NOW);
	const [sellPrice, setSellPrice] = useState(saleTypes.BUY_NOW);

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
						{<img style={{width: '95px', margin: '0 auto'}}
									className='control-preview-img'
									src={imgThumb}
									alt={imgThumb}
						/>
						}
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
							{/*<span>{`($${(usdPrice(props.price) * ethPrice.usd).toFixed(2)} USD)`}</span>*/}
							<span>($1,580.10 USD)</span>
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
