import {Edit} from "@mui/icons-material";
import {Box, Button, Typography} from "@mui/material";
import {useAppContext} from "src/store/hooks.ts";
import {Category} from "src/types";

type Props = {
  category: Category;
}

const EditCategory = ({ category }: Props) => {
  const { isEditorOpened, updateSelectedCategory, updateIsEditorOpened, selectedCategory } = useAppContext();

  const isEditMode = category.id === selectedCategory?.id;

  const handleClick = () => {
    updateSelectedCategory(category);
    updateIsEditorOpened(true);
  }

  return (
    <Box display='flex' gap='16px' height='32px' alignItems='center'>
      <Typography
        fontWeight='700'
          sx={{
            backgroundColor: isEditMode ? 'yellow' : 'none'
        }}
      >
        Category: {category.name}
      </Typography>
      <Button
        size='small'
        sx={{
          minWidth: 'auto',
        }}
        disabled={isEditorOpened}
        onClick={handleClick}
      >
        <Edit />
      </Button>
    </Box>

  )
}

export { EditCategory };
