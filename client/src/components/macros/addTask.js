import React, { Fragment, Component } from "react";
import { Query, Mutation } from "react-apollo";
import {
  FormGroup,
  Label,
  Input,
  Badge,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import gql from "graphql-tag";
import ValueInput from "../views/Tasks/core/ValueInput";

/*
input TaskInput {
  simulatorId: ID
  definition: String
  values: JSON
  station: String
}
*/

const templateQueryData = `
id
name
definition
values`;

const QUERY = gql`
  query TaskDefinitions {
    taskDefinitions {
      id
      class
      name
      active
      stations {
        name
      }
      valuesInput
      valuesValue
    }
    taskTemplates {
   ${templateQueryData}
  }
  }
`;

class TasksCore extends Component {
  state = {
    selectedDefinition: "nothing",
    requiredValues: {}
  };
  updateTask = (key, value) => {
    const { updateArgs, args = {} } = this.props;
    const { taskInput = {} } = args;
    updateArgs("taskInput", { ...taskInput, [key]: value });
  };
  render() {
    const { taskDefinitions, taskTemplates = [], args = {} } = this.props;
    const { selectedTemplate } = this.state;
    const { taskInput = {} } = args;
    const {
      definition: selectedDefinition,
      values: requiredValues = {}
    } = taskInput;
    const definitionGroups = taskDefinitions
      .concat()
      .sort((a, b) => {
        if (a.class > b.class) return 1;
        if (a.class < b.class) return -1;
        return 0;
      })
      .reduce((prev, n) => {
        prev[n.class] = prev[n.class] ? prev[n.class].concat(n) : [n];
        return prev;
      }, {});
    const definition = taskDefinitions.find(t => t.id === selectedDefinition);
    return (
      <div
        className="core-tasks"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div style={{ display: "flex", flex: 1, height: "100%" }}>
          <div style={{ flex: 3, height: "100%", overflowY: "auto" }}>
            Definitions
            <ListGroup>
              {Object.entries(definitionGroups).map(([key, value]) => (
                <Fragment key={key}>
                  <ListGroupItem>
                    <strong>{key}</strong>
                  </ListGroupItem>
                  {value.map(v => (
                    <ListGroupItem
                      key={v.name}
                      active={v.name === selectedDefinition}
                      onClick={() => this.updateTask("definition", v.name)}
                    >
                      {v.name}{" "}
                      <Badge>
                        {
                          taskTemplates.filter(t => t.definition === v.name)
                            .length
                        }
                      </Badge>
                    </ListGroupItem>
                  ))}
                </Fragment>
              ))}
            </ListGroup>
          </div>
          <div style={{ flex: 3 }}>
            Templates (optional)
            <ListGroup style={{ flex: 1 }}>
              {taskTemplates
                .filter(t => t.definition === selectedDefinition)
                .map(t => (
                  <ListGroupItem
                    key={t.id}
                    onClick={() => {
                      this.setState({
                        selectedTemplate: t.id
                      });
                      this.updateTask("values", t.values);
                    }}
                    active={t.id === selectedTemplate}
                  >
                    {t.name}
                  </ListGroupItem>
                ))}
            </ListGroup>
          </div>
          <div style={{ flex: 7 }}>
            {definition && (
              <Fragment>
                <p>
                  If the values are left blank, a default value will be used.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    height: "100%",
                    overflowX: "hidden"
                  }}
                >
                  <div>
                    {Object.keys(definition.valuesInput).map(v => (
                      <ValueInput
                        key={v}
                        label={v}
                        type={definition.valuesInput[v]}
                        value={requiredValues[v]}
                        placeholder={definition.valuesValue[v]}
                        onBlur={value =>
                          this.updateTask("values", {
                            ...requiredValues,
                            [v]: value
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const TaskCreator = props => (
  <Query query={QUERY}>
    {({ loading, data, subscribeToMore }) => {
      const { taskDefinitions } = data;
      if (loading || !taskDefinitions) return null;
      return <TasksCore {...props} taskDefinitions={taskDefinitions} />;
    }}
  </Query>
);

export default TaskCreator;

// export default ({ updateArgs, args, client }) => {
//   return <FormGroup className="macro-addTask" />;
// };
