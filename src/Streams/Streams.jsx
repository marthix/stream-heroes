import React, { Component } from 'react';
import './Streams.css'
import StreamGames from './StreamGames.jsx'
import StreamsGameDetail from './StreamsGameDetail.jsx'

class Streams extends Component {

  getInitialState = () => {
    return {
      games: [],
      selectedGameId: ''
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

  handleGameSelected = (gameId) => {
    this.setState({
      selectedGameId: gameId
    });
  };

  render() {
    return (
      <div className="streams">

        {(() => {

          if (this.state.selectedGameId) {
            return <StreamsGameDetail id={this.state.selectedGameId} onBackClick={() => {this.setState({ selectedGameId: '' })}}/>
          } else {
            return <StreamGames games={this.state.games} onSelectGame={this.handleGameSelected} />;
          }

        })()}

      </div>
    );
  };
}

export default Streams;
