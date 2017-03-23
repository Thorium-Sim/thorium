import gql from 'graphql-tag';
import request from 'request';
import App from '../../app';

const mutation = gql`
mutation SetRotation($id: ID, $rotation: RotationInput){
  rotationSet(id: $id, rotation: $rotation)
}
`;
const updateThrusters = () => {
  App.systems.forEach((sys) => {
    if (sys.type === 'Thrusters' && sys.thrusting === true) {
      const rotationAdd = Object.assign({}, sys.rotation);
      rotationAdd.yaw += sys.rotationDelta.yaw * 3;
      rotationAdd.pitch += sys.rotationDelta.pitch * 3;
      rotationAdd.roll += sys.rotationDelta.roll * 3;
      if (rotationAdd.yaw >= 360) rotationAdd.yaw = rotationAdd.yaw - 360;
      if (rotationAdd.pitch >= 360) rotationAdd.pitch = rotationAdd.pitch - 360;
      if (rotationAdd.roll >= 360) rotationAdd.roll = rotationAdd.roll - 360;
      if (rotationAdd.yaw < 0) rotationAdd.yaw = rotationAdd.yaw + 360;
      if (rotationAdd.pitch < 0) rotationAdd.pitch = rotationAdd.pitch + 360;
      if (rotationAdd.roll < 0) rotationAdd.roll = rotationAdd.roll + 360;
      request.post(
        'http://localhost:3001/graphql',
        {
          json: {
            query: mutation,
            operationName: 'SetRotation',
            variables: { id: sys.id, rotation: rotationAdd },
          },
        },
        () => {}
        );
    }
  });
  setTimeout(updateThrusters, 100);
};

updateThrusters();
