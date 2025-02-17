import {Box} from '@mui/material'
import {useAppContext} from "../../store/hooks.ts";
import {CategoryDisplay} from "../category-display";

const FilmsDisplay = () => {
  const { filmsData } = useAppContext()

  if (!filmsData) {
    return null;
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap='32px'
    >
      {
        filmsData.categories.map((category) => (
          <CategoryDisplay key={category.id} category={category} />
        ))
      }
    </Box>
  )
}

export { FilmsDisplay };
