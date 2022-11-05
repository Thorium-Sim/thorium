import React from "react";
import {FormGroup} from "helpers/reactstrap";
import {Label, Input} from "reactstrap";
import {useTaskFlowsConfigSubscription, TaskFlow} from "generated/graphql";

type CategorizedTaskFlows = {
  [category: string]: Pick<TaskFlow, "id" | "name" | "category">[];
};

export default ({
  updateArgs,
  args,
}: {
  updateArgs: (key: string, value: any) => void;
  args: {[key: string]: any};
}) => {
  const {data} = useTaskFlowsConfigSubscription();

  const categorizedList =
    data?.taskFlows.reduce((prev: CategorizedTaskFlows, next) => {
      prev[next.category] = prev[next.category]
        ? prev[next.category].concat(next)
        : [next];
      return prev;
    }, {}) || {};

  return (
    <FormGroup className="macro-template">
      <Label>
        Task Flow
        <Input
          type="select"
          value={args.id || "nothing"}
          onChange={e => updateArgs("id", e.target.value)}
        >
          <option value="nothing" disabled>
            Choose a Task Flow
          </option>
          {Object.entries(categorizedList).map(([key, value]) => (
            <optgroup key={key} label={key}>
              {value.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </optgroup>
          ))}
        </Input>
      </Label>
    </FormGroup>
  );
};
