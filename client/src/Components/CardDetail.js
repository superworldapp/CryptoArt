import React, {useEffect, useState, Component} from 'react';
import TableBody from './TableBody';
import {Link, useHistory} from 'react-router-dom';
import cx from "classnames";
import {
	Card,
	CardBody,
	CardSubtitle,
	CardText,
	CardImg,
	CardHeader,
	Table,
	Input,
	Label,
	Modal,
	ModalHeader,
	ModalBody,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Button,
	Collapse
} from 'reactstrap';
import loader from '../images/loader.svg';
import image3 from '../images/image 6.png';
import image4 from '../images/image 23.png';
import image5 from '../images/image 25.png';
import image6 from '../images/image 28.png';
import image7 from '../images/image 29.png';
import annonuser from '../images/user.png';
import checkmark from '../images/svg/checkmark.svg';
import Web3 from 'web3';
import Axios from 'axios';
import anonUser from '../images/user.png';
import openeye from "../assets/svg/eyeopen.svg";
import Outlineheart from "../assets/svg/heartoutline.svg";
import "./CardDetail.scss";
import {IoIosArrowDown} from 'react-icons/io'
import {BorderAll} from '@material-ui/icons';
import heart from '../images/svg/batchHeart.svg';
import avatar from '../images/svg/batchAvatar.svg';
import Sound from "react-sound";
import ReactPlayer from "react-player";
import SuccessfulModals from "./SuccessModal/SuccessfulModals";
import {Menu, MenuItem} from "@material-ui/core";

const CardDetail = ({
											art,
											accounts,
											contract,
											cre,
											matchId,
											tokenCreated,
											tokenPutForSale,
											tokenBought,
											tokenBid,
											tokenBidStarted,
										}) => {
	console.log(art);
	console.log(`==========>art`, art);

	const [ethPrice, setEthPrice] = useState({});
	const [creValue, setCreValue] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [handleInput, setHandleInput] = useState('');
	const [pay, setPay] = useState(0);
	const [loadingPurchase, setLoadingPurchase] = useState(false);
	const [purchaseSuccess, setPurchaseSuccess] = useState(false);
	const [loadingPlaceBid, setLoadingPlaceBid] = useState(false);
	const [art2, setart2] = useState([]);
	const [bidSuccess, setBidSuccess] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dropdownValue, setDropdownValue] = useState('usd');
	const [priceInputValue, setpriceInputValue] = useState('');
	const [soundPlaying, setSoundPlaying] = useState('');

	const history = useHistory();

	const handleUploadMore = () => {
		history.push('/mycollection')
	}

	const changeValue = (e) => {
		setDropdownValue(e.currentTarget.textContent);
	};
	const handlepriceInput = (event) => {
		setpriceInputValue(event.target.value);
		//console.log(handleInput);
	};
	console.log(`==========>art?._imgUrl`, art?._imgUrl);
	const displayFileType = () => {
		if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(art?._imgUrl)) {
			return (
				<a href={art?._imgUrl} target='_blank'>
					<img src={art?._imgUrl} className='detail-img' alt='...'/>
				</a>
			);
		} else if (/\.(?:wav|mp3)$/i.test(art?._imgUrl)) {
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
						url={art?._imgUrl}
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
				art?._imgUrl
			)
		) {
			return (
				<ReactPlayer
					className="cardVideo"
					loop={true}
					playing={true}
					url={art?._imgUrl}
				/>
			);
		}
	};


	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const converttoether = (x) => {
		return Web3.utils.fromWei(
			x.toString(),
			'ether'
		)
	}
	const ETHER = 1000000000000000000;

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
		else if (accNum === '0x483C8624a26acc7C1d5baA6c3648E4A5B64164e0')
			return '@Magdalena';
		else if (accNum === '0xA64a71dAC0F4F61FD1e569F59a31c0860c0A33d5')
			return '@MagdalenaTest';
		else return '@Annonymous';
	};

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
		// return <span>{ethPrice.usd}</span>;
	};

	const handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		setHandleInput(value);
		console.log(handleInput);
	};
	const BidBuy = async () => {
		if (art._isBidding)
			AddBid();
		else
			handlePurchase();

	}

	const AddBid = async () => {
		console.log(handleInput);
		setLoadingPlaceBid(true);
		const res = await contract.methods.addBid(art._tokenId).send({
			from: accounts,
			gas: 1000000,
			value: (priceInputValue * ETHER).toString(),
		});
		console.log(handleInput)
		setLoadingPlaceBid(false);
		setPurchaseSuccess(true);
		//setBidSuccess(true);
		console.log(res);
	};

	const getCreData = async () => {
		console.log('tokenCreated in getCreData', tokenCreated);
		console.log('tokenPutForSale in getCreData', tokenPutForSale);
		console.log('tokenBought in getCreData', tokenBought);
		console.log('tokenBid in getCreData', tokenBid);

		let cre = tokenCreated;
		let tfs = tokenPutForSale;
		let tBought = tokenBought;
		let tBid = tokenBid;
		let bidStarted = tokenBidStarted;

		for (let property in cre) {
			creValue.push(cre[property]);
		}
		for (let property in tBought) {
			creValue.push(tBought[property]);
		}
		for (let property in tfs) {
			creValue.push(tfs[property]);
		}
		if (tBid?.length !== 0) {
			for (let property in tBid) {
				creValue.push(tBid[property]);
			}
		}
		for (let property in bidStarted) {
			creValue.push(bidStarted[property]);
		}

		creValue.sort((a, b) => {
			return Number(b.returnValues.times) - Number(a.returnValues.times);
		});

		creValue.forEach((item) => {
			let firstChar = item.event.charAt(0).toUpperCase();
			let restOfStr = item.event.slice(1);
			item.event = firstChar + restOfStr;
		});

		console.log('cre in CardDetail', cre);
		console.log(creValue);
	};

	const isToggleModal = () => {
		setModalOpen(!modalOpen);
	};

	const handlePurchase = async () => {
		setLoadingPurchase(true);
		const res = await contract?.methods.buyToken(art._tokenId).send({
			from: accounts,
			value: art?._sellPrice.toString(),
			gas: 7000000,
		});
		setLoadingPurchase(false);
		setPurchaseSuccess(true);
		console.log(res);
	};

	const togglePurchaseSuccess = () => {
		setPurchaseSuccess(!purchaseSuccess);
	};

	const toggleBidSuccess = () => {
		setBidSuccess(!bidSuccess);
	};

	const buyOrSell = () => {
		if (art?._isSellings) {
			return (
				<React.Fragment>
					{/* <div className= "View2">
         <Input type="text" name="price" id="priceEnter" className="priceInput" onChange={handlepriceInput}>
         </Input>
         &nbsp;
        <Label className="labelName"> BETH</Label>
           </div> */}
					<div>
						<button
							className='batchcardbid-btn'
							onClick={handlePurchase}

						>
							Place Bid
						</button>
						<div>{loadingPurchase ? <img src={loader}/> : <div></div>}</div>
					</div>

				</React.Fragment>

			);
		} else if (art?._isBidding) {
			return (
				<React.Fragment>
					{/* <div className ="View2">
          <Input
            type='text'
            id='sellPrice'
            name='sellPrice'

            className="priceInput"
            onChange={handlepriceInput}
          ></Input>
           &nbsp;
        <Label className="labelName"> PETH</Label>

          </div> */}

					<div>
						<button
							className='batchcardbid-btn'
							color='primary'
							onClick={AddBid}

						>
							Place Bid
						</button>
						<div>{loadingPlaceBid ? <img src={loader}/> : <div></div>}</div>
					</div>

				</React.Fragment>
			);
		}
	};
	const setDate = () => {
		const milliSec = Number(this.props.art._bidEnd * 1000) - Date.now();
		let hours = Math.floor((milliSec / (1000 * 60 * 60))).toFixed(0);
		let minutes = ((milliSec / (1000 * 60)) % 60).toFixed(0)
		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;

		return `${hours} Hrs ${minutes} Min Remaining`
	}
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		getCreData();
		getEthDollarPrice();

		async function get() {
			let newart = await art;
			setart2(newart);
			get();
		};
		// console.log(matchId)
		// console.log('Header', myProperties);
	}, []);

	//   const buyItem = async () => {
	//         const res = await contract.methods
	//             .buyToken(art.tokenIdentifier)
	//             .send({
	//                 from: accounts,
	//                 value: art.tokenSellPrice,
	//                 gas: 1000000
	//             });
	//         console.log(res);
	//     };
	const [isOpen, setIsOpen] = useState(false);

	const historyToggle = () => setIsOpen(!isOpen);
	const text = 'The exhibition titled ‘Goliaths, Tanks’ is an amalgamation of her paintings and objects A together in her site-specific ' +
		'installations and multi-media projections, accompanied by performance pieces. The movement in each object resonating with the sound ' +
		'of ticking clocks serenely draws out the muted anxiety underlying the division of Korean peninsula following the war in the 1950’s. ' +
		'The ensemble takes place at the Peace Culture Bunker The exhibition titled ‘Goliaths, Tanks’ is an amalgamation of her paintings and objects ' +
		'A together in her site-specific installations and multi-media projections, accompanied by performance pieces. The movement in each object ' +
		'resonating with the sound of ticking clocks serenely draws out the muted anxiety underlying the division of Korean peninsula following the ' +
		'war in the 1950’s. The ensemble takes place at the Peace Culture Bunker'

	console.log(ethPrice);
	console.log(art2);
	return (
		<>
			<div className='detail-wrapper'>
				<div className="detail-view">
					<div className='detail-imgblock'>
						{displayFileType()}
					</div>

					<div className='detail-info'>
						{/* <a href='#'>{match.params.id}</a>
                        <h1>{match.params.id}</h1> */}

						<div className="detail-header">
							<div>
								<div className="detail-name">
									{art?._tokenBatchName}
								</div>
							</div>
							<div>
								<img src={heart} alt="heart"/>
							</div>
						</div>

						<div className="View">
							<div className="editionNumber">
								1 of 1 Edition
							</div>

						</div>

						<div className="detail-creator">
							<div className="detailImg-creator">
								<img src={avatar} alt="avatar"/>
							</div>
							<div className="detail-by">
								Owned by&ensp;
								<div className='detail-NameArtist'>{accUsername(art?._tokenOwner)}</div>
							</div>
							<div className="detailImg-creator">
								<img src={avatar} alt="avatar"/>
							</div>
							<div className="detail-by">
								Created by&ensp;
								<div className='detail-NameArtist'>{accUsername(art?._tokenCreator)}</div>
							</div>
						</div>
						<div className='priceCard '>
							<div className="card-div">
								{console.log('=====>art?._bidEnd', art)}
								{art?._isSellings
									? <></>
									: <div className="detail-time">
										Bid ends in {
										art?._bidEnd === '0'
											? ''
											: Date.now() < art?._bidEnd
											? setDate()
											: (<p className="red red-paragraph">Auction Timer Ended</p>)
									}
									</div>
								}
							</div>
							<div className="View">
								<div className="current-offer">
									{art?._isSellings ? "Selling at:" : "Current offer:"}
									<div
										className="offer-price">{art?._isSellings ? converttoether(art?._sellPrice) : (art?._isBidding ? converttoether(art?._bidPrice) : 0)}</div>
								</div>
							</div>
							<div className="View-1">
								<div className="View-2">
									<div className="View2">

										<Input type="text" name="price" id="priceEnter" className="priceInput" onChange={handlepriceInput}>
											{/* {Web3.utils.fromWei('5000000', 'ether')}{' '} */}
										</Input>
										<Label className="labelName">ETH</Label>
									</div>
									<div className="View1">
										<Button
											className="priceOutput"
											aria-controls="simple-menu"
											aria-haspopup="true"
											onClick={handleClick}
										>
											{priceInputValue * ethPrice['usd'] + 'USD'}
										</Button>
										<Menu
											id="simple-menu"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={handleClose}
										>
											<MenuItem onClick={handleClose}>
												{priceInputValue * ethPrice['usd'] + 'USD'}
											</MenuItem>
											<MenuItem onClick={handleClose}>
												{priceInputValue * ethPrice['btc'] + 'BTC'}
											</MenuItem>
											<MenuItem onClick={handleClose}>
												{priceInputValue * ethPrice['eur'] + 'EUR'}
											</MenuItem>
										</Menu>
									</div>
								</div>
								<div className="buy-or-sell">
									{buyOrSell()}
								</div>

							</div>
							<div style={{
								marginLeft: '1rem', marginTop: '1.5rem'
							}}>
								{/* <button className='batchcardbid-btn'> PLACE BID</button> */}
							</div>


						</div>
						<div className="detail-Desc ">
							<div className="detail-DescTitle"> Description</div>
							<div className="detail-DescText">{text}</div>
						</div>
						<div className='History-view'>
							<button className="History-btn"
											onClick={historyToggle}>

								<h5 className="history-head">History</h5>
								<IoIosArrowDown size={16} className={cx("icon", {"icon--expanded": isOpen})}/>
							</button>

							<Collapse isOpen={isOpen}>
								<TableBody cre={creValue}/>
							</Collapse>
							<br/>
							<br/>

						</div>
					</div>

				</div>

				<SuccessfulModals
					isOpen={purchaseSuccess}
					toggle={togglePurchaseSuccess}
					variation={5}
					handleUploadMore={handleUploadMore}
				/>

				<Modal
					isOpen={bidSuccess}
					toggle={toggleBidSuccess}
					className='modal-xl'
				>
					<ModalHeader toggle={toggleBidSuccess}>
						<div></div>
					</ModalHeader>
					<ModalBody
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							font: 'Gibson',
							height: '20rem',
							paddingBottom: '5rem',
						}}
					>
						<p
							style={{
								textAlign: 'center',
								fontSize: '1.25rem',
								fontWeight: '450',
								marginTop: '1rem',
							}}
						>
							Congratulations!
						</p>
						<img src={checkmark}/>

						<p
							style={{
								textAlign: 'center',
								color: 'gray',
								fontSize: '12px',
							}}
						>
							You have successfully placed a bid!
						</p>
						<Link
							to='/allart'
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<button className='upload-more-btn'>
								GO BACK TO ART MARKETPLACE
							</button>
						</Link>
					</ModalBody>
				</Modal>
				<br/>
				<br/>
				<br/>
				<br/>

			</div>
		</>
	);
};


class TokenDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			art3: []
		};
	}

	componentDidMount = async () => {
		let rex = await this.props.contract.methods.getTokenData(this.props.matchId).call();
		// console.log(rex);
		let rex2 = await this.props.contract.methods.getTokenDataBatch(this.props.matchId).call();
		var newBlock = {
			_tokenId: this.props.matchId,
			_tokenOwner: rex._tokenOwner,
			_isSellings: rex._isSellings,
			_sellPrice: rex._sellPrice,
			_refBatch: rex._refBatch,
			_tokenBidder: rex._tokenBidder,
			_isBidding: rex._isBidding,
			_bidPrice: rex._bidPrice,
			_tokenHash: rex2._tokenHash,
			_tokenBatchName: rex2._tokenBatchName,
			_tokenCreator: rex2._tokenCreator,
			_imgUrl: rex2._imgUrl,
			_imgThumbnail: rex2._imgThumbnail,
		}
		// console.log(newBlock)

		// if (rex2._tokenCreator == this.props.accounts) {
		//   createrToken.push(rex);
		// }

		this.setState({single: newBlock});
	}

	render() {
		console.log(this.state.single);
		return (
			<CardDetail
				tokenCreated={this.props.tokenCreated}
				tokenPutForSale={this.props.tokenPutForSale}
				// tokenBought={this.porps.tokenBought}
				tokenBid={this.props.tokenBid}
				tokenBidStarted={this.props.tokenBidStarted}
				art={
					this.state.single
				}
				contract={this.props.contract}
				accounts={this.props.accounts}
				cre={this.props.creValue}
				matchId={this.props.matchId}
			/>
		);
	}

}

export default TokenDetails;