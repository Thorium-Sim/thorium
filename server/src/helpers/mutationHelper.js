import App from "../app";

export default function mutationHelper(schema, exceptions = []) {
  return schema.definitions
    .find(d => d.name.value === "Mutation")
    .fields.map(f => f.name.value)
    .filter(f => exceptions.indexOf(f) === -1)
    .reduce(
      (prev, next) => ({
        ...prev,
        [next]: async (root, args, context) =>
          new Promise(resolve => {
            App.handleEvent(
              {
                ...args,
                cb: (a, b, c) => resolve(a)
              },
              next,
              context
            );
            setTimeout(() => resolve(), 500);
          })
      }),
      {}
    );
}
