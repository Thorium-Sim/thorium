import React, { Component } from "react";
import { Container } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Bars from "../TractorBeam/bars";
import Platform from "./platform";
class DilithiumStress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphaLevel: props.alphaLevel,
      betaLevel: props.betaLevel
    };
  }
  calcStressLevel = () => {
    const { alphaTarget, betaTarget } = this.props;
    const { alphaLevel, betaLevel } = this.state;
    const alphaDif = Math.abs(alphaTarget - alphaLevel);
    const betaDif = Math.abs(betaTarget - betaLevel);
    const stressLevel = alphaDif + betaDif > 100 ? 100 : alphaDif + betaDif;
    return stressLevel;
  };
  render() {
    const { id, simulator } = this.props;
    const { alphaLevel, betaLevel } = this.state;
    return (
      <Container fluid className="card-dilithium-stress">
        <Mutation
          mutation={gql`
            mutation UpdateDilithium(
              $id: ID!
              $alphaLevel: Float
              $betaLevel: Float
            ) {
              updateDilithiumStress(
                id: $id
                alphaLevel: $alphaLevel
                betaLevel: $betaLevel
              )
            }
          `}
        >
          {action => (
            <div className="bars-holder">
              <Bars
                className="mBar"
                arrow
                color={"blue"}
                simulator={simulator}
                level={alphaLevel / 100}
                noLevel
                mouseUp={level =>
                  this.setState({ alphaLevel: level * 100 }, () => {
                    action({
                      variables: {
                        id,
                        alphaLevel: this.state.alphaLevel,
                        betaLevel: this.state.betaLevel
                      }
                    });
                  })
                }
                mouseMove={level => this.setState({ alphaLevel: level * 100 })}
              />
              <div className="stressHolder">
                <div
                  className="stressBar"
                  style={{ height: `${this.calcStressLevel()}%` }}
                />
              </div>
              <Bars
                className="aBar"
                arrow
                simulator={simulator}
                level={betaLevel / 100}
                noLevel
                mouseUp={level =>
                  this.setState({ betaLevel: level * 100 }, () => {
                    action({
                      variables: {
                        id,
                        alphaLevel: this.state.alphaLevel,
                        betaLevel: this.state.betaLevel
                      }
                    });
                  })
                }
                mouseMove={level => this.setState({ betaLevel: level * 100 })}
              />
              <label className="matter-label">Matter Stream</label>
              <label className="antimatter-label">Anti-Matter Stream</label>
              <label className="stress-label">Dilithium Crystal Stress</label>
            </div>
          )}
        </Mutation>
        <img alt="Dilithium" src={require("./dilithiumCrystal.svg")} />
        <video src={require("./reactor.ogv")} autoPlay loop />
        <Platform className="antimatter" />
        <Platform className="matter" color="#4953DF" />
        <Platform className="plasma" color="#51AE41" />
      </Container>
    );
  }
}
export default DilithiumStress;
