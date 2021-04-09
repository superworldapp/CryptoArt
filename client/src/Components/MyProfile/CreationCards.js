import React, {useEffect, useState} from 'react';
import {
	Card,
	CardBody,
	CardSubtitle,
	CardText,
	CardImg,
	CardImgOverlay,
	CardTitle,
} from 'reactstrap';
import Web3 from 'web3';
import './CreationCards.scss';
import heart from '../../images/svg/heart-card-img.svg';
import Sound from "react-sound";
import ReactPlayer from "react-player";
import Axios from "axios";

const convert = (ethprice) => {
	return (Number(Web3.utils.fromWei(ethprice.toString(), 'ether')).toFixed(2) + ' ' + 'ETH')
}

const usdPrice = (ethprice) => {
	return (Number(Web3.utils.fromWei(ethprice.toString(), 'ether')))
}

const CreationCards = (props) => {
	const [soundPlaying, setSoundPlaying] = useState('');
	const [ethPrice, setEthPrice] = useState({});


	const getEthDollarPrice = () => {
		try {
			Axios.get(
				`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,btc,eur,gpb&include_24hr_change=false`
			).then((res) => {
				// console.log(typeof res.data.ethereum.usd_24h_change);
				setEthPrice(res.data.ethereum);
			});
		} catch {
			console.log('could not get the request');
		}
	};

	useEffect(() => {
		getEthDollarPrice();
	}, []);

	const setDate = () => {
		const milliSec = Number(props.time * 1000) - Date.now();
		let hours = Math.floor((milliSec / (1000 * 60 * 60))).toFixed(0);
		let minutes = ((milliSec / (1000 * 60)) % 60).toFixed(0)
		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;

		return `${hours} Hrs ${minutes} Min Remaining`
	}

	const displayFileType = () => {
		if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(props.cardImage)) {
			return (
				<CardImg
					top
					className="card-background-image"
					src={props.cardImage}
					alt='Card image'
				/>
			);
		} else if (/\.(?:wav|mp3)$/i.test(props.cardImage)) {
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
						url={props.cardImage}
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
				props.cardImage
			)
		) {
			return (
				<ReactPlayer
					className="cardVideo"
					loop={true}
					playing={true}
					url={props.cardImage}
				/>
			);
		}
	};
	return (
		<Card className='card-wrapper'>
			{displayFileType()}
			<CardImgOverlay className="card-img-overlay">
				<img className="card-user-img" src={props.profileImage} alt="userImg"/>
				<img src={heart} alt="heart" className="card-user-heart"/>
				<CardTitle className="card-user-title">
					{props.cardTitle}
				</CardTitle>
			</CardImgOverlay>
			<CardBody>
				<div className="card-user-body">
					<CardSubtitle className="card-created-by">
						{props.CardSubtitle}
					</CardSubtitle>
					<CardSubtitle className="card-subtitle-name">
						{props.CardSubtitleName}
					</CardSubtitle>
				</div>
				<div className='card-text-info'>
					<CardText className="card-text-info-price">
						{convert(props.price)}
						<p className="card-text-info-usd">
							{`($${(usdPrice(props.price)*ethPrice.usd).toFixed(2)} USD)`}
						</p>
					</CardText>
					<div>
						<button className='card-buy-button'>Bid</button>
					</div>
				</div>
				<div className='card-buy-time'>
					<p className='card-buy-time-text'>
						{
							props.time === '0'
								? ''
								: Date.now() / 1000 < props.time
								? setDate()
								: (<p className="red">Auction Timer Ended</p>)
						}
					</p>
				</div>
			</CardBody>
		</Card>
	)
}

export default CreationCards;