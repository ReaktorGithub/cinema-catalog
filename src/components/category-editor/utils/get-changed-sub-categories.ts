import {DeletedSubCategory, SubCategory, UpdatedSubCategory} from "../../../types";

const getChangedSubCategories = (original: SubCategory[], newVersion: SubCategory[]): {
  updated: UpdatedSubCategory[],
  deleted: DeletedSubCategory[]
} => {
  const resultUpdated: UpdatedSubCategory[] = [];
  const resultDeleted: DeletedSubCategory[] = [];

  for (let i = 0; i < original.length; i++) {
    const originalItem = original[i];
    const index = newVersion.findIndex((subCategory) => subCategory.id === originalItem.id);

    if (index === -1) {
      resultDeleted.push(({
        name: originalItem.name,
        filmIds: originalItem.filmIds,
      }));
      continue;
    }

    const isNameChanged = originalItem.name !== newVersion[index].name;
    const isFilmsChanged = originalItem.filmIds.toString() !== newVersion[index].filmIds.toString();

    if (isNameChanged || isFilmsChanged) {
      resultUpdated.push({
        name: newVersion[index].name,
        filmIds: newVersion[index].filmIds,
      })
    }
  }

  return {
    updated: resultUpdated,
    deleted: resultDeleted,
  };
}

export { getChangedSubCategories };
