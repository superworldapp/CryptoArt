import React, {useEffect, useCallback, useRef, useState} from 'react';
import Modal from "../Modal";
import {Form, FormGroup, Input, Label} from "reactstrap";
import './style.scss';

const saleTypes = {
  AUCTION: 'AUCTION',
  BUY_NOW: 'BUY_NOW',
}

const initialControls = {
  saleType: {
    value: saleTypes.BUY_NOW,
    isRequired: true,
    isValid: true,
  },
  tokenPrice: {
    value: 1,
    isRequired: true,
    isValid: false,
  },
  noOfTokens: {
    value: 1,
    isRequired: true,
    isValid: false,
    disabled: true,
  },
  duration: {
    value: null,
    isRequired: true,
    isValid: false,
    disabled: true,
  }
}

const ModalListingNft = props => {
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

  }, [saleType])

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
            Listing NFT
          </div>
          <div className='subtitle'>
            Image, Video, Audio or 3D Model
          </div>
        </>
      )}
      body={(
        <Form>
          <FormGroup>
            <span className='label'>File</span>
            <span className='file-name'>{fileName}</span>
          </FormGroup>
          <FormGroup>
            <Label className='label sale-type' onClick={() => auctionInputRef.current.click()}>
              Auction
            </Label>
            <Input
              className='sale-input'
              type='radio'
              name='sale-type'
              value={saleTypes.AUCTION}
              innerRef={auctionInputRef}
              onChange={onSaleTypeChange}
              checked={saleTypes.AUCTION === saleType}
            />
          </FormGroup>
          <FormGroup>
            <Label className='label sale-type' onClick={() => buyNowInputRef.current.click()}>
              Buy Now
            </Label>
            <Input
              className='sale-input'
              type='radio'
              name='sale-type'
              value={saleTypes.BUY_NOW}
              innerRef={buyNowInputRef}
              onChange={onSaleTypeChange}
              checked={saleTypes.BUY_NOW === saleType}
            />
          </FormGroup>
          <FormGroup>
            <div className='label label-token-price'>
              <Label htmlFor='buy1now'>
                Token Price
              </Label>
              <span className='custom-tooltip'>(Start Price if Auction)</span>
            </div>
            <Input className='text-input' type='text' />
            <span className='after-input-text'>
              ETH<span>($1,580.10 USD)</span>
            </span>
          </FormGroup>
          <FormGroup>
            <Label className='label' htmlFor='buynow'>
              No. of Tokens
            </Label>
            <Input className='text-input' type='text' />
          </FormGroup>
          <FormGroup>
            <Label className='label' htmlFor='buynow'>
              Duration
            </Label>
            <Input className='text-input' type='text' />
            <span className='after-input-text'>Days</span>
          </FormGroup>
          <div className='submit-button-wrapper'>
            <button
              className='abtn submit-button'
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
