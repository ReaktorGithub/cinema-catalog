import {Box, Grid2 as Grid, Typography} from "@mui/material";
import {FilmsDisplay} from "src/components/films-display";
import {CategoryEditor} from "src/components/category-editor";
import {AddCategoryButton} from "src/components/add-category-button";
import {SaveButton} from "src/components/save-button";

const FilmsPage = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid size={{ md: 6, xs: 12 }}>
          <Typography variant='h5' component="h2" marginBottom='16px'>Categories</Typography>
          <AddCategoryButton />
          <FilmsDisplay />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <CategoryEditor />
        </Grid>
      </Grid>

      <Box marginTop='32px'>
        <SaveButton />
      </Box>
    </Box>
  )
}

export { FilmsPage };
