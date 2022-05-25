let uniqueIdCounter: number = 0;
const uniqueId = (): number => {
  uniqueIdCounter += 1;
  return uniqueIdCounter;
};

export default uniqueId;
