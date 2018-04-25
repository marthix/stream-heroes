import React, { Component } from 'react';
import update from 'immutability-helper';
import './Heroes.css';
import TopCard from './TopCard.jsx'
import PageLoader from '../shared/PageLoader.jsx'

class Heroes extends Component {

  getInitialState = () => {
    return {
      selectedGameId: '488552',
      selectedHeroRoleToggle: 'HERO',
      selectedPlayViewToggle: 'PLAY',
      heroes: [],
      heroesCounts: {},
      rolesCounts: {},
      topHero: '',
      topRole: '',
      isHeroDataLoaded: false
    };
  };
  state = this.getInitialState();

  loadHeroDataIntervalId = '';
  componentDidMount = () => {
    this.loadHeroData(this.state.selectedGameId);
    this.loadHeroDataIntervalId = setInterval(() => {
      this.loadHeroCounter = 0;
      this.loadHeroData(this.state.selectedGameId);
    }, 30000);
  };

  componentWillUnmount() {
    clearTimeout(this.loadHeroDataIntervalId);
  }

  gameIds = {
    '138585': 'hearthstone',
    '488552': 'overwatch'
  };

  loadHeroCounter = 0;
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
        }, () => {

          // DANGEROUS: modify loadHeroCounter to get ALL the hero data. This can cause rate limit issues.
          // TODO: figure out rate limit requirements
          // if (heroesJson.data.length === 100) {
          if (heroesJson.data.length === 100 && this.loadHeroCounter < 3) {
            this.loadHeroPagination = heroesJson.pagination.cursor;
            this.loadHeroCounter++
            this.loadHeroData(gameId);
          } else {
            if (!this.state.isHeroDataLoaded) {
              this.setState({
                isHeroDataLoaded: true
              });
            }
            this.parseHeroAndRoleData();
          }

        });

      });

  };

  parseHeroAndRoleData = () => {

    let heroesCounts = {};
    let rolesCounts = {};
    this.state.heroes.forEach((hero) => {
      if (!heroesCounts[hero.name]) {
        heroesCounts[hero.name] = 0;
      }
      if (!rolesCounts[hero.role]) {
        rolesCounts[hero.role] = 0;
      }
      ++rolesCounts[hero.role];
      ++heroesCounts[hero.name];
    })

    let topHero = Object.keys(heroesCounts).reduce((a, b) => {
      return heroesCounts[a] > heroesCounts[b] ? a : b
    });

    let topRole = Object.keys(rolesCounts).reduce((a, b) => {
      return rolesCounts[a] > rolesCounts[b] ? a : b
    });

    this.setState({
      heroesCounts: heroesCounts,
      rolesCounts: rolesCounts,
      topRole: topRole,
      topHero: topHero
    })

  };

  render() {

    if (!this.state.isHeroDataLoaded) {
      return <PageLoader />
    } else {
      return (
        <div className="heroes">
          <div className="chart">

          </div>
          <div className="top">
            <TopCard title="Role" topName={this.state.topRole} topCount={this.state.rolesCounts[this.state.topRole]}/>
            <TopCard title="Hero" topName={this.state.topHero} topCount={this.state.heroesCounts[this.state.topHero]}/>
          </div>
        </div>
      );
    }
  }

}

export default Heroes;
