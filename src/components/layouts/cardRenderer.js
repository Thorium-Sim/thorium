import React from "react";
import Views from "components/views";
import {Transition} from "react-transition-group";
import {Button} from "helpers/reactstrap";
import ErrorBoundary from "helpers/errorBoundary";
import gql from "graphql-tag.macro";
import {useMutation} from "react-apollo";

const UNASSIGN_CARD = gql`
  mutation UnassignCard($simulatorId: ID!, $cardName: String!) {
    stationUnassignCard(simulatorId: $simulatorId, cardName: $cardName)
  }
`;
const CardAssigned = ({cardName, simulatorId}) => {
  const [unassign] = useMutation(UNASSIGN_CARD, {
    variables: {simulatorId, cardName},
  });
  return (
    <div className={"card-error"}>
      <p className="offline-title text-warning">Screen Unavailable</p>
      <p className="offline-message" style={{fontSize: "40px"}}>
        This screen has been assigned to another station and is not currently
        available. Click the button below to restore control.
      </p>
      <Button block color="primary" size="lg" onClick={unassign}>
        Restore {cardName} Screen
      </Button>
    </div>
  );
};
const CardWrapper = ({card}) => {
  return (
    <React.Suspense fallback={null}>
      <ErrorBoundary
        render={
          <div className={"card-error"}>
            <p className="offline-title">Station Error</p>
            <p className="offline-message" style={{fontSize: "40px"}}>
              Your station has experienced an error. A diagnostic must be
              performed to restore this station to functionality. If you
              continue to see this screen after performing the diagnostic,
              please contact a computer specialist.
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
        {card.assigned ? (
          <CardAssigned
            cardName={card.name}
            simulatorId={card.props.simulator.id}
          />
        ) : card.component ? (
          <card.component {...card.props} />
        ) : null}
      </ErrorBoundary>
    </React.Suspense>
  );
};
function renderCards(props) {
  let {station, cardName, clientObj} = props;
  const {
    cards = [
      {
        component: "Viewscreen",
        name: "Viewscreen",
      },
    ],
  } = station;
  if (clientObj.loginState === "logout" && station.login === false) {
    cardName = "Login";
  }
  if (clientObj.offlineState) {
    cardName = "Offline";
  }

  if (
    !clientObj.offlineState &&
    clientObj.hypercard &&
    Views[clientObj.hypercard]
  ) {
    const Comp = Views[clientObj.hypercard];
    return [{name: "Hypercard", component: Comp, in: true, props}];
  }
  function getCompName(name) {
    if (name.indexOf("interface-id:") > -1) {
      return "Interface";
    }
    return "SoftwarePanels";
  }
  return cards
    .concat({name: "Login", component: "Login", icon: "Login"})
    .concat({
      name: "Offline",
      component: "Offline",
      icon: "Offline",
    })
    .map(card => {
      const compName = card.component.match(/.*.{8}-.{4}-.{4}-.{4}-.{12}/gi)
        ? getCompName(card.component)
        : card.component;
      let component = Views[compName];
      if (
        clientObj.offlineState === "spaceEdventuresToken" &&
        clientObj.token
      ) {
        component = Views.SpaceEdventuresToken;
      }
      if (compName === "Interface") {
        // Interface
        return {
          ...card,
          in: card.name === cardName,
          props: {
            ...props,
            interfaceId: card.component.replace("interface-id:", ""),
          },
        };
      }
      if (card.component.match(/.*.{8}-.{4}-.{4}-.{4}-.{12}/gi)) {
        // Software Panel
        return {
          ...card,
          in: card.name === cardName,
          component: Views.SoftwarePanels,
          props: {
            ...props,
            panel: card.component.replace("software-panel-", ""),
          },
        };
      }
      return {
        ...card,
        in: card.name === cardName,
        component,
        props,
      };
    });
}

export default function CardHolder(props) {
  const comps = renderCards(props);
  return comps.map(card => {
    return (
      <Transition key={card.name} in={card.in} timeout={250} appear>
        {state => {
          if (state === "exited") return null;
          return (
            <div
              className={`cardContainer card-transition card-transition-${state}`}
              style={{
                width: "100%",
                position: "absolute",
                alignSelf: "center",
              }}
            >
              <CardWrapper card={card} />
            </div>
          );
        }}
      </Transition>
    );
  });
}
