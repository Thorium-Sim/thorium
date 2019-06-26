import App from "../app";

export default function mutationHelper(schema, exceptions = []) {
  return schema.definitions
    .find(d => d.name.value === "Mutation")
    .fields.map(f => f.name.value)
    .filter(f => exceptions.indexOf(f) === -1)
    .reduce(
      (prev, next) => ({
        ...prev,
        [next]: (root, args, context) => {
          let timeout = null;
          return new Promise(resolve => {
            App.handleEvent(
              {
                ...args,
                cb: (a, b, c) => {
                  clearTimeout(timeout);
                  resolve(a);
                }
              },
              next,
              context
            );
            timeout = setTimeout(() => resolve(), 500);
          });
        }
      }),
      {}
    );
}
