import App from '../../app';

const updateCoolant = () => {
  //Loop through all of the simulators to isolate the systems
  App.systems.filter(s => s.type === 'Coolant' && s.transfer === null)
  .forEach(s => {
    //Transfer the coolant to the other system
    const {id: sysId, key, subsysId} = s.transfer;
    const transferSystem = App.systems.find(ts => ts.id === sysId);
    // Trigger Events
    if (key && subsysId) {

    } else {

    }
  });
  setTimeout(updateCoolant, 20);
};
//updateCoolant();
