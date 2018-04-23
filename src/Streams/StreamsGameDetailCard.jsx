import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StreamsGameDetailCard.css'

class StreamsGameDetailCard extends Component {

  static propTypes = {
    streamId: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    viewerCount: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
      </div>
    );
  };
}

export default StreamsGameDetailCard;
