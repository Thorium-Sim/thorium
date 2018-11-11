import App from "../app";
import {
  randomFromList,
  damagePositions
} from "../classes/generic/damageReports/constants";
import reportReplace from "../helpers/reportReplacer";

function randomOfficers(officerList = damagePositions) {
  const typeCount = Math.min(
    Math.floor(Math.random() * 2 + 1),
    officerList.length
  );
  const types = [];
  while (types.length < typeCount) {
    const type = randomFromList(officerList);
    if (types.indexOf(type) === -1) types.push(type);
  }
  return types.reduce((prev, next) => {
    prev[next] = Math.floor(Math.random() * 2 + 1);
    return prev;
  }, {});
}

export default [
  {
    name: "Send Damage Team",
    class: "Teams",
    active({ simulator }) {
      if (!simulator) return false;
      const damageTeamCrew = App.crew
        .filter(c => c.simulatorId === simulator.id)
        .map(c => c.position)
        .filter(c => damagePositions.indexOf(c) > -1)
        .filter((c, i, a) => a.indexOf(c) === i);
      return (
        damageTeamCrew.length > 0 &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "DamageTeams")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "DamageTeams")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A damage team needs to be sent to perform some repairs."
      },
      name: {
        input: () => "text",
        value: () => "Repair Team"
      },
      orders: {
        input: () => "textarea",
        value: () => "Repair any damage that you find."
      },
      room: {
        // TODO: Extend so it allows a system input and pulls the system's
        // locations for the room default
        input: ({ simulator }) => (simulator ? "roomPicker" : "text"),
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.rooms
                  .filter(r => r.simulatorId === simulator.id)
                  .map(r => r.id)
              )
            : ""
      },
      officers: {
        input: () => "damageTeamPicker",
        value: ({ simulator }) =>
          simulator
            ? randomOfficers(
                App.crew
                  .filter(c => c.simulatorId === simulator.id)
                  .map(c => c.position)
                  .filter(c => damagePositions.indexOf(c) > -1)
                  .filter((c, i, a) => a.indexOf(c) === i)
              )
            : randomOfficers()
      }
    },

    instructions({
      simulator,
      requiredValues: { preamble, name, orders, room: roomId, officers },
      task = {}
    }) {
      // Make sure it supports systems as well
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "DamageTeams")
      );
      const officerText = Object.entries(officers)
        .map(([name, count]) => `${name}${count > 1 ? "s" : ""}: ${count}`)
        .join("\n");
      const room = App.rooms.find(r => r.id === roomId);
      const deck = App.decks.find(d => d.id === (room ? room.deckId : roomId));
      const location =
        !room && !deck
          ? "All Decks"
          : room
            ? `${room.name}, Deck ${deck.number}`
            : `Deck ${deck.number}`;
      const text = `Team Name: ${name}
Location: ${location}
Officers:
${officerText}
Orders: ${orders}`;
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Create the following damage team work order:

${text}`,
          {
            simulator
          }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of damage teams"
        } to create the following damage team work order:
${text}`,
        { simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      // It requires text entry, so manual verification
      return false;
    }
  },
  {
    name: "Send Security Team",
    class: "Teams",
    active({ simulator }) {
      if (!simulator) return false;
      const securityTeamCrew = App.crew
        .map(c => c.position)
        .filter(c => c.indexOf("Security") > -1);
      return (
        securityTeamCrew.length > 0 &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "SecurityTeams")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "SecurityTeams")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "A security team should be dispatched to ensure the safety of the crew."
      },
      name: {
        input: () => "text",
        value: () => "Security Detail"
      },
      orders: {
        input: () => "textarea",
        value: () => "Patrol and report back anything that you find."
      },
      room: {
        input: ({ simulator }) => (simulator ? "roomPicker" : "text"),
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.rooms
                  .filter(r => r.simulatorId === simulator.id)
                  .map(r => r.id)
              )
            : ""
      }
    },

    instructions({
      simulator,
      requiredValues: { preamble, name, orders, room: roomId, officers },
      task = {}
    }) {
      // Make sure it supports systems as well
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "SecurityTeams")
      );
      const room = App.rooms.find(r => r.id === roomId);
      const deck = App.decks.find(d => d.id === (room ? room.deckId : roomId));
      const location =
        !room && !deck
          ? "All Decks"
          : room
            ? `${room.name}, Deck ${deck.number}`
            : `Deck ${deck.number}`;
      const text = `Team Name: ${name}
Location: ${location}
Orders: ${orders}`;
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Create the following security team:

${text}`,
          {
            simulator
          }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of security teams"
        } to create the following security team:
${text}`,
        { simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      // It requires text entry, so manual verification
      return false;
    }
  },
  {
    name: "Send Medical Team",
    class: "Teams",
    active({ simulator }) {
      if (!simulator) return false;
      const medicalPositions = ["Medical", "Nurse", "Doctor"];
      const medicalTeamCrew = App.crew.filter(c =>
        medicalPositions.find(p => c.position.indexOf(p) > -1)
      );

      return (
        medicalTeamCrew.length > 0 &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "MedicalTeams")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "MedicalTeams")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "An incident requires the attention of a medical team."
      },
      name: {
        input: () => "text",
        value: () => "Medical Detail"
      },
      orders: {
        input: () => "textarea",
        value: () => "Address any medical situations you find."
      },
      room: {
        input: ({ simulator }) => (simulator ? "roomPicker" : "text"),
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.rooms
                  .filter(r => r.simulatorId === simulator.id)
                  .map(r => r.id)
              )
            : ""
      }
    },

    instructions({
      simulator,
      requiredValues: { preamble, name, orders, room: roomId },
      task = {}
    }) {
      // Make sure it supports systems as well
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "MedicalTeams")
      );
      const room = App.rooms.find(r => r.id === roomId);
      const deck = App.decks.find(d => d.id === (room ? room.deckId : roomId));
      const location =
        !room && !deck
          ? "All Decks"
          : room
            ? `${room.name}, Deck ${deck.number}`
            : `Deck ${deck.number}`;
      const text = `Team Name: ${name}
Location: ${location}
Orders: ${orders}`;
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Create the following medical team:

${text}`,
          {
            simulator
          }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of medical teams"
        } to create the following medical team:
${text}`,
        { simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      // It requires text entry, so manual verification
      return false;
    }
  }
];
