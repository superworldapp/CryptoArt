import React, {useState} from 'react';

import Modal from "../Modal";

import {Form, FormGroup, Input, Label} from "reactstrap";
import './MintModal.scss';
import Sound from "react-sound";
import ReactPlayer from "react-player";

const MintModal = (props) => {
	const {
		isOpen,
		toggle,
		send,
		arturl,
	} = props

	const [valueInput, setValueInput] = useState(0);
	const [soundPlaying, setSoundPlaying] = useState('');


	const displayFileType = () => {
		if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(arturl)) {
			return (
				<img
					style={{width: '92px', margin: '0 auto'}}
					className='control-preview-img'
					src={arturl}
					alt={arturl}
				/>
			);
		} else if (/\.(?:wav|mp3)$/i.test(arturl)) {
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
						url={arturl}
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
				arturl
			)
		) {
			return (
				<ReactPlayer
					className="video-card"
					loop={true}
					playing={true}
					url={arturl}
				/>
			);
		}
	};


	const handleInput = (e) => {
		setValueInput(e.target.value);
		console.log(e.target.value);
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		send(valueInput);
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
				<Form >
					{/* <FormGroup>
						<span className='label'>File</span>
						<span className='file-name'>{arturl}</span>
					</FormGroup> */}
					<FormGroup className='form-group-preview'>
						{displayFileType()}
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
					<button disabled={!valueInput} onClick={handleSubmit} className="submit-button">Confirm</button>
				</Form>
			)}
		/>
	)
};

export default MintModal;
