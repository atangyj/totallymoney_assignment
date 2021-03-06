import React, { Component } from 'react';

import Page from 'components/elements/Page';
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
    const queries = this.props.location.search;
    fetch(`http://localhost:3001/check-eligible${queries}`)
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

  toggleSelectable() {
    const { selectable } = this.state;
    if (selectable) {
      this.unselectAllCards();
    }
    this.setState({ selectable: !selectable });
  }

  handleCardSelect(i, canSelect) {
    const cardlist = this.state.cardlist.slice();
    cardlist[i].selected = canSelect;
    this.setState({ cardlist });
  }

  unselectAllCards() {
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
        acc = acc + curr.credit_score;
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
        actionBtn={
          <Button
            onClick={() => this.handleCardSelect(i, !card.selected)}
            data-testid="card-select-btn"
          >
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
      <Page>
        <Layout className="cardList">
          <Header>Select Cards to See How Much Credits You Can Earn</Header>

          <div className="cardlist__action-bar">
            <div className="cardlist__action-result">
              <span>Credits </span>
              <span data-testid="card-total-credits">{this.setCredits()}</span>
            </div>
            <div className="cardlist__action">
              <Button
                type="button"
                onClick={() => {
                  this.toggleSelectable();
                }}
                data-testid="cardlist-select-btn"
              >
                {selectable ? 'Cancel' : 'Select'}
              </Button>
            </div>
          </div>

          <div className="cardlist__list">
            {cardlist.length === 0 ? 'No cards found' : list}
          </div>
        </Layout>
      </Page>
    );
  }
}
