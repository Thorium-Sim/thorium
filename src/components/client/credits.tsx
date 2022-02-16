import {keyframes} from "@emotion/core";
import css from "@emotion/css/macro";
import React, {useState} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "helpers/reactstrap";

const ClientNameModal: React.FC<{
  clientId: string;
  modal: boolean;
  toggle: () => void;
  changeClientId: (id: string) => void;
}> = ({clientId, modal, toggle, changeClientId}) => {
  const [name, setName] = useState(clientId);
  return (
    <Modal isOpen={modal} toggle={toggle} size="large">
      <ModalHeader toggle={toggle}>Change Client ID</ModalHeader>
      <ModalBody>
        <Label>
          Client ID
          <Input value={name} onChange={e => setName(e.target.value)} />
        </Label>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            changeClientId(name);
            toggle();
          }}
        >
          Change Client ID
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const creditList = [
  {
    header: "Created By",
    content: "Alex Anderson 🚀",
  },
  {
    header: "Inspiration",
    content: "Victor Williamson 🎓",
  },
  {
    header: "Conceptual Design",
    content: "Matt Ricks 🤔",
  },
  {
    header: "Technical Consultant",
    content: "Brent Anderson 🤓",
  },
  {
    header: "Documentation & Training",
    content: "Crystal Anderson 💎",
  },
  {
    header: "Curve Frame Design",
    content: "BJ Warner 🎨 & Todd Rasband 🖌",
  },
  {
    header: "Glass Frame Design",
    content: "Nathan King 👑",
  },
  {
    header: "Epsilon Design",
    content: "Inspired by the Empty Epsilon Bridge Simulator",
  },
  {
    header: "Clear Frame Design",
    content: "Emily Paxman 🕶",
  },
  {
    header: "Rough Frame Design",
    content: "Jon Parker and Mason Perry",
  },
  {
    header: "Rollins Center for Entrepreneurship and Technlology",
    content: "2019 App Competition Winner",
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
    ),
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
        <li>Kimball Frank</li>
        <li>Nathan Young</li>
        <li>Jensen Caldwell</li>
        <li>Justin Hammond</li>
        <li>Jordan Smith</li>
        <li>Brylee Perry</li>
      </ul>
    ),
  },
  {
    header: "Patreon Supporters",
    content: (
      <ul>
        <li>Isaac Baker</li>
        <li>Manuel</li>
        <li>bashNinja</li>
      </ul>
    ),
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
          The Christa McAuliffe Space Center{" "}
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
        <li>
          Nathan Young
          <span role="img" aria-label="donor-tag">
            🇺🇸
          </span>
        </li>
      </ul>
    ),
  },
  {
    header: "Docking & System Images (Endless Sky)",
    content: (
      <div>
        <p>Maximilian Korber (CC-BY-SA-4.0)</p>
        <p>Iaz Poolar (CC-BY-SA-4.0)</p>
        <p>Michael Zahniser (CC-BY-SA-4.0)</p>
      </div>
    ),
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
    ),
  },
];

const scrollKeyframes = keyframes`
from {
transform :translateY(0);
}
to {
  transform:translateY(calc(-100% - 100vh));
}`;
const Credits: React.FC<{
  clientId: string;
  flightName?: string;
  simulatorName?: string;
  stationName?: string;
  updateClientId: (id: string) => void;
}> = ({updateClientId, clientId, flightName, simulatorName, stationName}) => {
  const scroll = React.useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div
      className="credit-bg"
      css={css`
        height: 100vh;
        overflow-y: hidden;
        text-align: center;
        color: white;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
      `}
    >
      <div>
        <img
          css={css`
            width: 25%;
            filter: drop-shadow(16px 16px 20px black);
          `}
          alt="Logo"
          src={require("./logo.png")}
          draggable="false"
        />
        <h1>Thorium</h1>

        <div className="debug">
          <h4>
            <Button color="info" onClick={() => setShowModal(true)}>
              Client ID: {clientId}
            </Button>
          </h4>
          <h5>Flight: {flightName ?? "Not Assigned"}</h5>
          <h5>Simulator: {simulatorName ?? "Not Assigned"}</h5>
          <h5>Station: {stationName ?? "Not Assigned"}</h5>
        </div>
      </div>
      <div
        css={css`
          position: relative;
        `}
      >
        <div
          ref={scroll}
          css={css`
            position: absolute;
            top: 100%;
            animation: ${scrollKeyframes} 80s linear infinite;
            li {
              list-style: none;
              padding: 0;
            }
          `}
        >
          {creditList.map(c => (
            <div
              key={c.header}
              css={css`
                margin-top: 6rem;
              `}
            >
              <h3>{c.header}</h3>
              <h4>{c.content}</h4>
            </div>
          ))}
        </div>
      </div>
      <ClientNameModal
        clientId={clientId}
        changeClientId={(id: string) => id && updateClientId(id)}
        modal={showModal}
        toggle={() => setShowModal(false)}
      />
    </div>
  );
};

export default Credits;
