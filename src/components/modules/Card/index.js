import React from 'react';
import { generatePath } from 'react-router-dom';

import Link from 'components/elements/Link';
import Button from 'components/elements/Button';
import cardImages from 'images/cards';

import './Card.scss';

const Card = ({ card, actionBtn, selectable }) => {
  const { card_type, card_details, card_features } = card;
  const imgSrc = cardImages.filter((card) => card.type === card_type)[0].image;

  return (
    <div className="card">
      <div className="card__img-container">
        <img src={imgSrc} alt={card_type} />
      </div>
      <div className="card__info">
        <h2 className="card__name">{card_details.name}</h2>
        <ul className="card__features-list">
          {card_features.map((feature, i) => (
            <div key={i}>
              <li key={i} className="card__feature">
                <i className="fas fa-check"></i> {feature}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="card__btn">
        {selectable ? (
          actionBtn
        ) : (
          <Link
            to={generatePath('/card_details/:card_type', {
              card_type: card_type,
            })}
          >
            <i className="fas fa-chevron-right"></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
