import React from "react";
import SoundController from "./soundController";
import Caching from "./caching";
import CardContainer from "./Card";
import {
  Station,
  Simulator,
  Flight,
  Client as ClientInterface,
} from "generated/graphql";
import {useSounds} from "components/generic/SoundPlayer";

const excludedStations = [
  "Sound",
  "Blackout",
  "Viewscreen",
  "Keyboard",
  "Lighting",
];
export const ClientContext = React.createContext({});

const Client: React.FC<{
  station: Omit<Station, "tags">;
  client: ClientInterface;
  flight: Flight;
  simulator: Simulator;
}> = props => {
  const {station, client, flight, simulator} = props;

  const mounted = React.useRef(false);

  const {playSound, removeAllSounds} = useSounds();

  React.useEffect(() => {
    if (
      !station?.cards ||
      excludedStations.includes(station?.name) ||
      station.cards.find(c => excludedStations.includes(c.component))
    )
      return;

    let timeout: number;
    if (!mounted.current) {
      mounted.current = true;
      timeout = setTimeout(() => {
        playSound({url: "/sciences.ogg", volume: 0.5});
      }, 1000);

      if (process.env.NODE_ENV === "production") {
        document.addEventListener("keydown", e => {
          const forbiddenKeys = ["q", "w", "s", "i", "f"];
          if ((e.metaKey || e.ctrlKey) && forbiddenKeys.includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
          }
        });
        // Go to fullscreen on load
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen().catch(() => {});
        }
      }
    }

    if (station?.ambiance) {
      playSound({
        url: `/assets${station.ambiance}`,
        looping: true,
        ambiance: true,
      });
    }

    return () => {
      clearTimeout(timeout);
      removeAllSounds(true);
    };
  }, [playSound, removeAllSounds, station]);

  return (
    <ClientContext.Provider value={props}>
      <SoundController clientId={client.id} />
      <Caching client={client} />
      <CardContainer
        flight={flight}
        simulator={simulator}
        station={station}
        client={client}
      />
    </ClientContext.Provider>
  );
};
export default Client;
