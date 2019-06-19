import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Table, Button } from "helpers/reactstrap";

const Fighters = ({ fighters, id }) => {
  return (
    <div className="crm-clients">
      <Table size="sm">
        <thead>
          <tr>
            <th>Client</th>
            <th>Station</th>
            <th>Docked</th>
            <th>Destroyed</th>
            <th>Frags</th>
          </tr>
        </thead>
        <tbody>
          {fighters.map(f => (
            <tr key={f.id}>
              <td>{f.client && f.client.id}</td>
              <td>{f.client && f.client.station.name}</td>
              <td>{f.docked ? "🔵" : null}</td>
              <td>
                {f.destroyed ? (
                  <>
                    🔴
                    <Mutation
                      mutation={gql`
                        mutation Restore($id: ID!, $clientId: ID!) {
                          crmRestoreFighter(id: $id, clientId: $clientId)
                        }
                      `}
                      variables={{ id, clientId: f.client && f.client.id }}
                    >
                      {action => (
                        <Button onClick={action} color="success" size="sm">
                          Restore
                        </Button>
                      )}
                    </Mutation>
                  </>
                ) : null}
              </td>
              <td>{f.frags}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Fighters;
