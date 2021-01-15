"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ResContext = exports.NotificationCount = exports.AllNotifyTime = exports.AllNotifyText = void 0;
var react_1 = require("react");
var react_2 = require("@deck.gl/react");
var core_1 = require("@deck.gl/core");
var react_map_gl_1 = require("react-map-gl");
var d3_ease_1 = require("d3-ease");
var axios_1 = require("axios");
var layers_1 = require("@deck.gl/layers");
var core_2 = require("@web3-react/core");
var getWeb3_1 = require("../getWeb3");
var web3_1 = require("web3");
var location_icon_atlas_png_1 = require("./data/location-icon-atlas.png");
var location_icon_mapping_json_1 = require("./data/location-icon-mapping.json");
var IconClusterLayer_1 = require("./IconClusterLayer");
var Header_1 = require("../../Header");
// import { LocationContext } from '../../../context/location-context';
require("./styles/Map.css");
require("./styles/MapDisplayBreakpoints.css");
var core_3 = require("@material-ui/core");
var context_1 = require("../../../state/Token/context");
// import { LayoutContext } from '../../../context/';
// import { NormalizeEvent } from '../../../utils';
var context_2 = require("../../../state/Layout/context");
var location_black_svg_1 = require("../../../assets/svg/location-black.svg");
var react_map_gl_2 = require("react-map-gl");
var react_map_gl_3 = require("react-map-gl");
var core_4 = require("@material-ui/core");
var Auth_1 = require("../../HOC/Auth");
var heartfull_svg_1 = require("../../../assets/svg/heartfull.svg");
var heartoutline_svg_1 = require("../../../assets/svg/heartoutline.svg");
var lab_1 = require("@material-ui/lab");
// const SuperWorldTokenvv2 = require('../../../contracts/SuperWorldTokenv2.min.json');
var SuperWorldToken_min_json_1 = require("../../../contracts/SuperWorldToken.min.json");
var SuperWorldCoin_min_json_1 = require("../../../contracts/SuperWorldCoin.min.json");
var moment_1 = require("moment");
// import Axios from 'axios';
// import { cosh } from 'core-js/fn/number';
var core_5 = require("@material-ui/core");
// let
var MAP_VIEW = new core_1.MapView({ repeat: true });
var ETHER = 1000000000000000000;
var MAPBOX_KEY = process.env.REACT_APP_MAPBOX_GL_KEY;
var INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
// interface popupData {
//     placename?: string | null;
//     tokenId?: string | null;
//     tokenOwner?: string | null;
//     isOwned?: boolean | null;
//     isSelling?: boolean | null;
//     landprice?: number | null;
// }
//style for the legend
var useStylesLegend = core_5.makeStyles({
    root: {
        width: '113px',
        height: '103px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        width: '90px',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '4px 0'
    }
});
//Variable for pass data to notification to header.tsx
exports.AllNotifyText = [];
exports.AllNotifyTime = [];
exports.NotificationCount = 0;
var res = 1;
exports.ResContext = react_1["default"].createContext(res);
var eventBlock = -1;
var MapGL = function (_a) {
    // const [bch_properties, setProperties] = useState<IProperty[]>(properties);
    var triedEager = _a.triedEager, properties = _a.properties;
    //The block, from which we will trace and list events
    var _b = react_1.useState({
        longitude: -73.97,
        latitude: 40.78,
        zoom: 10,
        maxZoom: 20,
        pitch: 0,
        bearing: 0
    }), viewport = _b[0], setViewport = _b[1];
    // const [clickedLike, setClickedLike] = useState<boolean>(false);
    var _c = react_1.useState([]), searchResults = _c[0], setSearchResults = _c[1];
    var _d = react_1.useState(true), cluster = _d[0], setCluster = _d[1];
    var _f = react_1.useState([]), wishlist = _f[0], setWishlist = _f[1];
    var _g = react_1.useState([]), myProperties = _g[0], setMyProperties = _g[1];
    var _h = react_1.useState([]), mySellingProperties = _h[0], setMySellingProperties = _h[1];
    var _j = react_1.useState([]), allProperties = _j[0], setallProperties = _j[1];
    var _k = react_1.useState([]), allObjects = _k[0], setallObjects = _k[1];
    var _l = react_1.useState(false), openSnackbar = _l[0], setOpenSnackbar = _l[1];
    var _m = react_1.useState(null), contract = _m[0], setContract = _m[1];
    var _o = react_1.useState(null), newTestCoin = _o[0], setNewTestCoin = _o[1];
    var _p = react_1.useState(null), networkId = _p[0], setNetworkId = _p[1];
    var _q = react_1.useState(false), loading = _q[0], setLoading = _q[1];
    var _r = react_1.useState(false), loadingWishlistButton = _r[0], setLoadingWishlistButton = _r[1];
    var _s = react_1.useState(false), sellingStarted = _s[0], setSellingStarted = _s[1];
    var _t = react_1.useState('1.0'), listingPrice = _t[0], setListingPrice = _t[1];
    var _u = react_1.useState(0), pointX = _u[0], setPointX = _u[1];
    var _v = react_1.useState(0), pointY = _v[0], setPointY = _v[1];
    var _w = react_1.useState(), popupData = _w[0], setPopupData = _w[1];
    var _x = react_1.useState(null), marker = _x[0], setMarker = _x[1];
    var _y = react_1.useState(null), newData = _y[0], setNewData = _y[1];
    var _z = react_1.useState(false), openPopup = _z[0], setOpenPopup = _z[1];
    var _0 = react_1.useState(), notificationMessage = _0[0], setNotificationMessage = _0[1];
    var _1 = react_1.useState(), currentUser = _1[0], setCurrentUser = _1[1];
    var _2 = react_1.useState(Auth_1["default"].getAuth()), loggedIn = _2[0], setLoggedIn = _2[1];
    var _3 = react_1.useState(null), coinbase = _3[0], setCoinbase = _3[1];
    var _4 = react_1.useState(null), superWorldTokenSocketInstance = _4[0], setSuperWorldTokenSocketInstance = _4[1];
    var _5 = react_1.useState(null), web3 = _5[0], setWeb3 = _5[1];
    var _6 = react_1.useState(null), layers = _6[0], setLayers = _6[1];
    var _7 = react_1.useContext(context_2.LayoutContext), state = _7.state, dispatch = _7.dispatch;
    // const [likedPropertyButton, setLikedPropertyButton] = useState<boolean>(false);
    var _8 = react_1.useState(null), wishlistButton = _8[0], setWishlistButton = _8[1];
    var legendClasses = useStylesLegend();
    // const [clusterLayer, setClusterLayer] = useState<any>(null);
    // const [geoJSONLayers, setGeoJSONLayers] = useState<any>(null);
    // const [contractVersion, setContractVersion] = useState<number>(1);
    var MapStyle;
    (function (MapStyle) {
        MapStyle[MapStyle["mapbox://styles/mapbox/light-v9"] = 0] = "mapbox://styles/mapbox/light-v9";
        MapStyle[MapStyle["mapbox://styles/mapbox/satellite-v9"] = 1] = "mapbox://styles/mapbox/satellite-v9";
    })(MapStyle || (MapStyle = {}));
    var PopupStyle;
    (function (PopupStyle) {
        PopupStyle[PopupStyle["open-popup-owned"] = 0] = "open-popup-owned";
        PopupStyle[PopupStyle["open-popup-notAvailable"] = 1] = "open-popup-notAvailable";
        PopupStyle[PopupStyle["open-popup-forSale"] = 2] = "open-popup-forSale";
    })(PopupStyle || (PopupStyle = {}));
    var _9 = core_2.useWeb3React(), account = _9.account, library = _9.library, chainId = _9.chainId, connector = _9.connector;
    // console.log('account:', account); //! 'account' is of type string
    var startBlock = chainId === 3 ? 3530378 : 5877613;
    //Loads token(if needed)
    var tokenInstance = react_1.useContext(context_1.TokenContext).tokenInstance;
    //Connects to Ethereum web3
    //to create web3 provider and websocketprovider
    var initContracts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var web3_2, web3Socket, networkId_1, newSuperWorld, SuperWorldCoin, userAccounts, coinbase_1, superWorldTokenSocketInstance_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // if(Auth.getAuth()) {
                    //if(1){
                    console.log('INIT CONTRACTS');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, getWeb3_1["default"]()];
                case 2:
                    web3_2 = _a.sent();
                    setWeb3(web3_2);
                    web3Socket = new web3_1["default"](new web3_1["default"].providers.WebsocketProvider("wss://ropsten.infura.io/ws/v3/" + INFURA_KEY));
                    return [4 /*yield*/, web3_2.eth.net.getId()];
                case 3:
                    networkId_1 = _a.sent();
                    console.log(networkId_1);
                    setNetworkId(networkId_1);
                    newSuperWorld = new web3_2.eth.Contract(SuperWorldToken_min_json_1["default"].abi, 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    SuperWorldToken_min_json_1["default"].networks[networkId_1] && SuperWorldToken_min_json_1["default"].networks[networkId_1].address);
                    // }
                    setContract(newSuperWorld);
                    SuperWorldCoin = new web3_2.eth.Contract(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    SuperWorldCoin_min_json_1["default"].abi, 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    SuperWorldCoin_min_json_1["default"].networks[networkId_1] && SuperWorldCoin_min_json_1["default"].networks[networkId_1].address);
                    setNewTestCoin(SuperWorldCoin);
                    return [4 /*yield*/, web3_2.eth.getAccounts()];
                case 4:
                    userAccounts = _a.sent();
                    coinbase_1 = userAccounts[0];
                    superWorldTokenSocketInstance_1 = new web3Socket.eth.Contract(newSuperWorld.options.jsonInterface, newSuperWorld._address);
                    axios_1["default"].get('http://geo.superworldapp.com/api/json/buytokenevents/get').then(function (e) {
                        allObjects.push(e.data.data);
                    });
                    console.log('allObjects', allObjects);
                    setSuperWorldTokenSocketInstance(superWorldTokenSocketInstance_1);
                    setCoinbase(coinbase_1);
                    getAllProps(newSuperWorld, coinbase_1, superWorldTokenSocketInstance_1);
                    getMyProps(newSuperWorld, coinbase_1, superWorldTokenSocketInstance_1);
                    getSellPlots(newSuperWorld, coinbase_1, superWorldTokenSocketInstance_1);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        console.log('Wallet connected');
        // window.location.reload();
        if (account)
            initContracts();
    }, [account]);
    react_1.useEffect(function () {
        setLoggedIn(Auth_1["default"].getAuth());
        if (Auth_1["default"].getAuth()) {
            initContracts();
            // console.log("TESTSTSTS");
            axios_1["default"].defaults.headers = {
                Authorization: Auth_1["default"].getToken()
            };
            axios_1["default"]
                .get(process.env.REACT_APP_API_URL + "/user/get")
                .then(function (res) {
                console.log(res);
                setCurrentUser(res.data);
            })["catch"](function (e) {
                console.log(e);
            });
        }
        // const user = Auth.getUser();
        // setCurrentUser(user);
        console.log(wishlist);
    }, [document.cookie]);
    react_1.useEffect(function () {
        // initContracts();
        try {
            console.log('GETTING WISHLIST');
            // if (currentUser) {
            axios_1["default"].defaults.headers = {
                Authorization: Auth_1["default"].getToken()
            };
            axios_1["default"]
                .get(process.env.REACT_APP_API_URL + "/wishlist/get")
                .then(function (res) {
                console.log(res.data);
                setWishlist(res.data);
                console.log(wishlist);
            })["catch"](function (e) {
                console.log(e);
            });
            // }
        }
        catch (error) {
            console.log(error);
        }
    }, [loggedIn]);
    var getAllProps = function (newSuperWorld, _coinbase, _superWorldTokenSocketInstance) { return __awaiter(void 0, void 0, void 0, function () {
        var req, allProps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, newSuperWorld.getPastEvents('EventBuyToken', {
                        fromBlock: startBlock
                    })];
                case 1:
                    req = _a.sent();
                    console.log('Getpastevents EventBuyToken ', req);
                    allProps = [];
                    req.forEach(function (ele) { return __awaiter(void 0, void 0, void 0, function () {
                        var lat, lon, ownerofLand;
                        return __generator(this, function (_a) {
                            lat = parseFloat(ele.returnValues.lat);
                            lon = parseFloat(ele.returnValues.lon);
                            ownerofLand = ele.returnValues.seller;
                            allProps.push({
                                name: lat + ',' + lon,
                                latitude: lat,
                                longitude: lon,
                                owner: ownerofLand,
                                selling: false
                            });
                            return [2 /*return*/];
                        });
                    }); });
                    console.log('allProps', allProps);
                    console.log('Myproperty: ', allProps);
                    setallProperties(allProps);
                    return [2 /*return*/];
            }
        });
    }); };
    var getMyProps = function (newSuperWorld, coinbase, superWorldTokenSocketInstance) { return __awaiter(void 0, void 0, void 0, function () {
        var req, myProps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, newSuperWorld.getPastEvents('EventBuyToken', {
                        filter: { buyer: coinbase },
                        fromBlock: startBlock
                    })];
                case 1:
                    req = _a.sent();
                    console.log('Getpastevents EventBuyToken ', req);
                    myProps = [];
                    req.forEach(function (ele) { return __awaiter(void 0, void 0, void 0, function () {
                        var lat, lon;
                        return __generator(this, function (_a) {
                            console.log(ele);
                            lat = parseFloat(ele.returnValues.lat);
                            lon = parseFloat(ele.returnValues.lon);
                            if (ele.returnValues.seller !== '0x0000000000000000000000000000000000000000') {
                                console.log(ele);
                                myProps.push({
                                    name: lat + ',' + lon,
                                    latitude: lat,
                                    longitude: lon,
                                    owner: account,
                                    selling: true
                                });
                            }
                            else {
                                myProps.push({
                                    name: lat + ',' + lon,
                                    latitude: lat,
                                    longitude: lon,
                                    owner: account,
                                    selling: false
                                });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    console.log('myProps', myProps);
                    myProps.forEach(function (plot) {
                        axios_1["default"]
                            .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + plot.longitude + "," + plot.latitude + ".json?access_token=" + process.env.REACT_APP_MAPBOX_GL_KEY + "&language=en")
                            .then(function (e) {
                            var _a;
                            //myProperties.push({ text: e.data.features[0]?.text, coordinates: e.data.query });
                            plot.name = (_a = e.data.features[0]) === null || _a === void 0 ? void 0 : _a.text;
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
                    //                     `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_GL_KEY}&language=en`,
                    //                 )
                    //                 .then((e) => {
                    //                     myProperties.push({ text: e.data.features[0]?.text, coordinates: e.data.query });
                    //                 });
                    //         } catch (error) {
                    //             console.log(error);
                    //         }
                    //     },
                    // );
                    console.log('Myproperty: ', myProperties);
                    console.log('receipt', res);
                    return [2 /*return*/];
            }
        });
    }); };
    var getSellPlots = function (newSuperWorld, _coinbase, superWorldTokenSocketInstance) { return __awaiter(void 0, void 0, void 0, function () {
        var eventListtoken, mySellProps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, newSuperWorld.getPastEvents('EventListToken', {
                        fromBlock: startBlock
                    })];
                case 1:
                    eventListtoken = _a.sent();
                    console.log('Getpastevents EventListToken ', eventListtoken);
                    mySellProps = [];
                    eventListtoken.forEach(function (ele) { return __awaiter(void 0, void 0, void 0, function () {
                        var lat, lon, ownerofLand, flag;
                        return __generator(this, function (_a) {
                            lat = parseFloat(ele.returnValues.lat);
                            lon = parseFloat(ele.returnValues.lon);
                            ownerofLand = ele.returnValues.seller;
                            flag = false;
                            {
                                mySellProps.map(function (item) {
                                    if (item.latitude == lat && item.longitude == lon) {
                                        item.selling = ele.returnValues.isListed;
                                        flag = true;
                                    }
                                });
                                if (flag == false) {
                                    mySellProps.push({
                                        name: lat + ',' + lon,
                                        latitude: lat,
                                        longitude: lon,
                                        owner: ownerofLand,
                                        selling: ele.returnValues.isListed
                                    });
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    console.log('myProps', mySellProps);
                    mySellProps.forEach(function (plot) {
                        if (plot.selling) {
                            axios_1["default"]
                                .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + plot.longitude + "," + plot.latitude + ".json?access_token=" + process.env.REACT_APP_MAPBOX_GL_KEY + "&language=en")
                                .then(function (e) {
                                var _a;
                                //plot.name=e.data.features[0]?.text;
                                mySellingProperties.push({
                                    name: (_a = e.data.features[0]) === null || _a === void 0 ? void 0 : _a.text,
                                    latitude: plot.latitude,
                                    longitude: plot.longitude,
                                    owner: plot.owner,
                                    selling: plot.selling
                                });
                            });
                        }
                    });
                    console.log('MySellproperty: ', mySellingProperties);
                    return [2 /*return*/];
            }
        });
    }); };
    var getNewSellEvents = function (superWorldTokenSocketInstance) {
        superWorldTokenSocketInstance.events.EventListToken({
            fromBlock: 'latest'
        }, function (_error, event) {
            try {
                console.log('webSocketeventBuyToken ', event);
                console.log('webSocketeventBuyToken ', event);
                var lat_1 = parseFloat(event.returnValues.lat);
                var lon_1 = parseFloat(event.returnValues.lon);
                axios_1["default"]
                    .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + lon_1 + "," + lat_1 + ".json?access_token=" + process.env.REACT_APP_MAPBOX_GL_KEY + "&language=en")
                    .then(function (e) {
                    var _a;
                    if (event.returnValues.isListed) {
                        mySellingProperties.push({ text: (_a = e.data.features[0]) === null || _a === void 0 ? void 0 : _a.text, coordinates: e.data.query });
                    }
                    else {
                        setMySellingProperties(mySellingProperties.filter(function (item) { return item.coordinates[0] != lon_1 || item.coordinates[1] != lat_1; }));
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    };
    react_1.useEffect(function () {
        console.log('RE RENDER');
        renderLayers();
    }, [JSON.stringify(allProperties), JSON.stringify(myProperties), JSON.stringify(mySellingProperties), cluster]);
    var _10 = react_1.useState(MapStyle[0]), currentMapStyle = _10[0], setCurrentMapStyle = _10[1];
    function toggleMapStyle() {
        if (currentMapStyle === MapStyle[0])
            setCurrentMapStyle(MapStyle[1]);
        else if (currentMapStyle === MapStyle[1])
            setCurrentMapStyle(MapStyle[0]);
    }
    function addToWishlist(lat, lon) {
        return __awaiter(this, void 0, void 0, function () {
            var wishlistItem;
            return __generator(this, function (_a) {
                // add it to the current object
                // POST to the API
                setLoadingWishlistButton(true);
                wishlistItem = {
                    name: '',
                    coordinates: [lat, lon]
                };
                console.log(lat, lon);
                setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "info", variant: "filled", onClose: handleCloseSnackbar }, "Adding to wishlist..."));
                setOpenSnackbar(true);
                axios_1["default"]
                    .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + lat + "," + lon + ".json?access_token=" + process.env.REACT_APP_MAPBOX_GL_KEY + "&language=en")
                    .then(function (e) {
                    var _a;
                    wishlistItem.name = (_a = e.data.features[0]) === null || _a === void 0 ? void 0 : _a.text;
                    axios_1["default"].defaults.headers = {
                        Authorization: Auth_1["default"].getToken()
                    };
                    axios_1["default"]
                        .post(process.env.REACT_APP_API_URL + "/wishlist/add", wishlistItem)
                        .then(function (e) {
                        console.log(e.data);
                        console.log(e);
                        setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "success", variant: "filled", onClose: handleCloseSnackbar },
                            "Added ",
                            wishlistItem.name,
                            " to your wishlist address"));
                        setOpenSnackbar(true);
                        //Notification in Icon
                        var notifyText_add = 'Added ' + wishlistItem.name + ' to wishlist is complete.';
                        var notifyTextAddtowishlistTime = moment_1["default"]().format('lll');
                        exports.AllNotifyText.unshift({
                            text: notifyText_add,
                            time: notifyTextAddtowishlistTime
                        });
                        exports.NotificationCount++;
                        wishlist.push(wishlistItem);
                        setWishlist(__spreadArrays(wishlist));
                        setPopupData(popupData);
                    })["catch"](function (_e) {
                        setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "error", variant: "filled", onClose: handleCloseSnackbar }, "Could not add property to wishlist"));
                        setOpenSnackbar(true);
                    });
                });
                setLoadingWishlistButton(false);
                return [2 /*return*/];
            });
        });
    }
    function removeFromWishlist(lat, lon) {
        return __awaiter(this, void 0, void 0, function () {
            var wishlistItem;
            return __generator(this, function (_a) {
                setLoadingWishlistButton(true);
                wishlistItem = {
                    coordinates: [lat, lon]
                };
                console.log(lat, lon);
                axios_1["default"].defaults.headers = {
                    Authorization: Auth_1["default"].getToken()
                };
                axios_1["default"]
                    .post(process.env.REACT_APP_API_URL + "/wishlist/delete", wishlistItem)
                    .then(function (e) {
                    console.log(e.data);
                    console.log(e);
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "success", variant: "filled", onClose: handleCloseSnackbar }, "Property removed from wishlist"));
                    setOpenSnackbar(true);
                    setWishlist(e.data);
                    setPopupData(popupData);
                })["catch"](function (_e) {
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "error", variant: "filled", onClose: handleCloseSnackbar }, "Could not add property to wishlist"));
                    setOpenSnackbar(true);
                });
                setLoadingWishlistButton(false);
                return [2 /*return*/];
            });
        });
    }
    function closePopup() {
        setNewData(null);
        setOpenPopup(!openPopup);
        setPopupData(undefined);
    }
    function roundDown(point) {
        return Math.floor(point * 1000) / 1000;
    }
    function onClick(_a) {
        var coordinate = _a.coordinate;
        if (!account || !Auth_1["default"].getAuth()) {
            dispatch({
                type: 'TOGGLE_SIGN_IN_MODAL',
                payload: !state.signInModalIsOpen
            });
            return;
        }
        var pointXtemp = roundDown(coordinate[0]);
        var pointYtemp = roundDown(coordinate[1] + 0.001);
        setPointX(pointXtemp);
        setPointY(pointYtemp);
        var DELTA = 0.0009;
        if (openPopup)
            closePopup();
        else {
            console.log('X coordinate:', pointYtemp);
            console.log('Y coordinate:', pointXtemp);
            getInfoLand(pointXtemp, pointYtemp)
                .then(function (e) {
                axios_1["default"]
                    .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + pointXtemp + "," + pointYtemp + ".json?access_token=" + process.env.REACT_APP_MAPBOX_GL_KEY + "&language=en")
                    .then(function (res) {
                    var _a;
                    var data = __assign(__assign({}, e), { placeName: (_a = res.data.features[0]) === null || _a === void 0 ? void 0 : _a.text, latitude: pointYtemp, longitude: pointXtemp });
                    console.log(data);
                    setPopupData(data);
                });
                console.log('event', e);
            })["catch"](function (error) {
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
                        ]
                    }
                },
            ]);
        }
    }
    // Gets the unique props between two arrays of properties
    function getUniqueProps(value, index, self) {
        return self.indexOf(value) === index;
        // const uniqueProps = combinedArrays.filter()
    }
    function etherToWei(y) {
        return __awaiter(this, void 0, void 0, function () {
            var inwei;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3.utils.toWei(y, 'ether')];
                    case 1:
                        inwei = _a.sent();
                        return [2 /*return*/, inwei];
                }
            });
        });
    }
    function weiToEther(y) {
        return __awaiter(this, void 0, void 0, function () {
            var inwei;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3.utils.fromWei(y, 'ether')];
                    case 1:
                        inwei = _a.sent();
                        return [2 /*return*/, inwei];
                }
            });
        });
    }
    // ethertowei(1);
    function setupLayers(type) {
        var DELTA = 0.0009;
        var props = [];
        // console.log(properties);
        // bch_properties = bch_properties.concat(properties);
        var fillColour;
        // My properties that are not for sale
        if (type === 0) {
            // console.log(properties);
            props = myProperties.filter(function (e) { return !e.selling; });
            fillColour = [118, 167, 255, 255]; //blue
        }
        // Properties that are owned but are not available
        else if (type === 1) {
            props = allProperties;
            fillColour = [215, 215, 215, 145]; //grey
            // Properties that are owned but are for sale
        }
        else if (type === 3) {
            props = mySellingProperties;
            fillColour = [0, 255, 0, 75]; //green
            console.log(allProperties);
        }
        //MY  Properties that are for sale
        else if (type === 4) {
            props = myProperties.filter(function (e) { return e.selling; });
            fillColour = [144, 154, 248, 145]; // Purple
            console.log(props);
        }
        var newFeatures = [];
        props.forEach(function (e) {
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
                    ]
                }
            });
        });
        var data = { type: 'FeatureCollection', features: newFeatures !== null && newFeatures !== void 0 ? newFeatures : [] };
        if (type === 1) {
            var rand = Math.random().toString(16).substr(2, 8); // 6de5ccda
            return new layers_1.GeoJsonLayer({
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
                onClick: function (event) {
                    console.log(event.coordinate);
                    onClick({ coordinate: event.coordinate });
                }
            });
        }
        else {
            var rand = Math.random().toString(16).substr(2, 8); // 6de5ccda
            return new layers_1.GeoJsonLayer({
                id: rand,
                data: data,
                pickable: true,
                stroked: false,
                filled: true,
                autoHighlight: true,
                highlightColor: [0, 0, 0, 50],
                getFillColor: fillColour,
                getRadius: 100,
                onClick: function (event) {
                    console.log(event.coordinate);
                    onClick({ coordinate: event.coordinate });
                }
            });
        }
    }
    //  if(contractVersion === 1) {
    var buyProperty = function (lat, lon, price) { return __awaiter(void 0, void 0, void 0, function () {
        var res_1, notifyText_buy, notifyTextBuyTime, newProp, newPopupData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // <Alert severity="error">This is an error message!</Alert>
                    // <Alert severity="success">This is a success message!</Alert>
                    // console.log(user);
                    console.log(currentUser);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setLoading(true);
                    console.log(lon, lat);
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "info", variant: "filled", onClose: handleCloseSnackbar }, "You can raise your gas fees to speed up the process"));
                    console.log(price);
                    setOpenSnackbar(true);
                    return [4 /*yield*/, contract.methods
                            .buyToken("" + lon, "" + lat)
                            .send({ from: account, value: price * ETHER, gas: 500000 })];
                case 2:
                    res_1 = _a.sent();
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "success", variant: "filled", onClose: handleCloseSnackbar },
                        "Congratulations! ",
                        currentUser.username,
                        " your transaction was processed succesfully"));
                    setOpenSnackbar(true);
                    notifyText_buy = 'Congratulations! ' +
                        currentUser.username +
                        ' The transaction is complete. You purchased a property with SuperWorld.';
                    notifyTextBuyTime = moment_1["default"]().format('lll');
                    exports.AllNotifyText.unshift({
                        text: notifyText_buy,
                        time: notifyTextBuyTime
                    });
                    exports.NotificationCount++;
                    console.log(res_1);
                    // Notify the user VIA email
                    axios_1["default"].post(process.env.REACT_APP_API_URL + "/user/sendBuyConfirmation", {
                        email: currentUser.email,
                        placeName: popupData.placeName,
                        etherscan: "https://etherscan.io/tx/" + res_1.transactionHash
                    });
                    newProp = {
                        name: popupData.placeName,
                        longitude: popupData.longitude,
                        latitude: popupData.latitude,
                        owner: account,
                        selling: false
                    };
                    myProperties.push(newProp);
                    newPopupData = __assign(__assign({}, popupData), { isOwned: true, tokenOwner: account, isSelling: false });
                    setPopupData(newPopupData);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "error", variant: "filled", onClose: handleCloseSnackbar },
                        "Your transaction was not processed: ",
                        error_2.message));
                    setOpenSnackbar(true);
                    return [3 /*break*/, 4];
                case 4:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    //buyProperty(71.254,48.15);//call
    var sellProperty = function (lat, lon, sellPrice) { return __awaiter(void 0, void 0, void 0, function () {
        var price, res_2, notifyText_sell, notifyTextSellTime, newPopupData, newProp, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    setLoading(true);
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "info", variant: "filled", onClose: handleCloseSnackbar }, "You can raise your gas fees to speed up the process"));
                    setOpenSnackbar(true);
                    console.log('sellPrice', sellPrice);
                    return [4 /*yield*/, etherToWei(sellPrice)];
                case 1:
                    price = _a.sent();
                    return [4 /*yield*/, contract.methods
                            .listToken("" + lon, "" + lat, price)
                            .send({ from: account, gas: 500000 })];
                case 2:
                    res_2 = _a.sent();
                    // console.log(response);
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "success", variant: "filled", onClose: handleCloseSnackbar },
                        "Congratulations! ",
                        currentUser.username,
                        " Your plot is available for sale"));
                    setPopupData(__assign(__assign({}, popupData), { isSelling: true }));
                    // Notify the user VIA email
                    setOpenSnackbar(true);
                    notifyText_sell = 'Congratulations! ' +
                        currentUser.username +
                        ' The transaction is complete. Your property is available for sale.';
                    notifyTextSellTime = moment_1["default"]().format('lll');
                    exports.AllNotifyText.unshift({
                        text: notifyText_sell,
                        time: notifyTextSellTime
                    });
                    exports.NotificationCount++;
                    axios_1["default"].post(process.env.REACT_APP_API_URL + "/user/sendListingConfirmation", {
                        email: currentUser.email,
                        placeName: popupData.placeName,
                        etherscan: "https://etherscan.io/tx/" + res_2.transactionHash
                    });
                    newPopupData = __assign(__assign({}, popupData), { isOwned: true, 
                        // tokenOwner: account,
                        isSelling: true });
                    console.log(newPopupData);
                    newProp = {
                        name: popupData.placeName,
                        longitude: popupData.longitude,
                        latitude: popupData.latitude,
                        owner: account,
                        selling: true
                    };
                    mySellingProperties.push(newProp);
                    setPopupData(newPopupData);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    // console.log(error)
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "error", variant: "filled", onClose: handleCloseSnackbar },
                        "Your transaction was not processed: ",
                        error_3.message));
                    setOpenSnackbar(true);
                    return [3 /*break*/, 4];
                case 4:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    //sellProperty(71.254,48.15,100000000000); //call
    var removeSellProperty = function (lat, lon) { return __awaiter(void 0, void 0, void 0, function () {
        var response, notifyText_notsell, notifyTextNotSaleAnymoreTime, newProp_1, removeProp, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setLoading(true);
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "info", variant: "filled", onClose: handleCloseSnackbar }, "Processing transaction..."));
                    setOpenSnackbar(true);
                    return [4 /*yield*/, contract.methods
                            .delistToken("" + lon, "" + lat)
                            .send({ from: account, gas: 500000 })];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    setLoading(false);
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "success", variant: "filled", onClose: handleCloseSnackbar }, "Congratulations! The transaction is complete. Your property has been made unavailable for sale."));
                    setOpenSnackbar(true);
                    notifyText_notsell = 'The transaction is complete. Your property has been made unavailable for sale.';
                    notifyTextNotSaleAnymoreTime = moment_1["default"]().format('lll');
                    exports.AllNotifyText.unshift({
                        text: notifyText_notsell,
                        time: notifyTextNotSaleAnymoreTime
                    });
                    exports.NotificationCount++;
                    newProp_1 = {
                        name: popupData.placeName,
                        longitude: popupData.longitude,
                        latitude: popupData.latitude,
                        owner: account,
                        selling: false
                    };
                    removeProp = mySellingProperties.findIndex(function (e) { return e === newProp_1; });
                    mySellingProperties.splice(removeProp, 1);
                    setPopupData(__assign(__assign({}, popupData), { isSelling: false })); //much simpler way of changing the popupData
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    setNotificationMessage(react_1["default"].createElement(lab_1.Alert, { style: { width: '100%' }, severity: "error", variant: "filled", onClose: handleCloseSnackbar },
                        "Your transaction was not processed: ",
                        error_4.message));
                    setOpenSnackbar(true);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    //removeSellProperty(71.254,48.15); //call
    console.log('popup data', popupData);
    var getInfoLand = function (lat, lon) { return __awaiter(void 0, void 0, void 0, function () {
        var response, tokenId, tokenOwner, isOwned, isSelling, landprice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!contract) {
                        console.log('Not connected');
                    }
                    return [4 /*yield*/, contract.methods.getInfo("" + lat, "" + lon).call()];
                case 1:
                    response = _a.sent();
                    tokenId = response[0];
                    tokenOwner = response[1];
                    isOwned = response[2];
                    isSelling = response[3];
                    landprice = response[4];
                    return [2 /*return*/, { tokenId: tokenId, tokenOwner: tokenOwner, isOwned: isOwned, isSelling: isSelling, landprice: landprice }];
            }
        });
    }); };
    // getInfoLand(71.254,48.15); //call
    var getPrice = function (lat, lon) { return __awaiter(void 0, void 0, void 0, function () {
        var idToken, responseNext;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contract.methods.getTokenId("" + lon, "" + lat).call()];
                case 1:
                    idToken = _a.sent();
                    return [4 /*yield*/, contract.methods.getPrice(idToken).call()];
                case 2:
                    responseNext = _a.sent();
                    console.log(responseNext);
                    return [2 /*return*/];
            }
        });
    }); };
    //    getPrice(71.254,48.15); //call
    var buyLandWithCoins = function (lat, lon) { return __awaiter(void 0, void 0, void 0, function () {
        var idToken, price, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contract.methods.getTokenId("" + lon, "" + lat).call()];
                case 1:
                    idToken = _a.sent();
                    return [4 /*yield*/, contract.methods.getPrice(idToken).call()];
                case 2:
                    price = _a.sent();
                    resp = newTestCoin.methods
                        .approveAndCall(contract._address, price, web3_1["default"].utils.asciiToHex(lon.toString() + ',' + lat.toString()))
                        .send({
                        from: account,
                        gas: 500000
                    });
                    console.log('receipt', resp);
                    console.log('token no ', idToken);
                    console.log('Price ', price);
                    return [2 /*return*/];
            }
        });
    }); };
    // buyLandWithCoins(46.234,78.124);
    var clusterLayer = 
    // @ts-ignore
    new IconClusterLayer_1["default"]({
        data: allProperties,
        // pickable: true,
        getPosition: function (e) { return [e.longitude, e.latitude]; },
        iconAtlas: location_icon_atlas_png_1["default"],
        iconMapping: location_icon_mapping_json_1["default"],
        // onHover: onHover,
        id: 'icon-cluster',
        sizeScale: 60
    });
    var DELTA = 0.0009;
    function renderLayers() {
        var myPropsProps = setupLayers(0);
        var unavailableProps = setupLayers(1);
        var forSaleProps = setupLayers(3);
        var myListedProps = setupLayers(4);
        // console.log(sellingLayer)
        var layer = [myPropsProps, unavailableProps, forSaleProps, myListedProps];
        // return [layer, clickedLayer];
        setLayers([layer]);
    }
    var getClickedLayer = function () {
        var clickedLayer = null;
        if (newData) {
            var testData = { type: 'FeatureCollection', features: newData };
            clickedLayer = new layers_1.GeoJsonLayer({
                id: 'clicked-geojson-layer',
                data: testData,
                pickable: true,
                stroked: false,
                filled: true,
                autoHighlight: true,
                highlightColor: [140, 80, 236],
                getFillColor: [140, 80, 236, 80],
                getRadius: 100,
                onClick: function (event) {
                    console.log(event);
                    return true;
                }
            });
        }
        return clickedLayer;
    };
    var ICON = "M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3\n  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9\n  C20.1,15.8,20.2,15.8,20.2,15.7z";
    var goToLocation = function (coords, _type) {
        if (_type === void 0) { _type = 1; }
        var SIZE = 40;
        // console.log(coords);
        console.log(coords);
        var col = '';
        if (account) {
            col = '#f08778';
        }
        else {
            col = '#5540c7';
        }
        if (_type === 1) {
            setMarker(react_1["default"].createElement(react_map_gl_3.Marker, { captureClick: false, longitude: coords.longitude + DELTA / 2, latitude: coords.latitude - DELTA / 2 },
                react_1["default"].createElement("svg", { height: SIZE, viewBox: "0 0 24 24", style: {
                        cursor: 'pointer',
                        fill: col,
                        stroke: 'none',
                        transform: "translate(" + -SIZE / 2 + "px," + -SIZE + "px)"
                    } },
                    react_1["default"].createElement("path", { d: ICON }))));
        }
        else {
            setMarker(react_1["default"].createElement(react_map_gl_3.Marker, { captureClick: false, longitude: coords.longitude + DELTA / 2, latitude: coords.latitude - DELTA / 2 },
                react_1["default"].createElement("svg", { width: "25", height: "25", viewBox: "0 0 104 104", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1["default"].createElement("circle", { cx: "52", cy: "52", r: "52", fill: "#5540C7", fillOpacity: "0.5" }),
                    react_1["default"].createElement("circle", { cx: "52", cy: "52", r: "39", fill: "#5540C7" }))));
        }
        var myView = __assign(__assign({}, viewport), { latitude: coords.latitude, longitude: coords.longitude, zoom: 11, transitionDuration: 5000, transitionInterpolator: new react_map_gl_1.FlyToInterpolator(), transitionEasing: d3_ease_1.easeCubic });
        // const tokenIndex = '41.022,78.445'; //(truncateLon(coords.longitude), truncateLat(coords.latitude));
        // if (!!library) {
        //     library.getBlockNumber().then((blockn: any) => {
        //         eventBlock = blockn;
        //     });
        // }
        // tokenInstance
        //     .queryFilter(
        //         {
        //             topics: [null, tokenIndex],
        //         },
        //         startBlock,
        //     )
        //     .then((logs: any) => NormalizeEvent(logs, connector))
        //     // .then((queriedProperties: IProperty[]) => setProperties(queriedProperties))
        //     .catch((error: Error) => console.error(error));
        setViewport(myView);
    };
    // console.log('connector', connector);
    var goToUserLocation = function () {
        navigator.geolocation.getCurrentPosition(function (e) {
            goToLocation({ latitude: e.coords.latitude, longitude: e.coords.longitude }, 0);
        });
    };
    // const goTo = (e:)
    var searchOnChange = function (e) {
        // console.log(e.target.value);
        if (e === '') {
            console.log('TEST');
            setSearchResults([]);
            return;
        }
        axios_1["default"]
            .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + e + ".json?types=place,poi,address&limit=10&autocomplete=true&access_token=" + process.env.REACT_APP_MAPBOX_GL_KEY + "&language=en")
            .then(function (res) {
            var queryResults = res.data.features;
            setSearchResults(queryResults);
            console.log(queryResults);
        })["catch"](function (e) {
            console.log(e);
        });
    };
    var searchSubmitHandler = function (e) {
        // Add custom locations (replace Los%20Angeles with e.target.value, make sure you encode your text)
        axios_1["default"]
            .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + e + ".json?access_token=" + process.env.REACT_APP_MAPBOX_GL_KEY)
            .then(function (res) {
            console.log(res);
            //my_properties();
            var _a = res.data.features[0].center, longitude = _a[0], latitude = _a[1];
            goToLocation({ latitude: latitude, longitude: longitude });
            setSearchResults([]);
        })["catch"](function (e) {
            console.log(e);
        });
    };
    function onZoom(view) {
        view.zoom < 11 ? setCluster(true) : setCluster(false);
    }
    var getText = function () {
        // const price = await weiToEther(popupData?.landprice);
        if (loading) {
            return (react_1["default"].createElement(core_3.Typography, { style: { maxWidth: '160px', marginLeft: '10px' } }, "Your transaction is in progress. Please wait."));
        }
        if (popupData === null || popupData === void 0 ? void 0 : popupData.isOwned) {
            if ((popupData === null || popupData === void 0 ? void 0 : popupData.tokenOwner) === account) {
                // setPopupData({...popupData, type: PopupStyle[0]})
                // setCurrentPopupStyle(PopupStyle[0])
                return (react_1["default"].createElement(core_3.Typography, { style: { maxWidth: '160px', marginLeft: '10px' } },
                    "You listed this property for ",
                    (popupData === null || popupData === void 0 ? void 0 : popupData.landprice) / ETHER,
                    " ETH."));
            }
            if (popupData === null || popupData === void 0 ? void 0 : popupData.isSelling) {
                // setCurrentPopupStyle(PopupStyle[2])
                return (react_1["default"].createElement(core_3.Typography, { style: { maxWidth: '160px', marginLeft: '10px' } },
                    "For sale for ",
                    (popupData === null || popupData === void 0 ? void 0 : popupData.landprice) / ETHER,
                    " ETH."));
            }
            else {
                // setCurrentPopupStyle(PopupStyle[1])
                return (react_1["default"].createElement(core_3.Typography, { style: { maxWidth: '160px', marginLeft: '10px' } }, "This land is already owned."));
            }
        }
        else {
            // setCurrentPopupStyle(PopupStyle[2])
            return (react_1["default"].createElement(core_3.Typography, { style: { maxWidth: '160px', marginLeft: '10px' } },
                "For sale for ",
                (popupData === null || popupData === void 0 ? void 0 : popupData.landprice) / ETHER,
                " ETH"));
        }
    };
    var getStyle = function () {
        if (popupData === null || popupData === void 0 ? void 0 : popupData.isOwned) {
            if ((popupData === null || popupData === void 0 ? void 0 : popupData.tokenOwner) === account)
                return PopupStyle[0];
            if (popupData === null || popupData === void 0 ? void 0 : popupData.isSelling)
                return PopupStyle[2];
            else
                return PopupStyle[1];
        }
        else
            return '';
    };
    var getButton = function () {
        var userFeedback = '';
        if (loading) {
            userFeedback = 'You have a transaction in progress, please complete it before initiating a new transaction';
        }
        else if (!account) {
            userFeedback = 'Login to your wallet to initiate a transaction';
        }
        else if (!Auth_1["default"].getAuth()) {
            userFeedback =
                'You are not logged in, please create an account or login to an existing one to initiate a tranasaction';
        }
        else if (!currentUser.isVerified) {
            userFeedback = 'Please verify your account before initiating any transactions';
        }
        // const price = await weiToEther(popupData?.landprice);
        console.log(userFeedback);
        if (popupData.isOwned) {
            console.log(userFeedback);
            if (popupData.tokenOwner === account) {
                // setPopupData({...popupData, type: PopupStyle[0]})
                if (popupData.isSelling) {
                    return (react_1["default"].createElement(react_1["default"].Fragment, null,
                        loading && react_1["default"].createElement(core_3.CircularProgress, { size: 24, className: "progress" }),
                        react_1["default"].createElement(core_3.Tooltip, { title: userFeedback },
                            react_1["default"].createElement("span", null,
                                react_1["default"].createElement(core_4.Button, { disabled: loading || !account || !Auth_1["default"].getAuth() || !currentUser.isVerified, onClick: function (_e) {
                                        removeSellProperty(pointY, pointX);
                                    }, className: "LoginButton-header" },
                                    ' ',
                                    "Delist Land")))));
                }
                else {
                    return (react_1["default"].createElement(react_1["default"].Fragment, null,
                        loading && react_1["default"].createElement(core_3.CircularProgress, { size: 24, className: "progress" }),
                        react_1["default"].createElement(core_3.Tooltip, { title: userFeedback },
                            react_1["default"].createElement("span", null,
                                react_1["default"].createElement(core_4.Button, { disabled: loading || !account || !Auth_1["default"].getAuth() || !currentUser.isVerified, onClick: initSellProp, className: "LoginButton-header" }, "Sell")))));
                }
            }
            if (popupData.isSelling) {
                return (react_1["default"].createElement(react_1["default"].Fragment, null,
                    loading && react_1["default"].createElement(core_3.CircularProgress, { size: 24, className: "progress" }),
                    react_1["default"].createElement(core_3.Tooltip, { title: userFeedback },
                        react_1["default"].createElement("span", null,
                            react_1["default"].createElement(core_4.Button, { disabled: loading || !account || !Auth_1["default"].getAuth() || !currentUser.isVerified, onClick: function (_e) { return buyProperty(pointY, pointX, (popupData === null || popupData === void 0 ? void 0 : popupData.landprice) / ETHER); }, className: "LoginButton-header" },
                                "Purchase for ",
                                (popupData === null || popupData === void 0 ? void 0 : popupData.landprice) / ETHER,
                                " ETH")))));
            }
            else {
                return (react_1["default"].createElement(react_1["default"].Fragment, null,
                    loading && react_1["default"].createElement(core_3.CircularProgress, { size: 24, className: "progress" }),
                    react_1["default"].createElement(core_3.Tooltip, { title: userFeedback },
                        react_1["default"].createElement("span", null,
                            react_1["default"].createElement(core_4.Button, { disabled: true, onClick: function (_e) { return buyProperty(pointY, pointX, (popupData === null || popupData === void 0 ? void 0 : popupData.landprice) / ETHER); }, className: "LoginButton-header" }, "Purchase")))));
            }
        }
        else {
            // setPopupData({...popupData, type: PopupStyle[2]})
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                loading && react_1["default"].createElement(core_3.CircularProgress, { size: 24, className: "progress" }),
                react_1["default"].createElement(core_3.Tooltip, { title: userFeedback },
                    react_1["default"].createElement("span", null,
                        react_1["default"].createElement(core_4.Button, { disabled: loading || !account || !Auth_1["default"].getAuth() || !currentUser.isVerified, onClick: function (_e) { return buyProperty(pointY, pointX, (popupData === null || popupData === void 0 ? void 0 : popupData.landprice) / ETHER); }, className: "LoginButton-header" }, "Purchase")))));
        }
    };
    var handleClose = function () {
        setSellingStarted(false);
    };
    var initSellProp = function () {
        setSellingStarted(true);
    };
    var handleCloseSnackbar = function () {
        setOpenSnackbar(false);
    };
    // const checkArray = (arr: any, element: any) => {
    //     const coords = element.join(',');
    //     let found = false;
    //     arr.forEach((e: any) => {
    //         if (e.coordinates.join(',') === coords) {
    //             console.log('MATCH FOUND');
    //             found = true;
    //         }
    //         // break;
    //     });
    //     return found;
    // };
    var getWishlistIcon = function () {
        // if lat and lon is in any of the wishlist items, then add a toggle off
        console.log(wishlist);
        var liked = wishlist.some(function (e) { return e.coordinates.join(',') === [pointX, pointY].join(','); });
        if (loadingWishlistButton) {
            console.log('WISHLIST RELOAD');
        }
        // console.log(test);
        // wishlist.some()
        // Otherwise return the normal icon
        if (liked) {
            return (react_1["default"].createElement(core_3.IconButton, { disabled: !account || !Auth_1["default"].getAuth() || loadingWishlistButton, onClick: function (_e) {
                    removeFromWishlist(pointX, pointY);
                } },
                react_1["default"].createElement("img", { style: { width: '25px' }, src: heartfull_svg_1["default"], alt: "" })));
        }
        else {
            return (react_1["default"].createElement(core_3.IconButton, { disabled: !account || !Auth_1["default"].getAuth() || loadingWishlistButton, onClick: function (_e) {
                    addToWishlist(pointX, pointY);
                } },
                react_1["default"].createElement("img", { style: { width: '25px' }, src: heartoutline_svg_1["default"], alt: "" })));
        }
    };
    // const locationContext = useContext(LocationContext);
    // useEffect(() => {
    //     console.log('running onClick...');
    //     onClick({ coordinate: locationContext.location });
    // }, [locationContext.location]);
    // <Alert severity="error">This is an error message!</Alert>
    // <Alert severity="warning">This is a warning message!</Alert>
    // <Alert severity="info">This is an information message!</Alert>
    // <Alert severity="success">This is a success message!</Alert>
    var getCardContent = function () {
        // getW
        if (!account) {
            return (react_1["default"].createElement(core_3.CardContent, null,
                react_1["default"].createElement(core_3.Grid, { container: true, direction: "row", justify: "center", alignItems: "center" },
                    react_1["default"].createElement(core_3.Typography, null, "Cannot load property data, please sign in and connect a wallet to continue"))));
        }
        else if (!currentUser) {
            return (react_1["default"].createElement(core_3.CardContent, null,
                react_1["default"].createElement(core_3.Grid, { container: true, direction: "row", justify: "center", alignItems: "center" },
                    react_1["default"].createElement(core_3.Typography, null, "Cannot load property data, please sign in and connect a wallet to continue"))));
        }
        else if (!popupData || loadingWishlistButton) {
            return (react_1["default"].createElement(core_3.CardContent, null,
                react_1["default"].createElement(core_3.Grid, { container: true, direction: "row", justify: "center", alignItems: "center" },
                    react_1["default"].createElement(core_3.CircularProgress, null))));
        }
        else {
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(core_3.CardContent, null,
                    react_1["default"].createElement(core_3.Grid, { container: true, direction: "row", justify: "space-between", alignItems: "center" },
                        react_1["default"].createElement("h1", { style: { fontFamily: 'Gibson', margin: '1px', maxWidth: '65%' } }, popupData === null || popupData === void 0 ? void 0 : popupData.placeName),
                        getWishlistIcon()),
                    react_1["default"].createElement("p", { style: { fontFamily: 'Gibson', margin: '1px', color: '#f08778' } },
                        pointY,
                        ", ",
                        pointX)),
                react_1["default"].createElement(core_3.CardActions, null,
                    react_1["default"].createElement(core_3.Grid, { container: true, direction: "row", justify: "space-between", alignItems: "center" },
                        getText(),
                        getButton()))));
        }
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(core_3.Snackbar, { open: openSnackbar, autoHideDuration: 6000, onClose: handleCloseSnackbar }, notificationMessage),
        react_1["default"].createElement(Header_1["default"], { triedEager: triedEager, toggleMapStyle: toggleMapStyle, goToUserLocation: goToUserLocation, onChangeListener: searchOnChange, submitHandler: searchSubmitHandler, searchResults: searchResults, initContracts: initContracts, myProperties: myProperties, mySellingProperties: mySellingProperties, goToLocation: goToLocation, wishlistResults: wishlist, account: account }),
        react_1["default"].createElement(core_3.Dialog, { fullWidth: true, PaperProps: {
                style: {
                    // maxHeight: ITEM_HEIGHT * 20,
                    padding: '30px',
                    borderRadius: '10px'
                }
            }, open: sellingStarted, onClose: handleClose, "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description" },
            react_1["default"].createElement(core_3.DialogTitle, { id: "alert-dialog-title" }, "List Your Property"),
            react_1["default"].createElement(core_3.DialogContent, null,
                react_1["default"].createElement(core_3.DialogContentText, { id: "alert-dialog-description" }, "Select a listing price for your property")),
            react_1["default"].createElement(core_3.DialogActions, null,
                react_1["default"].createElement(core_3.TextField, { onChange: function (e) {
                        setListingPrice(e.target.value);
                    }, id: "standard-basic", label: "Listing Price", value: listingPrice }),
                react_1["default"].createElement(core_4.Button, { onClick: handleClose, color: "primary" }, "Cancel"),
                react_1["default"].createElement(core_4.Button, { onClick: function (_e) {
                        handleClose();
                        sellProperty(pointY, pointX, listingPrice);
                    }, color: "primary", autoFocus: true }, "List Item"))),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "MapTypeSelect", style: { position: 'absolute', bottom: 75, left: 75, zIndex: 1 } },
                react_1["default"].createElement(core_3.IconButton, { className: currentMapStyle === MapStyle[0] ? 'SatelliteView' : 'MapView', onClick: function () {
                        console.log(currentMapStyle);
                        toggleMapStyle();
                    } })),
            react_1["default"].createElement("div", { className: "ColorList", style: { backgroundColor: 'white', position: 'absolute', bottom: 200, left: 75, zIndex: 1 } },
                react_1["default"].createElement("legend", { className: legendClasses.root },
                    react_1["default"].createElement("div", { className: legendClasses.container },
                        react_1["default"].createElement("div", { className: "legend-owned", style: { width: '15px', height: '15px', backgroundColor: 'rgba(118, 167, 255, 255)' } }),
                        react_1["default"].createElement("span", { style: { fontSize: '10px', color: 'black', marginLeft: '3px' } }, "My Properties")),
                    react_1["default"].createElement("div", { className: legendClasses.container },
                        react_1["default"].createElement("div", { className: "legend-selling", style: { width: '15px', height: '15px', backgroundColor: '#7AD4D4' } }),
                        react_1["default"].createElement("span", { style: { fontSize: '10px', color: 'black', marginLeft: '3px' } }, "Listed")),
                    react_1["default"].createElement("div", { className: legendClasses.container },
                        react_1["default"].createElement("div", { className: "legend-listed", style: { width: '15px', height: '15px', backgroundColor: 'rgba(0, 255, 9, 75)' } }),
                        react_1["default"].createElement("span", { style: { fontSize: '10px', color: 'black', marginLeft: '3px' } }, "Available")),
                    react_1["default"].createElement("div", { className: legendClasses.container },
                        react_1["default"].createElement("div", { className: "legend-nfs", style: { width: '15px', height: '15px', backgroundColor: 'rgba(215, 215, 215, 145)' } }),
                        react_1["default"].createElement("span", { style: { fontSize: '10px', color: 'black', marginLeft: '3px' } }, "Unavailable")))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(core_3.IconButton, { style: { position: 'absolute', bottom: 150, right: 75, zIndex: 1 }, className: "location", onClick: function () {
                        goToUserLocation();
                    } },
                    react_1["default"].createElement("img", { style: { width: '22px' }, src: location_black_svg_1["default"], alt: "" }))),
            react_1["default"].createElement(react_2["default"], { ContextProvider: react_map_gl_1._MapContext.Provider, layers: cluster ? clusterLayer : [layers, getClickedLayer()], initialViewState: viewport, controller: true, views: MAP_VIEW, onViewStateChange: function (_a) {
                    var viewState = _a.viewState;
                    onZoom(viewState);
                }, onClick: onClick },
                react_1["default"].createElement("div", { className: "MapZoomBtn", style: { position: 'absolute', bottom: 75, right: 75, zIndex: 1 } },
                    react_1["default"].createElement(core_3.IconButton, { className: currentMapStyle === MapStyle[0] ? 'SatelliteView' : 'MapView', onClick: function () {
                            console.log(currentMapStyle);
                            toggleMapStyle();
                        } })),
                react_1["default"].createElement("div", { style: { backgroundColor: 'white', position: 'absolute', bottom: 200, left: 75, zIndex: 1 } },
                    react_1["default"].createElement("legend", { className: legendClasses.root },
                        react_1["default"].createElement("div", { className: legendClasses.container },
                            react_1["default"].createElement("div", { className: "legend-owned", style: { width: '15px', height: '15px', backgroundColor: 'rgba(118, 167, 255, 255)' } }),
                            react_1["default"].createElement("span", { style: { fontSize: '10px', color: 'black', marginLeft: '3px' } }, "My Properties")),
                        react_1["default"].createElement("div", { className: legendClasses.container },
                            react_1["default"].createElement("div", { className: "legend-selling", style: { width: '15px', height: '15px', backgroundColor: '#7AD4D4' } }),
                            react_1["default"].createElement("span", { style: { fontSize: '10px', color: 'black', marginLeft: '3px' } }, "Listed")),
                        react_1["default"].createElement("div", { className: legendClasses.container },
                            react_1["default"].createElement("div", { className: "legend-listed", style: { width: '15px', height: '15px', backgroundColor: 'rgba(0, 255, 9, 75)' } }),
                            react_1["default"].createElement("span", { style: { fontSize: '10px', color: 'black', marginLeft: '3px' } }, "Available")),
                        react_1["default"].createElement("div", { className: legendClasses.container },
                            react_1["default"].createElement("div", { className: "legend-nfs", style: { width: '15px', height: '15px', backgroundColor: 'rgba(215, 215, 215, 145)' } }),
                            react_1["default"].createElement("span", { style: { fontSize: '10px', color: 'black', marginLeft: '3px' } }, "Unavailable")))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(core_3.IconButton, { style: { position: 'absolute', bottom: 150, right: 75, zIndex: 1 }, className: "location", onClick: function () {
                            goToUserLocation();
                        } },
                        react_1["default"].createElement("img", { style: { width: '22px' }, src: location_black_svg_1["default"], alt: "" }))),
                react_1["default"].createElement("div", { style: { position: 'absolute', bottom: 75, right: 75, zIndex: 1 } },
                    react_1["default"].createElement(core_3.Grid, { container: true, direction: "column", justify: "center", alignItems: "center" },
                        react_1["default"].createElement(react_map_gl_2.NavigationControl, { className: "NavigationCtrl", showCompass: false }))),
                react_1["default"].createElement(react_map_gl_2.Popup, { captureClick: true, className: openPopup ? 'open-popup' : 'hidden-popup', latitude: pointY, longitude: pointX + DELTA, closeButton: false, closeOnClick: false, onClose: function () { return closePopup(); }, anchor: "top-left" },
                    react_1["default"].createElement(core_3.Card, { className: popupData ? getStyle() : '', style: { padding: '20px' } }, getCardContent())),
                marker,
                react_1["default"].createElement(react_map_gl_1.StaticMap, { width: "100vw", height: "100vh", reuseMaps: true, mapStyle: currentMapStyle, preventStyleDiffing: true, mapboxApiAccessToken: MAPBOX_KEY })))));
};
exports["default"] = MapGL;
