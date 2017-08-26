import App from "../../app";

export const MessagesQueries = {
  messages(_, { simulatorId, station }) {
    let returnValue = App.messages;
    if (simulatorId) {
      returnValue = returnValue.filter(m => m.simulatorId === simulatorId);
    }
    if (station) {
      // Get the station object
      const stationObj = App.simulators
        .find(s => s.id === simulatorId)
        .stations.find(s => s.name === station);
      // Get all of the messages which the station sent
      // And which are sent to the station
      returnValue = returnValue.filter(
        m =>
          m.sender === station ||
          m.destination === station ||
          stationObj.messageGroups.indexOf(m.sender) > -1 ||
          stationObj.messageGroups.indexOf(m.destination) > -1
      );
    }

    return returnValue;
  },
  messageGroups() {
    return ["Security", "Damage", "Medical"];
  }
};

export const MessagesMutations = {};

export const MessagesSubscriptions = {};
