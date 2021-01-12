import React, { Component } from 'react';
import BNContract from '../contracts/Cryptoart.json';
import getWeb3 from '../getWeb3';
import '../App.css';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import AllItemComponent from './AllArtComponent';
import MyItemComponent from './MyArtComponent';
import CardDetail from './CardDetail';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './FooterComponent';

//import HDWalletProvider from "@truffle/hdwallet-provider";

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
            registered: 0
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

            console.log(instance);
            this.setState({
                web3,
                accounts: accounts[0],
                contract: instance,
                balance
            });
        } catch (error) {
            // Catch any errors for any of the above operations.

            console.error(error);
        }
    };

    render() {
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
                    <Route
                        exact
                        path='/myart'
                        component={() => (
                            <MyItemComponent
                                contract={this.state.contract}
                                accounts={this.state.accounts}
                            />
                        )}
                    />
                    <Route
                        path='/card/:id'
                        component={CardDetail}
                    />

                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}
export default Main;
