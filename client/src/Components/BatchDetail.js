import React, { useEffect, useState } from 'react';
import TableBody from './TableBody';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardImg,
  CardHeader,
  Table,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import loader from '../images/loader.svg';


const BatchDetail = ({
  art,
  accounts,
  contract,
  cre,
  matchId,
  BatchCreated,
}) => {
  console.log(art);

  const [ethPrice, setEthPrice] = useState({});
  const [creValue, setCreValue] = useState([]);
  const [batchCreated, setBatchCreated] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [handleInput, setHandleInput] = useState('');
  const [pay, setPay] = useState(0);
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [loadingPlaceBid, setLoadingPlaceBid] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const changeValue = (e) => {
    setDropdownValue(e.currentTarget.textContent);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

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
    else return '@Annonymous';
  };



  const getCreData = async () => {
 

    setBatchCreated(BatchCreated[0]);

  };




  useEffect(() => {
    getCreData();
    
     console.log(BatchCreated[0])
    // console.log('Header', myProperties);
  }, []);


  console.log(ethPrice);
  return (
    <>
      <div className='container'>
        <div className='d-flex justify-content-between mt-5 py-5'>
          <div
            className='card'
            style={{
              width: '50%',
            }}
          >
            <a href={batchCreated._imgurl} target='_blank'>
              <img src={batchCreated._imgurl} className='card-img' alt='...' />
            </a>
          </div>
          <div className='information d-flex flex-column'>
            {/* <a href='#'>{match.params.id}</a>
                        <h1>{match.params.id}</h1> */}
            <h4>{batchCreated._tokenBatchName}</h4>
            <p>
              Created by{' '}
              <span className='text-primary'>{accUsername(batchCreated?._tokenCreator)}</span>
            </p>
            <div
              className='card py-3'
              style={{
                width: '30rem',
              }}
            >
              
            </div>
          </div>  
        </div>
        
      
      </div>
    </>
  );
};

export default BatchDetail;
