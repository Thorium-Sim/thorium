import React from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(
    () => window.localStorage.getItem(key) || initialValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
