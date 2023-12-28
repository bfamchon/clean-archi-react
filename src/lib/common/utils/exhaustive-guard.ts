export const exhaustiveGuard = (value: never): never => {
  throw new Error(`Exhaustive guard error: received value ${value}`);
};
