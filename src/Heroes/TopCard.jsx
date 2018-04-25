import React from 'react';
import PropTypes from 'prop-types';
import './TopCard.css'

const propTypes = {
  title: PropTypes.oneOf(['Hero', 'Role']).isRequired,
  topName: PropTypes.string.isRequired,
  topCount: PropTypes.number.isRequired,
};

function TopCard(props) {
  return (
    <div className="top-card">
      <h2>{'Top ' + props.title}</h2>
      <h1>{props.topName}</h1>
      <h3>{props.topCount + ' currently playing'}</h3>
    </div>
  );
}

TopCard.propTypes = propTypes;

export default TopCard;
