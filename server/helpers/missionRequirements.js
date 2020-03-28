import {typeDefs} from "../data";

export function missionRequirements(mission) {
  const definitions = typeDefs.flatMap(t => t.definitions);
  const macroRequirements = definitions
    .filter(t => t.name.value === "Mutation")
    .flatMap(t => t.fields)
    .map(t => ({
      name: t.name.value,
      requirements: t.description?.value
        .split("Requires:")[1]
        ?.split("-")
        .map(s => s.trim())
        .filter(Boolean)
        .reduce((prev, next) => {
          const holder = next.split(":");
          if (holder[0] === "Space EdVentures") {
            prev.spaceEdventures = true;
            return prev;
          }
          if (holder[0] === "Docking") {
            prev.docking = true;
            return prev;
          }
          prev[holder[0].toLowerCase()] = holder[1]
            ?.split(",")
            .map(m => m.trim())
            .join(" or ");
          if (!prev[holder[0].toLowerCase()]) {
            console.info("Missing macro requirement:", holder);
          }
          return prev;
        }, {}),
    }))
    .filter(t => t.requirements)
    .reduce((prev, next) => {
      prev[next.name] = next.requirements;
      return prev;
    }, {});

  const missionRequirements = mission.timeline
    .flatMap(t => t.timelineItems)
    .map(t => macroRequirements[t.event])
    .filter(Boolean)
    .reduce(
      (prev, next) => {
        prev.cards = prev.cards
          .concat(next.cards)
          .filter((a, i, arr) => Boolean(a) && arr.indexOf(a) === i);
        prev.systems = prev.systems
          .concat(next.systems)
          .filter((a, i, arr) => Boolean(a) && arr.indexOf(a) === i);
        prev.spaceEdventures =
          prev.spaceEdventures || Boolean(next.spaceEdventures);
        prev.docking = prev.docking || Boolean(next.docking);
        return prev;
      },
      {cards: [], systems: [], spaceEdventures: false, docking: false},
    );
  return missionRequirements;
}
