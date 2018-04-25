import React from 'react';
import PropTypes from 'prop-types';
import './StreamGames.css'
import StreamGameCard from './StreamGameCard.jsx'

const propTypes = {
  games: PropTypes.array,
  onSelectGame: PropTypes.func.isRequired
};

const defaultProps = {
  games: []
};

function StreamGames(props) {

  return (
    <main className="container-stream-games">
      {(() => {
        if (props.games.length > 0) {

          return props.games.map((game) => {
            let imageUrl = game.box_art_url.replace('{width}x{height}.jpg','') + '285x380.jpg';
            return <StreamGameCard key={'game' + game.id} id={game.id} name={game.name} imageUrl={imageUrl} onSelected={props.onSelectGame} />
          })

        }
      })()}
    </main>
  );
}

StreamGames.propTypes = propTypes;
StreamGames.defaultProps = defaultProps;

export default StreamGames;
