import React, { useEffect, useState } from 'react';
import TableBody from './TableBody';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardImg,
  CardTitle,
  CardImgOverlay,
  CardHeader,
  Collapse,
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
import anonUser from '../images/user.png';
import "./BatchDetail.css";
import heart from "../images/svg/Heart.svg";
import dropdownarrow from "../assets/svg/Drop down arrow.svg";



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
  const [isOpen, setIsOpen] = useState(false);

  const collapsetoggle = () => setIsOpen(!isOpen);

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
        <div className='batchUpperview'>
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
          <div>
          <div className='information d-flex flex-column'>
            <div>
            <h4>
            Journey From Furture
          </h4>
            </div>
           <div className = "View"> 
           <p className = "style2">
             Starting from 6.5ETH
           </p>
           &nbsp;
           &nbsp;
           <p className = "style2">
             4 of 5 remaing
           </p>

           </div>
          <div>
          <p className = "style1">
          <img
                  className="userimg"
                  src={anonUser}
                ></img>   {' '}
              Created by{' '}
              <span className='text-primary'>{accUsername(batchCreated?._tokenCreator)}</span>
            </p> 

          </div>
          <div>
            <h5> Description</h5>
            <p className="style1">

            </p>
          </div>
          <div style= {{display:'flex', justifyContent:'space-between',}}>
            <h5>
              History
            </h5>
          <button  style={{ marginBottom: '1rem', border:'none' }} onClick={collapsetoggle}>
            <img src= {dropdownarrow} alt = "img">
            </img>

          </button>
          {/* <Collapse isOpen={isOpen} className = "collapse1">
        <p className ="style2">
        Anim pariatur cliche reprehenderit,
           enim eiusmod high life accusamus terry richardson ad squid. Nihil
           anim keffiyeh helvetica, craft beer labore wes anderson cred
           nesciunt sapiente ea proident.

        </p>
          
          
      </Collapse> */}
            </div>

             {/* <div
              className='card py-3'
              style={{
                width: '30rem',
              }}
            >
              <h4>{batchCreated._tokenBatchName}</h4>
              
            </div> */}
            </div>

          </div>

          </div>
            
            {/* <a href='#'>{match.params.id}</a>
                        <h1>{match.params.id}</h1> */}
           {/* 
             
          </div> */} 
          
          

          <div className ="bottomView">
              <div className='rowImages'>
          <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={batchCreated._imgurl}
                    alt='image'
                  ></CardImg>
                  <CardImgOverlay className = "imgOverlay">
                    <div className="BatchcardImgOverlay">
                    <img
                  className="userimg"
                  src={anonUser}
                ></img>
                   <img 
                className = "userimg"
                src = {heart}
                ></img>
                   </div>
                    <CardTitle className="Batchcard-imgTitle">
                      Alimation Character
                    </CardTitle> 
                  </CardImgOverlay> 
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className = "cardsubtitleName">
                      <span className='text-primary'>{accUsername(batchCreated?._tokenCreator)}</span>
                      </CardSubtitle>
                    </div>                    
                     <div className='ctext'>
                      <CardText className = "price">
                        0.5ETH
                        <p className = "USD-price">
                        ($985.56 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='batchcardbid-btn'>BID</button>
                      </div>
                    </div> 
                    <div className='buy-bid-btn-div'>
                        <p className="Batchcardtime-div">
                          1 day left to purchase
                        </p>
                      </div>
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={batchCreated._imgurl}
                    alt='image'
                  ></CardImg>
                  <CardImgOverlay className = "imgOverlay">
                    <div className="BatchcardImgOverlay">
                    <img
                  className="userimg"
                  src={anonUser}
                ></img>
                   <img 
                className = "userimg"
                src = {heart}
                ></img>
                   </div>
                    <CardTitle className="Batchcard-imgTitle">
                      Alimation Character
                    </CardTitle> 
                  </CardImgOverlay> 
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className = "cardsubtitleName">
                      <span className='text-primary'>{accUsername(batchCreated?._tokenCreator)}</span>
                      </CardSubtitle>
                    </div>                    
                     <div className='ctext'>
                      <CardText className = "price">
                        0.5ETH
                        <p className = "USD-price">
                        ($985.56 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='batchcardbid-btn'>BID</button>
                      </div>
                    </div> 
                    <div className='buy-bid-btn-div'>
                        <p className="Batchcardtime-div">
                          1 day left to purchase
                        </p>
                      </div>
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={batchCreated._imgurl}
                    alt='image'
                  ></CardImg>
                  <CardImgOverlay className = "imgOverlay">
                    <div className="BatchcardImgOverlay">
                    <img
                  className="userimg"
                  src={anonUser}
                ></img>
                   <img 
                className = "userimg"
                src = {heart}
                ></img>
                   </div>
                    <CardTitle className="Batchcard-imgTitle">
                      Alimation Character
                    </CardTitle> 
                  </CardImgOverlay> 
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className = "cardsubtitleName">
                      <span className='text-primary'>{accUsername(batchCreated?._tokenCreator)}</span>
                      </CardSubtitle>
                    </div>                    
                     <div className='ctext'>
                      <CardText className = "price">
                        0.5ETH
                        <p className = "USD-price">
                        ($985.56 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='batchcardbid-btn'>BID</button>
                      </div>
                    </div> 
                    <div className='buy-bid-btn-div'>
                        <p className="Batchcardtime-div">
                          1 day left to purchase
                        </p>
                      </div>
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={batchCreated._imgurl}
                    alt='image'
                  ></CardImg>
                  <CardImgOverlay className = "imgOverlay">
                    <div className="BatchcardImgOverlay">
                    <img
                  className="userimg"
                  src={anonUser}
                ></img>
                   <img 
                className = "userimg"
                src = {heart}
                ></img>
                   </div>
                    <CardTitle className="Batchcard-imgTitle">
                      Alimation Character
                    </CardTitle> 
                  </CardImgOverlay> 
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className = "cardsubtitleName">
                      <span className='text-primary'>{accUsername(batchCreated?._tokenCreator)}</span>
                      </CardSubtitle>
                    </div>                    
                     <div className='ctext'>
                      <CardText className = "price">
                        0.5ETH
                        <p className = "USD-price">
                        ($985.56 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='batchcardbid-btn'>BID</button>
                      </div>
                    </div> 
                    <div className='buy-bid-btn-div'>
                        <p className="Batchcardtime-div">
                          1 day left to purchase
                        </p>
                      </div>
                  </CardBody>
                </Card>
          </div>
          </div>
          
          <br/>
          <br/>
          <br/>
        </div>
        
      
      
    </>
  );
};

export default BatchDetail;
