import React from "react";
import { Button } from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import FontAwesome from "react-fontawesome";
import { randomFromList } from "helpers/randomFromList";

const PROBES_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      id
      equipment {
        id
        name
      }
    }
  }
`;
const ProbeEquipment = ({ simulatorId, onChange, value }) => {
  return (
    <Query query={PROBES_QUERY} variables={{ simulatorId }} skip={!simulatorId}>
      {({ loading, data }) =>
        loading ? null : (
          <div>
            {Object.entries(value || {}).map(([id, count]) => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {data ? (
                  <select
                    value={id}
                    onChange={e => {
                      const { [id]: _, ...rest } = value;
                      onChange({ ...rest, [e.target.value]: count });
                    }}
                  >
                    {data.probes[0].equipment.map(i => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    defaultValue={id}
                    onBlur={e => {
                      const { [id]: _, ...rest } = value;
                      onChange({ ...rest, [e.target.value]: count });
                    }}
                  />
                )}
                <input
                  defaultValue={count}
                  type="number"
                  min={1}
                  max={5}
                  onBlur={e => onChange({ ...value, [id]: e.target.value })}
                />
                <FontAwesome
                  name="ban"
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const { [id]: myKey, ...rest } = value;
                    onChange(rest);
                  }}
                />
              </div>
            ))}
            <Button
              block
              size="sm"
              color="success"
              onClick={() =>
                onChange({
                  ...value,
                  [data
                    ? randomFromList(data.probes[0].equipment.map(e => e.id))
                    : "Sensors Array"]: Math.ceil(Math.random() + 1)
                })
              }
            >
              Add Equipment
            </Button>
          </div>
        )
      }
    </Query>
  );
};

export default ProbeEquipment;
