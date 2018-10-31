import React from "react";
import ReactDOM from "react-dom";
import './printable.scss';

export default function Printable(props) {
  // Render printable outside the root React element
  return ReactDOM.createPortal((
      <div className='printable'>
        { props.children }
      </div>
    ), 
    document.body
  );
}
