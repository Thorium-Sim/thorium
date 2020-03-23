import React from "react";

interface TrainingContextI {
  training: boolean;
  stopTraining: () => void;
  startTraining: () => void;
}
export const TrainingContext = React.createContext<TrainingContextI>({
  training: false,
  stopTraining: () => {},
  startTraining: () => {},
});

const TrainingContextProvider: React.FC = ({children}) => {
  const [training, setTraining] = React.useState(false);

  const value = React.useMemo(() => {
    return {
      training,
      stopTraining: () => setTraining(false),
      startTraining: () => setTraining(true),
    };
  }, [training]);
  return (
    <TrainingContext.Provider value={value}>
      {children}
    </TrainingContext.Provider>
  );
};

export default TrainingContextProvider;
