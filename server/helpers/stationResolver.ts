import App from "../app";
import {Card} from "../classes";

export const StationResolver = rootValue => {
  if (
    rootValue.station &&
    rootValue.station.match(/keyboard:.{8}-.{4}-.{4}-.{4}-.{12}/gi)
  ) {
    return {
      name: rootValue.station,
      cards: [
        new Card({
          name: "Keyboard",
          component: "Keyboard",
        }),
      ],
    };
  }
  if (rootValue.station === "Sound") {
    return {
      name: "Sound",
      cards: [
        new Card({
          name: "SoundPlayer",
          component: "SoundPlayer",
        }),
      ],
    };
  }

  const simulator = App.simulators.find(s => s.id === rootValue.simulatorId);
  if (simulator) {
    const interfaces = simulator.interfaces.map(i =>
      App.interfaces.find(({id}) => i === id),
    );
    if (
      rootValue.station &&
      rootValue.station.match(/interface-id:.{8}-.{4}-.{4}-.{4}-.{12}/gi)
    ) {
      const iface = interfaces.find(
        i => i.templateId === rootValue.station.replace("interface-id:", ""),
      );
      if (iface) {
        return {
          name: `interface-id:${iface.id}`,
          cards: [
            new Card({
              name: "Interface",
              component: `interface-id:${iface.id}`,
            }),
          ],
        };
      }
    }
    const station = simulator.stations.find(s => s.name === rootValue.station);
    if (station) {
      const cards = station.cards.map(c => {
        if (c.component.match(/interface-id:.{8}-.{4}-.{4}-.{4}-.{12}/gi)) {
          const iface = interfaces.find(
            i => i.templateId === c.component.replace("interface-id:", ""),
          );
          return new Card({...c, component: `interface-id:${iface.id}`});
        }
        return c;
      });
      return {
        ...station,
        cards,
      };
    }
    // Fallback for Viewscreen, Blackout, and Mobile
    if (rootValue.station) {
      return {
        name: rootValue.station,
        cards: [
          new Card({
            name: rootValue.station,
            component: rootValue.station,
          }),
        ],
      };
    }
    return null;
  }
};
