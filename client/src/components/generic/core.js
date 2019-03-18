import React from "react";

export const InputField = ({
  children,
  promptValue,
  prompt,
  alert,
  ...props
}) => {
  const style = Object.assign(
    {
      backgroundColor: "#FBFE3D",
      border: "solid 1px #D2CB43",
      color: "black",
      height: "16px",
      fontSize: "12px",
      whiteSpace: "pre",
      textAlign: "center"
    },
    props.style
  );
  if (alert) {
    style.backgroundColor = "#f00";
    style.borderColor = "#a00";
  }
  const onClick = () => {
    const value = prompt(prompt, promptValue || children || "");
    const parseValue = isNaN(Number(value)) ? value : Number(value);
    props.onClick(parseValue);
  };
  return (
    <div className="input-field" {...props} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export const OutputField = ({
  style = {},
  children,
  alert,
  onClick,
  onDoubleClick,
  title,
  id
}) => {
  const compStyle = Object.assign(
    {
      backgroundColor: "#188EFB",
      border: "solid 1px #2586D8",
      height: "16px",
      color: "black",
      fontSize: "12px",
      whiteSpace: "pre",
      textAlign: "center"
    },
    style
  );
  if (alert) {
    compStyle.backgroundColor = "#f00";
    compStyle.borderColor = "#a00";
  }
  return (
    <div
      id={id}
      className="output-field"
      title={title}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={compStyle}
    >
      {children}
    </div>
  );
};

export const TypingField = ({
  style = {},
  onChange,
  className,
  onBlur,
  value,
  rows,
  input,
  controlled,
  placeholder,
  alert,
  onDoubleClick
}) => {
  const compStyle = Object.assign(
    {
      backgroundColor: "#B4B4B4",
      border: "solid 1px #434343",
      height: "16px",
      resize: "none",
      textAlign: "center",
      width: "100%"
    },
    style
  );
  if (alert) {
    compStyle.backgroundColor = "#f00";
    compStyle.borderColor = "#a00";
  }
  if (input) {
    if (controlled) {
      return (
        <input
          type="text"
          placeholder={placeholder}
          className={`typing-field ${className}`}
          onChange={onChange}
          onBlur={onBlur}
          style={compStyle}
          value={value || ""}
          onDoubleClick={onDoubleClick}
        />
      );
    }
    return (
      <input
        type="text"
        placeholder={placeholder}
        className={`typing-field ${className}`}
        onChange={onChange}
        onBlur={onBlur}
        style={compStyle}
        defaultValue={value || ""}
        onDoubleClick={onDoubleClick}
      />
    );
  }
  if (controlled) {
    return (
      <textarea
        type="text"
        placeholder={placeholder}
        className={`typing-field ${className}`}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
        style={compStyle}
        value={value || ""}
      />
    );
  }
  return (
    <textarea
      type="text"
      className={`typing-field ${className}`}
      rows={rows}
      onChange={onChange}
      onBlur={onBlur}
      style={compStyle}
      defaultValue={value || ""}
    />
  );
};
