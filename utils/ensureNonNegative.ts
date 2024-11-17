export const ensureNonNegative = (value: number) => {
  return value < 0 ? 0 : value;
};
