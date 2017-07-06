import React from 'react';
import Core from '../Core';

export default ({params: {flightId}}) => {
  return <Core flightId={flightId} />
}