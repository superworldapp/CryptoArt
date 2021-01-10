// import React from 'react';

// const Footer = () => (
//     <div className='footer'>
//         <div className='container' style={{ bottom: 0 }}>
//             <div className='row justify-content-center'>
//                 <div className='col-auto'>
//                     <p>© Copyright @2020 Kole</p>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// export default Footer;
import React from "react"
//import {Link} from "gatsby"
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import facebook from "../static/images/icons/faceBook.svg";
import instagram from "../static/images/icons/instagram.svg";
import twitter from "../static/images/icons/twitter.svg";
import linkedin from "../static/images/icons/linkedInLogo.svg";
import youtube from "../static/images/icons/youTube.svg";
import tiktok from "../static/images/icons/tikTokLogo.svg";
import discord from "../static/images/icons/discord_round.svg";
import "./footer.css"
import {Telegram} from "@material-ui/icons";
// import FacebookIcon from '@material-ui/icons/Facebook';
// import TwitterIcon from '@material-ui/icons/Twitter';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import YouTubeIcon from '@material-ui/icons/YouTube';
// import {Telegram} from '@material-ui/icons'
//
// import { Icon } from '@iconify/react';
// import tiktokIcon from '@iconify/icons-simple-icons/tiktok';

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <Container maxWidth="lg" className="footer-container">
                    <Grid container spacing={3} className="footer-nav">
                        {/*contact*/}
                        <Grid item md={4} sm={4} xs={4} className="show-content">
                            <Typography variant="h6" className="header" color="inherit" gutterBottom component="h6"
                                        align="left">Contact
                            </Typography>
                            <Typography variant="body2" component="p" align="left">
                                <a href="mailto:info@superworldapp.com" className="email" style={{color: "inherit"}}>info@superworldapp.com</a>
                                <br/><a href="tel:1-212-362-2637" style={{color: "inherit", textDecoration: "none"}}>+1 (212) 362-2637</a>
                            </Typography>
                        </Grid>
                        {/*navigation*/}
                        <Grid item md={8} sm={8} xs={12}>
                            <Grid container justify="flex-end">
                                <Grid item md={3} xs={4} className="centered-small">
                                    <Typography variant="h6"  component="h6" className="header" color="inherit" gutterBottom
                                                 align="left">
                                        SuperWorld
                                    </Typography>
                                    <ul className="list">
                                        <li>
                                            <a href = "https://www.superworldapp.com/real-estate/" className="link" variant="body2"
                                                  component="a" >Virtual Real Estate
                                            </a>
                                        </li>
                                        <li>
                                            <a href = "https://www.superworldapp.com/mobile-app/" className="link" variant="subtitle1"
                                                  component="a">Mobile App
                                            </a>
                                        </li>
                                    </ul>
                                </Grid>
                                <Grid item md={3} xs={4} className="centered-small">
                                    <Typography variant="h6" className="header" color="inherit" gutterBottom
                                                component="h6" align="left">
                                        About
                                    </Typography>
                                    <ul className="list">
                                        <li>
                                            <a href= " https://www.superworldapp.com/about/OurTeam/" className="link" variant="subtitle1"
                                                  component="a">Our Team
                                            </a>
                                        </li>
                                        <li>
                                            <a href= "https://www.superworldapp.com/about/media/Media/" className="link" variant="subtitle1"
                                                  component="a">Media
                                            </a>
                                        </li>
                                        <li>
                                            <a className="link" href="https://angel.co/company/superworld"
                                               target="_blank" rel="noopener noreferrer" variant="subtitle1">Careers
                                            </a>
                                        </li>
                                    </ul>
                                </Grid>
                                <Grid item md={3} xs={4} className="centered-small">
                                    <Typography variant="h6" className="header" color="inherit" gutterBottom
                                                component="h6" align="left">
                                        Help Center
                                    </Typography>
                                    <ul className="list">
                                        <li>
                                            <a href= "https://www.superworldapp.com/contact/faq/FAQ/" className="link" 
                                            >FAQs
                                            </a>
                                        </li>
                                        <li>
                                            <a  className="link"
                                                  href= "https://www.superworldapp.com/contact/technicalResources/TechnicalResources/"
                                                  >Insider’s Guide
                                            </a>
                                        </li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/*social icons*/}
                    <Grid container spacing={3}>
                        <Grid item xl={3} lg={4} md={5} sm={5} xs={12}>
                            <Grid item component="div">
                                <ul className="social-media">
                                    <li>
                                        <a className="link1" href="https://m.facebook.com/superworldapp/"
                                           target="_blank" rel="noopener noreferrer">
                                            <img src={facebook} alt="facebook icon"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="link1" href="https://www.instagram.com/superworldapp"
                                           target="_blank" rel="noopener noreferrer">
                                            <img src={instagram} alt="instagram icon"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="link1" href="https://twitter.com/superworldapp"
                                           target="_blank" rel="noopener noreferrer">
                                            <img src={twitter} alt="twitter icon"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="link1" href="https://www.linkedin.com/company/superworldapp/"
                                           target="_blank" rel="noopener noreferrer">
                                            <img src={linkedin} alt="linkedin icon"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="link1"
                                           href="https://www.youtube.com/channel/UCqkWtBF9d5Xtj11cCtUiBiw"
                                           target="_blank" rel="noopener noreferrer">
                                            <img src={youtube} alt="youtube icon"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="link1" href="https://vm.tiktok.com/ZMJH13mHH/" target="_blank"
                                           rel="noopener noreferrer">
                                            <img src={tiktok} alt="tiktok icon"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="link1" href="https://t.me/superworldtoken" target="_blank"
                                           rel="noopener noreferrer">
                                            {/*<img src={telegram} alt="telegram icon"/>*/}
                                            <Telegram />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="link1" href="https://discord.gg/ZUMJjrg4nx" target="_blank"
                                           rel="noopener noreferrer">
                                            <img src={discord} alt="discord icon"/>
                                        </a>
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>
                        <Grid item md={2}/>
                    </Grid>

                    {/*terms*/}
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography align="left" variant="caption" className="copyright"
                                        component="p">© {new Date().getFullYear()}, {` `}
                                <a href="/" title={"superworld"} className="link1">SuperWorld Inc. </a>
                                All rights reserved.
                                &nbsp;
                                <a className="terms" href="https://www.superworldapp.com/legal/terms-of-use"
                                      variant="subtitle2"
                                      component="a"> Terms of use
                                </a>
                                &nbsp;   &nbsp;
                                <a className="terms" href="https://www.superworldapp.com/legal/privacy-policy"
                                      variant="subtitle2"
                                      component="a">Privacy policy
                                </a>
                            </Typography>


                            {/*<Grid container>*/}
                            {/*    <Grid item md={3} sm={3} xs={6} style={{display: 'flex'}}>*/}
                            {/*        <Link className="terms" to="/legal/terms-of-use"*/}
                            {/*              variant="subtitle2"*/}
                            {/*              component="a"> Terms of use*/}
                            {/*        </Link>*/}
                            {/*        <Link className="terms" to="/legal/privacy-policy"*/}
                            {/*              variant="subtitle2"*/}
                            {/*              component="a">Privacy policy*/}
                            {/*        </Link>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item md={3}>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item md={3} sm={3} xs={6} style={{display: 'flex'}}>*/}
                            {/*        <Link className="terms" to="/legal/privacy-policy"*/}
                            {/*              variant="subtitle2"*/}
                            {/*              component="a">Privacy policy*/}
                            {/*        </Link>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                </Container>
            </footer>
        </>
    )
}
