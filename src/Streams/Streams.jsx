import React, { Component } from 'react';
import './Streams.css'
import StreamGames from './StreamGames.jsx'
import StreamsGameDetail from './StreamsGameDetail.jsx'

class Streams extends Component {

  getInitialState = () => {
    return {
      games: [],
      selectedGame: {}
    };
  }
  state = this.getInitialState();

  componentDidMount = () => {

    this.loadTopGamesData();

  };

  loadTopGamesData = () => {

    fetch('https://api.twitch.tv/helix/games/top?first=100', {
      headers: { 'Client-ID': 'n9iy3rdfyqyf6wt3xuwpwygh401qnc' }
    })
      .then((response) => {
        return response.json();
      })
      .then((games) => {
        this.setState({
          games: games.data
        })
      });

  };

  handleGameSelected = (gameId, gameName, gameImageUrl) => {
    let game = {
      id: gameId,
      name: gameName,
      imageUrl: gameImageUrl
    };

    this.setState({
      selectedGame: game
    });
  };

  render() {
    return (
      <div className="streams">

        {(() => {

          if (Object.keys(this.state.selectedGame).length !== 0) {
            return <StreamsGameDetail game={this.state.selectedGame} onBackClick={() => {this.setState({ selectedGame: {} })}}/>
          } else {
            return <StreamGames games={this.state.games} onSelectGame={this.handleGameSelected} />;
          }

        })()}

      </div>
    );
  };
}

export default Streams;
