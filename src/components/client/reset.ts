import React from "react";
import gql from "graphql-tag.macro";
import {useSounds} from "../generic/SoundPlayer";
import {publish} from "helpers/pubsub";
import {useApolloClient} from "@apollo/client";
import {Station} from "generated/graphql";

const CACHE_INVALID_SUB = gql`
  subscription ClearCache($client: ID!) {
    clearCache(client: $client)
  }
`;
const excludedStations = ["Sound", "Blackout", "Viewscreen", "Keyboard"];

const ResetCache: React.FC<{
  clientId: string;
  reset?: Function;
  station?: Pick<Station, "name" | "cards">;
}> = ({clientId, reset, station}) => {
  const client = useApolloClient();
  const {playSound, removeAllSounds} = useSounds();
  const excludeStation =
    (station?.name && excludedStations.includes(station?.name)) ||
    station?.cards?.find(c => excludedStations.indexOf(c.component) > -1);

  React.useEffect(() => {
    const cacheSub = client
      .subscribe({
        query: CACHE_INVALID_SUB,
        variables: {
          client: clientId,
        },
      })
      .subscribe({
        next: () => {
          // Reset all of the sounds that are currently playing
          removeAllSounds();
          if (excludeStation) return;
          playSound({url: "/sciences.ogg"});
          reset?.();
          publish("widgetClose");
        },
        error(err) {
          console.error("Error resetting cache", err);
        },
      });
    return () => {
      cacheSub.unsubscribe();
    };
  }, [client, clientId, excludeStation, playSound, removeAllSounds, reset]);

  return null;
};

export default ResetCache;
