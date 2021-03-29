import React from 'react';
import Modal from "../Modal";
import {Form, FormGroup, Input, Label} from "reactstrap";
import './style.scss';

const ModalListingNft = props => {
  const {
    isOpen,
    toggle,
    onClosed,
    fileName,
  } = props

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
            <Label className='label label-radio' htmlFor='auction'>
              Auction
            </Label>
            <Input type='radio' />
          </FormGroup>
          <FormGroup>
            <Label className='label label-radio' htmlFor='buynow'>
              Buy Now
            </Label>
            <Input type='radio' />
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
