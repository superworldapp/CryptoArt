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
	const accUsernameCard = (accNum) => {
		if (accNum === '0xB4C33fFc72AF371ECaDcF72673D5644B24946256')
		  return '@Chitra';
		else if (accNum === '0x0d5567345D3Cb1114471BC07c396Cc32C7CF92ec')
		  return '@Arianna';
		else if (accNum === '0xABD82c9B735F2C89f2e62152A9884F4A92414F20')
		  return '@CJMain';
		else if (accNum === '0x63611F92FA2d7B7e6625a97E6474b7fA16DbD89F')
		  return '@CJ Test';
		else if (accNum === '0x4271AC6Bb565D120e2Ac1C3fb855aE5Dad6aE8ff')
		  return '@Swapnil';
		else if (accNum === '0x81B2362F55Ea93f71990d7F446dca80BdD94C6e7')
		  return '@SwapnilTest';
		else if (accNum === '0xE337525DD5d34fC683f43CbBDF3e1EDe0833B744')
		  return '@Viktor';
		else if (accNum === '0x32c93d70E9813fFe62a2fCf6189F14A4ff2e8cB3')
		  return '@Alex';
		  else if (accNum === '0x483C8624a26acc7C1d5baA6c3648E4A5B64164e0')
		  return '@Magdalena';
		else if (accNum === '0xA64a71dAC0F4F61FD1e569F59a31c0860c0A33d5')
		  return '@MagdalenaTest';
		else return '@Annonymous';
	  };
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
					By {accUsernameCard(props._tokenCreator)}
				</CardTitle>
			</CardBody>
		</Card>
	)
}

export default CollectionsCards;
