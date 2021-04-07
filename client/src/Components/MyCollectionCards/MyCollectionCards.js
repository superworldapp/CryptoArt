import React, {Component} from "react";
import {Card, CardImg} from "reactstrap";
import {Link} from "react-router-dom";
import checkmark from "../../images/svg/checkmark.svg";
import loader from "../../images/loader.svg";
import {cardpills, ETHER} from "../MyStoreComponent";
import './style.scss';
import Sound from 'react-sound';
import ReactPlayer from 'react-player';

class MyCollectionCards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			docCount: 0,
			art: [],
			isModalOpen: false,
			sellPrice: 0,
			auctionLoading: false,
			putForSaleLoading: false,
			delistLoading: false,
			listForAuctionSuccess: false,
			listForSaleSuccess: false,
			endAuctionLoading: false,
			endAuctionSuccess: false,
			isMintModal: false,
		};
	}

	render() {
		const displayFileType = () => {
			console.log(this.props.art._imgurl);
			if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(this.props.art._imgurl)) {
				return (
					<CardImg
						className={orientation}
						top
						src={this.props.art._imgurl}
						alt='Card image'
					/>
				);
			} else if (/\.(?:wav|mp3)$/i.test(this.props.art._imgurl)) {
				return (
					<>
						<button
							style={{
								zIndex: '1'
							}}
							onClick={() =>
								this.setState({
									soundPlaying: !this.state.soundPlaying
								})
							}>
							{this.state.soundPlaying ? 'Pause' : 'Play'}
						</button>
						<Sound
							url={this.props.art._imgurl}
							playStatus={
								this.state.soundPlaying
									? Sound.status.PLAYING
									: ''
							}
							playFromPosition={300 /* in milliseconds */}
							onLoading={this.handleSongLoading}
							onPlaying={this.handleSongPlaying}
							onFinishedPlaying={this.handleSongFinishedPlaying}
						/>
					</>
				);
			} else if (
				/\.(?:mov|avi|wmv|flv|3pg|mp4|mpg)$/i.test(
					this.props.art._imgurl
				)
			) {
				return (
					<ReactPlayer
						class={orientation}
						style={{maxWidth: '270px'}}
						loop={true}
						playing={true}
						url={this.props.art._imgurl}
					/>
				);
			}
		};
		const colorpills = () => {
			// if (this.props.art._isSelling) return cardpills[1];
			// else if (this.props.art._isBidding) return cardpills[3];
			// else return cardpills[0];
			return cardpills[0];
		};
		let x = colorpills();

		const img = new Image();
		let orientation;
		img.onload = function () {
			let width = this.width;
			let height = this.height;
			orientation = width < height ? 'portrait' : 'landscape';
		};
		img.src = this.props.art.imgurl;
		img.onload();

		return (
			<Card
				className='my-collection-queue-card'
			>
				<div className='mystore-queue-card-img'>
					<Link to={`/batch/${this.props.art._batchId}`}>
						{/* <CardImg
							top
							src={this.props.art._imgurl}
							alt='Card image'
						/> */}
						{displayFileType()}
					</Link>
				</div>
			</Card>
		);
	}
}

export default MyCollectionCards;
