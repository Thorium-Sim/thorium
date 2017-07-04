import React from 'react';
import Crew from '../../../../components/views/Crew/core';


const CrewWrapped = ({selectedSimulator: sim}) => {
  return <div className="crew">
  <Crew simulator={sim}/>
  </div>
}

export default CrewWrapped;