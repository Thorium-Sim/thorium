import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
class StepModal extends Component {
  constructor(props) {
    super(props);
    this.state = { newStep: props.newStep };
  }
  render() {
    const { newStep } = this.state;
    const { timeline, updateStep, modal, toggle } = this.props;
    return (
      <Modal isOpen={modal} toggle={toggle} size="large">
        <ModalHeader toggle={toggle}>Select which step to go to</ModalHeader>
        <ModalBody>
          <Input
            type="select"
            value={newStep}
            onChange={evt => this.setState({ newStep: evt.target.value })}
          >
            {timeline.map((t, i) => {
              return (
                <option key={t.id} value={i}>
                  {t.name}
                </option>
              );
            })}
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              updateStep(newStep);
              toggle();
            }}
          >
            Load Step
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default StepModal;
