import React, { Component } from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row
} from "reactstrap";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import FontAwesome from "react-fontawesome";

const CORE_LAYOUTS = gql`
  query CoreLayouts {
    coreLayouts {
      id
      name
    }
  }
`;

const sortableElement = SortableElement;
const sortableContainer = SortableContainer;

const SortableItem = sortableElement(({ item, selected, select, remove }) => (
  <li
    onClick={() => select(item.id)}
    className={`${item.id === selected ? "selected" : ""} list-group-item`}
    style={{ color: "black" }}
  >
    {item.name}{" "}
    {remove && (
      <FontAwesome
        name="ban"
        className="text-danger"
        onClick={() => remove(item.id)}
      />
    )}
  </li>
));

const SortableList = sortableContainer(
  ({ items, select, remove, selected }) => {
    return (
      <ul style={{ padding: 0 }}>
        {items.map((item, index) => {
          return (
            <SortableItem
              key={item.id}
              index={index}
              item={item}
              selected={selected}
              select={select}
              remove={remove}
            />
          );
        })}
      </ul>
    );
  }
);

class MosaicConfig extends Component {
  state = { coreLayouts: this.props.coreLayouts };
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { coreLayouts } = this.state;
    const variables = {
      id: coreLayouts[oldIndex].id,
      order: newIndex
    };
    const mutation = gql`
      mutation ReorderCoreLayouts($id: ID!, $order: Int!) {
        reorderCoreLayouts(id: $id, order: $order)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables,
      refetchQueries: [{ query: CORE_LAYOUTS }]
    });
  };
  remove = id => {
    const { coreLayouts } = this.state;
    const layout = coreLayouts.find(l => l.id === id);
    if (
      window.confirm(
        `Are you sure you want to delete the '${layout.name}' layout?`
      )
    ) {
      this.props.client.mutate({
        mutation: gql`
          mutation RemoveCoreLayout($id: ID!) {
            removeCoreLayout(id: $id)
          }
        `,
        variables: { id: id },
        refetchQueries: [{ query: CORE_LAYOUTS }]
      });
    }
  };
  select = id => {
    this.setState({ selected: id });
  };
  render() {
    const { modal, toggle } = this.props;
    const { coreLayouts } = this.props;
    return (
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <div>Dynamic Layouts Config</div>
          <small>Configure the order of the dynamic layouts.</small>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col sm={4}>
              <SortableList
                items={coreLayouts}
                onSortEnd={this.onSortEnd}
                selected={this.state.selected}
                select={this.select}
                remove={this.remove}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const MosaicConfigData = props => {
  return (
    <Query query={CORE_LAYOUTS}>
      {({ loading, data: { coreLayouts } }) =>
        loading ? null : <MosaicConfig coreLayouts={coreLayouts} {...props} />
      }
    </Query>
  );
};
export default withApollo(MosaicConfigData);
