import React from "react";

export default function useFlightLocalStorage(flightId, key, initialValue) {
  const flightItem = window.localStorage.getItem(flightId)
    ? JSON.parse(window.localStorage.getItem(flightId))
    : {};

  const [storedValue, setStoredValue] = React.useState(() => {
    const item = flightItem[key];
    try {
      // Get from local storage by key
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return item;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      const flightItem = window.localStorage.getItem(flightId)
        ? JSON.parse(window.localStorage.getItem(flightId))
        : {};
      flightItem[key] = valueToStore;
      window.localStorage.setItem(flightId, JSON.stringify(flightItem));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
