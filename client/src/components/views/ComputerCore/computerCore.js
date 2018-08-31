import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

import Terminals from "./terminals";
import Users from "./users";
import Files from "./files";
import VirusScanner from "./virusScanner";
import Tour from "../../../helpers/tourHelper";
import { FormattedMessage } from "react-intl";

const trainingSteps = [
  {
    selector: ".nothing",
    content: (
      <FormattedMessage
        id="computer-core-training-1"
        defaultMessage="The computer core is the brains of your ship. Controls for all of the stations on the bridge and throughout the ship are managed by the computer core. It runs a sophisticated operating system which mostly takes care of itself."
      />
    )
  },
  {
    selector: ".nothing",
    content: (
      <FormattedMessage
        id="computer-core-training-2"
        defaultMessage="However, like all software, the computer core is not perfectly engineered. It is succeptible to attacks from outside forces. Hackers and viruses can gain access to the system and cause files to become corrupt, which causes terminals to shut down. Your job is to keep the terminals running properly. If too many terminals shut down, systems on the ship could behave erratically."
      />
    )
  },
  {
    selector: ".terminal-list",
    content: (
      <FormattedMessage
        id="computer-core-training-3"
        defaultMessage="This is a list of the terminals on the ship, showing the number and the status. If a terminal is ever offline, you need to restart it. First, select the terminal you want to restart."
      />
    )
  },
  {
    selector: ".restart-terminal",
    content: (
      <FormattedMessage
        id="computer-core-training-4"
        defaultMessage="Click this button to restart a terminal. It can take a couple of seconds."
      />
    )
  },
  {
    selector: ".virus-scanner",
    content: (
      <FormattedMessage
        id="computer-core-training-5"
        defaultMessage="Viruses infect the computer core and cause files to become corrupted. You can easily find and remove viruses by first scanning for the viruses by clicking this button. If a virus is found, click the 'Remove Virus' button to remove it."
      />
    )
  },
  {
    selector: ".switcher-buttons",
    content: (
      <FormattedMessage
        id="computer-core-training-6"
        defaultMessage="You can see all of the users with access to the computer core and all of the files that make the computer core run properly. Toggle between viewing users and files with these buttons. Click on the 'Users' button now."
      />
    )
  },
  {
    selector: ".access-levels",
    content: (
      <FormattedMessage
        id="computer-core-training-7"
        defaultMessage="Both users and files are organized into access levels, where level 1 is the highest, most privliaged level and level 10 is the lowest level. Click on a level to see the users in that level."
      />
    )
  },
  {
    selector: ".users-table",
    content: (
      <FormattedMessage
        id="computer-core-training-8"
        defaultMessage="The users appear in this table. You should regularly peruse the user list to make sure there aren't any unusual users on the list. That user might be a hacker. Remember, hackers create viruses which can corrupt files. Remove any hackers, and new viruses won't be created."
      />
    )
  },
  {
    selector: ".control-buttons",
    content: (
      <FormattedMessage
        id="computer-core-training-9"
        defaultMessage="Use these buttons to create a new user and remove the currently selected user. When creating a new user, you must specify a username, password, and level. Only give the user the highest necessary level - they don't need more access than is required."
      />
    )
  },
  {
    selector: ".switcher-buttons",
    content: (
      <FormattedMessage
        id="computer-core-training-10"
        defaultMessage="Click on the files button now. Then choose a level to look at some files."
      />
    )
  },
  {
    selector: ".files-table",
    content: (
      <FormattedMessage
        id="computer-core-training-11"
        defaultMessage="Here are your files. Files usually have boring, descriptive names. Corrupt files, however, have corrupted names. They'll look wrong and unintelligable. These corrupt files will shut down terminals. Fortunately, we keep an immutable backup which you can use to restore corrupt files."
      />
    )
  },
  {
    selector: ".restore-buttons",
    content: (
      <FormattedMessage
        id="computer-core-training-12"
        defaultMessage="Select a file to restore the file individually. If there are too many corrupt files, you can always restore all files for a level. This will create a clean-slate state for this level of files."
      />
    )
  },
  {
    selector: ".nothing",
    content: (
      <FormattedMessage
        id="computer-core-training-13"
        defaultMessage="It may seem like a lot, but this responsibility is important. Without a careful steward, the computer core could shut down entirely. Keep a close eye on users, scan for viruses, restore files, and restart terminals when necessary and, hopefully, everything will run perfectly smooth."
      />
    )
  }
];
class ComputerCore extends Component {
  state = { currentView: "users" };
  componentDidMount() {
    this.sub = this.props.subscribe();
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  render() {
    const { selectedLevel, currentView } = this.state;
    return (
      <Container fluid className="card-computerCore">
        <Row>
          <Col sm={2} className="flex-column">
            <h4>Access Levels</h4>
            <ListGroup className="flex-max auto-scroll access-levels">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <ListGroupItem
                    key={`level-${i}`}
                    className={selectedLevel === i + 1 ? "selected" : ""}
                    onClick={() => this.setState({ selectedLevel: i + 1 })}
                  >
                    Level {i + 1}
                  </ListGroupItem>
                ))}
            </ListGroup>
            <VirusScanner {...this.props} />
          </Col>
          <Col sm={6}>
            <Row className="switcher-buttons">
              <Col sm={5}>
                <Button
                  block
                  active={currentView === "users"}
                  size="lg"
                  color="warning"
                  onClick={() => this.setState({ currentView: "users" })}
                >
                  Users
                </Button>
              </Col>
              <Col sm={{ size: 5, offset: 2 }}>
                <Button
                  block
                  active={currentView === "files"}
                  size="lg"
                  color="info"
                  onClick={() => this.setState({ currentView: "files" })}
                >
                  Files
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                {currentView === "users" ? (
                  <Users {...this.props} selectedLevel={selectedLevel} />
                ) : (
                  <Files {...this.props} selectedLevel={selectedLevel} />
                )}
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Terminals {...this.props} />
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

export default ComputerCore;
