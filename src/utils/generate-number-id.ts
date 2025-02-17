const generateNumberId = (digits: number): number => {
  return Math.floor(Math.random() * (10 ** digits));
}

export { generateNumberId };
