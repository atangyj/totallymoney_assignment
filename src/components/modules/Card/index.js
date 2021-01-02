import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import cardImages from 'images/cards';

import './Card.scss';

const Card = ({ card, actionBtn, selectable }) => {
  const { card_type, card_features, card_name, credit_score } = card;
  const imgSrc = cardImages[card_type];
  console.log(imgSrc);

  return (
    <div className="card" data-testid="card">
      <div className="card__img-container">
        <img src={imgSrc} alt={card_type} />
      </div>

      <div className="card__info">
        <Link
          to={generatePath('/card_details/:card_type', {
            card_type: card_type,
          })}
        >
          <h2 className="card__name" data-testid="card-name">
            {card_name}
          </h2>
          <ul className="card__features-list">
            {card_features.map((feature, i) => (
              <div key={i}>
                <li
                  key={i}
                  className="card__feature"
                  data-testid="card-feature"
                >
                  <i className="fas fa-check"></i> {feature}
                </li>
              </div>
            ))}
          </ul>
        </Link>
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
      <div className="card__credit" data-testid="card-credit">
        {credit_score} credits
      </div>
    </div>
  );
};

export default Card;
