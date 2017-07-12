import React, { Component } from 'react';
import SensorContact from './SensorContact';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import { findDOMNode } from 'react-dom';
import assetPath from '../../../../helpers/assets';

import './style.scss';

function degtorad(deg) {
  return deg * (Math.PI / 180);
}

// Implement The following:
// weaponsRange

const SENSORCONTACT_SUB = gql`
  subscription SensorContactsChanged($sensorId: ID) {
    sensorContactUpdate(sensorId: $sensorId) {
      id
      name
      size
      color
      icon
      picture
      speed
      velocity {
        x
        y
        z
      }
      location {
        x
        y
        z
      }
      destination {
        x
        y
        z
      }
      infrared
      cloaked
      destroyed
    }
  }
`;

class GridDom extends Component {
  sensorContactsSubscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSORCONTACT_SUB,
        variables: { sensorId: this.props.sensor },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .mergeDeep({
              sensorContacts: subscriptionData.data.sensorContactUpdate
            })
            .toJS();
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    const {
      dimensions,
      data,
      core,
      moveSpeed,
      setSelectedContact,
      selectedContact,
      armyContacts,
      rings = 3,
      lines = 12
    } = this.props;
    const { sensorContacts: contacts } = data;
    const { width: dimWidth, height: dimHeight } = dimensions;
    const width = Math.min(dimWidth, dimHeight);
    const gridStyle = {
      width: width,
      height: width
    };
    const padding = core ? 15 : 0;
    const radius = width / 2 - padding;
    return (
      <div id="sensorGrid" style={gridStyle}>
        <div className="grid">
          {Array(rings).fill(0).map((_, i, array) =>
            <div
              key={`ring-${i}`}
              className="ring"
              style={{
                width: `${(i + 1) / array.length * 100}%`,
                height: `${(i + 1) / array.length * 100}%`
              }}
            />
          )}
          {Array(lines).fill(0).map((_, i, array) =>
            <div
              key={`line-${i}`}
              className="line"
              style={{
                transform: `rotate(${(i + 0.5) / array.length * 360}deg)`
              }}
            />
          )}
          {contacts.map(({ icon, destination: { x, y } }) =>
            <img
              draggable="false"
              src={assetPath(icon, 'default', 'svg', false)}
              style={{
                transform: `translate(${width / 2 * x}px, ${width / 2 * y}px)`
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

const CONTACTS_QUERY = gql`
  query Contacts($sensorsId: ID) {
    sensorContacts(sensorsId: $sensorsId) {
      id
      name
      size
      icon
      picture
      color
      speed
      velocity {
        x
        y
        z
      }
      location {
        x
        y
        z
      }
      destination {
        x
        y
        z
      }
      infrared
      cloaked
      destroyed
    }
  }
`;

export default graphql(CONTACTS_QUERY, {
  options: ({ sensor }) => ({ variables: { sensorsId: sensor } })
})(withApollo(GridDom));
