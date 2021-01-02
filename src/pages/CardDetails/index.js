import React, { Component } from 'react';

import Page from 'components/elements/Page';
import Layout from 'components/elements/Layout';
import Board from 'components/elements/Board';
import cardImages from 'images/cards';

import './CardDetails.scss';

export default class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {},
    };
  }
  componentDidMount() {
    const { card_type } = this.props.match.params;

    fetch(`http://localhost:3001/cards?card_type=${card_type}`)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ card: data[0] });
      });
  }
  render() {
    const {
      card_details,
      card_features,
      card_drawbacks,
      eligibility,
      card_name,
    } = this.state.card;
    const { key_facts } = card_details || {};
    const { card_type } = this.props.match.params;
    const imgSrc = cardImages[card_type];
    return (
      <Page>
        <Layout>
          {card_details ? (
            <div className="card-details">
              <div className="card-details__section">
                <div className="card-container">
                  <img src={imgSrc} alt={card_type} />
                  <h2 className="card-name">{card_name}</h2>
                </div>

                <div className="card-key-facts">
                  {key_facts.map((fact, i) => {
                    return (
                      <div className="card-fact" key={i}>
                        <h2 className="card-fact__label">{fact.label}</h2>
                        <p className="card-fact__value">{fact.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Board title="Featured Benefits" className="benefits">
                <ul>
                  {card_features.map((feature, i) => (
                    <li key={i} className="card__benefit">
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Board>

              <Board title="Keep in Mind" className="drawbacks">
                <ul>
                  {card_drawbacks.map((drawback, i) => (
                    <li key={i} className="card__drawback">
                      <i className="fas fa-check"></i>
                      {drawback}
                    </li>
                  ))}
                </ul>
              </Board>

              <Board title="Eligibility" className="eligibility">
                <ul>
                  {eligibility.map((eligible, i) => (
                    <li key={i} className="eligible__list">
                      <p className="eligible__criterion">
                        {eligible.criterion}
                      </p>
                      <span className="eligible__value">{eligible.value}</span>
                    </li>
                  ))}
                </ul>
              </Board>

              {/* <button onClick={() => this.props.history.goBack()}>Back</button> */}
            </div>
          ) : (
            'Loading'
          )}
        </Layout>
      </Page>
    );
  }
}
