import React from "react";
import gql from "graphql-tag.macro";
import {graphql, withApollo} from "react-apollo";
import {Input} from "helpers/reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import {FaBan} from "react-icons/fa";

const TACTICALMAP_SUB = gql`
  subscription TacticalMapUpdate {
    tacticalMapsUpdate {
      id
      name
      flight {
        id
      }
      frozen
      template
    }
  }
`;

const TacticalMapConfig = ({tacticalData, args, updateArgs}) => {
  if (tacticalData.loading || !tacticalData.tacticalMaps) return null;
  const {tacticalMaps} = tacticalData;
  return (
    <div className="tacticalmap-config">
      <SubscriptionHelper
        subscribe={() =>
          tacticalData.subscribeToMore({
            document: TACTICALMAP_SUB,
            updateQuery: (previousResult, {subscriptionData}) => {
              return Object.assign({}, previousResult, {
                tacticalMaps: subscriptionData.data.tacticalMapsUpdate,
              });
            },
          })
        }
      />
      <Input
        type="select"
        value="nothing"
        onChange={e => {
          updateArgs(
            "mapIds",
            args.mapIds ? args.mapIds.concat(e.target.value) : [e.target.value],
          );
        }}
      >
        <option value="nothing">Choose a tactical map</option>
        {tacticalMaps
          .filter(
            t =>
              t.template &&
              (!args.mapIds || (args.mapIds && !args.mapIds.includes(t.id))),
          )
          .map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
      </Input>
      <p>Flight Maps</p>
      <ul className="saved-list">
        {args.mapIds &&
          args.mapIds
            .map(id => tacticalMaps.find(t => t.id === id))
            .map(t => (
              <li key={t.id}>
                {t.name}{" "}
                <FaBan
                  className="text-danger"
                  onClick={() =>
                    updateArgs(
                      "mapIds",
                      args.mapIds.filter(id => id !== t.id),
                    )
                  }
                />
              </li>
            ))}
      </ul>
    </div>
  );
};

const TACTICALMAP_QUERY = gql`
  query TacticalMap {
    tacticalMaps {
      id
      name
      flight {
        id
      }
      frozen
      template
    }
  }
`;

export default graphql(TACTICALMAP_QUERY, {name: "tacticalData"})(
  withApollo(TacticalMapConfig),
);
