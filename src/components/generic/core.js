import React from 'react';

export const InputField = (props) => {
  const style = {
    backgroundColor: '#FBFE3D',
    border: 'solid 1px #D2CB43',
    height: '16px',
  }
  const onClick = () => {
    const value = prompt(props.prompt);
    props.onClick(value);
  }
  return <div onClick={onClick} style={style}>{props.children}</div>
}

export const OutputField = (props) => {
  const style = {
    backgroundColor: '#188EFB',
    border: 'solid 1px #2586D8',
    height: '16px',
  }
  return <div style={style}>{props.children}</div>
}

export const TypingField = (props) => {
  const style = {
    backgroundColor: '#B4B4B4',
    border: 'solid 1px #434343',
    height: '16px',
  }
  return <input type="text" onChange={props.onChange} onBlur={props.onBlur} style={style} defaultValue={props.value} />
}
