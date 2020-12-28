import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ card_type }) => {
  return (
    <div>
      <h1>{card_type}</h1>
    </div>
  );
};

export default Card;
