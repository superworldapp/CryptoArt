import React, { useState, useEffect } from 'react';
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
import Axios from "axios";
import Web3 from 'web3';

const CreationCards = (props,art) => {
	const [soundPlaying, setSoundPlaying] = useState('');
	const [ethPrice, setEthPrice] = useState({});
	const [highest,setHighest] = useState('1000000000000000000000');
	const displayFileType = () => {
		if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(props._imgUrl)) {
			return (
				<CardImg
					top
					className="card-background-image"
					src={props._imgUrl}
					alt='Card image'
				/>
			);
		} else if (/\.(?:wav|mp3)$/i.test(props._imgUrl)) {
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
						url={props._imgUrl}
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
				props._imgUrl
			)
		) {
			return (
				<ReactPlayer
					className="cardVideo"
					loop={true}
					playing={true}
					url={props._imgUrl}
				/>
			);
		}
	};

	// const setDate = () => {
	// 	const milliSec = Number(props._bidend * 1000) - Date.now();
	// 	let hours = Math.floor((milliSec / (1000 * 60 * 60))).toFixed(0);
	// 	let minutes = ((milliSec / (1000 * 60)) % 60).toFixed(0)
	// 	hours = (hours < 10) ? "0" + hours : hours;
	// 	minutes = (minutes < 10) ? "0" + minutes : minutes;
	//
	// 	return `${hours} Hrs ${minutes} Min Remaining`
	// }

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

	const getHighest = () => {
		// art.map((it) => {
		// 	if(it._refbatch == props._batchId){
		// 		if(it._sellprice<highest){
		// 			setHighest(it._sellprice);
		// 		}
		// 	}
		// })
		console.log(art);
	}

	useEffect(() => {
		getEthDollarPrice();
	//	getHighest();
	}, [])

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
							{props.price || 0.5 } 'ETH'
							<p className="card-text-info-usd">
								{`($${(0.5*ethPrice.usd).toFixed(2)} USD)`}
							</p>
						</CardText>
						<div>
							<button className='card-buy-button'>Bid</button>
						</div>
					</div>
					<div className='card-buy-time'>
						<p className='card-buy-time-text'>
							{/* {props.time || '26 hrs 42 mins remaining'} */}
							{/*{*/}
							{/*	props._bidend === '0'*/}
							{/*		? ''*/}
							{/*		: Date.now() / 1000 < props._bidend*/}
							{/*		? setDate()*/}
							{/*		: (<p className="red">Auction Timer Ended</p>)*/}
							{/*}*/}
						</p>
					</div>
				</CardBody>
			</Card>
		</Link>
	);
};

export default CreationCards;
