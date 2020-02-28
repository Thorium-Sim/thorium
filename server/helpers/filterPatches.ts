export default function filterPatches(patches, info) {
  // We'll collect the information about the subscription
  // from the info argument and use that to determine
  // just the patches that we need, no more, no less
  const values = info.operation.selectionSet.selections[0].selectionSet.selections.find(
    s => s.name.value === "values",
  );

  const selections = values.selectionSet.selections;
  // Loop through each patch, and follow the path to see if it applies.
  return patches.filter(({op, path}) => {
    let pathItems = path.concat();
    let selectionPath = selections.concat();
    while (pathItems.length > 0) {
      if (!selectionPath || selectionPath.length === 0) return false;
      const pathItem = pathItems.shift();
      if (typeof pathItem === "string") {
        const selection = selectionPath.find(s => s.name.value === pathItem);
        if (!selection) return false;
        selectionPath =
          selection.selectionSet && selection.selectionSet.selections;
      }
    }
    return true;
  });
}

export function handlePatches(
  context,
  publishKey: string,
  subId: any,
  subIdKey: string,
  label?: string,
) {
  return function(patches) {
    if (!context.subscriptionResponses) context.subscriptionResponses = {};
    if (!context.subscriptionResponses[publishKey]) {
      context.subscriptionResponses[publishKey] = [
        {[subIdKey]: subId, patches},
      ];
    } else {
      context.subscriptionResponses[publishKey] = context.subscriptionResponses[
        publishKey
      ].map(e => {
        if (e[subIdKey] === subId) {
          return {...e, patches: e.patches.concat(patches)};
        }
        return e;
      });
    }
  };
}
