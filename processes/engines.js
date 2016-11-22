import gql from 'graphql-tag';
import request from 'request';
import { systems } from '../app';

const mutation = gql`
mutation HeatIncrement($id: ID, $heat: Float){
  addHeat(id: $id, heat: $heat)
}
`;
const updateHeat = () => {
  systems.forEach((sys) => {
    if (sys.type === 'Engine') {
      const speedVal = sys.on ? sys.speed : -10;
      const heatAdd = speedVal * sys.heatRate;
      const sysHeat = sys.heat;
      if (sysHeat + heatAdd >= 0 && sysHeat + heatAdd <= 100 && heatAdd !== 0) {
        request.post(
          'http://localhost:3001/graphql',
          {
            json: {
              query: mutation,
              operationName: 'HeatIncrement',
              variables: { id: sys.id, heat: heatAdd },
            },
          },
          () => {}
          );
      }
    }
  });
  setTimeout(updateHeat, 100);
};
//updateHeat();
