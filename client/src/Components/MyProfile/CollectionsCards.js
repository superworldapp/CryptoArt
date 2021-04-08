import React, {useState} from 'react';
import {
	Card,
	CardBody,
	CardImg,
	CardTitle,
} from 'reactstrap';

import './CollectionsCards.scss';
import Sound from "react-sound";
import ReactPlayer from "react-player";

const CollectionsCards = (props) => {
	const [soundPlaying, setSoundPlaying] = useState('');

	const displayFileType = () => {
		if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(props._imgurl)) {
			return (
				<CardImg
					top
					className="card-background-image-collection"
					src={props._imgurl}
					alt='Card image'
				/>
			);
		} else if (/\.(?:wav|mp3)$/i.test(props._imgurl)) {
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
						url={props._imgurl}
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
				props._imgurl
			)
		) {
			return (
				<ReactPlayer
					className="cardVideo"
					loop={true}
					playing={true}
					url={props._imgurl}
				/>
			);
		}
	};

	return (
		<Card className='card-wrapper-collection'>
			{displayFileType()}
			<CardBody className="card-img-overlay-collection">
				<CardTitle className="card-user-title-collection">
					{props['2']}
				</CardTitle>
			</CardBody>
		</Card>
	)
}

export default CollectionsCards;
