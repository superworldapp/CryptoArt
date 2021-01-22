import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import moment from 'moment';
import {Button,Form,FormGroup,Label,Input,Col,Card,CardImg,CardTitle,CardBody,CardImgOverlay,Badge,CardSubtitle, CardText,Modal,ModalHeader,ModalBody} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Web3 from 'web3';
import { render } from 'react-dom';
import axios from 'axios';
import "./MyArtComponent.css";
import * as aws from 'aws-sdk';
import * as dotenv from 'aws-sdk';
import * as fs from 'fs';
import * as util from 'util';
import loader from '../images/loader.svg';
import annonuser from "../images/user.png";
const SHA256 = require('crypto-js/sha256');


const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');

const path = require('path');




const BUCKET_NAME = 'superworldapp';


AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:f7692b7a-0050-4823-9df7-1ab52e23b6c9'
    })
});
const s3 = new S3();

let allDocs = [];
const ETHER = 1000000000000000000;



class Allpatrender extends Component {
    // let day = moment.unix(art.dateofComp);
    // let xy = art.dateofComp;
    // let date = new Date(xy*1000);
    // let time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    // let yz = xy != 0?"bg-success text-white":"";
    constructor(props) {
        super(props);
        this.state = {
            docCount: 0,
            art: [],
            isModalOpen: false,
            sellPrice: 0
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.buyItem = this.buyItem.bind(this);
        this.putForSale = this.putForSale.bind(this);
        this.DeSale = this.DeSale.bind(this);
        this.StartAuction = this.StartAuction.bind(this);
        this.EndAuction = this.EndAuction.bind(this);
        this.toggleAuction = this.toggleAuction.bind(this);
        
        
    }
    buyItem = async () => {
        const res = await this.props.contract.methods
            .buyToken(this.props.art.tokenIdentifier)
            .send({
                from: this.props.accounts,
                value: this.props.art.tokenSellPrice,
                gas: 10000000
            });
        console.log(res);
    };

    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    toggleAuction (){
        this.setState({
            isModalAucOpen: !this.state.isModalAucOpen
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    putForSale = async () => {
        const res = await this.props.contract.methods
            .putForSale(
                this.props.art.tokenIdentifier,
                (this.state.sellPrice * ETHER).toString()
            )
            .send({ from: this.props.accounts, gas: 1000000 });
        console.log(res);
    };
    DeSale = async () => {
        const res = await this.props.contract.methods
            .deSale(this.props.art.tokenIdentifier)
            .send({ from: this.props.accounts, gas: 1000000 });
        console.log(res);
    };
    StartAuction = async () => {
        const res = await this.props.contract.methods
            .startbid(this.props.art.tokenIdentifier)
            .send({ from: this.props.accounts, gas: 1000000 });
        console.log(res);
    };
    EndAuction = async () => {
        const res = await this.props.contract.methods
            .closeBidOwner(this.props.art.tokenIdentifier)
            .send({ from: this.props.accounts, gas: 1000000 });
        console.log(res);
    };


    

    render() {

        const img = new Image();
        let orientation;
        img.onload = function () {
            let width = this.width;
            let height = this.height;
            orientation = width < height ? 'portrait' : 'landscape';
    };
        img.src = this.props.art.imgurl;
        img.onload();


        let but = this.props.art.isSelling ? ' ' : 'hidden';
        let bak = this.props.art.isSelling ? 'bg-success text-white' : '';
        let buk = this.props.art.auction.isBidding ? 'bg-warning' : '';
        console.log(this.props.art.imgUrl);
        let pr =
            Web3.utils.fromWei(
                this.props.art.tokenSellPrice.toString(),
                'ether'
            ) == 0
                ? 'invisible'
                : 'visible';
        let reSellOrSell = this.props.art.isSelling
            ? 'ReSell'
            : 'Sell';
            let Auc = this.props.art.auction.isBidding
            ? 'End Auction'
            : 'Auction';
        let accNum = this.props.art.tokenCreator

        const accUsername = ()=>{
            if (accNum === '0xB4C33fFc72AF371ECaDcF72673D5644B24946256')
            return  "@Chitra"
            else if (accNum === '0x0d5567345D3Cb1114471BC07c396Cc32C7CF92ec')
            return  "@Arianna"
            else if (accNum === '0xABD82c9B735F2C89f2e62152A9884F4A92414F20')
            return "@CJMain"
            else if (accNum === '0x63611F92FA2d7B7e6625a97E6474b7fA16DbD89F')
            return "@CJ Test"
            else if (accNum === '0x4271AC6Bb565D120e2Ac1C3fb855aE5Dad6aE8ff')
            return "@Swapnil"
            else
            return  "@Annonymous"
        }   

        return (
            // <div class = "card-deck">
            <Card className='card-art'>
               
                {/* <a href={this.props.art.imgurl} target='_blank'> */}
                   <div className="card-img-top-all-art">
                   <Link to={`/card/${this.props.art.tokenIdentifier}`}>
                   <CardImg
                        className={orientation}
                        top
                        src={this.props.art.imgurl}
                        alt='Card image'></CardImg>
                    </Link>
                   </div>
                    
                
                <CardBody className='all-art-body'>
                 <div style={{
                    display: 'flex',
                   // justifyContent: 'flex-start',
                    }}>
                    <CardSubtitle >
                    <img
                    style={{marginRight: '30px' }}
                        width='16px'
                        height='16px'
                        className='rounded-circle'
                        src={annonuser}
                         ></img>
                        </CardSubtitle>
                        <CardSubtitle
                            style={{
                                fontFamily: 'Gibson',
                                fontSize: '13px',
                                color: '#5540C7',
                                display:'flex',
                                alignItems:'flex-end'
                                }}> Created by {accUsername()} </CardSubtitle>
                    </div>
                    
                    {/* <CardTitle className="ctext">
                        Item Title : {this.props.art.tokenTitle} {this.props.art.tokenCreator}
                    </CardTitle> */}
                    <div className="ctext">
                                    <CardText style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'13px',
                                        color:'#B3B3B3',  
                                        fontWeight:'bold'
                                    }}> Title
                                    </CardText>
                                    <CardText
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'13px',
                                        color:'#B3B3B3',
                                        fontWeight:'bold'
                                    }}
                                    >
                                        Price
                                    </CardText>
                                </div>
                                <div className="ctext" style={{height:'2rem'}}>
                                    <CardText
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'13px',
                                        color:'black',
                                        textDecoration:'none'
                                    }}
                                    >
                                        {this.props.art.tokenTitle} 
                                    </CardText>
                                    <CardText
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'13px',
                                        color:'black',
                                        textDecoration:'none'
                                    }}
                                    >
                                    {Web3.utils.fromWei(
                                this.props.art.tokenSellPrice.toString(),
                                'ether'
                            )}{' '}
                            ETH
                                    </CardText>
                                </div> 
                    {/* <CardText>
                        <small>
                            Item Creator : {this.props.art.tokenCreator}
                        </small>
                    </CardText>
                    <CardText className={pr}>
                        <small>
                            Item Sell Price :{' '}
                            {Web3.utils.fromWei(
                                this.props.art.tokenSellPrice.toString(),
                                'ether'
                            )}{' '}
                            ETH
                        </small>
                    </CardText> */}
                    <div className="ctext" style={{padding:'0px', height:'2rem', marginTop:'5%'}}>
                        <button
                            className='abtn' style ={{ color :'white', backgroundColor:"#5540C7"}}
                            // color='primary'
                            onClick={this.toggleModal}>
                            {reSellOrSell}
                        </button> 
                        <button
                            className={but}
                            type='submit'
                            onClick={this.DeSale}>
                            DeSell Item
                        </button>   
                        <button
                            className='abtn'
                            type='submit'
                            // color='primary'
                             onClick={this.props.art.auction.isBidding ? this.EndAuction : this.StartAuction }
                            onClick = {this.toggleAuction}
                            >
                            {Auc} 
                        </button>
                        
                        <Modal
                            isOpen={this.state.isModalOpen}
                            toggle={this.toggleModal}
                            className='modal_popup'>
                            <ModalHeader
                                toggle={this.toggleModal}
                                className='pl-5'>
                                Put For Sale
                            </ModalHeader>
                            <Card className='artCard'>
                                <CardImg
                                    top
                                    src={this.props.art.imgurl}
                                    alt='Card image'
                                />
                                <CardBody
                                >
                                <div className="ctext" style={{padding:'2px'}}>
                                    <CardSubtitle style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'#B3B3B3',
                                        
                                    }}>
                                    Title
                                    </CardSubtitle>
                                    <CardSubtitle
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'#B3B3B3',
                                    }}
                                    >
                                        Price
                                    </CardSubtitle>
                                </div>
                                <div className="ctext" style={{padding:'2px'}}>
                                    <CardText
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                    }}
                                    >
                                        {this.props.art.tokenTitle} 
                                    </CardText>
                                    <CardText
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                    }}
                                    >
                                        1.2ETH
                                    </CardText>
                                </div>
                                <div className="ctext1">
                                    <p
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                        marginTop:'2%'
                                    }}
                                    >Sell Price : </p>
                                    <p>
                                        {' '}
                                        <Input
                                            type='text'
                                            id='sellPrice'
                                            name='sellPrice'
                                            onChange={
                                                this.handleInputChange
                                            }></Input>
                                    </p>
                                </div>
                                <div>
                                <button
                                    className="abtn" style={{
                                        left:'32%', color: 'white', backgroundColor:'#5540C7'
                                    }}
                                        type='submit'
                                        onClick={this.putForSale}>
                                        Confirm
                                    </button>{' '}
                                </div>
                                </CardBody>
                                
                                
                            </Card>
                        </Modal>

                        <Modal
                            isOpen={this.state.isModalAucOpen}
                            toggle={this.toggleAuction}
                            className='modal_popup'>
                            <ModalHeader
                                toggle={this.toggleAuction}
                                className='pl-5'>
                                Start Auction
                            </ModalHeader>
                            <Card className='artCard' style={{height:'50%'}}>
                                <CardImg
                                    top
                                    className="displayImage"
                                    src={this.props.art.imgurl}
                                    alt='Card image'
                                />
                                <CardBody
                                >
                                <div className="ctext" style={{padding:'5px', height:'1rem'}}>
                                    <CardSubtitle style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'#B3B3B3',
                                        
                                    }}>
                                    Title
                                    </CardSubtitle>
                                    <CardSubtitle
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'#B3B3B3',
                                    }}
                                    >
                                        Price
                                    </CardSubtitle>
                                </div>
                                <div className="ctext" style={{ padding:'5px'}}>
                                    <CardText
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                    }}
                                    >
                                        {this.props.art.tokenTitle} 
                                    </CardText>
                                    <CardText
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                    }}
                                    >
                                        1.2ETH
                                    </CardText>
                                </div>
                                <div className="ctext1" style={{ padding:'2px'}}>
                                    <p
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                        marginTop:'2%'
                                    }}
                                    >Start Bid : </p>
                                    <p>
                                        <Input
                                        style= {{ width:'80%'}}
                                            type='text'
                                            id='bidPrice'
                                            name='bidPrice'
                                            onChange={
                                                this.handleInputChange
                                            }></Input>
                                    </p>
                                    <p
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                        marginTop:'2%'
                                    }}
                                    > ETH
                                     </p>
                                </div>
                                <div className="ctext1">
                                    <p
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                        marginTop:'2%'
                                    }}
                                    >Duration : </p>
                                    <p>
                                        
                                        <Input
                                        style= {{ width:'80%'}}
                                            type='text'
                                            id='bidPrice'
                                            name='bidPrice'
                                            onChange={
                                                this.handleInputChange
                                            }></Input>
                                    </p>
                                    <p
                                    style={{
                                        position:'relative',
                                        fontFamily:'Gibson',
                                        fontSize:'15px',
                                        color:'black',
                                        marginTop:'2%'
                                    }}
                                    >Days </p>
                                </div>
                                <div>
                                <button
                                    className="abtn" style={{
                                        left:'32%', color: 'white', backgroundColor:'#5540C7'
                                    }}
                                        type='submit'
                                        onClick={this.putForSale}>
                                        Confirm
                                    </button>{' '}
                                </div>
                                </CardBody>
                            </Card>
                        </Modal> 
                    </div> 
                </CardBody>
                {/* </Link> */}
              
            </Card>
            
        );
    }
}

class MyItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docCount: 0,
            art: [],
            cust: [],
            manuf: [],
            isModalOpen1: false,
            title: '',
            artUrl: '',
            price: '',
            artHash: '',
            nos: 0,
            isLoading: false
        };
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.fileAwsHandler = this.fileAwsHandler.bind(this);

    }

    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1
        });
    }

    creatingItems = async (x) => {
        let tokenHash = this.state.artHash.toString();
        let tokenTitle = this.state.title;
        let tokenPrice = (this.state.price * ETHER).toString();
        let imgUrl = x;
        let nos = this.state.nos;
        console.log(tokenHash, tokenTitle, tokenPrice, imgUrl, nos);
        const res = await this.props.contract.methods
            .batchCreator(
                tokenHash,
                tokenTitle,
                (this.state.price * ETHER).toString(),
                imgUrl,
                nos
            )
            .send({ from: this.props.accounts, gas: 1000000 });
                                                    
        console.log(res);
        this.setState({isLoading : false});

        this.toggleModal1();
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async componentDidMount() {
        let res = await this.props.contract?.methods.tokenCount().call();
        console.log(res);

        let response = [];
        for (let i = 1; i <= res; i++) {
            let rex = await this.props.contract?.methods.Arts(i).call();
            if (rex.tokenOwner == this.props.accounts) {
                response.push(rex);
            }
        }
        allDocs = [];
        allDocs = response;
        console.log(response);
        this.setState({ art: allDocs });
    }
    fileSelectHandler = (event) => {
        console.log(event.target.files);
        this.setState({
            selectedFile: event.target.files[0]
        });
    };
    fileUploadHandler = (event) => {
        event.preventDefault();
        this.setState({isLoading : true});
        this.fileAwsHandler(this.state.selectedFile,this.creatingItems);
    };



    fileAwsHandler = async (file, callback) => {
        console.log(file);
        let newfilename = `image_${Date.now()}${path
            .extname(file.name)
            .toLowerCase()}`;
        console.log(newfilename);
        let params = {
            ACL: 'public-read',
            Bucket: BUCKET_NAME,
            Key: 'marketplace/' + newfilename,
            ContentType: file.type,
            Body: file
        };

        s3.putObject(params, function (err, data) {
            if (err) {
                console.log('error :', err);
            } else {
                callback(
                    `https://superworldapp.s3.amazonaws.com/marketplace/${newfilename}`
                );
            }
        });
    };

    render() {
        const Menu = this.state.art.map((x) => {
            return (
                <div key={x.tokenIdentifier} className='col-4 col-md-3' >
                    <Allpatrender
                        art={x}
                        contract={this.props.contract}
                        accounts={this.props.accounts}
                    />
                    <br />
                    <br />
                </div>
            );
        });

        let ch = 'visible';
        return (
            <div className='artContainer'>
                <div style={{

                    marginLeft:'2px'
                }} >
                    
                <p style={{fontFamily:'Gibson', fontSize:'30px', fontWeight:'bold', marginTop:'10px', textAlign:'left'}}>
                    My Arts
                </p>

                <div  style={{ display:'flex', justifyContent:'space-between'}}>
                <p
                style={{  marginLeft:'2px', position:'relative' }}
                >
                <button className="abtn">All</button>
                 <button className="abtn">Offer Made </button> 
                <button className="abtn">Offer Received </button> 
                <button className="abtn">My Creations </button> 
                </p>
                <p
                style={{  marginLeft:'2px', position:'relative' }}
                >
                <Button
                    className='abtn' 
                    style={{backgroundColor:'#5540C7', color:'white'}}
                    onClick={this.toggleModal1}>
                    + {''}Create ARTWORK
                </Button>

                </p>
                </div> 
                </div>

                <Modal
                    isOpen={this.state.isModalOpen1}
                    toggle={this.toggleModal1}
                    className='modal-xl'>
                    <ModalHeader toggle={this.toggleModal1}>
                    <p style={{fontFamily:'Gibson', fontSize:'25px', fontWeight:'800', marginTop:'10px', textAlign:'left', marginLeft:'7px', textTransform:'uppercase'}}>
                    Add New Artwork
                </p>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='row pl-5 pr-5'>
                                <div className='col-6'>
                                    <FormGroup >
                                        
                                        <Label htmlFor='title' className='ml-3'
                                         style={{ fontFamily:'Gibson', fontSize:'20px',
                                         color:'black',
                                         }}> Title
                                        </Label>
                                        <Input
                                            type='text'
                                            id='title'
                                            name='title'
                                            onChange={this.handleInputChange}
                                        />    
                                    </FormGroup>
                                </div>
                                <div className='col-6' style={{
                                    display:'flex', justifyContent:'space-between'
                                }}>
                                    <FormGroup >
                                        <Label htmlFor='price' className='ml-3' style={{ fontFamily:'Gibson',
                                        fontSize:'20px',
                                        color:'black',
                                        }}> Sell Price
                                        </Label>
                                        <Input
                                        style={{width:'50%'}}
                                            type='text'
                                            id='price'
                                            name='price'
                                            onChange={this.handleInputChange}
                                        />
                                        <Label className='ml-3' style={{ fontFamily:'Gibson',
                                        fontSize:'20px',
                                        color:'black',
                                        }}> ETH
                                        </Label>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className='row pl-5 pr-5'>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label
                                            htmlFor='nos'
                                            className='ml-3'  style={{ fontFamily:'Gibson',
                                            fontSize:'20px',
                                            color:'black',
                                            }}>
                                            No. of Tokens
                                        </Label>
                                        <Input
                                        style={{width:'30%'}}
                                            type='number'
                                            id='nos'
                                            name='nos'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label
                                            htmlFor='artHash'
                                            className='ml-4'  style={{ fontFamily:'Gibson',
                                            fontSize:'20px',
                                            color:'black',
                                            }}>
                                            Art
                                        </Label>
                                        <Input
                                        style={{marginLeft:'0.5rem'}}
                                            type='file'
                                            onChange={this.fileSelectHandler}
                                        />
                                        
                                    </FormGroup>
                                </div>
                            </div>
                            <br />
                                    <button
                                    className="abtn" style={{ float:'right', color:'white', backgroundColor:'#5540C7', fontSize:'18px', padding:'0.375rem 2.0rem'}}
                                        color='primary'
                                        onClick={this.fileUploadHandler}>
                                        Add
                                    </button>
                                    {this.state.isLoading ? <img src={loader} /> : <div></div>}
                                
                            <br />
                        </Form>
                    </ModalBody>
                </Modal>
                
                <div className='row-all-art'>{Menu}</div>
                
                <br/><br/><br/><br/><br/><br/><br/><br/>

                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        );
    }
}

export default MyItemComponent;
