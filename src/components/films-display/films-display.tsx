import {Box} from '@mui/material'
import {useAppContext} from "src/store/hooks.ts";
import {CategoryDisplay} from "src/components/category-display";

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
