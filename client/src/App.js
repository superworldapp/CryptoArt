import React, { Component } from 'react';
import Main from './Components/MainComponent';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { LayoutProvider } from './state/Layout/context';

class App extends Component {
  render() {
    return (
      <HashRouter basename='/'>
        <div className='App'>
          <LayoutProvider>
            <Main />
          </LayoutProvider>
        </div>
      </HashRouter>
    );
  }
}

export default App;
