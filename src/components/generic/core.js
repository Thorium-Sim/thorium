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

export const OutputField = ({style = {}, children, alert}) => {
  const compStyle = Object.assign({
    backgroundColor: '#188EFB',
    border: 'solid 1px #2586D8',
    height: '16px',
  }, style)
  if (alert) {
    compStyle.backgroundColor = '#f00';
    compStyle.borderColor = '#a00';
  }
  return <div style={compStyle}>{children}</div>
}

export const TypingField = ({style = {}, onChange, onBlur, value, input}) => {
  const compStyle = Object.assign({
    backgroundColor: '#B4B4B4',
    border: 'solid 1px #434343',
    height: '16px',
    resize: 'none',
  }, style)
  return input ? <input type="text" onChange={onChange} onBlur={onBlur} style={compStyle} defaultValue={value}/> :
  <textarea type="text" onChange={onChange} onBlur={onBlur} style={compStyle} defaultValue={value} />
}
