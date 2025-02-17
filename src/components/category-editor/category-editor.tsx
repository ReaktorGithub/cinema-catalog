import {CategoryForm} from "./category-form.tsx";
import {Box, Typography} from "@mui/material";
import {useAppContext} from "../../store/hooks.ts";
import {Category} from "../../types/types.ts";

const CategoryEditor = () => {
  const {
    changedCategories,
    deletedCategories,
    pushAddedCategory,
    updateChangedCategory,
    updateDeletedCategory,
    removeChangedCategory,
    removeDeletedCategory,
  } = useAppContext();

  const { isEditorOpened, filmsData } = useAppContext();

  const handleConfirmCategoryChanges = (category: Category) => {
    if (!filmsData) {
      return;
    }

    const index = filmsData.categories.findIndex((item) => item.id === category.id);

    if (index === -1) {
      pushAddedCategory(category);
      return;
    }

    updateChangedCategory(changedCategories, category);
    removeDeletedCategory(category.id);
  }

  const handleRemoveCategory = (category: Category | null) => {
    if (!category || !filmsData) {
      return;
    }

    const index = filmsData.categories.findIndex((item) => item.id === category.id);

    if (index > -1) {
      updateDeletedCategory(deletedCategories, category);
      removeChangedCategory(category.id);
    }
  }

  if (!isEditorOpened) {
    return null;
  }

  return (
    <Box>
      <Box display='flex' gap='24px' justifyContent='space-between' marginBottom='32px'>
        <Typography variant='h5' component="h2">Categories editor</Typography>
      </Box>

      <CategoryForm
        onConfirm={handleConfirmCategoryChanges}
        onRemoveCategory={handleRemoveCategory}
      />
    </Box>

  )
}

export { CategoryEditor };
