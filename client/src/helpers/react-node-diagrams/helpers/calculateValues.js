export default function calculateValues(
  components,
  connections,
  inputValues,
  config = {},
  registeredComponents
) {
  const compList = registeredComponents
    .sort(a => {
      if (a.outputs.length === 0) {
        return -1;
      }
      if (a.inputs.length > 0) {
        return -1;
      }
      return 0;
    })
    .map(c => c.name);
  const values = [];
  const sortedComps = components.concat().sort((a, b) => {
    if (
      compList.indexOf(a.component.name) > compList.indexOf(b.component.name)
    ) {
      return 1;
    }
    return -1;
  });
  function checkValue(value) {
    return value || value === 0 || value === "" || value === null;
  }
  function setValues(id, node, value) {
    values[id] = value;
  }
  function getValue(id, node) {
    if (values[id] && checkValue(values[id][node])) {
      return values[id][node];
    }
    return values[id];
  }
  function getComponentValue(component, node) {
    if (getValue(component.id, node)) return getValue(component.id, node);
    const comp = registeredComponents.find(
      c =>
        c.objectKey === component.component.name ||
        c.name === component.component.name
    );
    if (!comp) return 0;
    const compConfig = config[comp.id];
    const processFunction = comp.process || (comp => inputValues[comp.id]);
    // Walk back through each of the inputs.
    const compConnections = connections
      .filter(c => c.to.id === component.id)
      .reduce(
        (prev, next) => ({
          ...prev,
          [next.to.nodeId]: getComponentValue(
            components.find(c => c.id === next.from.id),
            next.from.nodeId
          )
        }),
        {}
      );
    const value = processFunction(
      { ...component, config: compConfig },
      compConnections
    );
    setValues(component.id, node, value);
    return node && value && checkValue(value[node]) ? value[node] : value;
  }
  const calculatedValues = sortedComps.reduce(
    (prev, c) => ({
      ...prev,
      [c.id]: getComponentValue(c)
    }),
    {}
  );
  return calculatedValues;
}
