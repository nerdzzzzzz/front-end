import React, { createContext, useContext, useState, ReactNode } from "react";

export type TimerMode = "FOCUS" | "SHORT_BREAK";

interface TimerContextType {
  focusDuration: number;
  setFocusDuration: (seconds: number) => void;
  shortBreakDuration: number;
  setShortBreakDuration: (seconds: number) => void;
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
}

const TimerContext = createContext<TimerContextType>({} as TimerContextType);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  // Default to 25 minutes and 5 minutes
  const [focusDuration, setFocusDuration] = useState(25 * 60);
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60);
  const [mode, setMode] = useState<TimerMode>("FOCUS");

  const value = React.useMemo(
    () => ({
      focusDuration,
      setFocusDuration,
      shortBreakDuration,
      setShortBreakDuration,
      mode,
      setMode,
    }),
    [focusDuration, shortBreakDuration, mode]
  );

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
