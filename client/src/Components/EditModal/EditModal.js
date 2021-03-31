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

const EditModal = props => {
	const {
		isOpen,
		toggle,
		onClosed,
		fileName,
	} = props

	const auctionInputRef = useRef(null)
	const buyNowInputRef = useRef(null)

	const [saleType, setSaleType] = useState(saleTypes.BUY_NOW);

	const onSaleTypeChange = useCallback(e => {
		setSaleType(e.target.value)
	}, [])

	useEffect(() => {
		console.log('========>initialControls.tokenPrice', initialControls.tokenPrice);
		if (saleType === saleTypes.AUCTION) {
			initialControls.tokenPrice.disabled = true
			initialControls.duration.disabled = false
		} else if (saleType === saleTypes.BUY_NOW) {
			initialControls.tokenPrice.disabled = false
			initialControls.duration.disabled = true
		}
	}, [saleType])

	const handleClick = () => {
		toggle()
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
					<FormGroup>
						<span className='file-label'>File</span>
						<span className='file-name'>{fileName}</span>
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
					<FormGroup className={saleType === saleTypes.AUCTION ? 'form-disabled' : ''}>
						<div className='label-token-price'>
							<Label className='label' htmlFor='buy1now'>
								Token Price
							</Label>
							<span className='custom-tooltip'>(Start Price if Auction)</span>
						</div>
						<Input
							disabled={saleType === saleTypes.AUCTION}
							className='text-input'
							type='text'
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
							onClick={handleClick}
						>
							List/Relist
						</button>
						<button
							className='abtn submit-button-two'
							onClick={handleClick}
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
