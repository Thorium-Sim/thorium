import React from 'react';

export const InputField = (props) => {
  const style = Object.assign({
    backgroundColor: '#FBFE3D',
    border: 'solid 1px #D2CB43',
    height: '16px',
    whiteSpace: 'pre',
    textAlign: 'center'
  }, props.style);
  if (props.alert){
    style.backgroundColor = '#f00';
    style.borderColor = '#a00';
  }
  const onClick = () => {
    const value = prompt(props.prompt, props.children);
    props.onClick(value);
  }
  return <div onClick={onClick} style={style}>{props.children}</div>
}

export const OutputField = ({style = {}, children, alert, onClick, title, id}) => {
  const compStyle = Object.assign({
    backgroundColor: '#188EFB',
    border: 'solid 1px #2586D8',
    height: '16px',
    whiteSpace: 'pre',
    textAlign: 'center'
  }, style)
  if (alert) {
    compStyle.backgroundColor = '#f00';
    compStyle.borderColor = '#a00';
  }
  return <div id={id} title={title} onClick={onClick} style={compStyle}>{children}</div>
}

export const TypingField = ({style = {}, onChange, onBlur, value, rows, input, controlled}) => {
  const compStyle = Object.assign({
    backgroundColor: '#B4B4B4',
    border: 'solid 1px #434343',
    height: '16px',
    resize: 'none',
    textAlign: 'center',
    width: '100%'
  }, style)
  if (input) {
    return <input type="text" onChange={onChange} onBlur={onBlur} style={compStyle} defaultValue={value}/>
  }
  if (controlled) {
    return <textarea type="text" rows={rows} onChange={onChange} onBlur={onBlur} style={compStyle} value={value} />
  }
  return <textarea type="text" rows={rows} onChange={onChange} onBlur={onBlur} style={compStyle} defaultValue={value} />
}
