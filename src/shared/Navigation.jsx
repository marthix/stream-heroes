import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Navigation.css';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: window.location.pathname.substr(1)
    };
  }

  handleSelect = (link) => {
    this.setState({
      selected: link
    })
  };

  render() {
    return (
      <nav className="nav">
        <h1>Stream Heroes</h1>
        <ul>
          <li>
            <Link className={'link' + (this.state.selected === '' ? ' selected' : '')} onClick={() => { this.handleSelect(''); }} to="/">Home</Link>
          </li>
          <li>
            <Link className={'link' + (this.state.selected === 'heroes' ? ' selected' : '')} onClick={() => { this.handleSelect('heroes'); }} to="/heroes">Heroes</Link>
          </li>
          <li>
            <Link className={'link' + (this.state.selected === 'streams' ? ' selected' : '')} onClick={() => { this.handleSelect('streams'); }} to="/streams">Streams</Link>
          </li>
        </ul>
      </nav>
    );
  };
}

export default Navigation;
