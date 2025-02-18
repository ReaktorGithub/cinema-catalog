import {
  Category,
  DeletedCategory,
  NewCategory,
  Output,
  UpdatedCategory,
} from "../../../types/types.ts";
import {getChangedSubCategories} from "./get-changed-sub-categories.ts";

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

  const newCategories: NewCategory[] = added.map((category) => ({
    name: category.name,
    subCategories: category.subCategories.map((subCategory) => ({
      name: subCategory.name,
      filmIds: subCategory.filmIds,
    })),
  }));

  const updatedCategories: UpdatedCategory[] = changed.map((category) => {
    const originalIndex = initialState.findIndex((item) => item.id === category.id);
    const changedSubCategories = getChangedSubCategories(
      initialState[originalIndex].subCategories,
      category.subCategories,
    );

    return {
      id: category.id,
      name: category.name,
      updatedSubCategories: changedSubCategories.updated,
      deletedSubCategories: changedSubCategories.deleted,
    }
  });

  const deletedCategories: DeletedCategory[] = deleted.map((category) => ({
    id: category.id,
  }));

  result.newCategories = newCategories;
  result.updatedCategories = updatedCategories;
  result.deletedCategories = deletedCategories;

  return result;
}

export { buildOutput };
