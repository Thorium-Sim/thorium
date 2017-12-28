import React, { Component } from "react";
import Views from "../../views";
import ActionsMixin from "../../generic/Actions";
import ErrorBoundary from "../../../helpers/errorBoundary";
import CardFrame from "./frame";
import { withApollo } from "react-apollo";
import { Button } from "reactstrap";
import "./layout.css";

class LayoutOdyssey extends Component {
  render() {
    let { simulator, station } = this.props;
    const { name: stationName } = station;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className="viewscreen">
        <ActionsMixin {...this.props}>
          <div id="layout-odyssey" className={alertClass}>
            <div className={`perspectiveContainer`}>
              <div className="cardContainer">
                <ErrorBoundary
                  render={
                    <div className={"card-error"}>
                      <p className="offline-title">Station Error</p>
                      <p
                        className="offline-message"
                        style={{ fontSize: "40px" }}
                      >
                        Your station has experienced an error. A diagnostic must
                        be performed to restore this station to functionality.
                        If you continue to see this screen after performing the
                        diagnostic, please contact a computer specialist.
                      </p>
                      <Button
                        block
                        color="primary"
                        size="lg"
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                      >
                        Perform Diagnostic
                      </Button>
                    </div>
                  }
                >
                  {this.props.children ? (
                    this.props.children
                  ) : (
                    <Views.Viewscreen {...this.props} />
                  )}
                </ErrorBoundary>
              </div>
              <div className="frame-text">
                <h1 className="simulator-name">{simulator.name}</h1>
                <h2 className="station-name">{stationName}</h2>
              </div>
              <CardFrame simulator={simulator} />
            </div>
          </div>
        </ActionsMixin>
      </div>
    );
  }
}

export default withApollo(LayoutOdyssey);
