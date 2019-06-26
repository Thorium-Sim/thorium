import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "helpers/reactstrap";
import { publish } from "helpers/pubsub";
import NotificationConfig from "./notificationConfig";
import SidebarConfig from "./sidebarConfig";

class NotifyConfig extends Component {
  state = {};
  render() {
    const { notifications, speech, setNotifications, setSpeech } = this.props;
    const { config, sidebarConfig } = this.state;
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
        <ButtonGroup style={{ float: "right", marginRight: "25px" }}>
          <Button
            onClick={() => publish("clearNotifications")}
            size="sm"
            color="info"
          >
            Clear All Notifications
          </Button>
          <Button
            onClick={() => this.setState({ config: true })}
            size="sm"
            color="warning"
          >
            Configure
          </Button>
          <Button
            onClick={() => this.setState({ sidebarConfig: true })}
            size="sm"
            color="success"
          >
            Sidebar
          </Button>
        </ButtonGroup>
        <NotificationConfig
          modal={config}
          toggle={() => this.setState({ config: false })}
        />
        <SidebarConfig
          modal={sidebarConfig}
          toggle={() => this.setState({ sidebarConfig: false })}
        />
      </Fragment>
    );
  }
}
export default NotifyConfig;
