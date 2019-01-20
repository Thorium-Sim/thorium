import App from "../app";
import reportReplace from "../helpers/reportReplacer";
import {
  randomFromList,
  randomCode
} from "../classes/generic/damageReports/constants";

// From a list of fictional computers/AIs
const usernameList = [
  "EMCOM",
  "MARAX",
  "EMSIAC",
  "WESCAC",
  "ARDNEH",
  "AIVAS",
  "EMRIX",
  "Max Headroom"
];

export default [
  {
    name: "Create User",
    class: "Computer Core",
    active({ simulator }) {
      // Check cards
      return (
        simulator &&
        App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "ComputerCore"
        ) &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    instructions({
      simulator,
      requiredValues: { preamble, username, password, level },
      task = {}
    }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ComputerCore")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Create a new user. Use the following values:
          Level: ${level}
          Username: ${username}
          Password: ${password}`,
          { system, simulator }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the computer core"
        } to create a new user. Use the following values:
Level: ${level}
Username: ${username}
Password: ${password}`,
        { system, simulator }
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "A crewmember needs a user created in the computer core to complete some calculations."
      },
      level: {
        input: () =>
          Array(10)
            .fill(0)
            .map((_, i) => ({ label: i + 1, value: i + 1 })),
        value: () => Math.floor(Math.random() * 5 + 5)
      },
      username: {
        input: () => "text",
        value: () => randomFromList(usernameList)
      },
      password: {
        input: () => "text",
        value: () => randomCode()
      }
    },
    verify({ simulator, requiredValues }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.class === "ComputerCore"
      );
      return system.users.find(
        s =>
          requiredValues.username &&
          s.name.toLowerCase() === requiredValues.username.toLowerCase() &&
          s.level === requiredValues.level
      );
    }
  },
  {
    name: "Remove User",
    class: "Computer Core",
    active({ simulator }) {
      // Check cards
      return (
        simulator &&
        App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "ComputerCore"
        ) &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    instructions({ simulator, requiredValues: { preamble, user }, task = {} }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      const u = system.users.find(us => us.id === user);
      const { level, name } = u || { name: user, level: null };
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ComputerCore")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Remove the following user:
${level ? `Level: ${level}\n` : ""}Username: ${name}`,
          { system, simulator }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the computer core"
        } to remove the following user:
        ${level ? `Level: ${level}\n` : ""}Username: ${name}`,
        { system, simulator }
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A user needs to be removed from the computer core."
      },
      level: {
        input: () =>
          Array(10)
            .fill(0)
            .map((_, i) => ({ label: i + 1, value: i + 1 })),
        value: () => Math.floor(Math.random() * 5 + 5)
      },
      user: {
        input: ({ simulator }) => {
          if (!simulator)
            return { type: "text", placeholder: "The username of the user" };
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "ComputerCore"
          );
          if (!system) return "text";
          return system.users
            .concat()
            .sort((a, b) => {
              if (a.level > b.level) return 1;
              if (b.level > a.level) return -1;
              return 0;
            })
            .map(u => ({
              label: `Level ${u.level}: ${u.name}${
                u.hacker ? " (Hacker)" : ""
              }`,
              value: u.id
            }));
        },
        value: ({ simulator }) => {
          if (!simulator) return "Archbishop Apotheosis";
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "ComputerCore"
          );
          if (!system) return "Archbishop Apotheosis";
          return randomFromList(system.users.map(u => u.id));
        }
      }
    },
    verify({ simulator, requiredValues }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.class === "ComputerCore"
      );
      if (!system) return;
      return !system.users.find(
        u =>
          requiredValues.user &&
          (u.id === requiredValues.user ||
            u.name.toLowerCase() === requiredValues.user.toLowerCase())
      );
    }
  },
  {
    name: "Restart Terminal",
    class: "Computer Core",
    active({ simulator }) {
      // Check cards
      return (
        simulator &&
        App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "ComputerCore"
        ) &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A terminal is malfunctioning and needs to be restarted."
      },
      terminal: {
        input: ({ simulator }) => {
          if (!simulator) return "text";
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.type === "ComputerCore"
          );
          if (!system) return "text";
          return system.terminals.map(t => ({
            label: `${t.name}${t.status === "O" ? " - Offline" : ""}`,
            value: t.id
          }));
        },
        value: ({ simulator }) => {
          if (!simulator)
            return `Terminal ${Math.floor(Math.random() * 199 + 1)}`;
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.type === "ComputerCore"
          );
          if (!system) return `Terminal ${Math.floor(Math.random() * 199 + 1)}`;
          return Math.random(system.terminals.map(t => t.id));
        }
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, terminal },
      task = {}
    }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      const t = system.terminals.find(
        t => t.id === terminal || t.name === terminal
      );
      if (!t) return "Error generating task description";
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ComputerCore")
      );
      if (station && task.station === station.name) {
        return reportReplace(`${preamble} Reset terminal ${t.name}.`, {
          system,
          simulator
        });
      }
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the computer core"
        } to reset terminal ${t.name}`,
        { system, simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      const terminal = system.terminals.find(
        t => t.id === requiredValues.terminal || t.name === terminal
      );
      if (!terminal) return false;
      if (terminal.status === "R") return true;
      return false;
    }
  },
  {
    name: "Find Hacker",
    class: "Computer Core",
    active({ simulator }) {
      // Check cards
      if (!simulator) return false;
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      if (!system) return false;
      const hackers = system.users.filter(u => u.hacker === true);
      return (
        hackers.length > 0 &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "A hacker has been identified in the computer core and should be removed."
      },
      user: {
        input: ({ simulator }) => {
          if (!simulator)
            return { type: "text", placeholder: "The username of the user" };
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "ComputerCore"
          );
          if (!system) return "text";
          return system.users.filter(u => u.hacker).map(u => ({
            label: `Level ${u.level}: ${u.name}`,
            value: u.id
          }));
        },
        value: ({ simulator }) => {
          if (!simulator) return "Archbishop Apotheosis";
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "ComputerCore"
          );
          if (!system) return "Archbishop Apotheosis";
          return randomFromList(
            system.users.filter(u => u.hacker).map(u => u.id)
          );
        }
      }
    },
    instructions({ simulator, requiredValues: { preamble, user }, task = {} }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      const u = system.users.find(us => us.id === user);
      const { name } = u || { name: user, level: null };
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ComputerCore")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Remove the suspicious user "${name}".`,
          {
            system,
            simulator
          }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the computer core"
        } to remove the suspicious user "${name}"`,
        { system, simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      if (!system) return;
      return !system.users.find(
        u =>
          requiredValues.user &&
          (u.id === requiredValues.user ||
            u.name.toLowerCase() === requiredValues.user.toLowerCase())
      );
    }
  },
  {
    name: "Restore File",
    class: "Computer Core",
    active({ simulator }) {
      // Check cards
      if (!simulator) return false;
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      return (
        system &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A file has become corrupted and needs to be restored."
      },
      file: {
        input: ({ simulator }) => {
          if (!simulator) return { type: "text", placeholder: "The file name" };
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "ComputerCore"
          );
          if (!system) return { type: "text", placeholder: "The file name" };
          return system.files
            .filter(f => f.corrupted && !f.restoring)
            .concat()
            .sort((a, b) => {
              if (a.level > b.level) return 1;
              if (b.level > a.level) return -1;
              return 0;
            })
            .map(u => ({
              label: `Level ${u.level}: ${u.name}`,
              value: u.id
            }));
        },
        value: ({ simulator }) => {
          if (!simulator) return "ROMMEL.DLL";
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "ComputerCore"
          );
          if (!system) return "ROMMEL.DLL";
          return randomFromList(
            system.files.filter(f => f.corrupted && !f.restoring).map(u => u.id)
          );
        }
      }
    },
    instructions({ simulator, requiredValues: { preamble, file }, task = {} }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      const f = system.files.find(us => us.id === file);
      const { name, level } = f || { name: file, level: null };
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ComputerCore")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Restore the following file: \nFile Name:${name}\n${
            level ? `Level: ${level}` : ""
          }.`,
          {
            system,
            simulator
          }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the computer core"
        } to restore the following file: \nFile Name:${name}\n${
          level ? `Level: ${level}` : ""
        }.`,
        { system, simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      if (!system) return;
      return !system.files.find(
        f =>
          requiredValues.file &&
          (f.id === requiredValues.file ||
            f.name.toLowerCase() === requiredValues.file.toLowerCase()) &&
          (f.restoring === true || f.corrupted === false)
      );
    }
  },
  {
    name: "Restore All Files",
    class: "Computer Core",
    active({ simulator }) {
      // Check cards
      if (!simulator) return false;
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      return (
        system &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "Several files have become corrupted and need to be restored."
      },
      level: {
        input: () =>
          Array(10)
            .fill(0)
            .map((_, i) => ({ label: i + 1, value: i + 1 })),
        value: () => Math.floor(Math.random() * 10 + 1)
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, level },
      task = {}
    }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ComputerCore")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Restore all files in Level ${level}.`,
          {
            system,
            simulator
          }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the computer core"
        } to restore all files in Level ${level}.`,
        { system, simulator }
      );
    },
    verify() {
      // Manually verified by an event handler
      return false;
    }
  },
  {
    name: "Remove Virus",
    class: "Computer Core",
    active({ simulator }) {
      // Check cards
      if (!simulator) return false;
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      return (
        system &&
        system.virii.length > 0 &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ComputerCore")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "Viruses have been detected in the computer core and should be removed."
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, level },
      task = {}
    }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "ComputerCore"
      );
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ComputerCore")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Perform a virus scan and remove any viruses you discover.`,
          {
            system,
            simulator
          }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the computer core"
        } to perform a virus scan and remove any viruses that are discovered.`,
        { system, simulator }
      );
    },
    verify() {
      // Manually verified by an event handler
      return false;
    }
  }
];
