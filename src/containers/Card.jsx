import React, { Component } from 'react';
import Layouts from '../components/layouts';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CardFrame extends Component {
  render() {
    if (this.props.data.loading){
      return <div />;
    }
    if (this.props.data.error){
      console.log('ERROR',this.props.data.error)
    }
    let { simulators} = this.props.data;
    let currentStation// = stationsData[0] || {};
    let currentSimulator = simulators[0] || {};
    let params;
    let data = this.props.data;
    if (this.props.test){
      currentStation = {};
      params = {
        simulatorId: 'test',
        stationId: 0,
        cardIndex: 0,
      }
      data.cardsData = [
      {id: 'test',
      name:'Test',
      component: (this.props.params.component || 'Navigation')}
      ]
    }
    const layoutName = currentStation.layout || currentSimulator.layout || 'LayoutCorners';
    let LayoutComponent = Layouts[layoutName];
    if (!LayoutComponent) LayoutComponent = Layouts.LayoutDefault;
    return <LayoutComponent {...this.props} params={params} data={data}  />;
  }
}

const CardData = gql`
query GetCardData($id: String){
  simulators(id: $id){
    id
    name
    alertlevel
    layout
  }
}`;

export default graphql(CardData, {
  options: (ownProps) => ({
    variables: {id: ownProps.test ? 'test' : ownProps.simulator}
  })
})(CardFrame);
