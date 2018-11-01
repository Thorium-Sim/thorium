import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import './credits.scss';

const creditList = [
  {
    header: "Created By",
    content: "Alex Anderson 🚀"
  },
  {
    header: "Inspiration",
    content: "Victor Williamson 🎓"
  },
  {
    header: "Conceptual Design",
    content: "Matt Ricks 🤔"
  },
  {
    header: "Technical Consultant",
    content: "Brent Anderson 🤓"
  },
  {
    header: "Documentation & Training",
    content: "Crystal Anderson 💎"
  },
  {
    header: "Curve Frame Design",
    content: "BJ Warner 🎨 & Todd Rasband 🖌"
  },
  {
    header: "Glass Frame Design",
    content: "Nathan King 👑"
  },
  {
    header: "Code Contributors",
    content: (
      <ul>
        <li>
          <code>G33kX</code>
        </li>
        <li>
          <code>emrix</code>
        </li>
        <li>
          <code>aBlueShadow</code>
        </li>
        <li>
          <code>ksmithut</code>
        </li>
        <li>
          <code>jrobe</code>
        </li>
        <li>
          <code>J-F1</code>
        </li>
        <li>
          <code>ericman314</code>
        </li>
      </ul>
    )
  },
  {
    header: "Bug Reports & Feature Suggestions",
    content: (
      <ul>
        <li>Ryan Anderson</li>
        <li>Alex DeBirk</li>
        <li>James Porter</li>
        <li>Nathan King</li>
        <li>Parriss King</li>
        <li>Daniel Kirpatrick</li>
        <li>Isaac Ostler</li>
        <li>Matt Ricks</li>
        <li>Natalie Anderson</li>
        <li>Tabitha Long</li>
        <li>Bracken Funk</li>
        <li>
          <code>kimballfrank</code>
        </li>
      </ul>
    )
  },
  {
    header: "Donors",
    content: (
      <ul>
        <li>
          Thomas Delclite{" "}
          <span role="img" aria-label="donor-tag">
            🇧🇪
          </span>
        </li>
        <li>
          Chuck Smith{" "}
          <span role="img" aria-label="donor-tag">
            🇺🇸
          </span>
        </li>
        <li>
          The Lion's Gate Center{" "}
          <span role="img" aria-label="donor-tag">
            🦁
          </span>
        </li>
        <li>
          Brent Anderson{" "}
          <span role="img" aria-label="donor-tag">
            🇺🇸
          </span>
        </li>
        <li>
          Maeson Busk{" "}
          <span role="img" aria-label="donor-tag">
            🇺🇸
          </span>
        </li>
        <li>
          The Christa McAuliffe Space Education Center{" "}
          <span role="img" aria-label="donor-tag">
            🛰
          </span>
        </li>
        <li>
          Victor Williamson
          <span role="img" aria-label="donor-tag">
            👽
          </span>
        </li>
        <li>
          Ryan Anderson
          <span role="img" aria-label="donor-tag">
            🔭
          </span>
        </li>
      </ul>
    )
  },
  {
    header: "Docking & System Images (Endless Sky)",
    content: (
      <div>
        <p>Maximilian Korber (CC-BY-SA-4.0)</p>
        <p>Iaz Poolar (CC-BY-SA-4.0)</p>
        <p>Michael Zahniser (CC-BY-SA-4.0)</p>
      </div>
    )
  },
  {
    header: "Card Icons",
    content: (
      <div>
        <p>jet engine by Arthur Shlain from the Noun Project</p>
        <p>Coolant Temperature by Ben Johnson from the Noun Project</p>
        <p>sensor by Bakunetsu Kaito from the Noun Project</p>
        <p>Gyroscope by Arthur Shlain from the Noun Project</p>
        <p>Radar by Oliviu Stoian from the Noun Project</p>
        <p>Feather Icon Pack</p>
        <p>Font Awesome</p>
      </div>
    )
  }
];

class Credits extends Component {
  state = { debug: false, scroll: 0 };
  toggleDebug = () => {
    this.setState({
      debug: !this.state.debug
    });
  };
  changeClientId = evt => {
    evt.preventDefault();
    const newClientId = prompt("What is the new client ID?");
    if (newClientId) {
      this.props.updateClientId(newClientId);
    }
  };
  render() {
    const { clientId, flight = {}, simulator = {}, station = {} } = this.props;
    if (this.refs.scroll) {
      this.refs.scroll.scrollTop = this.state.scroll;
    }
    return (
      <div className="credit-bg">
        <Container>
          <img
            alt="Logo"
            src={require("./logo.png")}
            draggable="false"
            onClick={this.toggleDebug}
          />
          <h1>Thorium</h1>

          {this.state.debug ? (
            <div className="debug">
              <h4>
                <Button color="info" onClick={this.changeClientId}>
                  Client ID: {clientId}
                </Button>
              </h4>
              <h5>Flight: {flight ? flight.name : "Not Assigned"}</h5>
              <h5>Simulator: {simulator ? simulator.name : "Not Assigned"}</h5>
              <h5>Station: {station ? station.name : "Not Assigned"}</h5>
              <h5>Download the client app: </h5>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                <li>
                  <a
                    download="Thorium.zip"
                    href="https://github.com/Thorium-Sim/thorium-kiosk/releases/download/v1.0.3/thorium-client-1.0.3-mac.zip"
                  >
                    Mac
                  </a>
                </li>
                <li>
                  <a
                    download="Thorium.zip"
                    href="https://github.com/Thorium-Sim/thorium-kiosk/releases/download/v1.0.3/thorium-client-setup-1.0.3.exe"
                  >
                    Windows
                  </a>
                </li>
                <li>
                  <a
                    download="Thorium.zip"
                    href="https://github.com/Thorium-Sim/thorium-kiosk/releases/download/v1.0.3/thorium-client-1.0.3-x86_64.AppImage"
                  >
                    Linux
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div ref="scroll" className="scroll">
              <div className="scroller">
                {creditList.map(c => (
                  <div key={c.header} className="creditSection">
                    <h3>{c.header}</h3>
                    <h4>{c.content}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default Credits;
