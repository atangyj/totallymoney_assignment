import React from 'react';

import Link from 'components/elements/Link';
import LiquidCreditCard from 'images/credit_card_ad.png';
import StudentCard from 'images/credit_card_st.png';
import AnywhereCard from 'images/credit_card_travel.png';

import './Card.scss';

const cards = [
  { type: 'liquid_card', image: LiquidCreditCard },
  { type: 'student_card', image: StudentCard },
  { type: 'anywhere_card', image: AnywhereCard },
];

const Card = ({ card, to, toApply, toDetail }) => {
  const { card_type, card_details, card_features } = card;
  const imgSrc = cards.filter((card) => card.type === card_type)[0].image;
  console.log('card', card_features);

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
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default Card;
