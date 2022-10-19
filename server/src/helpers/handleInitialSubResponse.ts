import uuid from "uuid";

export function handleInitialSubResponse(fn: (id: string) => void) {
  const id = uuid.v4();
  process.nextTick(() => {
    fn(id);
  });
  return id;
}
