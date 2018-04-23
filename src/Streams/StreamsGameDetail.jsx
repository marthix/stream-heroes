import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StreamsGameDetail.css'

class StreamsGameDetail extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired
  };

  getInitialState = () => {
    return {
      streams: []
    };
  };
  state = this.getInitialState();

  componentDidMount = () => {
    this.loadStreamData(this.props.id);
  };

  loadStreamData = (gameId) => {

    fetch('https://api.twitch.tv/helix/streams?first=100&game_id=' + gameId, {
      headers: { 'Client-ID': 'n9iy3rdfyqyf6wt3xuwpwygh401qnc' }
    })
      .then((response) => {
        return response.json();
      })
      .then((streams) => {
        this.setState({
          streams: streams.data
        })
      });

  };

  render() {
    return (
      <div className="container-streams-game-detail">
        <button className="btn-back" onClick={this.props.onBackClick}>Back to All Games</button>
        <main className="container-streams">

          {(() => {
            if (this.state.streams.length > 0) {

              return this.state.streams.map((stream) => {
                console.log(stream);
              })

            }

          })()}

        </main>
      </div>
    );
  };
}

export default StreamsGameDetail;
