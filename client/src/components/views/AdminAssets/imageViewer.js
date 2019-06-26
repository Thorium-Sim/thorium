import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "helpers/reactstrap";

const ImageViewer = props => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} size="large">
      <ModalHeader toggle={props.toggle}>{props.name}</ModalHeader>
      <ModalBody>
        <img alt="Preview" src={props.image} className="img-responsive" />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageViewer;
