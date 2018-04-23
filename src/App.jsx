import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navigation from './shared/Navigation.jsx';
import Home from './Home/Home.jsx';
import Heroes from './Heroes/Heroes.jsx';
import Streams from './Streams/Streams.jsx';

class App extends Component {

  componentDidMount = () => {

    // this.loadStreamData();
    // this.loadGameData(['488552', '138585']);

  };


  loadStreamData = (gameId) => {

    fetch('https://api.twitch.tv/helix/streams?first=20&game_id=' + gameId, {
      headers: { 'Client-ID': 'n9iy3rdfyqyf6wt3xuwpwygh401qnc' }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        // console.log(myJson);
      });

  }

  loadGameData = (gameIds) => {

    let params = '';
    gameIds.forEach((id) => {
      params += (params === '' ? 'id=' : '&id=') + id;
    })

    fetch('https://api.twitch.tv/helix/games?' + params, {
      headers: { 'Client-ID': 'n9iy3rdfyqyf6wt3xuwpwygh401qnc' }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        // console.log(myJson);
      });

  }

  loadHeroData = () => {

    fetch('https://api.twitch.tv/helix/streams/metadata?game_id=488552&game_id=138585&first=100', {
      headers: { 'Client-ID': 'n9iy3rdfyqyf6wt3xuwpwygh401qnc' }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        // console.log(myJson);
      });

  }

  render() {

    return (
      <Router>
        <div className="app">
          <Navigation />

          <Route exact path="/" component={Home} />
          <Route path="/heroes" component={Heroes} />
          <Route path="/streams" component={Streams} />
        </div>
      </Router>
    );
  }
}

export default App;
