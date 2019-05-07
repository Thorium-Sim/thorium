import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { InputField } from "../../../generic/core";

const Stats = ({
  id,
  fighterCount,
  fighterDestroyedCount,
  enemyCount,
  enemyDestroyedCount
}) => {
  return (
    <div className="crm-stats">
      <div>
        (Alive/Total) Fighters : {fighterCount - fighterDestroyedCount} /{" "}
        {fighterCount}
      </div>
      <div>
        Enemies: {enemyCount - enemyDestroyedCount} /{" "}
        <Mutation
          mutation={gql`
            mutation EnemyCount($id: ID!, $count: Int!) {
              crmSetEnemyCount(id: $id, count: $count)
            }
          `}
        >
          {action => (
            <InputField
              onClick={e => action({ variables: { id, count: e } })}
              style={{ display: "inline-block", width: "30px" }}
              prompt={
                "What would you like to change the enemy count to? (This will adjust the destroyed count.)"
              }
            >
              {enemyCount}
            </InputField>
          )}
        </Mutation>
      </div>
    </div>
  );
};

export default Stats;
