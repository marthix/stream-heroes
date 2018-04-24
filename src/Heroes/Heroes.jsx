import React, { Component } from 'react';
import update from 'immutability-helper';

class Heroes extends Component {

  getInitialState = () => {
    return {
      selectedGame: 'OVERWATCH',
      selectedHeroRoleToggle: 'HERO',
      selectedPlayViewToggle: 'PLAY',
      heroes: []
    };
  };
  state = this.getInitialState();

  componentDidMount = () => {
    this.loadHeroData('488552');
  };

  gameIds = {
    '138585': 'hearthstone',
    '488552': 'overwatch'
  }

  loadHeroTracker = 0;
  loadHeroPagination = '';
  loadHeroData = (gameId) => {

    fetch('https://api.twitch.tv/helix/streams/metadata?first=100&game_id=' + gameId + '&after=' + this.loadHeroPagination, {
      headers: { 'Client-ID': 'n9iy3rdfyqyf6wt3xuwpwygh401qnc' }
    })
      .then((response) => {
        return response.json();
      })
      .then((heroesJson) => {

        let game = this.gameIds[gameId];
        let heroes = [];
        heroesJson.data.forEach((data) => {
          if (data[game]) {
            let hero = data[game].broadcaster.hero;
            if (hero) {
              heroes.push(hero);
            }
          }
        });

        var newHeroes = update(this.state.heroes, {$push: heroes});

        this.setState({
          heroes: newHeroes
        });

        // DANGEROUS: modify loadHeroTracker to get ALL the hero data. This can cause rate limit issues.
        // TODO: figure out rate limit requirements
        // if (heroesJson.data.length === 100) {
        if (heroesJson.data.length === 100 && this.loadHeroTracker < 3) {
          this.loadHeroPagination = heroesJson.pagination.cursor;
          this.loadHeroTracker++
          this.loadHeroData(gameId);
        }
      });

  };

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Heroes;
