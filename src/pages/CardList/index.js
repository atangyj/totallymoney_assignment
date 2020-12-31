import React, { Component } from 'react';

import Layout from 'components/elements/Layout';
import Card from 'components/modules/Card';
import Header from 'components/elements/Header';
import Button from 'components/elements/Button';

import './CardList.scss';

export default class EligibalCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardlist: [],
      isLoading: true,
      selectable: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const url = this.props.match.url.replace(/cardlist\//, 'check-eligible?');
    fetch(`http://localhost:3001${url}`)
      .then((resp) => resp.json())
      .then((data) => {
        const cardsWithStatus = this.addSelectStatusToCards(data.cardlist);
        this.setState({ isLoading: false, cardlist: cardsWithStatus });
      });
  }

  addSelectStatusToCards(cards) {
    const result = cards.map((card) => {
      card.selected = false;
      return card;
    });
    return result;
  }

  handleClick() {
    const { selectable } = this.state;
    if (selectable) {
      this.resetSelect();
    }
    this.setState({ selectable: !selectable });
  }

  handleSelect(i, canSelect) {
    console.log(i);
    const { cardlist } = this.state;
    const newState = cardlist.map((card, index) => {
      if (index === i) {
        card.selected = canSelect;
      }
      return card;
    });
    this.setState({ cardlist: newState });
  }

  resetSelect() {
    const { cardlist } = this.state;
    const newState = cardlist.map((card) => {
      card.selected = false;
      return card;
    });
    this.setState({ cardlist: newState });
  }

  setCredits() {
    const { cardlist } = this.state;
    const value = cardlist.reduce((acc, curr) => {
      if (curr.selected) {
        acc = acc + curr.card_details.credit_score;
      }
      return acc;
    }, 0);

    return value;
  }

  render() {
    const { cardlist, isLoading, selectable } = this.state;

    const list = cardlist.map((card, i) => (
      <Card
        key={i}
        card={card}
        selectable={selectable}
        addCard={() => this.addCard}
        actionBtn={
          <Button onClick={() => this.handleSelect(i, !card.selected)}>
            {card.selected ? (
              <i className="fas fa-minus"></i>
            ) : (
              <i className="fas fa-plus"></i>
            )}
          </Button>
        }
      />
    ));

    return isLoading ? (
      'Looking for your best matched cards...'
    ) : (
      <Layout className="cardList">
        <Header>Select Cards to See How Much Credits You Can Earn</Header>

        <div className="cardlist__action-bar">
          <div className="cardlist__action-result">
            <span>Credits </span>
            {this.setCredits()}
          </div>
          <div className="cardlist__action">
            <Button
              type="button"
              onClick={() => {
                this.handleClick();
              }}
            >
              {selectable ? 'Cancel' : 'Select'}
            </Button>
          </div>
        </div>

        <div className="cardlist__list">
          {cardlist.length === 0 ? 'No cards found' : list}
        </div>
      </Layout>
    );
  }
}
