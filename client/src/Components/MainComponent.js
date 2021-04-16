import React, {Component} from 'react';
import BNContract from '../contracts/Cryptoart.json';
import BNContract2 from '../contracts/Cryptoart2.json';
import getWeb3 from '../getWeb3';
import '../App.css';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Auth from './Auth';
import AllItemComponent from './Marketplace/AllArtComponent';
import MyItemComponent from './MyCollectionComponentNew/MyCollectionComponentNew';
import MyCollectionComponent from './MyCollectionComponent';
import MyStoreComponent from './MyStoreComponent';
import Profile from './MyProfile/MyProfileComponent'
import TokenDetail from './CardDetail';
import BatchDetail from './BatchDetail';
import {Switch, Route, Redirect} from 'react-router-dom';
import Footer from './Footer/FooterComponent';
import ProtectedRoute from './ProtectedRoute';
import Axios from 'axios';
import MyCollectionComponentNew from "./MyCollectionComponentNew/MyCollectionComponentNew";
import {setArt} from "../redux/myStoreComponent/actions";
import {connect} from "react-redux";
import PageWrapper from "../HOC/PageWrapper";
//import HDWalletProvider from "@truffle/hdwallet-provider";
let allDocs = [];

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storageValue: 0,
			web3: null,
			accounts: null,
			balance: 0,
			contract: null,
			res: null,
			registered: 0,
			art: null,
			creValue: [],
			tokensCreated: [],
			tokensBought: [],
			tokensBid: [],
			tokensBidStarted: [],
			tokensPutForSale: [],
			batch: [],
			currentUser:null
		};
		this.setUser = this.setUser.bind(this);
	}
	setUser = async () => {
		Axios.defaults.headers = {
			Authorization: Auth.getToken(),
		  };
	  
		  const { userId } = Auth.getToken();
		  
		  return Axios.post(`${process.env.REACT_APP_SW_API_URL}/user/get`, {
			userId: userId,
		  })
			.then((res) => {
			  this.setState({ currentUser: res.data.data });
			})
	}
	componentDidMount = async () => {
		try{ this.setUser();
		
		     // Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			const balance = await web3.eth.getBalance(accounts[0]);
			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = BNContract.networks[networkId];
			const instance = new web3.eth.Contract(
				BNContract.abi,
				deployedNetwork && deployedNetwork.address
			);
			let response = [];
			let resx1 = await instance.methods.tokenBatchIndex().call();
			for (let i = 1; i <= resx1; i++) {
				const rexx = await instance.methods.getTokenBatchData(i).call();
				response.push(rexx);
			}
			allDocs = [];
			allDocs = response;
			this.setState({batch: allDocs});
			console.log(this.state.batch);
			let rexponse = [];
			let resx2 = await instance.methods.totalSupply().call();
			// console.log(resx2);
			for (let i = 1; i <= resx2; i++) {
				const rexx = await instance.methods.getTokenData(i).call();
				rexponse.push(rexx);
			}
			allDocs = [];
			allDocs = rexponse;
			// console.log(rexponse);
			this.setState({art: allDocs});
			// console.log(this.props.art);

			response = [];
			let nresx2 = await instance.methods.totalSupply().call();
			for (let i = 1; i <= nresx2; i++) {
				let rex = await instance.methods.getTokenData(i).call();
				// console.log(rex);
				let rex2 = await instance.methods.getTokenDataBatch(i).call();
				if (rex._tokenOwner === accounts[0]) {
					var newBlock = {
						_tokenId: i,
						_tokenOwner: rex._tokenOwner,
						_isSellings: rex._isSellings,
						_sellPrice: rex._sellPrice,
						_refBatch: rex._refBatch,
						_tokenBidder: rex._tokenBidder,
						_isBidding: rex._isBidding,
						_bidPrice: rex._bidPrice,
						_bidEnd: rex._bidEnd,
						_tokenHash: rex2._tokenHash,
						_tokenBatchName: rex2._tokenBatchName,
						_tokenCreator: rex2._tokenCreator,
						_imgUrl: rex2._imgUrl,
						_imgThumbnail: rex2._imgThumbnail,
					}
					response.push(newBlock);
					// console.log(newBlock)
				}
				// if (rex2._tokenCreator == this.props.accounts) {
				//   createrToken.push(rex);
				// }
			}
			this.props.setArt({art3: response});

			let allDoc = [];
			allDoc = response;
			// console.log(response);
			this.setState({art2: allDoc});

			let cre = await Axios.get(
				// `http://geo.superworldapp.com/api/json/nftevents/tokencreated/4/get?contractAddress=0xe352168A2a9bDaF66a1051E9015c4b246AfD3445`
				`http://geo.superworldapp.com/api/json/nftevents/tokencreated/4/get?contractAddress=0x60C0550cdE0C1696351D234ef6AA995A16AA52dA`
			);

			let newArr = [];
			for (let i = 0; i < cre.length; i++) {
				newArr.push(cre[i].data.data);

			}
			let allTokensBought = await Axios.get(
				// `http://geo.superworldapp.com/api/json/nftevents/tokenbought/4/get?contractAddress=0xe352168A2a9bDaF66a1051E9015c4b246AfD3445`
				`http://geo.superworldapp.com/api/json/nftevents/tokenbought/4/get?contractAddress=0x60C0550cdE0C1696351D234ef6AA995A16AA52dA`
			);

			this.setState({tokensBought: allTokensBought.data.data});

			let allTokensBidStarted = await Axios.get(
				// `http://geo.superworldapp.com/api/json/nftevents/bidstarted/4/get?contractAddress=0xe352168A2a9bDaF66a1051E9015c4b246AfD3445`
				`http://geo.superworldapp.com/api/json/nftevents/bidstarted/4/get?contractAddress=0x60C0550cdE0C1696351D234ef6AA995A16AA52dA`
			);

			this.setState({tokensBidStarted: allTokensBidStarted.data.data});

			let allTokensPutForSale = await Axios.get(
				`http://geo.superworldapp.com/api/json/nftevents/tokenputforsale/4/get?contractAddress=0x60C0550cdE0C1696351D234ef6AA995A16AA52dA`
			);

			this.setState({tokensPutForSale: allTokensPutForSale.data.data});
			let allTokensBid = await Axios.get(
				`http://geo.superworldapp.com/api/json/nftevents/tokenbid/4/get?contractAddress=0x60C0550cdE0C1696351D234ef6AA995A16AA52dA`
			);
			this.setState({tokensBid: allTokensBid.data.data});
			// batch events
			let BatchCreated = await Axios.get(
				`http://geo.superworldapp.com/api/json/nftevents/NewtokenBatchCreated/4/get?contractAddress=0x60C0550cdE0C1696351D234ef6AA995A16AA52dA`
			);

			this.setState({BatchCreated: BatchCreated.data.data});

			this.setState({
				web3,
				accounts: accounts[0],
				contract: instance,
				balance,
				//creValue: newArr,
			});

			// console.log('this.state.creValue', this.state.creValue);
			// let res = await this.state.contract?.methods.tokenCount().call();
			// console.log(res);

			// let response = [];
			// for (let i = 1; i <= res; i++) {
			//   let rex = await this.state.contract?.methods.Arts(i).call();
			//   response.push(rex);
			// }
			// allDocs = [];
			// allDocs = response;
			// console.log(response);
			// this.setState({ art: allDocs });

			// let allCreatedTokens = await Axios.get(
			//   `${process.env.REACT_APP_TOKEN_API_URL}/tokencreated/4/get/`
			// );
			// this.setState({ tokensCreated: allCreatedTokens.data.data });

			// //token listed for sale
			// let allTokensPutForSale = await Axios.get(
			//   `${process.env.REACT_APP_TOKEN_API_URL}/tokenputforsale/4/get/`
			// );
			// this.setState({ tokensPutForSale: allTokensPutForSale.data.data });

			// //tokens bought
			// // let allTokensBought = await Axios.get(
			// //   `${process.env.REACT_APP_TOKEN_API_URL}/tokenbought/4/get/`
			// // );
			// // this.setState({ tokensBought: allTokensBought.data.data });


			// //tokens listed for auction
			// let allTokensBid = await Axios.get(
			//   `${process.env.REACT_APP_TOKEN_API_URL}/tokenbid/4/get/`
			// );
			// this.setState({ tokensBid: allTokensBid.data.data });

			// //tokens bid
			// // let allTokensBidStarted = await Axios.get(
			// //   `${process.env.REACT_APP_TOKEN_API_URL}/bidstarted/4/get/`
			// // );
			// // this.setState({ tokensBidStarted: allTokensBidStarted.data.data });

		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error(error);
		}
	};

	render() {
		const TokenWithId = ({match}) => {
			return (
				<PageWrapper
					contract={this.state.contract}
					accounts={this.state.accounts}
					balance={this.state.balance}
					web3={this.state.web3}
				>
				<TokenDetail
					tokenCreated={this.state.tokensCreated?.filter(
						(token) => token.returnValues.tokenId === match.params.id
					)}
					tokenPutForSale={this.state.tokensPutForSale?.filter(
						(token) => token.returnValues.tokenId === match.params.id
					)}
					tokenBought={this.state.tokensBought?.filter(
						(token) => token.returnValues.tokenId === match.params.id
					)}
					tokenBid={this.state.tokensBid?.filter(
						(token) => token.returnValues.tokenId === match.params.id
					)}
					tokenBidStarted={this.state.tokensBidStarted?.filter(
						(token) => token.returnValues.tokenId === match.params.id
					)}
					art4={
						this.state.art2
					}

					contract={this.state.contract}
					accounts={this.state.accounts}
					cre={this.state.creValue}
					matchId={match.params.id}

				/>
				</PageWrapper>
			);
		};

		const BatchWithId = ({match}) => {
			return (
				<PageWrapper
					contract={this.state.contract}
					accounts={this.state.accounts}
					balance={this.state.balance}
					web3={this.state.web3}
				>
				<BatchDetail
					BatchCreated={this.state.batch?.filter(
						(batch) => batch._batchId === match.params.id
					)}
					contract={this.state.contract}
					accounts={this.state.accounts}
					allTokens={this.state.art}
					matchId={match.params.id}
				/>
				</PageWrapper>
			);
		};
		return (
			<div className='App'>
				<div style={{minHeight: '1010px'}}>
					<Switch>
						<Route
							exact
							path='/home'
							component={() => (
								<PageWrapper
									contract={this.state.contract}
									accounts={this.state.accounts}
									balance={this.state.balance}
									web3={this.state.web3}
								>
								<Home
									contract={this.state.contract}
									accounts={this.state.accounts}
								/>
								</PageWrapper>
							)}
						/>
						<Route
							exact
							path='/allart'
							component={() => (
								<PageWrapper
									contract={this.state.contract}
									accounts={this.state.accounts}
									balance={this.state.balance}
									web3={this.state.web3}
								>
								<AllItemComponent
									contract={this.state.contract}
									accounts={this.state.accounts}
									batch={this.state.batch}
									art={this.state.art2}
								/>
								</PageWrapper>
							)}
						/>
						<ProtectedRoute
							exact
							path='/mycollections'
							component={() => (
								<PageWrapper
									contract={this.state.contract}
									accounts={this.state.accounts}
									balance={this.state.balance}
									web3={this.state.web3}
								>
								<MyItemComponent
									contract={this.state.contract}
									accounts={this.state.accounts}
									batch={this.state.batch?.filter(
										(batch) => batch._tokenCreator === this.state.accounts
									)}
								/>
								</PageWrapper>
							)}
						/>
						<ProtectedRoute
							exact
							path='/mycollection'
							component={() => (
								<PageWrapper
									contract={this.state.contract}
									accounts={this.state.accounts}
									balance={this.state.balance}
									web3={this.state.web3}
								>
								<MyCollectionComponentNew
									state={this.state}
									contract={this.state.contract}
									accounts={this.state.accounts}
									batch={this.state.batch?.filter(
										(batch) => batch._tokenCreator === this.state.accounts
									)}
									art2={this.state.art2}
									// art2own = {this.state.art2?.filter((art2s) => art2s._tokenOwner == this.state.accounts)}
								/>
								</PageWrapper>
							)}
						/>

						<ProtectedRoute
							exact
							path='/mystore'
							component={() => (
								<PageWrapper
									contract={this.state.contract}
									accounts={this.state.accounts}
									balance={this.state.balance}
									web3={this.state.web3}
								>
								<MyStoreComponent
									state={this.state}
									contract={this.state.contract}
									accounts={this.state.accounts}
									batch={this.state.batch?.filter(
										(batch) => batch._tokenCreator === this.state.accounts
									)}
									art2={this.state.art2}
								/>
								</PageWrapper>
							)}
						/>

						<ProtectedRoute
							exact
							path='/myprofile'
							component={() => (
								<PageWrapper
									contract={this.state.contract}
									accounts={this.state.accounts}
									balance={this.state.balance}
									web3={this.state.web3}
								>
								<Profile
									state={this.state}
									batch={this.state.batch?.filter(
										(batch) => batch._tokenCreator === this.state.accounts
									)}
									art={this.state.art2?.filter(
										(artSingle) => (artSingle._tokenOwner === this.state.accounts && artSingle._tokenCreator != this.state.accounts)
									)}
								/>
								</PageWrapper>
							)}
						/>
						<Route path='/card/:id' component={TokenWithId}/>
						<Route path='/batch/:id' component={BatchWithId}/>
						{/* <Route path='/card/:id'  location={this.state.location} key={this.state.location.key} render = {props => <CardDetail {...props} key={this.sta.location.key} /> } /> */}

						<Route
							path='/card/:id'
							component={(props) => (
								<PageWrapper
									contract={this.state.contract}
									accounts={this.state.accounts}
									balance={this.state.balance}
									web3={this.state.web3}
								>
								<TokenDetail

									contract={this.state.contract}
									accounts={this.state.accounts}
									art={this.state.art2}
								/>
								</PageWrapper>
							)}
						/>
						<Route
							path='/batch/:id'
							component={(props) => (
								<PageWrapper
									contract={this.state.contract}
									accounts={this.state.accounts}
									balance={this.state.balance}
									web3={this.state.web3}
								>
								<BatchDetail

									contract={this.state.contract}
									accounts={this.state.accounts}
									art={this.state.batch}

								/>
								</PageWrapper>
							)}
						/>

						<Redirect to='/home'/>
					</Switch>
				</div>
				<Footer/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setArt: (data) => dispatch(setArt(data)),
});

export default connect(null, mapDispatchToProps)(Main);