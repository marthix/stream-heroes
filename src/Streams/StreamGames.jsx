import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StreamGames.css'
import StreamGameCard from './StreamGameCard.jsx'

class StreamGames extends Component {

  static propTypes = {
    games: PropTypes.array,
    onSelectGame: PropTypes.func.isRequired
  };

  static defaultProps = {
    games: []
  };

  render() {
    return (
      <main className="container-stream-games">

        {(() => {
          if (this.props.games.length > 0) {

            return this.props.games.map((game) => {
              let imageUrl = game.box_art_url.replace('{width}x{height}.jpg','') + '285x380.jpg';
              return <StreamGameCard key={'game' + game.id} id={game.id} name={game.name} imageUrl={imageUrl} onSelected={this.props.onSelectGame} />
            })

          }

        })()}

      </main>
    );
  };
}

export default StreamGames;
