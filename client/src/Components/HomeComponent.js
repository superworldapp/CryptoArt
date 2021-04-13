import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
	Container,
	Card,
	CardBody,
	CardSubtitle,
	CardText,
	CardImg,
	CardImgOverlay,
	Row,
	Col,
	CardTitle,
} from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';

import Auth from './Auth';
import {LayoutContext} from '../state/Layout/context';

import image1 from '../images/image 166.png';
import image2 from '../images/image 167.png';
import image3 from '../images/image 177.png';
import image4 from '../images/image 179.png';
import image5 from '../images/image 178.png';
import image6 from '../images/image 169.png';
import image7 from '../images/image 176.png';
import image8 from '../images/image 175.png';
import image9 from '../images/image 180.png';
import image10 from '../images/image 168.png';
import image11 from '../images/image 6.png';
import image12 from '../images/image 25.png';
import image13 from '../images/image 28.png';
import image14 from '../images/image 130.png';
import image15 from '../images/image 24.png';
import AnkorWat from '../images/Mask Group-2.png';
import Bluedomesofoia from '../images/Mask Group-1.png';
import Greatwalls from '../images/Mask Group.png';
import Downtowntoronto from '../images/image 164.png';
import Timesquare from '../images/image 165.png';
import avatar from '../images/svg/avatar.svg';
import profile from "../images/svg/avatar.svg";

import './HomeComponent.scss';
import '../App.css';
import Axios from "axios";


const mockTrendingNft = [
	{
		img: image11,
		profileImg: avatar,
		title: 'Octo',
		userName: 'Cjsmith',
		price: '0.5 ETH',
		usdPrice: '$985.56 USD',
		btnName: 'BUY NOW',
		time: ''
	},
	{
		img: image12,
		profileImg: avatar,
		title: 'New Planet Pitstop',
		userName: 'SaraViz',
		price: '0.5 ETH',
		usdPrice: '$985.56 USD',
		btnName: 'BUY NOW',
		time: ''
	},
	{
		img: image13,
		profileImg: avatar,
		title: 'Break Free',
		userName: 'Olivia',
		price: '0.5 ETH',
		usdPrice: '$985.56 USD',
		btnName: 'PLACE BID',
		time: '26 hrs 42 min remaining'
	},
	{
		img: image14,
		profileImg: avatar,
		title: 'Look',
		userName: 'Mai',
		price: '0.5 ETH',
		usdPrice: '$985.56 USD',
		btnName: 'PLACE BID',
		time: '26 hrs 42 min remaining'
	},
	{
		img: image15,
		profileImg: avatar,
		title: 'Faces',
		userName: 'kyliehart',
		price: '0.5 ETH',
		usdPrice: '$985.56 USD',
		btnName: 'BUY NOW',
		time: ''
	},
]

const mockRealEstate = [
	{
		img: AnkorWat,
		profileImg: avatar,
		title: 'Angkor Wat',
		userName: 'Super World',
		price: '0.1 ETH',
		usdPrice: '$176.61 USD',
		btnName: 'BUY NOW',
		time: ''
	},
	{
		img: Bluedomesofoia,
		profileImg: avatar,
		title: 'Blue Domes of Oia',
		userName: 'Super World',
		price: '0.1 ETH',
		usdPrice: '$176.61 USD',
		btnName: 'BUY NOW',
		time: ''
	},
	{
		img: Greatwalls,
		profileImg: avatar,
		title: 'Great Wall',
		userName: 'Super World',
		price: '0.1 ETH',
		usdPrice: '$176.61 USD',
		btnName: 'BUY NOW',
		time: ''
	},
	{
		img: Downtowntoronto,
		profileImg: avatar,
		title: 'Downtown Toronto',
		userName: 'Super World',
		price: '0.1 ETH',
		usdPrice: '$176.61 USD',
		btnName: 'BUY NOW',
		time: ''
	},
	{
		img: Timesquare,
		profileImg: avatar,
		title: 'Times Square',
		userName: 'Super World',
		price: '0.1 ETH',
		usdPrice: '$176.61 USD',
		btnName: 'BUY NOW',
		time: ''
	},
]

class Home extends Component {
	static contextType = LayoutContext;

	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null,
			loggedIn: false,
			startClicked: false,
			ethPrice: {},
		};
		this.handleStartClick = this.handleStartClick.bind(this);
	}

	componentDidMount() {
		const getEthDollarPrice = () => {
			try {
				Axios.get(
					`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,btc,eur,gpb&include_24hr_change=false`
				).then((res) => {
					// console.log(typeof res.data.ethereum.usd_24h_change);
					this.setState({ethPrice: res.data.ethereum});
				});
			} catch {
				console.log('could not get the request');
			}
		};
		getEthDollarPrice();
	}

	cData = () => {
		const Trendingcard = [
			{
				cImg: 'image3',
				calt: 'img3',
				uimg: 'annonuser',
				uname: 'annon name',
				ctitle: 'Alimation Character',
				price: '0.5ETH',
			},
			{
				cImg: 'image4',
				calt: 'img4',
				uimg: 'annonuser',
				uname: 'annon name',
				ctitle: 'Alimation Character',
				price: '0.5ETH',
			},

			{
				cImg: 'image5',
				calt: 'img5',
				uimg: 'annonuser',
				uname: 'annon name',
				ctitle: 'Alimation Character',
				price: '0.5ETH',
			},

			{
				cImg: 'image6',
				calt: 'img6',
				uimg: 'annonuser',
				uname: 'annon name',
				ctitle: 'Alimation Character',
				price: '0.5ETH',
			},
			{
				cImg: 'image7',
				calt: 'img7',
				uimg: 'annonuser',
				uname: 'annon name',
				ctitle: 'Alimation Character',
				price: '0.5ETH',
			},
		];
	};

	handleStartClick() {
		console.log('in start click');
		if (Auth.getAuth()) {
			this.setState({startClicked: true, loggedIn: true});
		} else {
			this.setState({startClicked: true});
			this.context.dispatch({
				type: 'TOGGLE_SIGN_IN_MODAL',
				payload: !this.context.state.signInModalIsOpen,
			});
		}
	}

	render() {
		const isMobile = window.innerWidth < 500;
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		if (this.state.loggedIn && this.state.startClicked) {
			return <Redirect to='/allart'/>;
		} else {
			return (
				<>
					<div className='Home'>
						<Container
							fluid
							className="containerFluidMain"
						>
							{!isMobile ?
								(
									<div className="upperView">
										<div className="sectionText1">
											<h1 id='header'>WELCOME TO THE SUPERWORLD NFT SALON</h1>
											<p className='text1'>
												BUY
												<span className="text2">
                      &nbsp;and&nbsp;
                    </span>
												SELL&nbsp;
												<span className="text2">
                     your favorite NFT's and
                    <br/>
                    make a {' '}
                    </span>
												<a target='blank' href='https://www.superworldapp.com/' className="text1">
													SuperWorld
												</a> {' '}
												<span className="text2">all your own</span>
											</p>
											<div id='start-btn'>
												<button
													className='start-btn'
													onClick={this.handleStartClick}
												>
													Explore
												</button>
											</div>
										</div>
										<div className="col1">
											<div className='home-slider'>
												<figure>
													<img className='topimage' src={image1} alt='img'/>
													<img className='topimage' src={image2} alt='img'/>
													<img className='topimage' src={image3} alt='img'/>
													<img className='topimage' src={image4} alt='img'/>
													<img className='topimage' src={image1} alt='img'/>
												</figure>
											</div>
										</div>
									</div>
								)
								:
								(
									<div className="upperView">
										<div className="sectionText1">
											<h1 id='header'>WELCOME TO THE SUPERWORLD NFT SALON</h1>
											<p className='text1'>
												BUY
												<span className="text2">
                      &nbsp;and&nbsp;
                    </span>
												SELL&nbsp;
												<span className="text2">
                    your favorite NFTs  and
                    <br/>
                    make a {' '}
                    </span>
												<a target='blank' href='https://www.superworldapp.com/' className="text1">
													SuperWorld
												</a>{' '}
												<span className="text2">all your own</span>
											</p>
										</div>
										<div className="col1">
											<div className='home-slider'>
												<figure>
													<img className='topimage' src={image1} alt='img'/>
													<img className='topimage' src={image2} alt='img'/>
													<img className='topimage' src={image3} alt='img'/>
													<img className='topimage' src={image4} alt='img'/>
													<img className='topimage' src={image1} alt='img'/>
												</figure>
											</div>
										</div>
										<div id='start-btn'>
											<button
												className='start-btn'
												onClick={this.handleStartClick}
											>
												Explore
											</button>
										</div>
									</div>
								)
							}
							<br/>

							<div style={{height: '1.5rem', backgroundColor: ' #D5D7FA',}}></div>
							<br/>
							<div style={{height: '1.5rem', backgroundColor: ' #D5D7FA'}}></div>

							{!isMobile ?
								(<div className='middleView'>
										<div className="col2">
											<Row className="gridRow1">
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-1'>
														<figure>
															<img src={image2} className="image10" alt="image10"/>
															<img src={image3} className="image10" alt="image10"/>
															<img src={image2} className="image10" alt="image10"/>
															<img src={image3} className="image10" alt="image10"/>
															<img src={image2} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-2'>
														<figure>
															<img src={image3} className="image10" alt="image10"/>
															<img src={image4} className="image10" alt="image10"/>
															<img src={image3} className="image10" alt="image10"/>
															<img src={image4} className="image10" alt="image10"/>
															<img src={image3} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-3'>
														<figure>
															<img src={image4} className="image10" alt="image10"/>
															<img src={image5} className="image10" alt="image10"/>
															<img src={image4} className="image10" alt="image10"/>
															<img src={image5} className="image10" alt="image10"/>
															<img src={image4} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
											</Row>
											<Row className="gridRow2">
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-4'>
														<figure>
															<img src={image5} className="image10" alt="image10"/>
															<img src={image6} className="image10" alt="image10"/>
															<img src={image5} className="image10" alt="image10"/>
															<img src={image6} className="image10" alt="image10"/>
															<img src={image5} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-5'>
														<figure>
															<img src={image6} className="image10" alt="image10"/>
															<img src={image7} className="image10" alt="image10"/>
															<img src={image6} className="image10" alt="image10"/>
															<img src={image7} className="image10" alt="image10"/>
															<img src={image6} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-6'>
														<figure>
															<img src={image7} className="image10" alt="image10"/>
															<img src={image8} className="image10" alt="image10"/>
															<img src={image7} className="image10" alt="image10"/>
															<img src={image8} className="image10" alt="image10"/>
															<img src={image7} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
											</Row>
											<Row className="gridRow3">
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-7'>
														<figure>
															<img src={image8} className="image10" alt="image10"/>
															<img src={image9} className="image10" alt="image10"/>
															<img src={image8} className="image10" alt="image10"/>
															<img src={image9} className="image10" alt="image10"/>
															<img src={image8} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-8'>
														<figure>
															<img src={image9} className="image10" alt="image10"/>
															<img src={image10} className="image10" alt="image10"/>
															<img src={image9} className="image10" alt="image10"/>
															<img src={image10} className="image10" alt="image10"/>
															<img src={image9} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-9'>
														<figure>
															<img src={image10} className="image10" alt="image10"/>
															<img src={image11} className="image10" alt="image10"/>
															<img src={image10} className="image10" alt="image10"/>
															<img src={image11} className="image10" alt="image10"/>
															<img src={image10} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
											</Row>
										</div>
										<div className="col3">
											<div className="sectionText2">
												<h1 id='header2'> FEATURED NFTs </h1>
												<p className='textFeaturedNft'>
													Check out NFTs from our rotating
													gallery of new and established
													artists, musicians, designers
													and content creators
													{/* And share it in your{' '}
			<a target='blank' href='https://www.superworldapp.com/'>
			  SuperWorld
			</a> */}
												</p>
												<div id='start-btn'>
													<button
														className='start-btn'
														onClick={this.handleStartClick}
													>
														Explore
													</button>
												</div>

											</div>
										</div>
										{/* <div className='col1'>
		  <img className='img1' src={image1} alt='image1' />
		  <img className='ellispse' src={p1} alt='ellipse' />
		  <img className='image8' src={Nate1} alt='img' />
		  <img className='image9' src={Nate2} alt='img' />
		  <img className='image10' src={image13} alt='img' />
		  <div>
			<img className='image11' src={image13} alt='img' />
		  </div>
		  <img className='image12' src={Nate3} alt='img' />
		  <img className='image13' src={image13} alt='img' />
		  <img className='image14' src={image13} alt='img' />
		  <img className='image15' src={Nate4} alt='img' />
		</div>
		{ <div className='col2'>
		  <Grid
			container
			justify='center'
			alignContent='center'
			direction='column'
		  ></Grid>
		</div>
	  </div> */}
									</div>
								)
								:
								(
									<div className='middleView'>
										<div className="sectionText2">
											<h1 id='header2'>FEATURED NFTs</h1>
											<p className='textFeature'>
												Check out NFTs from our rotating
												gallery of new and established artists, musicians, designers,
												and content creators
											</p>
										</div>
										<div className="col2">
											<Row around="xs" className="gridRow1">
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-1'>
														<figure>
															<img src={image2} className="image10" alt="image10"/>
															<img src={image3} className="image10" alt="image10"/>
															<img src={image2} className="image10" alt="image10"/>
															<img src={image3} className="image10" alt="image10"/>
															<img src={image2} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-2'>
														<figure>
															<img src={image3} className="image10" alt="image10"/>
															<img src={image4} className="image10" alt="image10"/>
															<img src={image3} className="image10" alt="image10"/>
															<img src={image4} className="image10" alt="image10"/>
															<img src={image3} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-3'>
														<figure>
															<img src={image4} className="image10" alt="image10"/>
															<img src={image5} className="image10" alt="image10"/>
															<img src={image4} className="image10" alt="image10"/>
															<img src={image5} className="image10" alt="image10"/>
															<img src={image4} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
											</Row>
											<Row around="xs" className="gridRow2">
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-4'>
														<figure>
															<img src={image5} className="image10" alt="image10"/>
															<img src={image6} className="image10" alt="image10"/>
															<img src={image5} className="image10" alt="image10"/>
															<img src={image6} className="image10" alt="image10"/>
															<img src={image5} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-5'>
														<figure>
															<img src={image6} className="image10" alt="image10"/>
															<img src={image7} className="image10" alt="image10"/>
															<img src={image6} className="image10" alt="image10"/>
															<img src={image7} className="image10" alt="image10"/>
															<img src={image6} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-6'>
														<figure>
															<img src={image7} className="image10" alt="image10"/>
															<img src={image8} className="image10" alt="image10"/>
															<img src={image7} className="image10" alt="image10"/>
															<img src={image8} className="image10" alt="image10"/>
															<img src={image7} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
											</Row>
											<Row around="xs" className="gridRow3">
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-7'>
														<figure>
															<img src={image8} className="image10" alt="image10"/>
															<img src={image9} className="image10" alt="image10"/>
															<img src={image8} className="image10" alt="image10"/>
															<img src={image9} className="image10" alt="image10"/>
															<img src={image8} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-8'>
														<figure>
															<img src={image9} className="image10" alt="image10"/>
															<img src={image10} className="image10" alt="image10"/>
															<img src={image9} className="image10" alt="image10"/>
															<img src={image10} className="image10" alt="image10"/>
															<img src={image9} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
												<Col xs={2} className="gridCol1">
													<div className='home-slider-multiple home-slider-multiple-9'>
														<figure>
															<img src={image10} className="image10" alt="image10"/>
															<img src={image11} className="image10" alt="image10"/>
															<img src={image10} className="image10" alt="image10"/>
															<img src={image11} className="image10" alt="image10"/>
															<img src={image10} className="image10" alt="image10"/>
														</figure>
													</div>
												</Col>
											</Row>
										</div>
										<div id='start-btn'>
											<button
												className='start-btn'
												onClick={this.handleStartClick}
											>
												Explore
											</button>
										</div>
									</div>
								)
							}

							<br/>
							<div style={{height: '1.5rem', backgroundColor: ' #D5D7FA'}}></div>
							<br/>
							<div style={{height: '1.5rem', backgroundColor: ' #D5D7FA'}}></div>

							{!isMobile
								? (
									<div className="trendNftMain">
										<div className="trendTitle">
											<div className="trendTitleMain">
												Trending NFTs
											</div>
											<div className="trendViewMore">
												View More
											</div>
										</div>
										<div className="cardMain">
											{mockTrendingNft.map(({
																							img,
																							profileImg,
																							title,
																							userName,
																							price,
																							usdPrice,
																							btnName,
																							time
																						}) => (
												<Card className="cardWrapper">
													<CardImg
														top
														className="card-background-image"
														src={img}
														alt='image3'
													/>
													<CardImgOverlay className="cardImgOverlay">
														<div className="userImg">
															<img src={profileImg || profile} alt="userImg"/>
														</div>
														<CardTitle className="card-user-title">
															{title || 'none'}
														</CardTitle>
													</CardImgOverlay>
													<CardBody className="card-body">
														<div className="card-user-body">
															<CardSubtitle className="card-created-by">
																by
															</CardSubtitle>
															<CardSubtitle className="card-subtitle-name">
																{userName || ''}
															</CardSubtitle>
														</div>
														<div className='card-text-info'>
															<CardText className="card-text-info-price">
																{price || '0.5ETH'}
																<p className="card-text-info-usd">
																	{`($${(0.5 * this.state.ethPrice.usd).toFixed(2)} USD)`}
																	{/*{usdPrice*ethPrice || '($985.56 USD)'}*/}
																</p>
															</CardText>
															<div>
																<button className='card-buy-button'>{btnName}</button>
															</div>
														</div>
														<div className='card-buy-time'>
															<p className='card-buy-time-text'>
																{time}
															</p>
														</div>
													</CardBody>
												</Card>
											))}
										</div>
									</div>
							) : (
									<div className="trendNftMain">
										<div className="trendTitle">
											<div className="trendTitleMain">
												Trending NFTs
											</div>
										</div>
										<div className="cardMain">
											<Carousel
												width='239px'
												infiniteLoop
												showStatus={false}
												showThumbs={false}
												showArrows={false}
											>
												{mockTrendingNft.map(({
																								img,
																								profileImg,
																								title,
																								userName,
																								price,
																								usdPrice,
																								btnName,
																								time
																							}) => (
													<Card className="cardWrapper">
														<CardImg
															top
															className="card-background-image"
															src={img}
															alt='image3'
														/>
														<CardImgOverlay className="cardImgOverlay">
															<div className="userImg">
																<img src={profileImg || profile} alt="userImg"/>
															</div>
															<CardTitle className="card-user-title">
																{title || 'none'}
															</CardTitle>
														</CardImgOverlay>
														<CardBody className="card-body">
															<div className="card-user-body">
																<CardSubtitle className="card-created-by">
																	by
																</CardSubtitle>
																<CardSubtitle className="card-subtitle-name">
																	{userName || ''}
																</CardSubtitle>
															</div>
															<div className='card-text-info'>
																<CardText className="card-text-info-price">
																	{price || '0.5ETH'}
																	<p className="card-text-info-usd">
																		{`($${(0.5 * this.state.ethPrice.usd).toFixed(2)} USD)`}
																		{/*{usdPrice*ethPrice || '($985.56 USD)'}*/}
																	</p>
																</CardText>
																<div>
																	<button className='card-buy-button'>{btnName}</button>
																</div>
															</div>
															<div className='card-buy-time'>
																<p className='card-buy-time-text'>
																	{time}
																</p>
															</div>
														</CardBody>
													</Card>
												))}
											</Carousel>
										</div>
										<div className="trendViewMore">
											View More
										</div>
									</div>
								)}

							{!isMobile ? (
								<div className="trendNftMain">
									<div className="trendTitle">
										<div className="trendTitleMain">
											Popular Real Estate
										</div>
										<div className="trendViewMore">
											View More
										</div>
									</div>
									<div className="cardMain">
										{mockRealEstate.map(({
																					 img,
																					 profileImg,
																					 title,
																					 userName,
																					 price,
																					 usdPrice,
																					 btnName,
																					 time
																				 }) => (
											<Card className="cardWrapper">

												<CardImg
													top
													className="card-background-image"
													src={img}
													alt='image3'
												/>
												<CardImgOverlay className="cardImgOverlay">
													<div className="userImg">
														<img src={profileImg || profile} alt="userImg"/>
													</div>
													<CardTitle className="card-user-title">
														{title || 'none'}
													</CardTitle>
												</CardImgOverlay>
												<CardBody className="card-body">
													<div className="card-user-body">
														<CardSubtitle className="card-created-by">
															by
														</CardSubtitle>
														<CardSubtitle className="card-subtitle-name">
															{userName || ''}
														</CardSubtitle>
													</div>
													<div className='card-text-info'>
														<CardText className="card-text-info-price">
															{price || '0.5ETH'}
															<p className="card-text-info-usd">
																{usdPrice || '($985.56 USD)'}
															</p>
														</CardText>
														<a href='https://map.superworldapp.com/' target='_blank'>
															<div>
																<button className='card-buy-button'>{btnName}</button>
															</div>
														</a>
													</div>
													<div className='card-buy-time'>
														<p className='card-buy-time-text'>
															{time}
														</p>
													</div>
												</CardBody>

											</Card>
										))}
									</div>
								</div>
							) : (
								<div className="trendNftMain">
									<div className="trendTitle">
										<div className="trendTitleMain">
											Popular Real Estate
										</div>
									</div>
									<div className="cardMain">
										<Carousel
											width='239px'
											infiniteLoop
											showStatus={false}
											showThumbs={false}
											showArrows={false}
										>
										{mockRealEstate.map(({
																					 img,
																					 profileImg,
																					 title,
																					 userName,
																					 price,
																					 usdPrice,
																					 btnName,
																					 time
																				 }) => (
											<Card className="cardWrapper">
												<CardImg
													top
													className="card-background-image"
													src={img}
													alt='image3'
												/>
												<CardImgOverlay className="cardImgOverlay">
													<div className="userImg">
														<img src={profileImg || profile} alt="userImg"/>
													</div>
													<CardTitle className="card-user-title">
														{title || 'none'}
													</CardTitle>
												</CardImgOverlay>
												<CardBody className="card-body">
													<div className="card-user-body">
														<CardSubtitle className="card-created-by">
															by
														</CardSubtitle>
														<CardSubtitle className="card-subtitle-name">
															{userName || ''}
														</CardSubtitle>
													</div>
													<div className='card-text-info'>
														<CardText className="card-text-info-price">
															{price || '0.5ETH'}
															<p className="card-text-info-usd">
																{usdPrice || '($985.56 USD)'}
															</p>
														</CardText>
														<a href='https://map.superworldapp.com/' target='_blank'>
															<div>
																<button className='card-buy-button'>{btnName}</button>
															</div>
														</a>
													</div>
													<div className='card-buy-time'>
														<p className='card-buy-time-text'>
															{time}
														</p>
													</div>
												</CardBody>

											</Card>
										))}
										</Carousel>
									</div>
									<div className="trendViewMore">
										View More
									</div>
								</div>
							)}
						</Container>
					</div>
				</>
			);
		}
	}
}

export default Home;