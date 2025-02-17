import {Category, Output} from "../../../types/types.ts";

const buildOutput = ({ initialState, added, changed, deleted }: {
  initialState: Category[],
  added: Category[],
  changed: Category[],
  deleted: Category[],
}): Output => {
  const result: Output = {
    newCategories: [],
    updatedCategories: [],
    deletedCategories: [],
  }

  if (!initialState) {
    return result;
  }

  return result;
}

export { buildOutput };
