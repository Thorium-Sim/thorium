import React, { Component } from "react";
import { Button } from "reactstrap";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

const TIMESYNC_SUB = gql`
  subscription SyncTime($simulatorId: ID!) {
    syncTime(simulatorId: $simulatorId) {
      time
      active
    }
  }
`;

export default withApollo(
  class TimerConfig extends Component {
    componentDidMount() {
      this.subscription = this.props.client
        .subscribe({
          query: TIMESYNC_SUB,
          variables: {
            simulatorId: this.props.simulator.id
          }
        })
        .subscribe({
          next: ({ data: { syncTime } }) => {
            const { data = "{}" } = this.props;
            const { sync } = JSON.parse(data);
            sync &&
              this.updateData({
                timer: syncTime.time,
                stopped: !syncTime.active
              });
            clearTimeout(this.timer);
          },
          error(err) {
            console.error("err", err);
          }
        });
    }
    componentWillUnmount() {
      this.subscription && this.subscription.unsubscribe();
      clearTimeout(this.timer);
    }
    updateData = update => {
      const { data = "{}", updateData } = this.props;
      updateData(JSON.stringify({ ...JSON.parse(data), ...update }));
    };
    setTimer = () => {
      const { data = "{}" } = this.props;
      const { sync } = JSON.parse(data);
      const seconds = prompt("Enter the number of seconds:", 0);
      if (!seconds && seconds !== 0) return;
      const minutes = prompt("Enter the number of minutes:", 0);
      if (!minutes && minutes !== 0) return;
      const hours = prompt("Enter the number of hours:", 0);
      if (!hours && hours !== 0) return;

      clearTimeout(this.timer);
      this.timer = null;
      const mutation = gql`
        mutation SyncTimer($time: String, $active: Boolean, $simulatorId: ID!) {
          syncTimer(time: $time, active: $active, simulatorId: $simulatorId)
        }
      `;
      sync &&
        this.props.client.mutate({
          mutation,
          variables: {
            time: `${hours}:${minutes}:${seconds}`,
            active: true,
            simulatorId: this.props.simulator.id
          }
        });
      this.updateData({
        timer: `${hours}:${minutes}:${seconds}`,
        stopped: false
      });
    };
    toggleTimer = () => {
      const { data = "{}" } = this.props;
      const { timer, stopped, sync } = JSON.parse(data);
      if (stopped) {
        this.updateData({ stopped: false });
      } else {
        clearTimeout(this.timer);
        this.timer = null;
        this.updateData({ stopped: true });
      }
      const mutation = gql`
        mutation SyncTimer($time: String, $active: Boolean, $simulatorId: ID!) {
          syncTimer(time: $time, active: $active, simulatorId: $simulatorId)
        }
      `;
      sync &&
        this.props.client.mutate({
          mutation,
          variables: {
            time: timer,
            active: stopped,
            simulatorId: this.props.simulator.id
          }
        });
    };
    render() {
      const { data = "{}" } = this.props;
      const { timer, stopped, sync, title } = JSON.parse(data);
      return (
        <div>
          <input
            type="text"
            placeholder="Title"
            defaultValue={title}
            onChange={e => this.updateData({ title: e.target.value })}
          />
          <div style={{ display: "flex" }}>
            <div
              style={{
                color: "black",
                float: "left",
                flex: 1,
                backgroundColor: "rgb(251, 254, 61)",
                border: "1px solid rgb(210, 203, 67)",
                height: "16px",
                whiteSpace: "pre",
                textAlign: "center"
              }}
              onClick={this.setTimer}
            >
              {timer}
            </div>
            <Button
              color={stopped ? "primary" : "danger"}
              size="sm"
              style={{ height: "16px", float: "left", lineHeight: "12px" }}
              onClick={this.toggleTimer}
            >
              {stopped ? "Start" : "Stop"}
            </Button>
            <label>
              <input
                type="checkbox"
                checked={sync}
                onClick={e => this.updateData({ sync: e.target.checked })}
              />
              Sync Cores
            </label>
          </div>
        </div>
      );
    }
  }
);
