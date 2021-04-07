import React from "react"
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import facebook from "../../static/images/icons/faceBook.svg";
import instagram from "../../static/images/icons/instagram.svg";
import twitter from "../../static/images/icons/twitter.svg";
import linkedin from "../../static/images/icons/linkedInLogo.svg";
import youtube from "../../static/images/icons/youTube.svg";
import tiktok from "../../static/images/icons/tikTokLogo.svg";
import discord from "../../static/images/icons/discord_round.svg";
import telegram from "./icons/telegram-icon.svg";

import {Link} from 'react-router-dom';
import "./FooterComponent.scss"
// import Slide from "react-reveal";
import HubspotForm from "react-hubspot-form";

const Footer = () => {

	return (
		<>
			<footer className="footer">
				<section className="section footer-section">
					<Container maxWidth="lg">
						<Typography component="h2" variant="h2" color="primary" className="header" align="left">
							stay up to date
						</Typography>
					</Container>
					<Container maxWidth="lg" className="footer-container">
						<Grid container spacing={5} className="footer-nav">
							{/*Hubsp	ot Subscribe Form*/}
							<Grid item lg={5} md={6} sm={7} xs={12}>
								{/*<Slide bottom cascade duration={3000}>*/}
								<Typography component="p" variant="body1" color="primary"
														align="left"
														className="description-header"
														style={{
															paddingBottom: '20px',
															fontSize: '20px',
															fontWeight: '400',
															color: '#5540C6',
														}}>
									Receive our exclusive research report on virtual real estate, non-fungible
									tokens and digital assets.
								</Typography>
								<div className="hubspot-form">
									<HubspotForm
										portalId='8746200'
										formId='ca440f2c-b907-4d90-b4f6-8a28cbbf79d7'
										onSubmit={() => console.log('Submit!')}
										onReady={(form) => console.log('Form ready!')}
										loading={<div>Loading...</div>}
										cssClass='hubspot-form'
									/>
								</div>
								{/*</Slide>*/}
							</Grid>
							{/*Navigation*/}
							<Grid item lg={7} md={6} sm={12} xs={12}>
								<Grid container spacing={4} flex-wrap="wrap" className="align-end">
									<Grid item lg={3} md={5} sm={3} xs={6}>
										<Typography variant="h6" className="header" color="inherit" gutterBottom
																component="h6" align="left">
											SuperWorld
										</Typography>
										<ul className="list">
											<li>
												<Link className="link" to="/real-estate/" variant="body2"
															component="a">Virtual Real Estate
												</Link>
											</li>
											{/*<li>*/}
											{/*	<Link className="link" to="/nft/nft-salon/" variant="subtitle1"*/}
											{/*				component="a">NFT Salon*/}
											{/*	</Link>*/}
											{/*</li>*/}
											{/*/!*<li>*!/*/}
											{/*/!*    <Link className="link" to="/nft/starchamber/" variant="subtitle1"*!/*/}
											{/*/!*          component="a">NFT Star Chamber*!/*/}
											{/*/!*    </Link>*!/*/}
											{/*/!*</li>*!/*/}
											{/*<li>*/}
											{/*	<a className="link" href="https://forms.gle/RUaBWBdTCt9uYHeW6"*/}
											{/*		 target="_blank" rel="noopener noreferrer" variant="subtitle1">*/}
											{/*		Inner Circle*/}
											{/*	</a>*/}
											{/*</li>*/}
											{/*<li>*/}
											{/*	<a className="link" href="https://forms.gle/hVdagW8PRG2y2X2U7"*/}
											{/*		 target="_blank" rel="noopener noreferrer" variant="subtitle1">*/}
											{/*		Collector's Corner*/}
											{/*	</a>*/}
											{/*</li>*/}
											<li>
												<Link className="link" to="/mobile-app/" variant="subtitle1"
															component="a">Mobile App
												</Link>
											</li>
										</ul>
									</Grid>

									<Grid item lg={3} md={5} sm={3} xs={6}>
										<Typography variant="h6" className="header" color="inherit" gutterBottom
																component="h6" align="left">
											About
										</Typography>
										<ul className="list">
											<li>
												<Link className="link" to="/about/our-team/" variant="subtitle1"
															component="a">Our Team
												</Link>
											</li>
											<li>
												<Link className="link" to="/about/media/" variant="subtitle1"
															component="a">Media
												</Link>
											</li>
											<li>
												<a className="link" href="https://angel.co/company/superworld"
													 target="_blank" rel="noopener noreferrer" variant="subtitle1">
													Careers
												</a>
											</li>
											<li>
												<a className="link" href="https://superworldapp.tapfiliate.com/"
													 target="_blank" rel="noopener noreferrer" variant="subtitle1">
													#teamsuperworld
													<span role="img" aria-label="world and heart">🌍❤️</span>
												</a>
											</li>
										</ul>
									</Grid>
									<Grid item lg={3} md={5} sm={3} xs={6}>
										<Typography variant="h6" className="header" color="inherit"
																gutterBottom component="h6" align="left">
											Help Center
										</Typography>
										<ul className="list">
											<li>
												<Link className="link" to="/contact/faq/" variant="subtitle1"
															component="a">
													FAQs
												</Link>
											</li>
											<li>
												<Link className="link" to="/contact/technical-resources/"
															variant="subtitle1" component="a">
													Insider's Guide
												</Link>
											</li>
										</ul>
									</Grid>
									<Grid item lg={3} md={5} sm={3} xs={6}>
										<Typography variant="h6" className="header" color="inherit" gutterBottom
																component="h6" align="left">
											Contact
										</Typography>
										<ul className="list">
											<li>
												<a href="mailto:info@superworldapp.com" className="email"
													 style={{color: "inherit"}}>
													info@superworldapp.com
												</a>
											</li>
											<li>
												<a href="tel:1-212-362-2637" className="email"
													 style={{color: "inherit", textDecoration: "none"}}>
													+1 (212) 362-2637
												</a>
											</li>
										</ul>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						{/*Social Footer*/}
						<Grid container spacing={3} alignItems="center" className="social-container">
							<Grid item>
								<Typography variant="caption" className="copyright" component="p">
									© {new Date().getFullYear()}, {` `}
									SuperWorld Inc. All rights reserved.&nbsp;
									<span className="break-line">
                                    <Link className="terms" to="/legal/terms-of-use" variant="subtitle2" component="a">
                                        Terms of Service
                                    </Link>
										&nbsp; | &nbsp;
										<Link className="terms" to="/legal/privacy-policy" variant="subtitle2"
													component="a">
                                        Privacy policy
                                    </Link>
                                    </span>
								</Typography>
							</Grid>

							{/*social*/}
							<Grid item>
								<ul className="social-media">
									<li>
										<a className="link" href="https://m.facebook.com/superworldapp/"
											 target="_blank" rel="noopener noreferrer">
											<img src={facebook} alt="facebook icon"/>
										</a>
									</li>
									<li>
										<a className="link" href="https://www.instagram.com/superworldapp"
											 target="_blank" rel="noopener noreferrer">
											<img src={instagram} alt="instagram icon"/>
										</a>
									</li>
									<li>
										<a className="link" href="https://twitter.com/superworldapp"
											 target="_blank" rel="noopener noreferrer">
											<img src={twitter} alt="twitter icon"/>
										</a>
									</li>
									<li>
										<a className="link" href="https://www.linkedin.com/company/superworldapp/"
											 target="_blank" rel="noopener noreferrer">
											<img src={linkedin} alt="linkedin icon"/>
										</a>
									</li>
									<li>
										<a className="link"
											 href="https://www.youtube.com/channel/UCqkWtBF9d5Xtj11cCtUiBiw"
											 target="_blank" rel="noopener noreferrer">
											<img src={youtube} alt="youtube icon"/>
										</a>
									</li>
									<li>
										<a className="link" href="https://vm.tiktok.com/ZMJH13mHH/" target="_blank"
											 rel="noopener noreferrer">
											<img src={tiktok} alt="tiktok icon"/>
										</a>
									</li>
									<li>
										<a className="link" href="https://t.me/superworldtoken" target="_blank"
											 rel="noopener noreferrer">
											<img src={telegram} alt="telegram icon" style={{maxWidth: '30px'}}/>
										</a>
									</li>
									<li>
										<a className="link" href="https://discord.com/invite/ZUMJjrg4nx" target="_blank"
											 rel="noopener noreferrer">
											<img src={discord} alt="discord icon"/>
										</a>
									</li>
								</ul>
							</Grid>
						</Grid>
					</Container>
				</section>

			</footer>
		</>
	)
}

export default Footer;
