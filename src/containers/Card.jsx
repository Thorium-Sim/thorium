import React, { Component } from 'react';
import Layouts from '../components/layouts';

export default class CardFrame extends Component {
  constructor(props) {
    super(props);
    if (props.test){
      this.state = {
        card: 'Test'
      }
    } else {
      this.state = {
        card: this.props.station.cards[0].name
      }
    }
  }
  _changeCard(name) {
    this.setState({
      card: name
    });
  }
  render() {
    const { simulator, station, flight, client} = this.props.test ? {
      simulator: {id: 'test', name: 'Test', alertLevel: '5', layout: 'LayoutCorners'},
      station: {name: 'Test', cards: [
      {id: 'test',
      name:'Test',
      component: (this.props.component || 'Navigation')}
      ]},
      flight: {},
      client: {loginState: 'login', loginName: 'Test'}
    } : this.props;
    const layoutName = station.layout || simulator.layout || 'LayoutCorners';
    let LayoutComponent = Layouts[layoutName] || Layouts.LayoutDefault;
    return <LayoutComponent clientObj={client} flight={flight} simulator={simulator} station={station} cardName={this.state.card} changeCard={this._changeCard.bind(this)} />;
  }
}

