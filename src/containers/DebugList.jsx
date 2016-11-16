import React from 'react';
import viewList from '../components/views/list.js';
import { Link } from 'react-router';

export default () => {
  return (
    <ul>
    {viewList.map((v) => {
      return <li key={v}><Link to={`/test/${v}`}>{v}</Link></li>;
    })}
    </ul>
    );
}
