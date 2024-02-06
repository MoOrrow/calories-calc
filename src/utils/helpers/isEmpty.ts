export const isEmpty = <T>(val: T): boolean => {
  let typeCondition = false;
  switch (val) {
    case 'string':
      typeCondition = val !== '';
      break;
    case 'number':
      typeCondition = val !== 0 && !isNaN(Number(val));
      console.log({ typeCondition });
      break;
  }

  return val !== undefined && val != null && typeCondition;
};
