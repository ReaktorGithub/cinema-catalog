import {Box, Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useAppContext} from "../../store/hooks.ts";

const AddCategoryButton = () => {
  const { isEditorOpened, updateIsEditorOpened, updateSelectedCategory } = useAppContext();

  const handleClick = () => {
    updateSelectedCategory(null);
    updateIsEditorOpened(true);
  }

  return (
    <Box margin='16px'>
      <Button
        size="small"
        variant="outlined"
        startIcon={<Add />}
        sx={{
          textTransform: 'none',
        }}
        disabled={isEditorOpened}
        onClick={handleClick}
      >
        Add category
      </Button>
    </Box>
  )
}

export { AddCategoryButton };
