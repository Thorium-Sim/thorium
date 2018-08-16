import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { publish } from "../../views/helpers/pubsub";
import NotificationConfig from "./notificationConfig";

class NotifyConfig extends Component {
  state = {};
  render() {
    const { notifications, speech, setNotifications, setSpeech } = this.props;
    const { config } = this.state;
    return (
      <Fragment>
        <label>
          Notifications{" "}
          <input
            type="checkbox"
            checked={notifications}
            onChange={setNotifications}
          />
        </label>
        <label>
          Speech <input type="checkbox" checked={speech} onChange={setSpeech} />
        </label>
        <ButtonGroup style={{ float: "right", marginRight: "50px" }}>
          <Button
            onClick={() => publish("clearNotifications")}
            size="sm"
            color="info"
          >
            Clear all notifications
          </Button>
          <Button
            onClick={() => this.setState({ config: true })}
            size="sm"
            color="warning"
          >
            Configure
          </Button>
        </ButtonGroup>
        <NotificationConfig
          modal={config}
          toggle={() => this.setState({ config: false })}
        />
      </Fragment>
    );
  }
}
export default NotifyConfig;
