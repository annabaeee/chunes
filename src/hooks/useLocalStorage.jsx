import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const stringValue = localStorage.getItem(keyName);
    if (stringValue === null) return defaultValue;
    try {
      return JSON.parse(stringValue);
    } catch {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      if (newValue) {
        localStorage.setItem(keyName, JSON.stringify(newValue));
      } else {
        localStorage.removeItem(keyName);
      }
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};