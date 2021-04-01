import React, {Component} from 'react';
import Main from './Components/MainComponent';
import {HashRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { LayoutProvider } from './state/Layout/context';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { TokenProvider } from './state/Token/context';

function getLibrary(provider) {
  return new Web3Provider(provider);
}
class App extends Component {
  render() {
    return (
      <HashRouter basename='/'>
        <div className='App'>
          <Web3ReactProvider getLibrary={getLibrary}>
            <TokenProvider>
              <LayoutProvider>
                <Main />
              </LayoutProvider>
            </TokenProvider>
          </Web3ReactProvider>
        </div>
      </HashRouter>
    );
  }
}

export default App;
