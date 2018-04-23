import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StreamGameCard.css'

class StreamGameCard extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired
  };

  handleSelect = () => {
    this.props.onSelected(this.props.id);
  };

  render() {
    return (
      <div className="game" onClick={this.handleSelect}>
        <img src={this.props.imageUrl} alt={'Cover art for ' + this.props.name} />
        <p className="name" title={this.props.name}>{this.props.name}</p>
      </div>
    );
  };
}

export default StreamGameCard;
