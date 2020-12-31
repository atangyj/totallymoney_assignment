import React, { Component } from 'react';

import Layout from 'components/elements/Layout';
import Card from 'components/modules/Card';
import Header from 'components/elements/Header';

import './CardList.scss';

export default class EligibalCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCards: [],
      cardlist: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const url = this.props.match.url.replace(/cardlist\//, 'check-eligible?');

    fetch(`http://localhost:3001${url}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        this.setState({ isLoading: false, cardlist: data.cardlist });
      });
  }
  render() {
    const { cardlist, isLoading } = this.state;

    return isLoading ? (
      'Looking for your best matched cards...'
    ) : (
      <Layout className="CardList">
        <Header>Select Cards to See How Much Credits You Can Earn</Header>
        {cardlist.map((card, i) => {
          console.log(card);
          return <Card key={i} card={card} toApply="" toDetail="" />;
        })}
      </Layout>
    );
  }
}
