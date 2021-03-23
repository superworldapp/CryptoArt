import React, { Component } from 'react';
import BNContract2 from '../contracts/Cryptoart.json';
import BNContract from '../contracts/Cryptoart2.json';
import getWeb3 from '../getWeb3';
import '../App.css';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import AllItemComponent from './AllArtComponent';
import MyItemComponent from './MyArtComponent';
import MyCollectionComponent from './MyCollectionComponent';
import MyStoreComponent from './MyStoreComponent';
import CardDetail from './CardDetail';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './FooterComponent';
import ProtectedRoute from './ProtectedRoute';
import Axios from 'axios';
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
      batch:[]
    };
  }

  componentDidMount = async () => {
    try {
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
      let response= [];
      console.log('contract', instance);
      let resx1 = await instance.methods.tokenBatchIndex().call();
      console.log(resx1);
      for (let i = 1; i <= resx1; i++) {
        const rexx = await instance.methods.getTokenBatchData(i).call();
        response.push(rexx);
      }
      allDocs = [];
      allDocs = response;
      console.log(response);
      this.setState({ batch: allDocs });
      let rexponse= [];
      let resx2 = await instance.methods.totalSupply().call();
      console.log(resx2);
      for (let i = 1; i <= resx2; i++) {
        const rexx = await instance.methods.getTokenData(i).call();
        rexponse.push(rexx);
      }
      allDocs = [];
      allDocs = rexponse;
      console.log(rexponse);
      this.setState({ art: allDocs });

      let cre = await instance.getPastEvents('tokencreated', {
        fromBlock: 7970334,
      });
      
     
      let newArr = [];
      for (let i = 0; i < cre.length; i++) {
        newArr.push(cre[i]);
        console.log(cre[i]);
      }
      let allTokensBought = await instance.getPastEvents('tokenbought', {
        fromBlock: 7970334,
      });
      this.setState({ tokensBought: allTokensBought });
 
      let allTokensBidStarted = await instance.getPastEvents('bidstarted', {
        fromBlock: 7970334,
      });
      this.setState({ tokensBidStarted: allTokensBidStarted });
      let allTokensPutForSale = await instance.getPastEvents('tokenputforsale', {
        fromBlock: 7970334,
      });
      this.setState({ tokensPutForSale: allTokensPutForSale });
      let allTokensBid = await instance.getPastEvents('bidstarted', {
        fromBlock: 7970334,
      });
      this.setState({ tokensBid: allTokensBid });
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
      // this.setState({ tokensCreated: allCreatedTokens.data.data.data });

      // //token listed for sale
      // let allTokensPutForSale = await Axios.get(
      //   `${process.env.REACT_APP_TOKEN_API_URL}/tokenputforsale/4/get/`
      // );
      // this.setState({ tokensPutForSale: allTokensPutForSale.data.data.data });

      // //tokens bought
      // // let allTokensBought = await Axios.get(
      // //   `${process.env.REACT_APP_TOKEN_API_URL}/tokenbought/4/get/`
      // // );
      // // this.setState({ tokensBought: allTokensBought.data.data.data });


      // //tokens listed for auction
      // let allTokensBid = await Axios.get(
      //   `${process.env.REACT_APP_TOKEN_API_URL}/tokenbid/4/get/`
      // );
      // this.setState({ tokensBid: allTokensBid.data.data.data });

      // //tokens bid
      // // let allTokensBidStarted = await Axios.get(
      // //   `${process.env.REACT_APP_TOKEN_API_URL}/bidstarted/4/get/`
      // // );
      // // this.setState({ tokensBidStarted: allTokensBidStarted.data.data.data });

    } catch (error) {
      // Catch any errors for any of the above operations.

      console.error(error);
    }
  };

  render() {
    const CardWithId = ({ match }) => {
      return (
        <CardDetail
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
          art={
            this.state.art?.filter(
              (singleart) => singleart._tokenId === match.params.id
            )[0]
          }
          contract={this.state.contract}
          accounts={this.state.accounts}
          cre={this.state.creValue}
          matchId={match.params.id}
        />
      );
    };
    return (
      <div className='App'>
        <Header
          contract={this.state.contract}
          accounts={this.state.accounts}
          balance={this.state.balance}
          web3={this.state.web3}
        />
        <Switch>
          <Route
            exact
            path='/home'
            component={() => (
              <Home
                contract={this.state.contract}
                accounts={this.state.accounts}
              />
            )}
          />
          <Route
            exact
            path='/allart'
            component={() => (
              <AllItemComponent
                contract={this.state.contract}
                accounts={this.state.accounts}
              />
            )}
          />
          <ProtectedRoute
            exact
            path='/mycollections'
            component={() => (
              <MyItemComponent
                contract={this.state.contract}
                accounts={this.state.accounts}
              />
            )}
          />
           <ProtectedRoute
            exact
            path='/mycollection'
            component={() => (
              <MyCollectionComponent
                contract={this.state.contract}
                accounts={this.state.accounts}
              />
            )}
          />
          <ProtectedRoute
            exact
            path='/mystore'
            component={() => (
              <MyStoreComponent
                contract={this.state.contract}
                accounts={this.state.accounts}
              />
            )}
          />
          <Route path='/card/:id' component={CardWithId} />
          {/* <Route path='/card/:id'  location={this.state.location} key={this.state.location.key} render = {props => <CardDetail {...props} key={this.sta.location.key} /> } /> */}

           <Route
                        path='/card/:id'
                        component={(props) => (
                            <CardDetail

                                contract={this.state.contract}
                                accounts={this.state.accounts}
                                art = {this.state.art}
                            />
                        )}
                    /> 

          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default Main;
