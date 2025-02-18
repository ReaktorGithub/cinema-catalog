import {CategoryForm} from "./category-form.tsx";
import {Box, Typography} from "@mui/material";
import {useAppContext} from "../../store/hooks.ts";
import {Category} from "../../types";

const CategoryEditor = () => {
  const { addCategory, updateCategory, deleteCategory, draft } = useAppContext();

  const { isEditorOpened } = useAppContext();

  const handleConfirmCategoryChanges = (category: Category) => {
    const isExist = draft.some((item) => item.id === category.id);

    if (isExist) {
      updateCategory(category);
    } else {
      addCategory(category);
    }
  }

  const handleRemoveCategory = (category: Category | null) => {
    if (category) {
      deleteCategory(category.id);
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
