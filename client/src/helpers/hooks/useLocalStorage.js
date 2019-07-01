import React from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    let value = window.localStorage.getItem(key);
    if (!value) return initialValue;
    if (value === "false") return false;
    return value;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
