/** @jsx jsx */
import {jsx, css} from "@emotion/core";
import {Col, Input} from "reactstrap";
import {useParams} from "react-router";
import {
  useTaskFlowsConfigSubscription,
  useTaskDefinitionsQuery,
  useTaskFlowStepEditTaskMutation,
} from "generated/graphql";
import {ConfigureMacro} from "./taskConfig";
import ValueInput from "components/views/Tasks/core/ValueInput";

const FlowTaskConfig = () => {
  const {flowId, stepId, taskId} = useParams();
  const {data} = useTaskFlowsConfigSubscription();
  const {data: definitionsData} = useTaskDefinitionsQuery();

  const [edit] = useTaskFlowStepEditTaskMutation();

  const taskFlow = data?.taskFlows.find(f => f.id === flowId);
  const step = taskFlow?.steps.find(s => s.id === stepId);
  const taskData = step?.tasks.find(t => t.id === taskId);

  const definition = definitionsData?.taskDefinitions.find(
    d => d.name === taskData?.definition,
  );
  if (!taskData || !definition) return null;
  const {id, ...task} = taskData;
  return (
    <Col
      sm={3}
      css={css`
        height: 100%;
        overflow-y: auto;
      `}
    >
      <h2>Task Config</h2>
      <label>Definition</label>
      <Input type="text" readOnly value={definition.name} />
      <label>Station</label>
      <small>
        Task will be automatically assigned to the appropriate station. To
        assign to a specific station, use the Task Flow config within the
        simulator config.
      </small>
      <label>
        <strong>Values</strong>
      </label>

      {Object.keys(definition.valuesInput).map(v => (
        <ValueInput
          key={v}
          label={v}
          type={definition.valuesInput[v]}
          value={task.values?.[v]}
          definitionValue={definition.valuesValue[v]}
          onBlur={(value: unknown) => {
            edit({
              variables: {
                id: flowId,
                stepId,
                taskId,
                task: {...task, values: {...task.values, [v]: value}},
              },
            });
          }}
        />
      ))}
      <details>
        <summary>Macros</summary>
        <ConfigureMacro
          action={params => {
            const newMacros = params?.variables?.macros;
            if (!newMacros) return Promise.resolve();
            return edit({
              variables: {
                id: flowId,
                stepId,
                taskId,
                task: {...task, macros: newMacros},
              },
            });
          }}
          id={taskId}
          macros={task.macros || []}
        />

        <ConfigureMacro
          action={params => {
            const newMacros = params?.variables?.macros;
            if (!newMacros) return Promise.resolve();
            return edit({
              variables: {
                id: flowId,
                stepId,
                taskId,
                task: {...task, preMacros: newMacros},
              },
            });
          }}
          pre
          id={taskId}
          macros={task.preMacros}
        />
      </details>
    </Col>
  );
};
export default FlowTaskConfig;
