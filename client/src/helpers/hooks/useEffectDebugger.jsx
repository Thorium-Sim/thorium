import React from "react";

const compareInputs = (oldInputs, newInputs, prefix) => {
  // Compare individual items
  oldInputs.forEach((oldInput, index) => {
    const newInput = newInputs[index];
    if (oldInput !== newInput) {
      console.info(`${prefix} - The input changed in position ${index}`);
      // console.info("Old value:", oldInput);
      // console.info("New value:", newInput);
    }
  });
};
const useEffectDebugger = (func, inputs, prefix = "useEffect") => {
  // Using a ref to hold the inputs from the previous run (or same run for initial run
  const oldInputsRef = React.useRef(inputs);
  React.useEffect(() => {
    // Get the old inputs
    const oldInputs = oldInputsRef.current;

    // Compare the old inputs to the current inputs
    compareInputs(oldInputs, inputs, prefix);

    // Save the current inputs
    oldInputsRef.current = inputs;

    // Execute wrapped effect
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
};

export default useEffectDebugger;
