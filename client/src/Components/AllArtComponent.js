import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  CardSubtitle,
} from 'reactstrap';
import Web3 from 'web3';
import './AllArtComponent.css';
import anonUser from '../images/user.png';
import image3 from '../images/image 6.png';

let allDocs = [];
//let cre;
class AllArt extends Component {
  constructor(props) {
    super(props);
    this.state = { docCount: 0, art: [], isModalOpen: false, qty: 0 };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.buyItem = this.buyItem.bind(this);
  }
  componentDidMount = async () => {
    let cre = await this.props.contract?.getPastEvents('tokencreated', {
      filter: { tokenId: this.props.art.tokenIdentifier },
      fromBlock: 0,
    });
    //  // Using an array means OR: e.g. 20 or 23

    let tb = await this.props.contract?.getPastEvents('tokenbought', {
      filter: { tokenId: this.props.art.tokenIdentifier },
      fromBlock: 0,
    });
    let tfs = await this.props.contract?.getPastEvents('tokenputforsale', {
      filter: { tokenId: this.props.art.tokenIdentifier },
      fromBlock: 0,
    });
    console.log(this.props.art.tokenIdentifier, cre);
  };

  buyItem = async () => {
    const res = await this.props.contract.methods
      .buyToken(this.props.art.tokenIdentifier)
      .send({
        from: this.props.accounts,
        value: this.props.art.tokenSellPrice,
        gas: 10000000,
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

  render() {
    let but = this.props.art.isSelling ? 'visible' : 'invisible';
    let bux = this.props.art.isSelling ? 'invisible' : 'visible';
    let bak = this.props.art.isSelling ? 'bg-success text-white' : '';
    let buk = this.props.art.auction.isBidding ? 'bg-warning' : '';
    let pr =
      Web3.utils.fromWei(this.props.art.tokenSellPrice.toString(), 'ether') == 0
        ? 'invisible'
        : 'visible';
    return (
      <Card
        height='300px'
        width='245px'
        className={this.props.art.auction.isBidding ? buk : bak}
      >
        <CardImg
          className='card-img-top-all-art'
          top
          width='100%'
          src={this.props.art.imgurl}
        ></CardImg>
        <CardBody className='all-art-body'>
          <div style={{ display: 'flex' }}>
            <CardSubtitle>
              <img
                style={{ marginRight: '30px' }}
                width='16px'
                height='16px'
                className='rounded-circle'
                src={anonUser}
              ></img>
            </CardSubtitle>
            <CardSubtitle
              style={{
                fontFamily: 'Gibson',
                fontSize: '13px',
                color: '#888888',
              }}
            >
              {this.props.art.tokenCreator.substring(0, 5)}
            </CardSubtitle>
          </div>

          <div className='ctext'>
            <CardText
              style={{
                fontFamily: 'Gibson',
                fontSize: '13px',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              {this.props.art.tokenTitle}
            </CardText>
            <CardText
              className={but}
              style={{
                fontFamily: 'Gibson',
                fontSize: '13px',
                color: '#black',
              }}
            >
              {Web3.utils.fromWei(
                this.props.art.tokenSellPrice.toString(),
                'ether'
              )}{' '}
              ETH
            </CardText>
          </div>

          <Col sm={{ size: 12 }}>
            {but === 'visible' ? (
              <Button
                className={but}
                id='buy-bid-btn'
                size='sm'
                type='submit'
                color='primary'
                onClick={this.buyItem}
              >
                Purchase
              </Button>
            ) : (
              <Button
                className={bux}
                id='buy-bid-btn'
                size='md'
                type='submit'
                color='primary'
                style={{ width: '50%' }}
              >
                Bid
              </Button>
            )}
          </Col>
        </CardBody>
      </Card>
      /* <Link
          style={{
            color: '#212529',
            textDecoration: 'none',
          }}
          to={`/card/${this.props.art.tokenIdentifier}`}
        >
          <CardImg
            top
            width='100%'
            src={this.props.art.imgurl}
            alt='Card image'
          />
        </Link>
        <CardBody>
          <Link
            style={{
              color: '#212529',
              textDecoration: 'none',
            }}
            to={`/card/${this.props.art.tokenIdentifier}`}
          >
            <CardTitle>Item Title : {this.props.art.tokenTitle}</CardTitle>
            <CardText>
              <small>Item Creator : {this.props.art.tokenCreator}</small>
            </CardText>
            <CardText>
              <small>Item Owner : {this.props.art.tokenOwner}</small>
            </CardText>
            <CardText className={but}>
              <small>
                Item Sell Price :{' '}
                {Web3.utils.fromWei(
                  this.props.art.tokenSellPrice.toString(),
                  'ether'
                )}{' '}
                ETH
              </small>
            </CardText>
          </Link>
          <Col sm={{ size: 12 }}>
            <Button
              className={but}
              size='sm'
              type='submit'
              color='primary'
              onClick={this.buyItem}
            >
              Buy Item
            </Button>
            {'   '}
            <Button
              className={bux}
              size='md'
              type='submit'
              color='primary'
              style={{ width: '50%' }}
            >
              Bid
            </Button>
          </Col>
        </CardBody>
      </Card> */
    );
  }
}

class AllItemComponent extends Component {
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
      perCut: 0,
    };
    this.toggleModal1 = this.toggleModal1.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.com = this.com.bind(this);
  }

  toggleModal1() {
    this.setState({
      isModalOpen1: !this.state.isModalOpen1,
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

  async componentDidMount() {
    let res = await this.props.contract?.methods.tokenCount().call();
    console.log(res);

    let response = [];
    for (let i = 1; i <= res; i++) {
      let rex = await this.props.contract?.methods.Arts(i).call();
      response.push(rex);
    }
    allDocs = [];
    allDocs = response;
    console.log(response);
    this.setState({ art: allDocs });
  }

  render() {
    const menu = this.state.art.map((x) => {
      return (
        <div key={x.tokenIdentifier} className='col-4 col-md-3'>
          <AllArt
            art={x}
            contract={this.props.contract}
            accounts={this.props.accounts}
          />
          <br />
          <br />
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='button-container'>
          <button className='bbtn'>All</button>
          <button className='bbtn'>New</button>
          <button className='bbtn'>On Auction</button>
          <button className='bbtn'>Has Offer</button>
          <button className='bbtn'>Has Sold</button>
        </div>
        <Modal
          isOpen={this.state.isModalOpen1}
          toggle={this.toggleModal1}
          className='modal-xl'
        >
          <ModalHeader toggle={this.toggleModal1}>
            <h3>Add Artwork</h3>
          </ModalHeader>
          <ModalBody>
            <Form>
              <div className='row pl-5 pr-5'>
                <div className='col-6'>
                  <FormGroup>
                    <Label htmlFor='title' className='ml-3'>
                      Token Title
                    </Label>
                    <Input
                      type='text'
                      id='title'
                      name='title'
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </div>
                <div className='col-6'>
                  <FormGroup>
                    <Label htmlFor='price' className='ml-3'>
                      Item Price
                    </Label>
                    <Input
                      type='text'
                      id='price'
                      name='price'
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className='row pl-5 pr-5'>
                <div className='col-12'>
                  <FormGroup>
                    <Label htmlFor='artHash' className='ml-3'>
                      Art Hash
                    </Label>
                    <Input
                      type='text'
                      id='artHash'
                      name='artHash'
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className='row pl-5 pr-5'>
                <div className='col-6'>
                  <FormGroup>
                    <Label htmlFor='desc' className='ml-3'>
                      Art URL
                    </Label>
                    <Input
                      type='text'
                      id='artUrl'
                      name='artUrl'
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </div>
                <div className='col-6'>
                  <FormGroup>
                    <Label htmlFor='perCut' className='ml-3'>
                      Percentage Cut
                    </Label>
                    <Input
                      type='number'
                      id='perCut'
                      name='perCut'
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </div>
              </div>
              <br />
              <div className='row pl-5'>
                <div className='col-6'>
                  <Button color='primary' onClick={this.creatingItems}>
                    Add
                  </Button>
                </div>
              </div>
              <br />
            </Form>
          </ModalBody>
        </Modal>
        <br />
        <br />
        <div className='row'>{menu}</div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default AllItemComponent;
