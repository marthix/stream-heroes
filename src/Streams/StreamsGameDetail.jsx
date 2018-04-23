import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StreamsGameDetail.css'

class StreamsGameDetail extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <button onClick={this.props.onBackClick}>Back to All Games</button>
        <main className="container">

          {this.props.id}

        </main>
      </div>
    );
  }
}

export default StreamsGameDetail;
