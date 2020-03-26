import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "helpers/reactstrap";
import {TimelineStep} from "generated/graphql";

interface StepModalProps {
  newStep: number;
  timeline: TimelineStep[];
  modal: boolean;
  toggle: () => void;
  updateStep: (n: number) => void;
}

const StepModal: React.FC<StepModalProps> = ({
  newStep: newStepProps,
  timeline,
  modal,
  toggle,
  updateStep,
}) => {
  const [newStep, setNewStep] = React.useState(newStepProps);

  return (
    <Modal isOpen={modal} toggle={toggle} size="large">
      <ModalHeader toggle={toggle}>Select which step to go to</ModalHeader>
      <ModalBody>
        <Input
          type="select"
          value={newStep}
          onChange={evt => setNewStep(parseInt(evt.target.value, 10))}
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
};

export default StepModal;
