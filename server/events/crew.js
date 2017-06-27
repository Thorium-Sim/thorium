import App from '../../app.js';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('addCrewmember', ({crew}) => {
  App.crew.push(new Classes.Crew(crew));
  pubsub.publish('crewUpdate', App.crew);
});
App.on('removeCrewmember', (crew) => {
  App.crew = App.crew.filter(c => c.id !== crew);
  pubsub.publish('crewUpdate', App.crew);
});
App.on('updateCrewmember', ({crew}) => {
  App.crew.find(c => c.id === crew.id).update(crew);
  pubsub.publish('crewUpdate', App.crew);
});