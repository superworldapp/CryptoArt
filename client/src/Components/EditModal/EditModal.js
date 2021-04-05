import React, {useEffect, useCallback, useRef, useState} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";

import Checkbox from "./checkbox/checkbox";
import Modal from "../Modal";

import './EditModal.scss';

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

const ETHER = '1000000000000000000';


const EditModal = props => {
	const {
		contract,
		accounts,
		tokenID,
		isOpen,
		toggle,
		onClosed,
		fileName,
		imgThumb,
	} = props

	const auctionInputRef = useRef(null)
	const buyNowInputRef = useRef(null)
	const [sellPrice, setSellPrice] = useState(saleTypes.BUY_NOW);
	const [saleType, setSaleType] = useState(saleTypes.BUY_NOW);
	const onSaleTypeChange = useCallback(e => {
		setSaleType(e.target.value);
		console.log(e.target.value);
	}, [])
	const handleInputChange = (e) => {
		const target = e.target;
		setSellPrice(target.value);
		console.log(target.value);
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		Sale(true);
		toggle();
	}

	const handleSubmit2 = (event) => {
		event.preventDefault();
		Sale(false);
		toggle();
	}
	const Sale = async (isListed) => {
		// let tokenId = tokenID
		// let sellprice = "1000000000000000000"
		let price = isListed === true ? ((sellPrice) * ETHER).toString() : 0;
		try {
			//function Sale(uint256 _tokenId,uint _sellprice,bool isListed)
			const res = await contract.methods
				.Sale(
					tokenID,
					price,
					isListed,
				)
				.send({from: accounts, gas: 5000000});

			console.log('res', res);
			let data;
		} catch (error) {
			console.error(error)
		}
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

	const handleClick = () => {
		Sale().then()
	}

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
						{<img style={{height: '20', width: '20%'}}
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
              ETH<span>($1,580.10 USD)</span>
            </span>
					</FormGroup>
					<FormGroup className={saleType === saleTypes.BUY_NOW ? 'form-disabled' : ''}>
						<Label className='label' htmlFor='buynow'>
							Duration
						</Label>
						<Input
							disabled={saleType === saleTypes.BUY_NOW}
							className='text-input'
							type='text'
						/>
						<span className='after-input-text'>Days</span>
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
