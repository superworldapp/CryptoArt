import React, { Component } from 'react';
//import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,
    Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText , Modal, ModalHeader, ModalBody} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Web3 from "web3";
import { render } from 'react-dom';
import axios from 'axios';

var util;
var util1;
var vx;
var alldocs = [];
var allcus = [];
var allmanu = [];
var customer;
const ETHER = 1000000000000000000;


var filekn;
var total;
var finalid;

class Allpatrender extends Component{
    // var day = moment.unix(dish.dateofComp); 
    // var xy = dish.dateofComp;
    // var date = new Date(xy*1000);
    // var time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    // var yz = xy != 0?"bg-success text-white":"";
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] , isModalOpen: false,sellPrice: 0};
        this.toggleModal = this.toggleModal.bind(this);
       this.handleInputChange = this.handleInputChange.bind(this);
        this.buyitem = this.buyitem.bind(this);
        this.putForSale = this.putForSale.bind(this);
        this.DeSale = this.DeSale.bind(this);
    }
    buyitem = async() => {
        const res = await this.props.contract.methods.buyToken(this.props.dish.tokenIdentifier).send({from: this.props.accounts,value:this.props.dish.tokenSellPrice,gas : 1000000});
         console.log(res);
    }  
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
    }
	putForSale = async () => {
        var nex = this.state.sellPrice*ETHER;
        const res = await this.props.contract.methods.putforsale(this.props.dish.tokenIdentifier,(this.state.sellPrice*ETHER).toString()).send({from: this.props.accounts,gas : 1000000});
         console.log(res);
    }
    DeSale = async () => {
        const res = await this.props.contract.methods.desale(this.props.dish.tokenIdentifier).send({from: this.props.accounts,gas : 1000000});
         console.log(res);
    }
  
    

    render() {
        
        var but = this.props.dish.isSelling?"visible":"invisible" ;
        var bux = this.props.dish.isSelling?"invisible":"visible"
        var bak = this.props.dish.isSelling?"bg-success text-white":"";
        var artno = this.props.dish.tokenIdentifier;

        var cl = "fa fa-laptop fa-5x";
        return(
           
            <Card className={bak}>
            <a href={this.props.dish.imgurl} target="_blank"><CardImg top width="100%" src={this.props.dish.imgurl} alt="Card image" /></a>
            <CardBody>
            <CardTitle>Item Title : {this.props.dish.tokenTitle}</CardTitle>
            <CardText><small>Item Creator : {this.props.dish.tokenCreator}</small></CardText>
            <CardText><small>Item Price : {Web3.utils.fromWei(this.props.dish.tokenPrice.toString(), 'ether')}</small></CardText>
            <CardText><small>Item Sell Price : {Web3.utils.fromWei(this.props.dish.tokenSellPrice.toString(), 'ether')}</small></CardText>
            <Col sm={{size:12}}>
                <Button className="visible" size="sm" type="submit" color="primary" onClick={this.toggleModal}>
                    Sell Item
                </Button>{'   '}
                <Button className={but} size="sm" type="submit" color="primary" onClick={this.DeSale}>
                    DeSell Item
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="modal-md">
                    <ModalHeader toggle={this.toggleModal} className="pl-5">Put For Sale</ModalHeader>
                        <Card className="pb-5">
                        <CardImg top width="100%" src={this.props.dish.imgurl} alt="Card image" />
                            <p className="m-auto p-2">Art Title: {this.props.dish.tokenTitle}</p>

                            <div className="row m-auto pt-2">
                                <p>Art Sell Price : </p>
                                <p> <Input type="text" id="sellPrice" name="sellPrice" onChange={this.handleInputChange}></Input></p>
                            </div>
                            <p className="m-auto p-2"><Button type="submit" onClick={this.putForSale} >Confirm</Button> </p>
                        </Card>
                </Modal>
            </Col>
            </CardBody>
            
        </Card>
        )
    }
}





class MyItemComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] , cust: [] , manuf: [] , isModalOpen1: false ,title : "",arturl:"",price:"",arthash : "",percut:0 }
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }
    
    
    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1
        });
    }

    creatingItems = async() => {
        var tokenhash = this.state.arthash.toString();
        var tokentitle = this.state.title;
        var tokenprice = (this.state.price*ETHER).toString();
        var imgurl = this.state.arturl;
        var percut = this.state.percut;
        console.log(tokenhash,tokentitle,tokenprice,imgurl,percut);
        const res = await this.props.contract.methods.create(tokenhash,tokentitle,(this.state.price*ETHER).toString(),imgurl,percut).send({from: this.props.accounts,gas : 1000000});
         console.log(res);
        
        this.toggleModal1();
    }
    
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
    }
    
    async componentDidMount(){
        var res = await this.props.contract?.methods.tokenCount().call();
        console.log(res);

    
               
                var response= [];
                for(var i=1;i<=res;i++){
                    var rex = await this.props.contract?.methods.Arts(i).call();
                    if(rex.tokenOwner == this.props.accounts){
                        response.push(rex);
                    }
                    
                }
                alldocs = [];
                alldocs = response;
                console.log(response);
                this.setState({ dish : alldocs});

              
         
    }
    fileSelectHandler = event => {
        this.setState({
            selectedFile : event.target.files[0] 
        })
    }
    fileUploadHandler = event => {
        const fd = new FormData();
        fd.append('profile',this.state.selectedFile,this.state.selectedFile.name);
        axios.post('http://localhost:4000/upload', fd)
        .then(res => {
            console.log(res.data.profile_url);
            this.setState({
                arturl : res.data.profile_url
            })
        });
    }

     render(){
  
        const Menu = this.state.dish.map((x) => {
            return (
                <div key={x} className="col-4 col-md-3">
                    < Allpatrender dish={x} contract={this.props.contract} accounts={this.props.accounts}/>
                </div>
            );
        })
        
        var ch = "visible" ;
        return(
        <div className="container">
            <h2>My Items</h2>
            <Button color="success" className={ch} onClick={this.toggleModal1}>
                Add Art
            </Button>
            
            <Modal isOpen={this.state.isModalOpen1} toggle={this.toggleModal1} className="modal-xl">
                <ModalHeader toggle={this.toggleModal1}>
                    <h3>Add Artwork</h3>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="row pl-5 pr-5">
                        <div className="col-6">
                                <FormGroup>
                                    <Label htmlFor="title" className="ml-3">Token Title</Label>
                                    <Input type="text" id="title" name="title"
                                        onChange={this.handleInputChange}  />
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label htmlFor="price" className="ml-3">Item Price</Label>
                                    <Input type="text" id="price" name="price"
                                        onChange={this.handleInputChange}  />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row pl-5 pr-5">
                            
                            <div className="col-6">
                                <FormGroup>
                                    <Label htmlFor="arthash" className="ml-3">Art Hash</Label>
                                    <Input type="text" id="arthash" name="arthash"
                                        onChange={this.handleInputChange}  />
                                </FormGroup>    
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label htmlFor="arthash" className="ml-3">Art</Label>
                                    <Input type="file" onChange={this.fileSelectHandler}/>
                                    <Button onClick={this.fileUploadHandler}>Upload</Button>
                                </FormGroup>    
                            </div>

                        </div>
                        
                        <div className="row pl-5 pr-5">
                            <div className="col-6">
                                <FormGroup>
                                    <Label htmlFor="percut" className="ml-3">Percentage Cut</Label>
                                    <Input type="number" id="percut" name="percut"
                                        onChange={this.handleInputChange}  />
                                </FormGroup>
                            </div>

                        </div>
                        <br/>
                        <div className="row pl-5">
                            <div className="col-6">    
                                <Button color="primary" onClick={this.creatingItems}>Add</Button>
                            </div>
                        </div>
                        <br/>
                    </Form>
                </ModalBody>
            </Modal>
            <br/>
            <br/>
            <div className="row">
                {Menu}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        
        )
    };
}

export default MyItemComponent;