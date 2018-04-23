import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StreamGames.css'
import GameCard from './GameCard.jsx'

class StreamGames extends Component {

  static propTypes = {
    games: PropTypes.array,
    onSelectGame: PropTypes.func.isRequired
  };

  render() {
    return (
      <main className="container">

        {(() => {
          if (this.props.games.length > 0) {

            return this.props.games.map((game) => {
              let imageUrl = game.box_art_url.replace('{width}x{height}.jpg','') + '285x380.jpg';
              return <GameCard key={'game' + game.id} id={game.id} name={game.name} imageUrl={imageUrl} onSelected={this.props.onSelectGame} />
            })

          }

        })()}

      </main>
    );
  }
}

export default StreamGames;
