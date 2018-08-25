import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import IssueTracker from "../../../components/admin/IssueTracker";

class FeedbackModal extends Component {
  state = {};
  toggleIssueTracker = () =>
    this.setState({ issuesOpen: !this.state.issuesOpen });
  render() {
    const { issuesOpen } = this.state;
    return (
      <Fragment>
        <Button
          size="sm"
          onClick={this.toggleIssueTracker}
          style={{ marginLeft: "20px" }}
        >
          Issue Tracker
        </Button>
        <Modal isOpen={issuesOpen} toggle={this.toggleIssueTracker}>
          <ModalHeader toggle={this.toggleIssueTracker}>
            Submit a Feature/Bug Report
          </ModalHeader>
          <ModalBody>
            <IssueTracker close={this.toggleIssueTracker} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleIssueTracker}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
export default FeedbackModal;
