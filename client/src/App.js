import React, { Component } from 'react';
import Main from './Components/MainComponent';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom'
class App extends Component {
    render() {
        return (
            <HashRouter basename='/'>
                <div className='App'>
                    <Main />
                </div>
            </HashRouter>
        );
    }
}

export default App;
