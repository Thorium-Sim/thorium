import React from 'react';
import {  Card } from 'reactstrap';

const properties = [
'Simulator',
'Stations',
'Systems',
'Decks',
'Inventory',
'Crew'
]
export default ({selectProperty, selectedProperty}) => {
  return <Card>
{properties.map(p => <li key={p} 
  onClick={() => {selectProperty(p)}}
  className={`list-group-item ${selectedProperty === p ? 'selected' : ''}`}>{p}</li>)}
  </Card>
}