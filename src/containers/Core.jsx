import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Cores } from '../components/views';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './Core.scss';

export default () => {
  var layout = [
  {i: 'a', x: 0, y: 0, w: 13, h: 3},
  {i: 'b', x: 20, y: 0, w: 20, h: 5},
  {i: 'c', x: 4, y: 10, w: 20, h: 5}
  ];
  return (
    <div className="core">
    <ReactGridLayout className="layout" layout={layout} cols={80} rowHeight={10} width={1200}>
    <div key={'a'}><Cores.EngineControlCore /></div>
    <div key={'b'}><Cores.TransporterCore /></div>
    <div key={'c'}>c</div>
    </ReactGridLayout>
    </div>
    );
}