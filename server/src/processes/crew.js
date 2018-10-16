// Crew move between decks.
// A decks crew count is determined by how many crew members
// have that deck as their current location.

// Until we get node maps for rooms and decks, we'll operate
// on the following principles:

// 1. Crew members can move to any deck instantaneously. They do not
//    have to move through every deck between to get to another deck.
// 2. Crew members cannot move into a deck that is evacuated. If all
//    decks are evacuated, they will all move into deck 1 as a fallback.
// 3. Crew members cannot enter or leave a deck that has the doors closed.
// 4. Crew members will randomly move between decks infrequently
// 5. Crew members on a team will very quickly (but not instantly)
//    move to whatever deck the team is assigned to.

import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";
import { pubsub } from "../helpers/subscriptionManager";

function moveCrew() {
  let moved = false;
  App.flights.filter(f => f.running === true).forEach(f => {
    f.simulators.forEach(s => {
      const crew = App.crew.filter(c => c.simulatorId === s);
      const decks = App.decks.filter(c => c.simulatorId === s);
      const teams = App.teams.filter(c => c.simulatorId === s);
      if (!crew || !decks) return;
      const allowedDecks = decks
        .filter(c => c.doors === false && c.evac === false)
        .map(c => c.id);
      if (allowedDecks.length === 0) allowedDecks.push(decks[0].id);
      const noEscapeDecks = decks.filter(c => c.doors === true).map(c => c.id);

      // Start with moving team members
      const teamCrewNeedingMoving = teams.reduce((prev, next) => {
        const location = App.rooms.find(d => d.id === next.location);
        const deck = App.decks.find(
          d => d.id === (location ? location.deckId : next.location)
        );
        if (allowedDecks.indexOf(deck.id) === -1) return prev;
        next.officers.forEach(o => {
          const c = crew.find(cc => cc.id === o);
          if (c.location !== deck.id) {
            prev.push({ deck: deck.id, officer: c });
          }
        });
        return prev;
      }, []);

      // Move the team peeps
      if (Math.random() > 0.7) {
        const c = randomFromList(teamCrewNeedingMoving);
        if (c && noEscapeDecks.indexOf(c.officer.location) === -1) {
          moved = true;
          c.officer.location = c.deck;
        }
      }

      // Now move people out of evacuated decks
      const evacuatedCrewNeedingMoving = decks
        .filter(d => d.actualEvac === true && d.doors === false)
        .reduce((prev, next) => {
          crew.forEach(c => {
            if (c.location === next.id) prev.push(c);
          });
          return prev;
        }, []);
      const evacCount = Math.round(Math.random() * 3 + 1);
      for (let x = 0; x < evacCount; x++) {
        const c = randomFromList(evacuatedCrewNeedingMoving);
        if (c && noEscapeDecks.indexOf(c.location) === -1) {
          moved = true;
          c.location = randomFromList(allowedDecks);
        }
      }

      // Occasionally move crew members to a random deck
      if (Math.random() > 0.95) {
        const c = randomFromList(crew);
        if (noEscapeDecks.indexOf(c.location) === -1) {
          moved = true;
          c.location = randomFromList(allowedDecks);
        }
      }

      // Finally, if the crew member has no location, assign them
      // a random deck
      crew.forEach(c => {
        if (!c.location) {
          moved = true;
          c.location = randomFromList(allowedDecks);
        }
      });
    });
  });
  if (moved) {
    pubsub.publish("decksUpdate", App.decks);
  }
  setTimeout(moveCrew, 1000);
}
moveCrew();
