import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('navCalculateCourse', ({id, destination}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.calculateCourse(destination);
  pubsub.publish('navigationUpdate', App.systems.filter(s => s.type === 'Navigation'));
})
App.on('navCancelCalculation', ({id}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.cancelCalculation();
  pubsub.publish('navigationUpdate', App.systems.filter(s => s.type === 'Navigation'));
})
App.on('navCourseResponse', ({id, x, y, z}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.courseResponse(x, y, z)
  pubsub.publish('navigationUpdate', App.systems.filter(s => s.type === 'Navigation'));
})
App.on('navCourseEntry', ({id, x, y, z}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.courseEntry(x, y, z)
  pubsub.publish('navigationUpdate', App.systems.filter(s => s.type === 'Navigation'));
})
App.on('navToggleCalculate', ({id, which}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.toggleCalculate(which);
  pubsub.publish('navigationUpdate', App.systems.filter(s => s.type === 'Navigation'));
})