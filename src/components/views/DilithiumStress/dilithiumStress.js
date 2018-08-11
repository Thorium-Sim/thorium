import React, { Component } from "react";
import { Container } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Bars from "../TractorBeam/bars";
import Platform from "./platform";
import Tour from "../../../helpers/tourHelper";
class DilithiumStress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphaLevel: props.alphaLevel,
      betaLevel: props.betaLevel
    };
  }
  trainingSteps = () => {
    return [
      {
        selector: ".nothing",
        content: (
          <span>
            Your reactor generates power by annihilating matter and anti-matter
            on the surface of a dilithium crystal. The crystal provides a
            surface for the reaction to maintain stability at high efficiency.
            However, you must carefully monitor the reaction to ensure the
            crystal doesn't become too stressed and break.
          </span>
        )
      },
      {
        selector: ".stressHolder",
        content: (
          <span>
            This is the current level of dilithium stress. You want to keep this
            bar as low as possible so the crystal doesn't shatter. If the
            crystal shatters, at best the safety protocols will halt the
            reaction and you will be without power. At worst, the safety
            protocols will fail and your ship will explode.
          </span>
        )
      },
      {
        selector: ".mBar",
        content: (
          <span>
            You keep the dilithium stress low by managing the matter and
            anti-matter stream. Your reactor uses deuterium, an isotope of
            hydrogen with one proton and one neutron. To increase or decrease
            the stream, drag the arrow up and down. Watch as the dilithium
            crystal stress increases and decreases.
          </span>
        )
      },
      {
        selector: ".aBar",
        content: (
          <span>
            You have to adjust both the matter and anti-matter streams to keep
            the stress low. The anti-matter stream is comprised of
            anti-deuterium, made with antiprotons instead of protons. Drag both
            bars until the stress is low.
          </span>
        )
      }
    ];
  };
  calcStressLevel = () => {
    const { alphaTarget, betaTarget } = this.props;
    const { alphaLevel, betaLevel } = this.state;
    const alphaDif = Math.abs(alphaTarget - alphaLevel);
    const betaDif = Math.abs(betaTarget - betaLevel);
    const stressLevel = alphaDif + betaDif > 100 ? 100 : alphaDif + betaDif;
    return stressLevel;
  };
  render() {
    const { id, simulator, clientObj } = this.props;
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
        <div className="dilithium-effects">
          <video src={require("./reactor.ogv")} autoPlay loop />
          <Platform className="antimatter" />
          <Platform className="matter" color="#4953DF" />
          <Platform className="plasma" color="#51AE41" />
        </div>
        <Tour steps={this.trainingSteps()} client={clientObj} />
      </Container>
    );
  }
}
export default DilithiumStress;
