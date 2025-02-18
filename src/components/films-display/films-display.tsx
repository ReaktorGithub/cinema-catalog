import {Box} from '@mui/material'
import {CategoryDisplay} from "../category-display";
import {useAppContext} from "../../store/hooks.ts";

const FilmsDisplay = () => {
  const { draft } = useAppContext()

  if (!draft.length) {
    return null;
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap='32px'
    >
      {
        draft.map((category) => (
          <CategoryDisplay key={category.id} category={category} />
        ))
      }
    </Box>
  )
}

export { FilmsDisplay };
