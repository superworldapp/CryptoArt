/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect, useState, useContext } from 'react';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import {
  StaticMap,
  FlyToInterpolator,
  _MapContext as MapContext,
} from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import axios from 'axios';
import { GeoJsonLayer } from '@deck.gl/layers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import getWeb3 from '../getWeb3';
import Web3 from 'web3';
import iconAtlas from './data/location-icon-atlas.png';
import iconMapping from './data/location-icon-mapping.json';
import IconClusterLayer from './IconClusterLayer';
import Header from '../../HeaderComponent';
import { makeStyles } from '@material-ui/core';
// import { LocationContext } from '../../../context/location-context';
import './Map.css';
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  // Modal,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
// import { TokenContext } from '../../../state/Token/context';
import { LayoutContext } from '../../../state/Layout/context';
// import { NormalizeEvent } from '../../../utils';
// import Fab from '@material-ui/core/Fab';
import GeoLocateIconBlack from '../../../assets/svg/location-black.svg';
import { NavigationControl, Popup } from 'react-map-gl';
import { Marker } from 'react-map-gl';
import { Button } from '@material-ui/core';
import Auth from '../../Auth';
import likedProperty from '../../../assets/svg/heartfull.svg';
import notLikedProperty from '../../../assets/svg/heartoutline.svg';
import { Alert } from '@material-ui/lab';
// const SuperWorldTokenvv2 = require('../../../contracts/SuperWorldTokenv2.min.json');
import SuperWorldToken from '../../../contracts/SuperWorldToken.min.json';
import SuperCoin from '../../../contracts/SuperWorldCoin.min.json';
// import Axios from 'axios';
// import { cosh } from 'core-js/fn/number';

// let
const MAP_VIEW = new MapView({ repeat: true });
const ETHER = 1000000000000000000;
const MAPBOX_KEY = process.env.REACT_APP_MAPBOX_GL_KEY;
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

const useStylesLegend = makeStyles({
  root: {
    width: '113px',
    height: '103px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    width: '90px',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '4px 0',
  },
});

// const GEOAPI_KEY = process.env.GEO_API_KEY;
// interface IProperty {
//     owner: any;
//     price: any;
//     coordinates: number[];
//     selling?: any;
// }

// interface IProperty {
//     owner: any;
//     price: any;
//     coordinates: number[];
//     selling?: any;
// }

// interface popupData {
//     placename?: string | null;
//     tokenId?: string | null;
//     tokenOwner?: string | null;
//     isOwned?: boolean | null;
//     isSelling?: boolean | null;
//     landprice?: number | null;
// }

const res = 1;
export const ResContext = React.createContext(res);
// const eventBlock = -1;
const MapGL = () => {
  // const [bch_properties, setProperties] = useState<IProperty[]>(properties);

  //The block, from which we will trace and list events

  const [viewport, setViewport] = useState({
    longitude: -73.97,
    latitude: 40.78,
    zoom: 10,
    maxZoom: 20,
    pitch: 0,
    bearing: 0,
  });

  // const [clickedLike, setClickedLike] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState([]);
  const [cluster, setCluster] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [myProperties, setMyProperties] = useState<any[]>([]);
  // @eslint-disable
  const [mySellingProperties] = useState<any[]>([]);
  const [allProperties, setallProperties] = useState<any[]>([]);
  // const [allObjects, setallObjects] = useState<any>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [contract, setContract] = useState<any>(null);
  const [newTestCoin, setNewTestCoin] = useState<any>(null);
  // const [networkId, setNetworkId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingWishlistButton, setLoadingWishlistButton] = useState<boolean>(
    false
  );
  const [sellingStarted, setSellingStarted] = useState<boolean>(false);
  const [listingPrice, setListingPrice] = useState<string>('1.0');
  const [pointX, setPointX] = useState<any>(0);
  const legendClasses = useStylesLegend();
  const [pointY, setPointY] = useState<any>(0);
  const [popupData, setPopupData] = useState<any>();
  const [marker, setMarker] = useState<any>(null);
  const [newData, setNewData] = useState<any>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>();
  const [loggedIn, setLoggedIn] = useState<boolean>(Auth.getAuth());
  const [accounts, setAccounts] = useState<any>(null);
  // const [coinbase, setCoinbase] = useState<any>(null);
  // const [superWorldTokenSocketInstance, setSuperWorldTokenSocketInstance] = useState<any>(null);
  const [web3, setWeb3] = useState<any>(null);
  const { state, dispatch } = useContext(LayoutContext);
  const [layers, setLayers] = useState<any>(null);
  // const [likedPropertyButton, setLikedPropertyButton] = useState<boolean>(false);
  // const [wishlistButton, setWishlistButton] = useState<any>(null);

  // const [clusterLayer, setClusterLayer] = useState<any>(null);
  // const [geoJSONLayers, setGeoJSONLayers] = useState<any>(null);
  // const [contractVersion, setContractVersion] = useState<number>(1);
  enum MapStyle {
    'mapbox://styles/mapbox/satellite-v9',
    'mapbox://styles/mapbox/streets-v11',
  }

  enum PopupStyle {
    'open-popup-owned',
    'open-popup-notAvailable',
    'open-popup-forSale',
  }

  const { account, chainId } = useWeb3React<Web3Provider>();
  // console.log('account:', account); //! 'account' is of type string
  const startBlock = chainId === 3 ? 3530378 : 5877613;
  //Loads token(if needed)
  // const { tokenInstance } = useContext(TokenContext);

  //Connects to Ethereum web3
  //to create web3 provider and websocketprovider
  const initContracts = async () => {
    // if(Auth.getAuth()) {
    //if(1){
    // console.log('INIT CONTRACTS');
    try {
      const web3 = await getWeb3();
      setWeb3(web3);
      const networkId = await web3.eth.net.getId();
      web3.eth.getAccounts((error: any, accounts: any) =>
        setAccounts(accounts[0])
      );

      let inf = `wss://mainnet.infura.io/ws/v3/${INFURA_KEY}`;
      if (localStorage.getItem('walletType') == 'fortmatic') {
        inf = 'wss://ws-mainnet.matic.network';
      } else if (networkId == 3) {
        inf = `wss://ropsten.infura.io/ws/v3/${INFURA_KEY}`;
      } else if (networkId == 4) {
        inf = `wss://rinkeby.infura.io/ws/v3/${INFURA_KEY}`;
      }
      new Web3(new Web3.providers.WebsocketProvider(inf));
      // const web3Socket = new Web3(
      //     new Web3.providers.WebsocketProvider(`wss://ropsten.infura.io/ws/v3/${INFURA_KEY}`),
      // );
      // console.log(networkId);
      // setNetworkId(networkId);
      const newSuperWorld = new web3.eth.Contract(
        SuperWorldToken.abi,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        SuperWorldToken.networks[networkId] &&
          SuperWorldToken.networks[networkId].address
      );
      const newSuperWorldcoin = new web3.eth.Contract(
        SuperCoin.abi,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        SuperCoin.networks[networkId] && SuperCoin.networks[networkId].address
      );
      // }
      setContract(newSuperWorld);
      setNewTestCoin(newSuperWorldcoin);
      // App.superWorldTokenInstance = new web3.eth.Contract(artifactSuperWorldToken.abi, deployedAddressSuperWorldToken);

      // const SuperWorldCoin = new web3.eth.Contract(
      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     // @ts-ignore
      //     SuperCoin.abi,
      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     // @ts-ignore
      //     SuperCoin.networks[networkId] && SuperCoin.networks[networkId].address,
      // );
      // setNewTestCoin(SuperWorldCoin);

      const userAccounts = await web3.eth.getAccounts();
      const coinbase = userAccounts[0];

      // const superWorldTokenSocketInstance = new web3Socket.eth.Contract(
      //     newSuperWorld.options.jsonInterface,
      //     newSuperWorld._address,
      // );
      // axios.get('http://geo.superworldapp.com/api/json/buytokenevents/get').then((e) => {
      //     allObjects.push(e.data.data);
      // });
      // console.log('allObjects', allObjects);
      // setSuperWorldTokenSocketInstance(superWorldTokenSocketInstance);
      // setCoinbase(coinbase);
      getAllProps(newSuperWorld);
      getMyProps(newSuperWorld, coinbase);
      getSellPlots(newSuperWorld);
    } catch (error) {
      console.log(error);
    }
    //  }
    // window.location.reload();
  };

  useEffect(() => {
    // console.log('Wallet connected');
    // window.location.reload();
    // console.log(account);
    if (accounts) initContracts();
  }, [accounts]);

  useEffect(() => {
    console.log('mapGL -- initContracts -- accounts', accounts);
  }, [accounts]);

  useEffect(() => {
    // console.log('SIGNED UP');
    setLoggedIn(Auth.getAuth());
    if (Auth.getAuth()) {
      initContracts();
      // console.log('SIGNED UP');
      // console.log("TESTSTSTS");
      axios.defaults.headers = {
        Authorization: Auth.getToken(),
      };
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/get`)
        .then((res) => {
          // console.log(res);
          setCurrentUser(res.data);
          // initContracts();
        })
        .catch((e) => {
          console.log(e);
        });
    }
    // const user = Auth.getUser();
    // setCurrentUser(user);
    // console.log(wishlist);
  }, [document.cookie]);

  useEffect(() => {
    // initContracts();
    try {
      // console.log('GETTING WISHLIST');
      // if (currentUser) {
      axios.defaults.headers = {
        Authorization: Auth.getToken(),
      };
      axios
        .get(`${process.env.REACT_APP_API_URL}/wishlist/get`)
        .then((res) => {
          // console.log(res.data.length);
          setWishlist(res.data);
          // console.log(wishlist);
        })
        .catch((e) => {
          console.log('not logged in');
        });
      // }
    } catch (error) {
      console.log(error);
    }
  }, [loggedIn]);
  const getAllProps = async (newSuperWorld: any) => {
    // if (contractVersion === 1) {
    const req = await newSuperWorld.getPastEvents('EventBuyToken', {
      fromBlock: startBlock,
    });
    // console.log('Getpastevents EventBuyToken ', req);
    // let coords: any[] = [];
    const allProps: any[] = [];
    req.forEach(async (ele: any) => {
      const lat = parseFloat(ele.returnValues.lat);
      const lon = parseFloat(ele.returnValues.lon);
      const ownerofLand = ele.returnValues.seller;

      allProps.push({
        name: lat + ',' + lon,
        latitude: lat,
        longitude: lon,
        owner: ownerofLand,
        selling: false,
      });
      //coords.push({ lon: lon, lat: lat });
    });
    // console.log('allProps', allProps);

    // console.log('Myproperty: ', allProps);

    setallProperties(allProps);
  };
  const getMyProps = async (newSuperWorld: any, coinbase: any) => {
    // if (contractVersion === 1) {
    const req = await newSuperWorld.getPastEvents('EventBuyToken', {
      filter: { buyer: coinbase },
      fromBlock: startBlock,
    });
    // console.log('Getpastevents EventBuyToken ', req);
    // let coords: any[] = [];
    const myProps: any[] = [];
    req.forEach(async (ele: any) => {
      // console.log(ele);
      const lat = parseFloat(ele.returnValues.lat);
      const lon = parseFloat(ele.returnValues.lon);
      if (
        ele.returnValues.seller !== '0x0000000000000000000000000000000000000000'
      ) {
        // console.log(ele);
        myProps.push({
          name: lat + ',' + lon,
          latitude: lat,
          longitude: lon,
          owner: accounts,
          selling: true,
        });
      } else {
        myProps.push({
          name: lat + ',' + lon,
          latitude: lat,
          longitude: lon,
          owner: accounts,
          selling: false,
        });
      }
      //coords.push({ lon: lon, lat: lat });
    });
    console.log('myProps', myProps);
    myProps.forEach((plot: any) => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${plot.longitude},${plot.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_GL_KEY}&language=en`
        )
        .then((e) => {
          //myProperties.push({ text: e.data.features[0]?.text, coordinates: e.data.query });
          plot.name = e.data.features[0]?.text;
        });
    });
    setMyProperties(myProps);
    // res = await superWorldTokenSocketInstance.events.EventBuyToken(
    //     {
    //         filter: { buyer: coinbase },
    //         fromBlock: 'latest',
    //     },
    //     function (_error: any, event: any) {
    //         console.log(event);
    //         try {
    //             const lat = parseFloat(event.returnValues.lat);
    //             const lon = parseFloat(event.returnValues.lon);
    //             axios
    //                 .get(
    //                     `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_GL_KEY}`,
    //                 )
    //                 .then((e) => {
    //                     myProperties.push({ text: e.data.features[0]?.text, coordinates: e.data.query });
    //                 });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     },
    // );
    // console.log('Myproperty: ', myProperties);
    // console.log('receipt', res);
  };
  const getSellPlots = async (newSuperWorld: any) => {
    const eventListtoken = await newSuperWorld.getPastEvents('EventListToken', {
      fromBlock: startBlock,
    });
    // console.log('Getpastevents EventListToken ', eventListtoken);
    // let coords: any[] = [];
    const mySellProps: any[] = [];
    eventListtoken.forEach(async (ele: any) => {
      const lat = parseFloat(ele.returnValues.lat);
      const lon = parseFloat(ele.returnValues.lon);
      const ownerofLand = ele.returnValues.seller;
      let flag = false;

      mySellProps.forEach((item: any) => {
        if (item.latitude === lat && item.longitude === lon) {
          item.selling = ele.returnValues.isListed;
          flag = true;
        }
      });
      if (flag === false) {
        mySellProps.push({
          name: lat + ',' + lon,
          latitude: lat,
          longitude: lon,
          owner: ownerofLand,
          selling: ele.returnValues.isListed,
        });
      }

      // } else {
      //     mySellProps.map((item: any) => {
      //         if (item.latitude === lat && item.longitude === lon) {
      //             item.selling = ele.returnValues.isListed;
      //         }
      //     });
      // }
    });
    // setMySellingProperties([]);
    // console.log('myProps', mySellProps);
    mySellProps.forEach((plot: any) => {
      if (plot.selling) {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${plot.longitude},${plot.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_GL_KEY}&language=en`
          )
          .then((e) => {
            //plot.name=e.data.features[0]?.text;
            mySellingProperties.push({
              name: e.data.features[0]?.text,
              latitude: plot.latitude,
              longitude: plot.longitude,
              owner: plot.owner,
              selling: plot.selling,
            });
          });
      }
    });

    // console.log('MySellproperty: ', mySellingProperties);
  };

  // const getNewSellEvents = (superWorldTokenSocketInstance: any) => {
  //     superWorldTokenSocketInstance.events.EventListToken(
  //         {
  //             fromBlock: 'latest',
  //         },
  //         function (_error: any, event: any) {
  //             try {
  //                 console.log('webSocketeventBuyToken ', event);

  //                 console.log('webSocketeventBuyToken ', event);
  //                 const lat = parseFloat(event.returnValues.lat);
  //                 const lon = parseFloat(event.returnValues.lon);

  //                 axios
  //                     .get(
  //                         `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_GL_KEY}`,
  //                     )
  //                     .then((e) => {
  //                         if (event.returnValues.isListed) {
  //                             mySellingProperties.push({ text: e.data.features[0]?.text, coordinates: e.data.query });
  //                         } else {
  //                             setMySellingProperties(
  //                                 mySellingProperties.filter(
  //                                     (item) => item.coordinates[0] != lon || item.coordinates[1] != lat,
  //                                 ),
  //                             );
  //                         }
  //                     });
  //             } catch (error) {
  //                 console.log(error);
  //             }
  //         },
  //     );
  // };

  useEffect(() => {
    // console.log('RE RENDER');
    renderLayers();
  }, [
    JSON.stringify(allProperties),
    JSON.stringify(myProperties),
    JSON.stringify(mySellingProperties),
    cluster,
  ]);

  const [currentMapStyle, setCurrentMapStyle] = useState(MapStyle[0]);

  function toggleMapStyle() {
    if (currentMapStyle === MapStyle[0]) setCurrentMapStyle(MapStyle[1]);
    else if (currentMapStyle === MapStyle[1]) setCurrentMapStyle(MapStyle[0]);
  }

  async function addToWishlist(lat: number, lon: number) {
    // add it to the current object
    // POST to the API
    const wishlistItem = {
      name: '',
      coordinates: [lat, lon],
    };
    // console.log(lat, lon);
    setNotificationMessage(
      <Alert
        style={{ width: '100%' }}
        severity='info'
        variant='filled'
        onClose={handleCloseSnackbar}
      >
        Adding to wishlist...
      </Alert>
    );
    setOpenSnackbar(true);
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lon}.json?access_token=${process.env.REACT_APP_MAPBOX_GL_KEY}`
      )
      .then((e) => {
        wishlistItem.name = e.data.features[0]?.text;
        axios.defaults.headers = {
          Authorization: Auth.getToken(),
        };
        axios
          .post(`${process.env.REACT_APP_API_URL}/wishlist/add`, wishlistItem)
          .then(() => {
            setNotificationMessage(
              <Alert
                style={{ width: '100%' }}
                severity='success'
                variant='filled'
                onClose={handleCloseSnackbar}
              >
                Property added to wishlist
              </Alert>
            );
            setOpenSnackbar(true);
            wishlist.push(wishlistItem);
            setWishlist([...wishlist]);
            setPopupData(popupData);
          })
          .catch(() => {
            setNotificationMessage(
              <Alert
                style={{ width: '100%' }}
                severity='error'
                variant='filled'
                onClose={handleCloseSnackbar}
              >
                Could not add property to wishlist
              </Alert>
            );
            setOpenSnackbar(true);
          });
      });
    setLoadingWishlistButton(false);
  }

  async function removeFromWishlist(lat: number, lon: number) {
    const wishlistItem = {
      coordinates: [lat, lon],
    };
    // console.log(lat, lon);
    axios.defaults.headers = {
      Authorization: Auth.getToken(),
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/wishlist/delete`, wishlistItem)
      .then((e) => {
        setNotificationMessage(
          <Alert
            style={{ width: '100%' }}
            severity='success'
            variant='filled'
            onClose={handleCloseSnackbar}
          >
            Property removed from wishlist
          </Alert>
        );
        setOpenSnackbar(true);
        setWishlist(e.data);
        setPopupData(popupData);
      })
      .catch(() => {
        setNotificationMessage(
          <Alert
            style={{ width: '100%' }}
            severity='error'
            variant='filled'
            onClose={handleCloseSnackbar}
          >
            Could not removed property to wishlist
          </Alert>
        );
        setOpenSnackbar(true);
      });
    setLoadingWishlistButton(false);

    // });
  }

  function closePopup() {
    setNewData(null);
    setOpenPopup(!openPopup);
    setPopupData(undefined);
  }

  function roundDown(point: number) {
    return Math.floor(point * 1000) / 1000;
  }

  function onClick({ coordinate }: { coordinate: any[] }): void {
    const pointXtemp = roundDown(coordinate[0]);
    const pointYtemp = roundDown(coordinate[1] + 0.001);
    setPointX(pointXtemp);
    setPointY(pointYtemp);
    const DELTA = 0.0009;
    if (!accounts || !Auth.getAuth()) {
      dispatch({
        type: 'TOGGLE_SIGN_IN_MODAL',
        payload: !state.signInModalIsOpen,
      });
      return;
    }
    if (openPopup) closePopup();
    else {
      getInfoLand(pointXtemp, pointYtemp)
        .then((e) => {
          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${pointXtemp},${pointYtemp}.json?access_token=${process.env.REACT_APP_MAPBOX_GL_KEY}&language=en`
            )
            .then((res) => {
              const data = {
                ...e,
                placeName: res.data.features[0]?.text,
                latitude: pointYtemp,
                longitude: pointXtemp,
              };
              // console.log(data);
              setPopupData(data);
            });
          // console.log('event', e);
        })
        .catch((error) => {
          console.log(error);
        });
      setOpenPopup(!openPopup);
      setNewData([
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [pointXtemp, pointYtemp],
                [pointXtemp + DELTA, pointYtemp],
                [pointXtemp + DELTA, pointYtemp - DELTA],
                [pointXtemp, pointYtemp - DELTA],
              ],
            ],
          },
        },
      ]);
    }
  }

  // Gets the unique props between two arrays of properties
  // function getUniqueProps(value: any, index: any, self: any) {
  //     return self.indexOf(value) === index;
  //     // const uniqueProps = combinedArrays.filter()
  // }

  async function etherToWei(y: string) {
    const inwei = await web3.utils.toWei(y, 'ether');
    return inwei;
  }

  // async function weiToEther(y: string) {
  //     const inwei = await web3.utils.fromWei(y, 'ether');
  //     return inwei;
  // }
  // ethertowei(1);

  function setupLayers(type: number) {
    const DELTA = 0.0009;
    let props: any[] = [];
    // console.log(properties);
    // bch_properties = bch_properties.concat(properties);
    let fillColour;
    function comparer(otherArray: any[]) {
      return function (current: any) {
        return (
          otherArray.filter(function (other: any) {
            return (
              other.latitude == current.latitude &&
              other.longitude == current.longitude
            );
          }).length == 0
        );
      };
    }
    // My properties that are not for sale
    if (type === 0) {
      // console.log(properties);
      props = myProperties.filter(comparer(mySellingProperties));
      fillColour = [118, 167, 255, 175]; //blue
    }
    // Properties that are owned but are not available
    else if (type === 1) {
      props = allProperties
        .filter(comparer(mySellingProperties))
        .filter(comparer(myProperties));
      fillColour = [175, 175, 175, 145]; //grey
      // Properties that are owned but are for sale
    } else if (type === 3) {
      props = mySellingProperties.filter(comparer(myProperties));
      fillColour = [0, 255, 0, 75]; //green
      // console.log(allProperties);
    }
    //MY  Properties that are for sale
    else if (type === 4) {
      props = mySellingProperties
        .filter(comparer(myProperties.filter(comparer(mySellingProperties))))
        .filter(comparer(mySellingProperties.filter(comparer(myProperties))));
      fillColour = [245, 169, 226, 175]; // Pink
      console.log(props);
    }

    const newFeatures: any[] = [] as any[];
    props.forEach((e: any) => {
      newFeatures.push({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [e.longitude, e.latitude],
              [e.longitude + DELTA, e.latitude],
              [e.longitude + DELTA, e.latitude - DELTA],
              [e.longitude, e.latitude - DELTA],
            ],
          ],
        },
      });
    });
    const data = { type: 'FeatureCollection', features: newFeatures ?? [] };
    if (type === 1) {
      const rand = Math.random().toString(16).substr(2, 8); // 6de5ccda
      return new GeoJsonLayer({
        id: rand,
        data: data,
        pickable: true,
        stroked: false,
        //getLineColor: [240,135,120],
        filled: true,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 90],
        getFillColor: fillColour,
        getRadius: 100,
        onClick: (event: any) => {
          // console.log(event.coordinate);
          onClick({ coordinate: event.coordinate });
        },
      });
    } else {
      const rand = Math.random().toString(16).substr(2, 8); // 6de5ccda
      return new GeoJsonLayer({
        id: rand,
        data: data,
        pickable: true,
        stroked: false,
        filled: true,
        autoHighlight: true,
        highlightColor: [0, 0, 0, 50],
        getFillColor: fillColour,
        getRadius: 100,
        onClick: (event: any) => {
          // console.log(event.coordinate);
          onClick({ coordinate: event.coordinate });
        },
      });
    }
  }

  //  if(contractVersion === 1) {
  const buyProperty = async (lat: number, lon: number, price: number) => {
    // <Alert severity="error">This is an error message!</Alert>
    // <Alert severity="success">This is a success message!</Alert>
    // console.log(user);
    // console.log(currentUser);
    try {
      setLoading(true);
      // console.log(lon, lat);
      setNotificationMessage(
        <Alert
          style={{ width: '100%' }}
          severity='info'
          variant='filled'
          onClose={handleCloseSnackbar}
        >
          You can raise your gas fees to speed up the process
        </Alert>
      );
      // console.log(price);
      setOpenSnackbar(true);
      let res;
      const coinbal = await newTestCoin.methods.balanceOf(accounts).call();
      const coinbaleth = await web3.utils.fromWei(coinbal, 'ether');
      if (coinbaleth >= price) {
        res = await newTestCoin.methods
          .approveAndCall(
            contract._address,
            (price * ETHER).toString(),
            web3.utils.fromAscii(lon.toString() + ',' + lat.toString(), 32)
          )
          .send({ from: accounts, gas: 500000 });
      } else {
        res = await contract.methods
          .buyToken(`${lon}`, `${lat}`)
          .send({ from: accounts, value: price * ETHER, gas: 500000 });
      }
      setNotificationMessage(
        <Alert
          style={{ width: '100%' }}
          severity='success'
          variant='filled'
          onClose={handleCloseSnackbar}
        >
          Congratulations! Your transaction was processed succesfully
        </Alert>
      );
      setOpenSnackbar(true);
      // console.log(res);
      // Notify the user VIA email
      axios.post(`${process.env.REACT_APP_API_URL}/user/sendBuyConfirmation`, {
        email: currentUser.email,
        placeName: popupData.placeName,
        etherscan: `https://etherscan.io/tx/${res.transactionHash}`,
      });
      // getMyProps(contract, coinbase, superWorldTokenSocketInstance);
      const newProp = {
        name: popupData.placeName,
        longitude: popupData.longitude,
        latitude: popupData.latitude,
        owner: accounts,
        selling: false,
      };
      myProperties.push(newProp);
      const newPopupData = {
        ...popupData,
        isOwned: true,
        tokenOwner: accounts,
        isSelling: false,
      };
      setPopupData(newPopupData);
    } catch (error) {
      setNotificationMessage(
        <Alert
          style={{ width: '100%' }}
          severity='error'
          variant='filled'
          onClose={handleCloseSnackbar}
        >
          Your transaction was not processed: {error.message}
        </Alert>
      );
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  //buyProperty(71.254,48.15);//call

  const sellProperty = async (lat: number, lon: number, sellPrice: string) => {
    // const res = await newTest.methods.sellTokens
    // const listPriceTest = BigInt(sellPrice*ETHER);
    try {
      setLoading(true);
      setNotificationMessage(
        <Alert
          style={{ width: '100%' }}
          severity='info'
          variant='filled'
          onClose={handleCloseSnackbar}
        >
          You can raise your gas fees to speed up the process
        </Alert>
      );
      setOpenSnackbar(true);
      // console.log(sellPrice);
      const price = await etherToWei(sellPrice);
      const res = await contract.methods
        .listToken(`${lon}`, `${lat}`, price)
        .send({ from: accounts, gas: 500000 });
      // console.log(response);
      setNotificationMessage(
        <Alert
          style={{ width: '100%' }}
          severity='success'
          variant='filled'
          onClose={handleCloseSnackbar}
        >
          Congratulations! Your plot is available for sale
        </Alert>
      );
      // Notify the user VIA email
      setOpenSnackbar(true);
      axios.post(
        `${process.env.REACT_APP_API_URL}/user/sendListingConfirmation`,
        {
          email: currentUser.email,
          placeName: popupData.placeName,
          etherscan: `https://etherscan.io/tx/${res.transactionHash}`,
        }
      );
      // getMyProps(contract, coinbase, superWorldTokenSocketInstance);
      // const newProp = {
      //     name: popupData.placename,
      //     latitude:
      // }
      // getSellPlots(contract, coinbase, superWorldTokenSocketInstance);
      const newPopupData = {
        ...popupData,
        isOwned: true,
        // tokenOwner: accounts,
        isSelling: true,
      };
      // console.log(newPopupData);
      // mySellingProperties.push()
      const newProp = {
        name: popupData.placeName,
        longitude: popupData.longitude,
        latitude: popupData.latitude,
        owner: accounts,
        selling: true,
      };
      mySellingProperties.push(newProp);
      setPopupData(newPopupData);
    } catch (error) {
      // console.log(error)
      setNotificationMessage(
        <Alert
          style={{ width: '100%' }}
          severity='error'
          variant='filled'
          onClose={handleCloseSnackbar}
        >
          Your transaction was not processed: {error.message}
        </Alert>
      );
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  //sellProperty(71.254,48.15,100000000000); //call
  const removeSellProperty = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setNotificationMessage(
        <Alert
          style={{ width: '100%' }}
          severity='info'
          variant='filled'
          onClose={handleCloseSnackbar}
        >
          Processing transaction...
        </Alert>
      );
      setOpenSnackbar(true);
      await contract.methods
        .delistToken(`${lon}`, `${lat}`)
        .send({ from: accounts, gas: 500000 });
      // console.log(response);
      setLoading(false);
      setNotificationMessage(
        <Alert
          style={{ width: '100%' }}
          severity='success'
          variant='filled'
          onClose={handleCloseSnackbar}
        >
          Your transaction was processed succesfully
        </Alert>
      );
      setOpenSnackbar(true);
      // getSellPlots(contract, coinbase, superWorldTokenSocketInstance);
      const newProp = {
        name: popupData.placeName,
        longitude: popupData.longitude,
        latitude: popupData.latitude,
        owner: accounts,
        selling: false,
      };

      const oldProp = {
        ...newProp,
        selling: true,
      };

      const removeProp = mySellingProperties.findIndex((e) => e === oldProp);
      mySellingProperties.splice(removeProp, 1);

      const removePropOwned = myProperties.findIndex((e) => e === oldProp);
      myProperties.splice(removePropOwned, 1);
      myProperties.push(newProp);
      const newPopupData = {
        ...popupData,
        isOwned: true,
        tokenOwner: accounts,
        isSelling: false,
      };
      setPopupData(newPopupData);
      // mySellingProperties.push(newProp);
    } catch (error) {
      setNotificationMessage(
        <Alert
          style={{ width: '100%' }}
          severity='error'
          variant='filled'
          onClose={handleCloseSnackbar}
        >
          Your transaction was not processed: {error.message}
        </Alert>
      );
      setOpenSnackbar(true);
    }
  };
  //removeSellProperty(71.254,48.15); //call

  const getInfoLand = async (lat: number, lon: number) => {
    if (!contract) {
      // console.log('Not connected');
    }
    const response = await contract.methods.getInfo(`${lat}`, `${lon}`).call();
    const tokenId = response[0];
    const tokenOwner = response[1];
    const isOwned = response[2];
    const isSelling = response[3];
    const landprice = response[4];
    return { tokenId, tokenOwner, isOwned, isSelling, landprice };
  };

  const clusterLayer =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new IconClusterLayer({
      data: allProperties,
      // pickable: true,
      getPosition: (e: any) => [e.longitude, e.latitude],
      iconAtlas,
      iconMapping,
      // onHover: onHover,
      id: 'icon-cluster',
      sizeScale: 60,
    });

  const DELTA = 0.0009;
  function renderLayers() {
    const myPropsProps = setupLayers(0);
    const unavailableProps = setupLayers(1);
    const forSaleProps = setupLayers(3);
    const myListedProps = setupLayers(4);
    // console.log(sellingLayer)
    const layer = [myListedProps, myPropsProps, unavailableProps, forSaleProps];
    // return [layer, clickedLayer];
    setLayers([layer]);
  }

  const getClickedLayer = () => {
    let clickedLayer = null;
    if (newData) {
      const testData = { type: 'FeatureCollection', features: newData };
      clickedLayer = new GeoJsonLayer({
        id: 'clicked-geojson-layer',
        data: testData,
        pickable: true,
        stroked: false,
        filled: true,
        autoHighlight: true,
        highlightColor: [140, 80, 236],
        getFillColor: [140, 80, 236, 80], //purple
        getRadius: 100,
        onClick: () => {
          // console.log(event);
          return true;
        },
      });
    }
    return clickedLayer;
  };

  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

  const goToLocation = (
    coords: { latitude: number; longitude: number },
    _type = 1
  ): void => {
    const SIZE = 40;
    // console.log(coords);
    // console.log(coords);
    let col = '';
    if (accounts) {
      col = '#f08778';
    } else {
      col = '#5540c7';
    }
    if (_type === 1) {
      setMarker(
        <Marker
          captureClick={false}
          longitude={coords.longitude + DELTA / 2}
          latitude={coords.latitude - DELTA / 2}
        >
          <svg
            height={SIZE}
            viewBox='0 0 24 24'
            style={{
              cursor: 'pointer',
              fill: col,
              stroke: 'none',
              transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
            }}
            // onClick={() => onClick(city)}
          >
            <path d={ICON} />
          </svg>
        </Marker>
      );
    } else {
      setMarker(
        <Marker
          captureClick={false}
          longitude={coords.longitude + DELTA / 2}
          latitude={coords.latitude - DELTA / 2}
        >
          <svg
            width='25'
            height='25'
            viewBox='0 0 104 104'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='52' cy='52' r='52' fill='#5540C7' fillOpacity='0.5' />
            <circle cx='52' cy='52' r='39' fill='#5540C7' />
          </svg>
        </Marker>
      );
    }

    const myView = {
      ...viewport,
      latitude: coords.latitude,
      longitude: coords.longitude,
      zoom: 11,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    };

    setViewport(myView);
  };
  // console.log('connector', connector);

  const goToUserLocation = (): void => {
    navigator.geolocation.getCurrentPosition((e) => {
      goToLocation(
        { latitude: e.coords.latitude, longitude: e.coords.longitude },
        0
      );
    });
  };

  // const goTo = (e:)

  const searchOnChange = (e: string): void => {
    // console.log(e.target.value);
    if (e === '') {
      // console.log('TEST');
      setSearchResults([]);
      return;
    }
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${e}.json?types=place,poi,address&limit=10&autocomplete=true&access_token=${process.env.REACT_APP_MAPBOX_GL_KEY}&language=en`
      )
      .then((res) => {
        const queryResults = res.data.features;
        setSearchResults(queryResults);
        // console.log(queryResults);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchSubmitHandler = (e: string): void => {
    // Add custom locations (replace Los%20Angeles with e.target.value, make sure you encode your text)
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${e}.json?types=place,poi,address&limit=10&autocomplete=true&access_token=${process.env.REACT_APP_MAPBOX_GL_KEY}&language=en`
      )
      .then((res) => {
        // console.log(res);
        //my_properties();
        const [longitude, latitude] = res.data.features[0].center;
        goToLocation({ latitude, longitude });
        setSearchResults([]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function onZoom(view: any) {
    view.zoom < 11 ? setCluster(true) : setCluster(false);
  }

  const getText = () => {
    // const price = await weiToEther(popupData?.landprice);
    if (loading) {
      return (
        <Typography style={{ maxWidth: '160px', marginLeft: '10px' }}>
          Your transaction is in progress. Please wait.
        </Typography>
      );
    }
    if (popupData?.isOwned) {
      if (popupData?.tokenOwner === accounts) {
        // setPopupData({...popupData, type: PopupStyle[0]})
        // setCurrentPopupStyle(PopupStyle[0])
        return (
          <Typography style={{ maxWidth: '160px', marginLeft: '10px' }}>
            You own this property.
          </Typography>
        );
      }
      if (popupData?.isSelling) {
        // setCurrentPopupStyle(PopupStyle[2])
        return (
          <Typography style={{ maxWidth: '160px', marginLeft: '10px' }}>
            For sale for {popupData?.landprice / ETHER} ETH.
          </Typography>
        );
      } else {
        // setCurrentPopupStyle(PopupStyle[1])
        return (
          <Typography style={{ maxWidth: '160px', marginLeft: '10px' }}>
            This land is already owned.
          </Typography>
        );
      }
    } else {
      // setCurrentPopupStyle(PopupStyle[2])
      return (
        <Typography style={{ maxWidth: '160px', marginLeft: '10px' }}>
          For sale for {popupData?.landprice / ETHER} ETH
        </Typography>
      );
    }
  };

  const getStyle = () => {
    if (popupData?.isOwned) {
      if (popupData?.tokenOwner === accounts) return PopupStyle[0];
      if (popupData?.isSelling) return PopupStyle[2];
      else return PopupStyle[1];
    } else return '';
  };

  const getButton = () => {
    let userFeedback = '';
    if (loading) {
      userFeedback =
        'You have a transaction in progress, please complete it before initiating a new transaction';
    } else if (!accounts) {
      userFeedback =
        'Please connect your wallet before you buying any property';
    } else if (!Auth.getAuth()) {
      userFeedback =
        'You have a transaction in progress, please complete it before initiating a new transaction';
    } else if (false) {
      userFeedback =
        'Please verify your account before initiating any transactions';
    }
    if (popupData.isOwned) {
      console.log(userFeedback);
      if (popupData.tokenOwner === accounts) {
        // setPopupData({...popupData, type: PopupStyle[0]})
        if (popupData.isSelling) {
          return (
            <>
              {loading && <CircularProgress size={24} className='progress' />}
              <Tooltip title={userFeedback}>
                <span>
                  <Button
                    disabled={loading || !accounts || !Auth.getAuth()}
                    onClick={() => {
                      removeSellProperty(pointY, pointX);
                    }}
                    className='LoginButton-header'
                  >
                    {' '}
                    Delist Land
                  </Button>
                </span>
              </Tooltip>
            </>
          );
        } else {
          return (
            <>
              {loading && <CircularProgress size={24} className='progress' />}
              <Tooltip title={userFeedback}>
                <span>
                  <Button
                    disabled={loading || !accounts || !Auth.getAuth()}
                    onClick={initSellProp}
                    className='LoginButton-header'
                  >
                    Sell
                  </Button>
                </span>
              </Tooltip>
            </>
          );
        }
      }
      if (popupData.isSelling) {
        return (
          <>
            {loading && <CircularProgress size={24} className='progress' />}
            <Tooltip title={userFeedback}>
              <span>
                <Button
                  disabled={loading || !accounts || !Auth.getAuth()}
                  onClick={() =>
                    buyProperty(pointY, pointX, popupData?.landprice / ETHER)
                  }
                  className='LoginButton-header'
                >
                  Purchase for {popupData?.landprice / ETHER} ETH
                </Button>
              </span>
            </Tooltip>
          </>
        );
      } else {
        return (
          <>
            {loading && <CircularProgress size={24} className='progress' />}
            <Tooltip title={userFeedback}>
              <span>
                <Button
                  disabled
                  onClick={() =>
                    buyProperty(pointY, pointX, popupData?.landprice / ETHER)
                  }
                  className='LoginButton-header'
                >
                  Purchase
                </Button>
              </span>
            </Tooltip>
          </>
        );
      }
    } else {
      // setPopupData({...popupData, type: PopupStyle[2]})
      return (
        <>
          {loading && <CircularProgress size={24} className='progress' />}
          <Tooltip title={userFeedback}>
            <span>
              <Button
                disabled={loading || !accounts || !Auth.getAuth()}
                onClick={() =>
                  buyProperty(pointY, pointX, popupData?.landprice / ETHER)
                }
                className='LoginButton-header'
              >
                Purchase
              </Button>
            </span>
          </Tooltip>
        </>
      );
    }
  };

  const handleClose = () => {
    setSellingStarted(false);
  };

  const initSellProp = () => {
    setSellingStarted(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const getWishlistIcon = () => {
    const liked = wishlist.some(
      (e: any) => e.coordinates.join(',') === [pointX, pointY].join(',')
    );
    if (liked) {
      return (
        <IconButton
          disabled={!accounts || !Auth.getAuth() || loadingWishlistButton}
          onClick={() => {
            setLoadingWishlistButton(true);
            removeFromWishlist(pointX, pointY);
          }}
        >
          <img style={{ width: '25px' }} src={likedProperty} alt='' />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          disabled={!accounts || !Auth.getAuth() || loadingWishlistButton}
          onClick={() => {
            setLoadingWishlistButton(true);
            addToWishlist(pointX, pointY);
          }}
        >
          <img style={{ width: '25px' }} src={notLikedProperty} alt='' />
        </IconButton>
      );
    }
  };

  const getCardContent = () => {
    // getW
    if (!accounts) {
      return (
        <CardContent>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Typography>
              Cannot load property data, please sign in and connect a wallet to
              continue
            </Typography>
          </Grid>
        </CardContent>
      );
    } else if (!currentUser) {
      return (
        <CardContent>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Typography>
              Cannot load property data, please sign in and connect a wallet to
              continue
            </Typography>
          </Grid>
        </CardContent>
      );
    } else if (!popupData || loadingWishlistButton) {
      return (
        <CardContent>
          <Grid container direction='row' justify='center' alignItems='center'>
            <CircularProgress />
          </Grid>
        </CardContent>
      );
    } else {
      return (
        <>
          <CardContent>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <h1
                style={{ fontFamily: 'Gibson', margin: '1px', maxWidth: '65%' }}
              >
                {popupData?.placeName}
              </h1>
              {getWishlistIcon()}
            </Grid>
            <p
              style={{ fontFamily: 'Gibson', margin: '1px', color: '#f08778' }}
            >
              {pointY}, {pointX}
            </p>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              {getText()}
              {getButton()}
            </Grid>
          </CardActions>
        </>
      );
    }
  };
  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {notificationMessage}
      </Snackbar>
      <Header
        onChangeListener={searchOnChange}
        submitHandler={searchSubmitHandler}
        searchResults={searchResults}
        initContracts={initContracts}
        myProperties={myProperties}
        mySellingProperties={mySellingProperties}
        goToLocation={goToLocation}
        wishlistResults={wishlist}
        account={accounts}
      />
      <Dialog
        fullWidth
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 20,
            padding: '30px',
            borderRadius: '10px',
          },
        }}
        open={sellingStarted}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <DialogTitle id='alert-dialog-title'>List Your Property</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Select a listing price for your property
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <TextField
            onChange={(e) => {
              setListingPrice(e.target.value);
            }}
            id='standard-basic'
            label='Listing Price'
            value={listingPrice}
          />
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              sellProperty(pointY, pointX, listingPrice);
            }}
            color='primary'
            autoFocus
          >
            List Item
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <div style={{ position: 'absolute', bottom: 75, left: 75, zIndex: 1 }}>
          <IconButton
            className={
              currentMapStyle === MapStyle[1] ? 'SatelliteView' : 'MapView'
            }
            onClick={() => {
              // console.log(currentMapStyle);
              toggleMapStyle();
            }}
          ></IconButton>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 200,
            left: 75,
            zIndex: 1,
          }}
        >
          <legend className={legendClasses.root}>
            <div className={legendClasses.container}>
              <div
                className='legend-owned'
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: 'rgba(118, 167, 255, 0.7)',
                }}
              ></div>
              <span
                style={{ fontSize: '10px', color: 'black', marginLeft: '3px' }}
              >
                My Properties
              </span>
            </div>
            <div className={legendClasses.container}>
              <div
                className='legend-selling'
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: 'rgba(245, 169, 226,0.5)',
                }}
              ></div>
              <span
                style={{ fontSize: '10px', color: 'black', marginLeft: '3px' }}
              >
                Listed
              </span>
            </div>
            <div className={legendClasses.container}>
              <div
                className='legend-listed'
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: 'rgba(0, 255, 0, 0.3)',
                }}
              ></div>
              <span
                style={{ fontSize: '10px', color: 'black', marginLeft: '3px' }}
              >
                For Resale
              </span>
            </div>
            <div className={legendClasses.container}>
              <div
                className='legend-nfs'
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: 'rgba(175, 175, 175, 0.5)',
                }}
              ></div>
              <span
                style={{ fontSize: '10px', color: 'black', marginLeft: '3px' }}
              >
                Sold
              </span>
            </div>
          </legend>
        </div>
        <div>
          <IconButton
            style={{ position: 'absolute', bottom: 150, right: 75, zIndex: 1 }}
            className='location'
            onClick={() => {
              goToUserLocation();
            }}
          >
            <img style={{ width: '22px' }} src={GeoLocateIconBlack} alt='' />
          </IconButton>
        </div>
        <DeckGL
          ContextProvider={MapContext.Provider}
          layers={cluster ? clusterLayer : [layers, getClickedLayer()]}
          initialViewState={viewport}
          controller={true}
          views={MAP_VIEW}
          onViewStateChange={({ viewState }: any) => {
            onZoom(viewState);
          }}
          onClick={onClick}
        >
          <div
            style={{ position: 'absolute', bottom: 75, right: 75, zIndex: 1 }}
          >
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
            >
              <NavigationControl
                className='NavigationCtrl'
                showCompass={false}
              />
            </Grid>
          </div>
          <Popup
            captureClick={true}
            className={openPopup ? 'open-popup' : 'hidden-popup'}
            latitude={pointY}
            longitude={pointX + DELTA}
            closeButton={false}
            closeOnClick={false}
            onClose={() => closePopup()}
            anchor='top-left'
          >
            <Card
              className={popupData ? getStyle() : ''}
              style={{ padding: '20px' }}
            >
              {getCardContent()}
            </Card>
          </Popup>
          {marker}

          <StaticMap
            width='100vw'
            height='100vh'
            reuseMaps
            mapStyle={currentMapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_KEY}
          ></StaticMap>
        </DeckGL>
      </div>
    </div>
  );
};

export default MapGL;
