import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import CloseIcon from '@material-ui/icons/Close';
import metaMask from '../../images/MetaMask.png';
import portis from '../../images/Portis.png';
import fortmatic from '../../images/Fortmatic.png';
import { injected } from '../../utils/connectors';
import { LayoutContext } from '../../state/Layout/context';
import { useWeb3React } from '@web3-react/core';
// import Auth from '../../HOC/Auth';

import './ConnectWalletModal.css';
import { Web3Provider } from '@ethersproject/providers';

const ConnectWalletModal = (props: any) => {
  const { state, dispatch } = useContext(LayoutContext);
  const { activate, account } = useWeb3React<Web3Provider>();
  const history = useHistory();
  const hidden = props.hidden;

  // const exitHandler = () => {
  //     hidden = true;
  //     dispatch({
  //         type: 'TOGGLE_SIGN_IN_MODAL',
  //         payload: !state.signInModalIsOpen,
  //     });
  // };

  const handleWalletSignIn = () => {
    // setLoading(true);
    try {
      activate(injected).then(() => {
        // console.log(window.location.href);
        // console.log(window.location.pathname);
        if (window.location.pathname === '/guided-tour') {
          history.push('/');
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
      // initContracts();
      //   else if (walletType === 'portis') activate(portis);
      //   else if (walletType === 'fortmatic') activate(fortmatic);
    } catch (error) {
      console.error(error);
    }
    if (account) {
      // setLoading(false);
      dispatch({
        type: 'TOGGLE_SIGN_IN_MODAL',
        payload: !state.signInModalIsOpen,
      });
    }
    // window.location.reload();
  };

  return (
    <>
      {!hidden && (
        <div
          className={`connect-wallet__div ${props.divClass}`}
          style={props.style}
        >
          {/* <button className="connect-wallet__closeBtn" onClick={exitHandler}>
                        <CloseIcon />
                    </button> */}
          <header className={`connect-wallet__header ${props.headerClass}`}>
            <h2>Connect a Wallet to Start Buying</h2>
          </header>
          <div className={`connect-wallet__content ${props.contentClass}`}>
            <div className='connect-wallet__container'>
              <div className='connect-wallet__cardRecommended connect-wallet__cardRecommendedRed'>
                <div className='connect-wallet__cardRecommendedText'>
                  Recommended
                </div>
                <div className='connect-wallet__card connect-wallet__cardRed'>
                  <img
                    src={metaMask}
                    alt='MetaMask'
                    className='connect-wallet__cardImg'
                  />
                  <div className='connect-wallet__cardTitle'>MetaMask</div>
                  <div className='connect-wallet__cardSubTitle connect-wallet__cardRedText'>
                    Advanced
                  </div>
                  <div className='connect-wallet__cardDescription'>
                    This wallet allow users to purchase Ether with a credit
                    card. It is a browser extension on Chrome and Firefox, and
                    it has a mobile app.
                    <br />
                    Download Metamask here &nbsp;
                    <a href='https://metamask.io/'>https://metamask.io/</a>
                  </div>
                  <button
                    className='connect-wallet__cardBtns connect-wallet__redBtn'
                    onClick={() => {
                      localStorage.setItem('walletType', 'metamask');
                      handleWalletSignIn();
                    }}
                  >
                    CONNECT NOW
                  </button>
                  {/* button functionality needs to be implemented */}
                </div>
              </div>
            </div>
            <div className='connect-wallet__container'>
              <div className='connect-wallet__card connect-wallet__cardPurple'>
                <img
                  src={portis}
                  alt='Portis'
                  className='connect-wallet__cardImg'
                />
                <div className='connect-wallet__cardTitle'>Portis</div>
                <div className='connect-wallet__cardSubTitle connect-wallet__cardBlueText'>
                  Beginner
                </div>
                <div className='connect-wallet__cardDescription'>
                  This wallet is easy to set up and allows users to sign in with
                  an email. Ether can be purchased through a coinbase exchange
                  and sent to a Portis wallet.
                </div>
                <button
                  className='connect-wallet__cardBtns connect-wallet__purpleBtn'
                  onClick={() => {
                    localStorage.setItem('walletType', 'portis');
                    window.location.reload();
                  }}
                  // disabled={true}
                >
                  CONNECT NOW
                </button>
                {/* button functionality needs to be implemented */}
              </div>
            </div>
            <div className='connect-wallet__container'>
              <div className='connect-wallet__card connect-wallet__cardPurple'>
                <img
                  src={fortmatic}
                  alt='Fortmatic'
                  className='connect-wallet__cardImg'
                />
                <div className='connect-wallet__cardTitle'>Fortmatic</div>
                <div className='connect-wallet__cardSubTitle connect-wallet__cardBlueText'>
                  Beginner
                </div>
                <div className='connect-wallet__cardDescription'>
                  This user-friendly wallet allows users to sign-up with a phone
                  number on any devices. Ether can be purchased through a
                  coinbase exchange and sent to a Fortmatic wallet.
                </div>
                <button
                  className='connect-wallet__cardBtns connect-wallet__purpleBtn'
                  onClick={() => {
                    localStorage.setItem('walletType', 'fortmatic');
                    window.location.reload();
                  }}
                  // disabled={true}
                >
                  CONNECT NOW
                </button>
                {/* button functionality needs to be implemented */}
              </div>
            </div>
          </div>
          <footer className={`connect-wallet__footer ${props.footerClass}`}>
            {props.footer}
          </footer>
        </div>
      )}
    </>
  );
};

export default ConnectWalletModal;
