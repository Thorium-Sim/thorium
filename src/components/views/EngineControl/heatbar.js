import React from 'react';

const HeatBar = (props) => {
  return (<div>
    <label className="heatBox-Label">{props.label}</label>
    <div className="heatBox">
    <div className="heatBar" style={{height:`${props.level}%`,backgroundImage:props.background}}></div>
    </div>
    </div>);
};

export default HeatBar;