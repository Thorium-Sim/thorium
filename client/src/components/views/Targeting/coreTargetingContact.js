import React, { Fragment, Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { InputField } from "../../generic/core";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";
import FileExplorer from "../TacticalMap/fileExplorer";

const TargetCount = ({ targetingId, id, contactCount }) => (
  <Mutation
    mutation={gql`
      mutation SetTargetClassCount($id: ID!, $classId: ID!, $count: Int!) {
        setTargetClassCount(id: $id, classId: $classId, count: $count)
      }
    `}
  >
    {action => (
      <Row>
        <Col sm={3}>
          <Button
            onClick={() =>
              action({
                variables: {
                  id: targetingId,
                  classId: id,
                  count: contactCount - 1
                }
              })
            }
            size="sm"
            color="secondary"
          >
            -
          </Button>
        </Col>
        <Col sm={6}>
          <InputField
            style={{
              lineHeight: "16px",
              height: "16px",
              width: "100%"
            }}
            prompt={"How many targets?"}
            onClick={count =>
              action({
                variables: { id: targetingId, classId: id, count }
              })
            }
          >
            {contactCount}
          </InputField>
        </Col>
        <Col sm={3}>
          <Button
            onClick={() =>
              action({
                variables: {
                  id: targetingId,
                  classId: id,
                  count: contactCount + 1
                }
              })
            }
            size="sm"
            color="secondary"
          >
            +
          </Button>
        </Col>
      </Row>
    )}
  </Mutation>
);

class TargetingContact extends Component {
  state = {};
  render() {
    const { iconEdit, pictureEdit } = this.state;
    const {
      id,
      icon,
      picture,
      name,
      moving,
      targetingId,
      contacts,
      contactClass
    } = this.props;
    const contactCount = contacts.filter(c => c.class === id && !c.destroyed)
      .length;
    return (
      <Mutation
        mutation={gql`
          mutation UpdateTargetClass($id: ID!, $classInput: TargetClassInput!) {
            updateTargetClass(id: $id, classInput: $classInput)
          }
        `}
      >
        {action => (
          <Fragment>
            {(iconEdit || pictureEdit) && (
              <div className="icon-picker">
                <FileExplorer
                  simple
                  directory={
                    iconEdit
                      ? "/Sensor Contacts/Icons"
                      : "/Sensor Contacts/Pictures"
                  }
                  selectedFiles={[iconEdit ? icon : picture]}
                  onClick={(e, container) => {
                    this.setState({ iconEdit: false, pictureEdit: false });
                    action({
                      variables: {
                        id: targetingId,
                        classInput: {
                          id,
                          [iconEdit ? "icon" : "picture"]: container.fullPath
                        }
                      }
                    });
                  }}
                />
              </div>
            )}
            <Row>
              <Col sm={4}>
                <TargetCount
                  targetingId={targetingId}
                  id={id}
                  contactCount={contactCount}
                />
              </Col>
              <Col sm={1}>
                <img
                  alt="pic"
                  className="contact-image"
                  src={`/assets${icon}`}
                  role="presentation"
                  onClick={() => this.setState({ iconEdit: true })}
                />
              </Col>
              <Col sm={1}>
                <img
                  alt="pic"
                  className="contact-image"
                  src={`/assets${picture}`}
                  role="presentation"
                  onClick={() => this.setState({ pictureEdit: true })}
                />
              </Col>
              <Col sm={4}>
                <InputField
                  style={{
                    lineHeight: "16px",
                    height: "16px",
                    width: "100%"
                  }}
                  prompt={"New target label?"}
                  alert={contactClass === id}
                  onClick={value =>
                    action({
                      variables: {
                        id: targetingId,
                        classInput: { id, name: value }
                      }
                    })
                  }
                >
                  {name}
                </InputField>
              </Col>
              <Col sm={1}>
                <input
                  type="checkbox"
                  checked={moving}
                  onChange={e =>
                    action({
                      variables: {
                        id: targetingId,
                        classInput: { id, moving: e.target.checked }
                      }
                    })
                  }
                />
              </Col>
              <Col sm={1}>
                <Mutation
                  mutation={gql`
                    mutation RemoveTargetClass($id: ID!, $classId: ID!) {
                      removeTargetClass(id: $id, classId: $classId)
                    }
                  `}
                  variables={{ id: targetingId, classId: id }}
                >
                  {action => (
                    <FontAwesome
                      name="ban"
                      className="text-danger"
                      onClick={action}
                    />
                  )}
                </Mutation>
              </Col>
            </Row>
          </Fragment>
        )}
      </Mutation>
    );
  }
}

export default TargetingContact;
