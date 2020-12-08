
import React, { Component } from "react";
import Main from './Components/MainComponents';
import {HashRouter,BrowserRouter} from 'react-router-dom';
class App extends Component {

  render() {
    return (
      <HashRouter basename="/">
      <div className="App">
        <Main />
      </div>
      </HashRouter>
    );
  }
}

export default App