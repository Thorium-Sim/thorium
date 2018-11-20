import App from "../app";
import {
  randomFromList,
  partsList
} from "../classes/generic/damageReports/constants";

function splice(str, start, delCount, newSubStr) {
  return (
    str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount))
  );
}

export default function reportReplace(report = "", { system, simulator }) {
  let returnReport = report;
  // #PART
  if (system && system.damage) system.damage.exocompParts = [];
  const partMatches = report.match(/#PART/gi) || [];
  partMatches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    const part = randomFromList(partsList);
    if (system && system.damage) system.damage.exocompParts.push(part);
    returnReport = splice(returnReport, index, 0, part);
  });

  // #COLOR
  const colorMatches = report.match(/#COLOR/gi) || [];
  colorMatches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    returnReport = splice(
      returnReport,
      index,
      0,
      randomFromList(["red", "blue", "green", "yellow"])
    );
  });

  // #[1 - 2]
  const matches = returnReport.match(/#\[ ?([0-9]+) ?- ?([0-9]+) ?\]/gi) || [];
  matches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    const numbers = m.replace(/[ [\]#]/gi, "").split("-");
    const num = Math.round(Math.random() * numbers[1] + numbers[0]);
    returnReport = splice(returnReport, index, 0, num);
  });

  // #["String1", "String2", "String3", etc.]
  const stringMatches = returnReport.match(/#\[ ?("|')[^\]]*("|') ?]/gi) || [];
  stringMatches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    const strings = m.match(/"(.*?)"/gi);
    returnReport = splice(
      returnReport,
      index,
      0,
      randomFromList(strings).replace(/"/gi, "")
    );
  });

  // #NUMBER
  const numberMatches = returnReport.match(/#NUMBER/gi) || [];
  const num = Math.round(Math.random() * 12 + 1);
  numberMatches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    returnReport = splice(returnReport, index, 0, num);
  });

  // Simulator specific
  if (simulator) {
    // #DECK
    const deckMatches = returnReport.match(/#DECK/gi) || [];
    const decks = App.decks.filter(d => d.simulatorId === simulator.id);
    if (decks.length > 0) {
      const deck = randomFromList(decks).number;
      deckMatches.forEach(m => {
        const index = returnReport.indexOf(m);
        returnReport = returnReport.replace(m, "");
        returnReport = splice(returnReport, index, 0, deck);
      });
    }
    // #ROOM
    const roomMatches = returnReport.match(/#ROOM/gi) || [];
    const rooms = App.rooms.filter(d => d.simulatorId === simulator.id);
    if (rooms.length > 0) {
      const room = randomFromList(rooms);
      const roomDeck = decks.find(d => d.id === room.deckId);
      const roomText = `${room.name}, Deck ${roomDeck.number}`;
      roomMatches.forEach(m => {
        const index = returnReport.indexOf(m);
        returnReport = returnReport.replace(m, "");
        returnReport = splice(returnReport, index, 0, roomText);
      });
    }

    // #CREW
    const crewMatches = returnReport.match(/#CREW/gi) || [];
    const crew = App.crew.filter(c => c.simulatorId === simulator.id);
    if (crew.length > 0) {
      const crewmember = randomFromList(crew);
      const crewText = `${crewmember.rank} ${crewmember.firstName} ${
        crewmember.lastName
      }`;
      crewMatches.forEach(m => {
        const index = returnReport.indexOf(m);
        returnReport = returnReport.replace(m, "");
        returnReport = splice(returnReport, index, 0, crewText);
      });
    }
  }
  // #REACTIVATIONCODE
  if (report.indexOf("#REACTIVATIONCODE") > -1) {
    const reactivationCode = Array(8)
      .fill("")
      .map(() => randomFromList(["¥", "Ω", "∏", "-", "§", "∆", "£", "∑", "∂"]))
      .join("");
    if (system) system.damage.neededReactivationCode = reactivationCode;
    returnReport = returnReport.replace(
      /#REACTIVATIONCODE/gi,
      reactivationCode
    );
  }

  // #SYSTEMNAME
  if (system && report.indexOf("#SYSTEMNAME")) {
    returnReport = returnReport.replace(
      /#SYSTEMNAME/gi,
      system.displayName || system.name || "system"
    );
  }
  return returnReport;
}
