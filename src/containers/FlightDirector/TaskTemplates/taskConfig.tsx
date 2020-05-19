import React, {useState} from "react";
import {Input, Button, Col, Card, CardBody} from "helpers/reactstrap";
import ValueInput from "../../../components/views/Tasks/core/ValueInput";
import EventPicker from "containers/FlightDirector/MissionConfig/EventPicker";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import uuid from "uuid";
import MacroConfig from "../../../components/views/Macros/macroConfig";
import {FaBan} from "react-icons/fa";
import {
  MacroAction,
  useRenameTaskTemplateMutation,
  useSetTaskTemplateReportTypesMutation,
  useSetTaskTemplateValuesMutation,
  useSetTaskMacroMutation,
  useSetTaskPreMacroMutation,
  useTaskTemplatesSubscription,
  useTaskDefinitionsQuery,
} from "generated/graphql";
import {useParams} from "react-router";

const TaskConfig: React.FC = () => {
  const {selectedTemplate} = useParams();

  const {data} = useTaskTemplatesSubscription();
  const {data: definitionsData} = useTaskDefinitionsQuery();

  const taskDefinitions = definitionsData?.taskDefinitions || [];
  const taskTemplates = data?.taskTemplatesUpdate || [];

  const taskTemplate = taskTemplates.find(t => t?.id === selectedTemplate);

  const definition = taskDefinitions.find(
    d => d.name === taskTemplate?.definition,
  );

  const [rename] = useRenameTaskTemplateMutation();
  const [setReportType] = useSetTaskTemplateReportTypesMutation();
  const [setValues] = useSetTaskTemplateValuesMutation();
  const [setMacros] = useSetTaskMacroMutation();
  const [setPreMacros] = useSetTaskPreMacroMutation();
  const updateReportTypes = (which: string, checked: boolean) => {
    const newReportTypes =
      (checked
        ? reportTypes?.concat(which)
        : reportTypes?.filter(c => c !== which)) || [];
    setReportType({
      variables: {
        id,
        reportTypes: newReportTypes.filter((a, i, arr) => arr.indexOf(a) === i),
      },
    });
  };

  if (!taskTemplate || !definition) return null;
  const {id, name, values, macros, preMacros, reportTypes = []} = taskTemplate;
  return (
    <Col sm={4} key={taskTemplate.id}>
      <h3>Template Config</h3>
      <Card style={{maxHeight: "70vh", overflowY: "auto"}}>
        <CardBody>
          <div>
            <label>Definition</label>
            <Input type="text" readOnly value={definition.name} />
            <label>Name</label>
            <Input
              type="text"
              defaultValue={name}
              onBlur={e => rename({variables: {id, name: e.target.value}})}
            />
            <label>Report Type</label>
            <div style={{display: "flex"}}>
              <label>
                Damage{" "}
                <input
                  type="checkbox"
                  checked={reportTypes?.includes("default")}
                  onChange={e => updateReportTypes("default", e.target.checked)}
                />
              </label>
              <label>
                R&D{" "}
                <input
                  type="checkbox"
                  checked={reportTypes?.includes("rnd")}
                  onChange={e => updateReportTypes("rnd", e.target.checked)}
                />
              </label>
              <label>
                Engineering{" "}
                <input
                  type="checkbox"
                  checked={reportTypes?.includes("engineering")}
                  onChange={e =>
                    updateReportTypes("engineering", e.target.checked)
                  }
                />
              </label>
            </div>
            <label>Values</label>

            {Object.keys(definition.valuesInput).map(v => (
              <ValueInput
                key={v}
                label={v}
                type={definition.valuesInput[v]}
                value={values?.[v]}
                definitionValue={definition.valuesValue[v]}
                onBlur={(value: unknown) =>
                  setValues({
                    variables: {
                      id,
                      values: {
                        ...values,
                        [v]: value,
                      },
                    },
                  })
                }
              />
            ))}
            <details>
              <summary>Macros</summary>
              <ConfigureMacro
                action={setMacros}
                id={id}
                macros={macros || []}
              />

              <ConfigureMacro
                pre
                action={setPreMacros}
                id={id}
                macros={preMacros || []}
              />
            </details>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export const ConfigureMacro: React.FC<{
  action?: (options?: any) => Promise<any>;
  id: string;
  macros: MacroAction[];
  pre?: boolean;
  label?: string;
}> = ({
  action,
  id,
  macros,
  pre,
  label = `Will be triggered when task is ${pre ? "created" : "complete"}`,
}) => {
  const [configureMacro, setConfigureMacro] = useState<MacroAction | null>(
    null,
  );
  const update = ({id: macroId, ...rest}: MacroAction) => {
    setConfigureMacro(macro => {
      return {...macro, ...rest, id: macro?.id || ""};
    });
  };

  if (configureMacro) {
    return (
      <div className="macro-config">
        <div style={{flex: 1}}>
          <label>Macro Config</label>
          <label>
            Delay
            <Input
              type="number"
              value={String(configureMacro.delay || 0)}
              onChange={e =>
                update({...configureMacro, delay: parseInt(e.target.value, 10)})
              }
            ></Input>
          </label>
          <MacroConfig action={configureMacro} updateAction={update} />
        </div>
        <Button
          size="sm"
          block
          color="success"
          onClick={() => {
            action?.({
              variables: {
                id,
                macros: macros.map(m =>
                  m.id === configureMacro.id ? {...m, ...configureMacro} : m,
                ),
              },
            });
            setConfigureMacro(null);
          }}
          style={{marginBottom: "20px"}}
        >
          Done Configuring Macro
        </Button>
      </div>
    );
  }
  return (
    <div>
      <label>
        {pre ? "Pre" : ""}Macros <small>{label}</small>
      </label>
      <EventPicker
        className={"btn btn-sm btn-success"}
        handleChange={e => {
          const {value: event} = e.target;
          action?.({
            variables: {
              id,
              macros: macros
                .map(({__typename, ...rest}) => rest)
                .concat({
                  event,
                  args: "{}",
                  delay: 0,
                  id: uuid.v4(),
                }),
            },
          });
        }}
      />
      {macros.map(m => (
        <div
          key={m.id || ""}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            <EventName id={m.event} label={m.event} />
          </span>{" "}
          <Button
            size="sm"
            color="warning"
            onClick={() => setConfigureMacro(m)}
          >
            Configure Macro
          </Button>{" "}
          <FaBan
            className="text-danger"
            onClick={() =>
              action?.({
                variables: {
                  id,
                  macros: macros
                    .map(({__typename, ...rest}) => rest)
                    .filter(mm => mm.id !== m.id),
                },
              })
            }
          />
        </div>
      ))}
    </div>
  );
};
export default TaskConfig;
