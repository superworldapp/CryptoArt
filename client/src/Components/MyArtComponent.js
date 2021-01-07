import React, { Component } from "react";
//import moment from 'moment';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { BrowserRouter, NavLink } from "react-router-dom";
import Web3 from "web3";
import { render } from "react-dom";
import axios from "axios";

import * as aws from "aws-sdk";
import * as dotenv from "aws-sdk";
import * as fs from "fs";
import * as util from "util";
import loader from "../images/loader.svg";
const SHA256 = require("crypto-js/sha256");

const S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");

const path = require("path");

const BUCKET_NAME = "superworldapp";

AWS.config.update({
  region: "us-east-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:f7692b7a-0050-4823-9df7-1ab52e23b6c9",
  }),
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
      sellPrice: 0,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.buyItem = this.buyItem.bind(this);
    this.putForSale = this.putForSale.bind(this);
    this.DeSale = this.DeSale.bind(this);
  }
  buyItem = async () => {
    const res = await this.props.contract.methods
      .buyToken(this.props.art.tokenIdentifier)
      .send({
        from: this.props.accounts,
        value: this.props.art.tokenSellPrice,
        gas: 1000000,
      });
    console.log(res);
  };
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  putForSale = async () => {
    const res = await this.props.contract.methods
      .putforsale(
        this.props.art.tokenIdentifier,
        (this.state.sellPrice * ETHER).toString()
      )
      .send({ from: this.props.accounts, gas: 1000000 });
    console.log(res);
  };
  DeSale = async () => {
    const res = await this.props.contract.methods
      .desale(this.props.art.tokenIdentifier)
      .send({ from: this.props.accounts, gas: 1000000 });
    console.log(res);
  };

  render() {
    let but = this.props.art.isSelling ? "visible" : "invisible";
    let bak = this.props.art.isSelling ? "bg-success text-white" : "";
    let pr =
      Web3.utils.fromWei(this.props.art.tokenSellPrice.toString(), "ether") == 0
        ? "invisible"
        : "visible";
    let reSellOrSell = this.props.art.isSelling ? "ReSell Item" : "Sell Item";
    return (
      <Card className={bak}>
        <a href={this.props.art.imgUrl} target="_blank">
          <CardImg
            top
            width="100%"
            src={this.props.art.imgUrl}
            alt="Card image"
          />
        </a>
        <CardBody>
          <CardTitle>Item Title : {this.props.art.tokenTitle}</CardTitle>
          <CardText>
            <small>Item Creator : {this.props.art.tokenCreator}</small>
          </CardText>
          <CardText className={pr}>
            <small>
              Item Sell Price :{" "}
              {Web3.utils.fromWei(
                this.props.art.tokenSellPrice.toString(),
                "ether"
              )}{" "}
              ETH
            </small>
          </CardText>
          <Col sm={{ size: 12 }}>
            <Button
              className="visible"
              size="sm"
              type="submit"
              color="primary"
              onClick={this.toggleModal}
            >
              {reSellOrSell}
            </Button>
            {"   "}
            <Button
              className={but}
              size="sm"
              type="submit"
              color="primary"
              onClick={this.DeSale}
            >
              DeSell Item
            </Button>
            <Button
              className="visible"
              size="sm"
              type="submit"
              color="primary"
              onClick={this.DeSale}
            >
              Start Auction
            </Button>
            <Modal
              isOpen={this.state.isModalOpen}
              toggle={this.toggleModal}
              className="modal-md"
            >
              <ModalHeader toggle={this.toggleModal} className="pl-5">
                Put For Sale
              </ModalHeader>
              <Card className="pb-5">
                <CardImg
                  top
                  width="100%"
                  src={this.props.art.imgUrl}
                  alt="Card image"
                />
                <p className="m-auto p-2">
                  Art Title: {this.props.art.tokenTitle}
                </p>

                <div className="row m-auto pt-2">
                  <p>Art Sell Price : </p>
                  <p>
                    {" "}
                    <Input
                      type="text"
                      id="sellPrice"
                      name="sellPrice"
                      onChange={this.handleInputChange}
                    ></Input>
                  </p>
                </div>
                <p className="m-auto p-2">
                  <Button type="submit" onClick={this.putForSale}>
                    Confirm
                  </Button>{" "}
                </p>
              </Card>
            </Modal>
          </Col>
        </CardBody>
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
      title: "",
      artUrl: "",
      price: "",
      artHash: "",
      nos: 0,
      isLoading: true,
    };
    this.toggleModal1 = this.toggleModal1.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.fileAwsHandler = this.fileAwsHandler.bind(this);
  }

  toggleModal1() {
    this.setState({
      isModalOpen1: !this.state.isModalOpen1,
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

    this.toggleModal1();
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
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
      selectedFile: event.target.files[0],
    });
  };
  fileUploadHandler = (event) => {
    this.fileAwsHandler(this.state.selectedFile, this.creatingItems);
  };

  fileAwsHandler = async (file, callback) => {
    console.log(file);
    let newfilename = `image_${Date.now()}${path
      .extname(file.name)
      .toLowerCase()}`;
    console.log(newfilename);
    let params = {
      ACL: "public-read",
      Bucket: BUCKET_NAME,
      Key: "marketplace/" + newfilename,
      ContentType: file.type,
      Body: file,
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log("error :", err);
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
        <div key={x} className="col-4 col-md-3">
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

    let ch = "visible";
    return (
      <div className="container">
        <h2>My Items</h2>
        <Button color="success" className={ch} onClick={this.toggleModal1}>
          Add Art
        </Button>
        <Modal
          isOpen={this.state.isModalOpen1}
          toggle={this.toggleModal1}
          className="modal-xl"
        >
          <ModalHeader toggle={this.toggleModal1}>
            <h3>Add Artwork</h3>
          </ModalHeader>
          <ModalBody>
            <Form>
              <div className="row pl-5 pr-5">
                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="title" className="ml-3">
                      Token Title
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </div>
                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="price" className="ml-3">
                      Item Price
                    </Label>
                    <Input
                      type="text"
                      id="price"
                      name="price"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="row pl-5 pr-5">
                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="nos" className="ml-3">
                      No. of Tokens
                    </Label>
                    <Input
                      type="number"
                      id="nos"
                      name="nos"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </div>
                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="artHash" className="ml-3">
                      Art
                    </Label>
                    <Input type="file" onChange={this.fileSelectHandler} />
                  </FormGroup>
                </div>
              </div>
              <br />
              <div className="row pl-5">
                <div className="col-6">
                  <Button color="primary" onClick={this.fileUploadHandler}>
                    Add
                  </Button>
                  {this.state.isLoading ? <img src={loader} /> : <div></div>}
                </div>
              </div>
              <br />
            </Form>
          </ModalBody>
        </Modal>
        <br />
        <br />
        <div className="row">{Menu}</div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default MyItemComponent;
