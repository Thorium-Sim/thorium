import React, {Component, Fragment} from "react";
import {Button, ButtonGroup, Input} from "helpers/reactstrap";
import {publish} from "helpers/pubsub";
import NotificationConfig from "./notificationConfig";
import SidebarConfig from "./sidebarConfig";

class NotifyConfig extends Component {
  state = {};

  render() {
    const {notifications, speech, setNotifications, setSpeech} = this.props;
    const {config, sidebarConfig} = this.state;

    return (
      <Fragment>
        <label className="checkbox-inline">
          <Input
            type="checkbox"
            checked={notifications}
            onChange={setNotifications}
          />
          <span>Notifications</span>
        </label>

        <label className="checkbox-inline" style={{marginLeft: "10px"}}>
          <Input type="checkbox" checked={speech} onChange={setSpeech} />
          <span>Speech</span>
        </label>

        <ButtonGroup style={{float: "right", marginRight: "25px"}}>
          <Button
            onClick={() => publish("clearNotifications")}
            size="sm"
            color="info"
          >
            Clear All Notifications
          </Button>
          <Button
            onClick={() => this.setState({config: true})}
            size="sm"
            color="warning"
          >
            Configure
          </Button>
          <Button
            onClick={() => this.setState({sidebarConfig: true})}
            size="sm"
            color="success"
          >
            Sidebar
          </Button>
        </ButtonGroup>

        <NotificationConfig
          modal={config}
          toggle={() => this.setState({config: false})}
        />
        <SidebarConfig
          modal={sidebarConfig}
          toggle={() => this.setState({sidebarConfig: false})}
        />
      </Fragment>
    );
  }
}

export default NotifyConfig;
