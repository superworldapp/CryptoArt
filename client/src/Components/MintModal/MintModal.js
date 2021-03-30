import React, {useState} from 'react';

import Modal from "../Modal";

import './MintModal.scss';
import {Form, FormGroup, Input, Label} from "reactstrap";

const MintModal = (props) => {
	const {
		isOpen,
		toggle,
		send,
		fileName,
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
					<FormGroup>
						<span className='label'>File</span>
						<span className='file-name'>{fileName}</span>
					</FormGroup>
					<FormGroup>
						<Label
							htmlFor='artHash'
							className="upload-label"
						>
							No. of Tokens
						</Label>
						<Input onChange={handleInput} className='text-input' type='text' />
					</FormGroup>
					<button disabled={!valueInput} onClick={send} className="submit-button">Confirm</button>
				</Form>
			)}
		/>
	)
};

export default MintModal;
