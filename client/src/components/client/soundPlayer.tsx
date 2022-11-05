import React from "react";
import {FormattedMessage} from "react-intl";
import {useSounds} from "../generic/SoundPlayer";
import Reset from "./reset";
import {useApolloClient} from "@apollo/client";
import {AmbianceDocument, Ambiance, Simulator} from "generated/graphql";
import {ClientLighting} from "./lighting";

const SoundPlayer: React.FC<{
  simulator: Simulator;
  clientId: string;
  invisible?: boolean;
}> = ({simulator, invisible, clientId}) => {
  const {removeAllSounds, playSound} = useSounds();
  const client = useApolloClient();
  React.useEffect(() => {
    client
      .query({
        query: AmbianceDocument,
        variables: {id: simulator.id},
      })
      .then(({data: {simulators}}) => {
        const {ambiance} = simulators[0];
        ambiance.forEach((a: Ambiance) => {
          playSound({
            ...a,
            looping: true,
            ambiance: true,
          });
        });
      });
    return () => {
      removeAllSounds(true);
    };
  }, [client, playSound, removeAllSounds, simulator.id]);

  const station = React.useMemo(() => ({name: "Sound", cards: []}), []);
  if (invisible) return <Reset clientId={clientId} station={station} />;
  return (
    <div className="keyboard-holder">
      <Reset clientId={clientId} station={station} />
      <FormattedMessage id="sound-player" defaultMessage="Sound Player" />
      <ClientLighting simulator={simulator} clientId={clientId} />
    </div>
  );
};

export default SoundPlayer;
