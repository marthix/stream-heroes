import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StreamsGameDetail.css'

class StreamsGameDetail extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    onBackClick: PropTypes.func.isRequired
  };

  getInitialState = () => {
    return {
      streams: [],
      users: []
    };
  };
  state = this.getInitialState();

  componentDidMount = () => {
    this.loadStreamData(this.props.game.id);
  };

  loadUserData = (userIds) => {

    let params = '';
    userIds.forEach((id) => {
      params += (params === '' ? 'id=' : '&id=') + id;
    })

    fetch('https://api.twitch.tv/helix/users?' + params, {
      headers: { 'Client-ID': 'n9iy3rdfyqyf6wt3xuwpwygh401qnc' }
    })
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({
          users: users.data
        })
      });

  };

  loadStreamData = (gameId) => {

    fetch('https://api.twitch.tv/helix/streams?first=100&game_id=' + gameId, {
      headers: { 'Client-ID': 'n9iy3rdfyqyf6wt3xuwpwygh401qnc' }
    })
      .then((response) => {
        return response.json();
      })
      .then((streams) => {

        let users = streams.data.map((stream) => {
          return stream.user_id
        });

        this.loadUserData(users);

        this.setState({
          streams: streams.data
        });
      });

  };

  render() {
    return (
      <div className="container-streams-game-detail">
        <div className="stream-game-header">
          <button className="btn-back" onClick={this.props.onBackClick}>Back to All Games</button>
          <div>
            <h1>{this.props.game.name}</h1>
            <h3>Top 100 Current Streamers</h3>
          </div>
          <img src={this.props.game.imageUrl} width="90px"/>
        </div>
        <main className="container-streams">

          <table className="streams-game-table">
            <thead>
              <tr>
                <th></th>
                <th>Streamer</th>
                <th>Stream Title</th>
                <th>Viewers</th>
              </tr>
            </thead>
            <tbody>

              {(() => {
                if (this.state.streams.length > 0 && this.state.users.length > 0) {

                  return this.state.streams.map((stream) => {
                    let user = this.state.users.find(user => user.id === stream.user_id);
                    return (
                      <tr key={'stream' + stream.id}>
                        <td><img src={user.profile_image_url} alt={user.display_name + '\'s profile image'} width="40px" /></td>
                        <td><a href={'https://www.twitch.tv/' + user.login} target="_blank">{user.display_name}</a></td>
                        <td>{stream.title}</td>
                        <td>{stream.viewer_count}</td>
                      </tr>
                    );
                  })

                }

              })()}

            </tbody>
          </table>




        </main>
      </div>
    );
  };
}

export default StreamsGameDetail;
