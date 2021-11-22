import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (mode, replace = false) => {
    const newHistory = [...history];

    if (replace) {
      newHistory.pop();
    }

    newHistory.push(mode);
    setMode(mode);
    setHistory(newHistory);

  };

  const back = () => {

    if (history.length <= 1)
      return;

    const newHistory = [...history];
    newHistory.pop();
    const newMode = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    setMode(newMode);
  };

  return {

    mode,
    transition,
    back
  };
}
