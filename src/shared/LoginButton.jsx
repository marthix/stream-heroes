import React, { Component } from 'react';

class LoginButton extends Component {

  getInitialState = () => {

    return {
      accessToken: '',
      idToken: '',
    };

  };
  state = this.getInitialState();

  componentDidMount = () => {

    if (window.location.hash.includes('access_token') && window.location.hash.includes('id_token')) {

      // handle Twitch authenticate redirect

      let hash = window.location.hash.substr(1);
      let accessToken = hash.substr(hash.indexOf('access_token=')).split('&')[0].split('=')[1];
      let idToken = hash.substr(hash.indexOf('id_token=')).split('&')[0].split('=')[1];

      localStorage.setItem('accessTokenTwitch', accessToken);
      localStorage.setItem('idTokenTwitch', idToken);

      window.location = window.location.pathname;

    } else {

      // check if user is already authenticated

      let accessToken = localStorage.getItem("accessTokenTwitch");
      let idToken = localStorage.getItem("idTokenTwitch");

      if (!idToken || !accessToken) {
        this.setState({ isAuthenticated: false });
      } else {
        this.setState({
          isAuthenticated: true,
          accessToken: accessToken,
          idToken: idToken
        });
      }

    }

  };

  handleLogin = () => {

    window.location = `https://id.twitch.tv/oauth2/authorize?client_id=n9iy3rdfyqyf6wt3xuwpwygh401qnc&redirect_uri=http://localhost:3000/&response_type=token+id_token&scope=openid`;

  };

  render() {
    return (
      <button onClick={this.handleLogin}>Login to Twitch</button>
    );
  };
}

export default LoginButton;
