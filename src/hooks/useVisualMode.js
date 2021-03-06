import { useState } from "react";


export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);


  const transition = (mode, replace = false) => {

    if (replace) {
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop();
        return [...newHistory, mode]
      })
    } else {
      setHistory(prev => ([...prev, mode]))
    }
  };

  const back = () => {

    if (history.length <= 1)
      return;

    setHistory(prev => {
      const newHistory = [...prev];
      newHistory.pop();
      return [...newHistory]
    })

  }

  return {

    mode: history[history.length - 1],
    transition,
    back
  };
}
