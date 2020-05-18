import React, {CSSProperties} from "react";

export const InputField: React.FC<{
  promptValue?: string | number;
  prompt: string;
  alert?: boolean;
  onClick: (value: string | number) => void;
  [key: string]: any;
}> = ({
  children,
  promptValue = "",
  prompt: inputPrompt,
  alert = false,
  onClick: propsOnClick,
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
      textAlign: "center",
    },
    props.style,
  );
  if (alert) {
    style.backgroundColor = "#f00";
    style.borderColor = "#a00";
  }
  const onClick = () => {
    const childrenValue =
      typeof children === "string" || typeof children === "number"
        ? children
        : null;
    const value = prompt(
      inputPrompt,
      String(promptValue || childrenValue || ""),
    );
    if (value === null) return; //props.onClick(null);
    const parseValue = isNaN(Number(value)) ? value : Number(value);
    propsOnClick(String(parseValue));
  };
  return (
    <div className="input-field" {...props} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export const OutputField: React.FC<{
  style?: CSSProperties;
  alert?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  title?: string;
  id?: string;
}> = ({
  style = {},
  children = null,
  alert,
  onClick,
  onDoubleClick,
  title,
  id,
}) => {
  const compStyle = Object.assign(
    {
      backgroundColor: "#188EFB",
      border: "solid 1px #2586D8",
      height: "16px",
      color: "black",
      fontSize: "12px",
      whiteSpace: "pre",
      textAlign: "center",
    },
    style,
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

export const TypingField: React.FC<{
  style?: CSSProperties;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  className?: string;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value?: any;
  rows?: number;
  input?: boolean;
  controlled?: boolean;
  placeholder?: string;
  alert?: boolean;
  onDoubleClick?: (
    event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement, MouseEvent>,
  ) => void;
}> = ({
  style = {},
  onChange,
  className = "",
  onBlur,
  value = undefined,
  rows = undefined,
  input = undefined,
  controlled = false,
  placeholder = "",
  alert = false,
  onDoubleClick,
}) => {
  const compStyle = Object.assign(
    {
      backgroundColor: "#B4B4B4",
      border: "solid 1px #434343",
      height: "16px",
      resize: "none",
      textAlign: "center",
      width: "100%",
    },
    style,
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
      className={`typing-field ${className}`}
      rows={rows}
      onChange={onChange}
      onBlur={onBlur}
      style={compStyle}
      defaultValue={value || ""}
    />
  );
};
