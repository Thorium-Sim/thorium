import uuid from "uuid";

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

export function handlePatches({
  context,
  publishKeys = ["entities"],
  subFilterValues,
}: {
  context: any;
  publishKeys: string[];
  subFilterValues: {[key: string]: any};
}) {
  // Context is GraphQL Context.
  // Publish key is the GraphQL subscription that is being published.
  // subFilterValues is the values that are passed in along with the patches
  // which can be used in the subscription filter function to filter out
  // unnecessary subscription calls.
  return function(patches) {
    if (!context.subscriptionResponses) context.subscriptionResponses = {};
    publishKeys.forEach(publishKey => {
      if (!context.subscriptionResponses[publishKey]) {
        context.subscriptionResponses[publishKey] = [
          {...subFilterValues, patches},
        ];
      } else {
        context.subscriptionResponses[
          publishKey
        ] = context.subscriptionResponses[publishKey].map(e => {
          const includesSubFilterValues = Object.entries(
            subFilterValues,
          ).reduce((prev, [key, value]) => {
            if (!prev) return false;
            if (e[key] !== value) return false;
            return true;
          }, true);
          if (includesSubFilterValues) {
            return {...e, patches: e.patches.concat(patches)};
          }
          return e;
        });
      }
    });
  };
}

export function patchResolve(rootQuery, _args, _context, info) {
  // TODO: Make this clean out replace object keys that are not included as well.
  if (rootQuery.patches.length === 1 && rootQuery.patches[0]?.values) {
    return rootQuery.patches;
  }
  return filterPatches(rootQuery.patches, info);
}

export function handleInitialSubResponse(fn: (id: string) => void) {
  const id = uuid.v4();
  process.nextTick(() => {
    fn(id);
  });
  return id;
}
