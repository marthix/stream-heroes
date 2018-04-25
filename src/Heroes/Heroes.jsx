import React, { Component } from 'react';
import update from 'immutability-helper';
import './Heroes.css';
import TopCard from './TopCard.jsx';
import PageLoader from '../shared/PageLoader.jsx';
import { HorizontalBar } from 'react-chartjs-2';

class Heroes extends Component {

  getInitialState = () => {
    return {
      selectedGameId: '488552',
      selectedHeroRoleToggle: 'HERO',
      selectedPlayViewToggle: 'PLAY',
      heroes: [],
      heroesCount: {},
      rolesCount: {},
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

    let heroesCount = {};
    let rolesCount = {};
    this.state.heroes.forEach((hero) => {
      if (!heroesCount[hero.name]) {
        heroesCount[hero.name] = 0;
      }
      if (!rolesCount[hero.role]) {
        rolesCount[hero.role] = 0;
      }
      ++rolesCount[hero.role];
      ++heroesCount[hero.name];
    })

    let orderedHeroes = {};
    Object.keys(heroesCount).sort().forEach(function(key) {
      orderedHeroes[key] = heroesCount[key];
    });

    let orderedRoles = {};
    Object.keys(rolesCount).sort().forEach(function(key) {
      orderedRoles[key] = rolesCount[key];
    });

    let topHero = Object.keys(heroesCount).reduce((a, b) => {
      return heroesCount[a] > heroesCount[b] ? a : b
    });

    let topRole = Object.keys(rolesCount).reduce((a, b) => {
      return rolesCount[a] > rolesCount[b] ? a : b
    });

    this.setState({
      heroesCount: orderedHeroes,
      rolesCount: orderedRoles,
      topRole: topRole,
      topHero: topHero
    })

  };

  render() {

    let heroes = [];
    let counts = [];

    for (let key in this.state.heroesCount) {
      if (this.state.heroesCount.hasOwnProperty(key)) {
        heroes.push(key);
        counts.push(this.state.heroesCount[key]);
      }
    }

    const chartData = {
        labels: heroes,
        datasets: [{
          backgroundColor: 'rgba(140, 158, 209, 0.4)',
          borderColor: 'rgba(140, 158, 209, 0.8)',
          borderWidth: 1,
          data: counts,
        }]
    }

    const chartOptions = {
      legend: { display: false },
      maintainAspectRatio: true,
      responsive: true,
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Streamers playing'
          }
        }]
      }
    }

    if (!this.state.isHeroDataLoaded) {
      return <PageLoader />
    } else {
      return (
        <div className="heroes">
          <div className="chart">
            <HorizontalBar
              data={chartData}
              width={19}
              height={9}
              options={chartOptions}
              />
          </div>
          <div className="top">
            <TopCard title="Role" topName={this.state.topRole} topCount={this.state.rolesCount[this.state.topRole]}/>
            <TopCard title="Hero" topName={this.state.topHero} topCount={this.state.heroesCount[this.state.topHero]}/>
          </div>
        </div>
      );
    }
  }

}

export default Heroes;
