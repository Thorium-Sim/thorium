import App from "../app";
import reportReplace from "../helpers/reportReplacer";
import {randomFromList} from "../classes/generic/damageReports/constants";

// The crew's recipe pool for randomly-generated tasks: public recipes plus
// any secrets they've already discovered.
function knownRecipes(simulator) {
  return App.fabricationRecipes.filter(
    r => r.simulatorId === simulator.id && (!r.secret || r.discovered),
  );
}

export default [
  {
    name: "Fabricate Inventory",
    class: "Fabrication",
    active({simulator}) {
      // Requires a station with the Fabrication card and at least one recipe
      return (
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "Fabrication"),
        ) &&
        knownRecipes(simulator).length > 0
      );
    },
    stations({simulator}) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "Fabrication"),
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "New equipment must be fabricated.",
      },
      recipe: {
        input: ({simulator}) =>
          simulator ? knownRecipes(simulator).map(r => r.name) : "text",
        value: ({simulator}) =>
          simulator
            ? randomFromList(knownRecipes(simulator).map(r => r.name)) || ""
            : "",
      },
      count: {
        input: () => "text",
        value: () => "1",
      },
    },
    instructions({
      simulator,
      requiredValues: {preamble, recipe, count},
      task = {},
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "Fabrication"),
      );
      const recipeObj = App.fabricationRecipes.find(
        r =>
          r.simulatorId === simulator.id &&
          (r.id === recipe ||
            r.name.toLowerCase() === (recipe || "").toLowerCase()),
      );
      const target = recipeObj
        ? `${recipeObj.output.count * (parseInt(count, 10) || 1)} x ${
            recipeObj.output.name
          } (schematic: ${recipeObj.name})`
        : `${count} x ${recipe}`;
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Use the fabricator to produce ${target}.`,
          {simulator},
        );
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of fabrication"
        } to produce ${target}.`,
        {simulator},
      );
    },
    verify({simulator, requiredValues: {recipe, count}}) {
      const recipeObj = App.fabricationRecipes.find(
        r =>
          r.simulatorId === simulator.id &&
          (r.id === recipe ||
            r.name.toLowerCase() === (recipe || "").toLowerCase()),
      );
      const outputName = (recipeObj ? recipeObj.output.name : recipe) || "";
      const required =
        (parseInt(count, 10) || 1) * (recipeObj ? recipeObj.output.count : 1);
      // Completed jobs stick around for a while after delivery, which gives
      // the verify loop its window to observe them.
      const delivered = App.fabricationJobs
        .filter(
          j =>
            j.simulatorId === simulator.id &&
            j.status === "complete" &&
            j.output.name.toLowerCase() === outputName.toLowerCase(),
        )
        .reduce((prev, next) => prev + next.output.count, 0);
      return delivered >= required;
    },
  },
];
