import React from "react";
import {Query, withApollo, useMutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row,
} from "helpers/reactstrap";

import SortableList from "helpers/SortableList";

const CORE_LAYOUTS = gql`
  query MosaicCoreLayouts {
    coreLayouts {
      id
      name
    }
  }
`;

function move(array, old_index, new_index) {
  if (new_index >= array.length) {
    var k = new_index - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(new_index, 0, array.splice(old_index, 1)[0]);
  return array; // for testing purposes
}

const REORDER_CORE_LAYOUTS = gql`
  mutation Reorder($layouts: [ID!]!) {
    reorderCoreLayouts(layouts: $layouts)
  }
`;
const MosaicConfig = ({coreLayouts: coreLayoutsProps, modal, toggle}) => {
  const [coreLayouts, setCoreLayouts] = React.useState(coreLayoutsProps);
  const [selected, setSelected] = React.useState(null);
  const [reorder] = useMutation(REORDER_CORE_LAYOUTS, {
    variables: {layouts: coreLayouts.map(m => m.id)},
  });
  const onSortEnd = ({oldIndex, newIndex}) => {
    setCoreLayouts(s => move(s.concat(), oldIndex, newIndex));
  };
  const remove = id => {
    setCoreLayouts(s => s.filter(c => c.id !== id));
  };
  const select = id => {
    setSelected(id);
  };
  const close = () => {
    reorder();
    toggle();
  };

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
              distance={20}
              items={coreLayouts}
              onSortEnd={onSortEnd}
              selectedItem={selected}
              setSelectedItem={select}
              removeItem={remove}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={close}>
          Save & Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const MosaicConfigData = props => {
  return (
    <Query query={CORE_LAYOUTS}>
      {({loading, data}) => {
        if (loading || !data) return null;
        const {coreLayouts} = data;
        return <MosaicConfig coreLayouts={coreLayouts} {...props} />;
      }}
    </Query>
  );
};
export default withApollo(MosaicConfigData);
