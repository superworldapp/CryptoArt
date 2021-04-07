import React, {useState} from 'react';
import {
	Card,
	CardBody,
	CardSubtitle,
	CardText,
	CardImg,
	CardImgOverlay,
	CardTitle,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import Sound from 'react-sound';
import ReactPlayer from 'react-player';
import heart from '../../images/svg/heartSvg.svg';
import profile from '../../images/svg/avatar.svg';
import './CreationCards.scss';

const CreationCards = (props) => {
	console.log(`==========>props`, props);
	const [soundPlaying, setSoundPlaying] = useState('')
	const displayFileType = () => {
		if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(props._imgurl)) {
			return (
				<CardImg
					top
					className="card-background-image"
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
	const accUsername = (accNum) => {
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
		else return '@Annonymous';
	};

	// const img = new Image();
	// 	let orientation;
	// 	img.onload = function () {
	// 		let width = this.width;
	// 		let height = this.height;
	// 		orientation = width < height ? 'portrait' : 'landscape';
	// 	};
	// 	img.src = this.props.art.imgurl;
	// 	img.onload();

	// const displayFileType = () => {
	// 	if (/\.(jpe?g|png|gif|bmp)$/i.test(this.props.art._imgurl)) {
	// 		return (
	// 			<CardImg
	// 				className={orientation}
	// 				top
	// 				src={this.props.art._imgurl}
	// 				alt='Card image'></CardImg>
	// 		);
	// 	} else if (/\.(?:wav|mp3)$/i.test(this.props.art._imgurl)) {
	// 		return (
	// 			<>
	// 				<button
	// 					style={{
	// 						zIndex: '1'
	// 					}}
	// 					onClick={() =>
	// 						this.setState({
	// 							soundPlaying: !this.state.soundPlaying
	// 						})
	// 					}>
	// 					{this.state.soundPlaying ? 'Pause' : 'Play'}
	// 				</button>
	// 				<Sound
	// 					url={this.props.art._imgurl}
	// 					playStatus={
	// 						this.state.soundPlaying
	// 							? Sound.status.PLAYING
	// 							: ''
	// 					}
	// 					playFromPosition={300 /* in milliseconds */}
	// 					onLoading={this.handleSongLoading}
	// 					onPlaying={this.handleSongPlaying}
	// 					onFinishedPlaying={this.handleSongFinishedPlaying}
	// 				/>
	// 			</>
	// 		);
	// 	} else if (
	// 		/\.(?:mov|avi|wmv|flv|3pg|mp4|mpg)$/i.test(
	// 			this.props.art._imgurl
	// 		)
	// 	) {
	// 		return (
	// 			<ReactPlayer
	// 				className={orientation}
	// 				style={{ maxWidth: '270px' }}
	// 				loop={true}
	// 				playing={true}
	// 				url={this.props.art._imgurl}
	// 			/>
	// 		);
	// 	}
	// };

		

	return (
		<Link
			style={{
				color: '#212529',
				textDecoration: 'none'
			}}
			to={`/batch/${props._batchId}`}>
			<Card className="cardWrapper">
				{/*<CardImg*/}
				{/*	top*/}
				{/*	className="card-background-image"*/}
				{/*	src={props['5']}*/}
				{/*	alt='image3'*/}
				{/*/>*/}
				 {displayFileType()}
				<CardImgOverlay className="cardImgOverlay">
					<div className="userImg">
						<img src={props.profileImage || profile} alt="userImg"/>
					</div>
					<div className="card-user-heart">
						<img src={heart} alt="heart"/>
					</div>
					<CardTitle className="card-user-title">
						{props._tokenBatchName || 'none'}
					</CardTitle>
				</CardImgOverlay>
				<CardBody className="card-body">
					<div className="card-user-body">
						<CardSubtitle className="card-created-by">
							by
						</CardSubtitle>
						<CardSubtitle className="card-subtitle-name">
							{accUsername(props._tokenCreator) || ''}
						</CardSubtitle>
					</div>
					<div className='card-text-info'>
						<CardText className="card-text-info-price">
							{props.price || '0.5ETH'}
							<p className="card-text-info-usd">
								{props.usdPrice || '($985.56 USD)'}
							</p>
						</CardText>
						<div>
							<button className='card-buy-button'>Bid</button>
						</div>
					</div>
					<div className='card-buy-time'>
						<p className='card-buy-time-text'>
							{props.time || '26 hrs 42 mins remaining'}
						</p>
					</div>
				</CardBody>
			</Card>
		</Link>
	);
};

export default CreationCards;
