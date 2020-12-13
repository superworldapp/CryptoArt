import React, { Component } from 'react';
//import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,
    Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText , Modal, ModalHeader, ModalBody} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Web3 from "web3";
import { render } from 'react-dom';

var util;
var util1;
var vx;
var alldocs = [];
var allcus = [];
var allmanu = [];
var customer;
const ETHER = 1000000000000000000;


var quantity;
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
        this.state = { docCount : 0, dish: [] , isModalOpen: false,qty: 0};
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.buyitem = this.buyitem.bind(this);
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
    

    render() {
        
        var but = this.props.dish.isSelling?"visible":"invisible" ;
        var bux = this.props.dish.isSelling?"invisible":"visible"
        var bak = this.props.dish.isSelling?"bg-success text-white":"";
        var artno = this.props.dish.tokenIdentifier;
        var cl = "fa fa-laptop fa-5x";
        return(
           
            <Card className={bak}>
            <CardImg top width="100%" src={this.props.dish.imgurl} alt="Card image" />
            <CardBody>
            <CardTitle>Item Title : {this.props.dish.tokenTitle}</CardTitle>
            <CardText><small>Item Creator : {this.props.dish.tokenCreator}</small></CardText>
            <CardText><small>Item Owner : {this.props.dish.tokenOwner}</small></CardText>
            <CardText><small>Item Price : {Web3.utils.fromWei(this.props.dish.tokenSellPrice.toString(), 'ether')}</small></CardText>
            <Col sm={{size:12}}>
                <Button className={but} size="sm" type="submit" color="primary" onClick={this.buyitem}>
                    Buy Item
                </Button>{'   '}
                <Button className={bux} size="sm" type="submit" color="primary" >
                    Place Offer
                </Button>
            </Col>
            </CardBody>
            
        </Card>
        )
    }
}


function category(i) {

        switch(i) {
            case 0:
                vx = 'Laptop';
                break;
            case 1:
                vx = 'Mobile';
                break;
            case 2:
                vx = 'Desktop';
                break;
        }
        return vx;
}

function categoryrev(i) {

    
        if(i == "Laptop")
        {
            return 0;
        }
        else if(i == "Mobile")
        {
            return 1;
        }
        else if(i == "Desktop")
        {
            return 2;
        }
        
}
var itemtype;
var itemprice;
var itemgst;
var itemdesc;


class AllItemComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] , cust: [] , manuf: [] , isModalOpen1: false ,title : "",arturl:"",price:"",arthash : "",percut:0 }
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        //this.com = this.com.bind(this);
    }
    
    
    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1
        });
    }
    createItem = async(tokenhash1,tokentitle1,tokenprice1,imgurl1,percut1) => {
         
    }
    creatingItems = async() => {
        var tokenhash = this.state.arthash.toString();
        var tokentitle = this.state.title;
        var tokenprice = this.state.price;
        var imgurl = this.state.arturl;
        var percut = this.state.percut;
        console.log(tokenhash,tokentitle,tokenprice,imgurl,percut);
        const res = await this.props.contract.methods.create(tokenhash,tokentitle,tokenprice,imgurl,percut).send({from: this.props.accounts,gas : 1000000});
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
                    response.push(rex);
                }
                alldocs = [];
                alldocs = response;
                console.log(response);
                this.setState({ dish : alldocs});

              
         
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
            <h2>All Items</h2>
           
            
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
                            
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="arthash" className="ml-3">Art Hash</Label>
                                    <Input type="text" id="arthash" name="arthash"
                                        onChange={this.handleInputChange}  />
                                </FormGroup>    
                            </div>
                        </div>
                        
                        <div className="row pl-5 pr-5">
                            <div className="col-6">
                                <FormGroup>
                                    <Label htmlFor="desc" className="ml-3">Art URL</Label>
                                    <Input type="text" id="arturl" name="arturl"
                                        onChange={this.handleInputChange}  />
                                </FormGroup>
                            </div>
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

export default AllItemComponent;