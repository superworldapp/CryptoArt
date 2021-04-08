import React, { Component } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  InstapaperShareButton,
  InstapaperIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

class SocialShare extends Component {
  render() {
    return (
      <div>
        <FacebookShareButton
          url={'https://www.superworldapp.com/'}
          quote={
            'I am now the proud owner of an NFT from the SuperWorld NFT salon. Check it out: '
          }
          hashtag='#superworld'
        >
          <FacebookIcon size={36} round={true} />
        </FacebookShareButton>
        <EmailShareButton
          url={'https://www.superworldapp.com/'}
          body={
            'I am now the proud owner of an NFT from the SuperWorld NFT salon. Check it out: '
          }
          hashtag='#superworld'
        >
          <EmailIcon size={36} round={true} />
        </EmailShareButton>
        <TwitterShareButton
          url={'https://www.superworldapp.com/'}
          title={
            'I am now the proud owner of an NFT from the SuperWorld NFT salon. Check it out: '
          }
          hashtag='#superworld'
        >
          <TwitterIcon size={36} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton
          url={'https://www.superworldapp.com/'}
          title={
            'I am now the proud owner of an NFT from the SuperWorld NFT salon. Check it out: '
          }
          hashtag='#superworld'
        >
          <LinkedinIcon size={36} round={true} />
        </LinkedinShareButton>
      </div>
    );
  }
}

export default SocialShare;
