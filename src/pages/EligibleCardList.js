import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from 'components/Card';

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
      <div>
        {cardlist.map((card, i) => (
          <Link key={i} to={`/card_details/${card.card_type}`}>
            <Card key={i} card_type={card.card_type} />
          </Link>
        ))}
      </div>
    );
  }
}
