import React, { Component } from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import Views from '../views';
import ErrorBoundary from "../../helpers/errorBoundary";


class LayoutDefault extends Component {
	render() {
    let { simulator, station, cardName, changeCard, clientObj } = this.props;
    const { login: stationLogin, name: stationName, cards = [] } = station;
		if (clientObj.loginState === "logout" && stationLogin === false) {
      cardName = "Login";
    }
    if (clientObj.offlineState) {
      cardName = "Offline";
    }
		return (<Container fluid>
			<Row className="cardContainer">
			<Col sm={12}>
              <ErrorBoundary
                render={
                  <div className={"card-error"}>
                    <p className="offline-title">Station Error</p>
                    <p className="offline-message" style={{ fontSize: "40px" }}>
                      Your station has experienced an error. A diagnostic must
                      be performed to restore this station to functionality. If
                      you continue to see this screen after performing the
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
                {cards
                  .concat({ name: "Login", component: "Login", icon: "Login" })
                  .concat({
                    name: "Offline",
                    component: "Offline",
                    icon: "Offline"
                  })
                  .map(card => {
                    const Card = Views[card.component];
                    if (card.name === cardName) {
                      return (
                        <Card
                          {...this.props}
                          stopTraining={this.stopTraining}
                          key={card.name}
                        />
                      );
                    }
                    return null;
                  })
                  .filter(card => card)}
              </ErrorBoundary>
							</Col>
            </Row>
			</Container>);
	}
}

export default LayoutDefault;