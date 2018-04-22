import React, { Component } from 'react';
import './Home.css';
import twitchLogo from '../assets/images/logo-twitch-white.svg'

class Home extends Component {

  render() {
    return (
      <div className="home">

        <img src={twitchLogo} alt="purple Twitch logo" width="200px" />
        <span>This app is built on the Twitch API to provide you insights into the heroes people play while they stream.</span>
        <span>Currently, heroes stats are only available for Overwatch and Hearthstone through the Twitch API.</span>

      </div>
    );
  }
}

export default Home;
