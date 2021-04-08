import React, {useState} from 'react';

import Modal from "../Modal";

import {Form, FormGroup, Input, Label} from "reactstrap";
import './MintModal.scss';

const MintModal = (props) => {
	const {
		isOpen,
		toggle,
		send,
		arturl,
	} = props

	const [valueInput, setValueInput] = useState(0);

	const handleInput = (e) => {
		setValueInput(e.target.value)
	}

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			className='mint_modal_wrapper'
			unmountOnClose
			header={(
				<>
					<div className='title'>
						MINT NFT
					</div>
					<div className='subtitle'>
						Create Your Batch
					</div>
				</>
			)}
			body={(
				<Form>
					{/* <FormGroup>
						<span className='label'>File</span>
						<span className='file-name'>{arturl}</span>
					</FormGroup> */}
					<FormGroup className='form-group-preview'>
						{
							<img style={{width: '92px', margin: '0 auto'}}
									className='control-preview-img'
									src={arturl}
									alt={arturl}
							/>
						}
					</FormGroup>
					<FormGroup>
						<Label
							htmlFor='artHash'
							className="upload-label"
						>
							No. of Tokens
						</Label>
						<Input onChange={handleInput} className='text-input' type='text'/>
					</FormGroup>
					<button disabled={!valueInput} onClick={() => send(valueInput)} className="submit-button">Confirm</button>
				</Form>
			)}
		/>
	)
};

export default MintModal;
