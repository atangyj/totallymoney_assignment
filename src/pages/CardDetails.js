import React, { Component } from 'react';

export default class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {},
    };
  }
  componentDidMount() {
    const { card_type } = this.props.match.params;

    fetch(`http://localhost:3001/card_details/${card_type.replace(' ', '%20')}`)
      .then((resp) => resp.json())
      .then((data) => this.setState({ card: data.card }));
  }
  render() {
    const { card_details } = this.state.card;
    const { apr, btod, pod, credit } = card_details || {};
    console.log(this.props);

    return card_details ? (
      <div>
        <button onClick={() => this.props.history.goBack()}>Back</button>
        <div>
          <h2>{apr.label}</h2>
          <p>{apr.value}</p>
        </div>

        <div>
          <h2>{btod.label}</h2>
          <p>{btod.value}</p>
        </div>

        <div>
          <h2>{pod.label}</h2>
          <p>{pod.value}</p>
        </div>

        <div>
          <h2>{credit.label}</h2>
          <p>{credit.value}</p>
        </div>
      </div>
    ) : (
      'Loading'
    );
  }
}
