import {getChangedSubCategories} from "./get-changed-sub-categories.ts";
import {Category, DeletedCategory, NewCategory, Output, UpdatedCategory} from "../../../types";

type BuildOutputOptionsType = {
  initialState: Category[],
  draft: Category[],
}

const buildOutput = ({ initialState, draft }: BuildOutputOptionsType): Output => {
  const result: Output = {
    newCategories: [],
    updatedCategories: [],
    deletedCategories: [],
  }

  const newCategories: NewCategory[] = draft
    .filter((category) => initialState.every((item) => item.id !== category.id))
    .map((category) => ({
      name: category.name,
      subCategories: category.subCategories.map((subCategory) => ({
        name: subCategory.name,
        filmIds: subCategory.filmIds,
      })),
    }));

  const updatedCategories: UpdatedCategory[] = [];

  initialState.forEach((category) => {
    const draftCategory = draft.find((item) => item.id === category.id);

    if (draftCategory) {
      let isChanged = draftCategory.name !== category.name;

      const changedSubCategories = getChangedSubCategories(
        category.subCategories,
        draftCategory.subCategories,
      );

      if (changedSubCategories.deleted.length || changedSubCategories.updated.length) {
        isChanged = true;
      }

      if (isChanged) {
        updatedCategories.push({
          id: draftCategory.id,
          name: draftCategory.name,
          updatedSubCategories: changedSubCategories.updated,
          deletedSubCategories: changedSubCategories.deleted,
        })
      }
    }
  });

  const deletedCategories: DeletedCategory[] = initialState
    .filter((category) => draft.every((item) => item.id !== category.id))
    .map((category) => ({
      id: category.id,
    }));

  result.newCategories = newCategories;
  result.updatedCategories = updatedCategories;
  result.deletedCategories = deletedCategories;

  return result;
}

export { buildOutput };
