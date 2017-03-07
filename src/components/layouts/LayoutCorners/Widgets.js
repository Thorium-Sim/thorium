import React from 'react';
import { Widgets } from '../../views';
import FontAwesome from 'react-fontawesome';

const WidgetsContainer = (props) => {
  return (
    <div>
    {Object.keys(Widgets).map(key => {
      const widget = Widgets[key];
      const Component = widget.widget;
      return <div>
      <FontAwesome name={widget.icon} className="text-danger" />
      </div>
    })}
    </div>
    );
}

export default WidgetsContainer;