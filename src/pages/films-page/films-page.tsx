import {Box, Typography} from "@mui/material";
import {FilmsDisplay} from "../../components/films-display";
import {CategoryEditor} from "../../components/category-editor";
import {AddCategoryButton} from "../../components/add-category-button";

const FilmsPage = () => {
  return (
    <Box display="flex" gap='32px' width='100%'>
      <Box width='100%'>
        <Typography variant='h5' component="h2" marginBottom='16px'>Categories</Typography>
        <AddCategoryButton />
        <FilmsDisplay />
      </Box>

      <Box width='100%'>
        <CategoryEditor />
      </Box>
    </Box>
  )
}

export { FilmsPage };
