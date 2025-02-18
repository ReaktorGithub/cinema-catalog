import {FilmDisplay} from "src/components/film-display";
import {useAppContext} from "src/store/hooks.ts";
import {SubCategory} from "src/types";
import {Box, Typography} from "@mui/material";

type Props = {
  subCategory: SubCategory;
}

const SubCategoryDisplay = ({ subCategory }: Props) => {
  const { getFilmById } = useAppContext();

  return (
    <Box margin='16px 0 16px 24px'>
      <Typography marginBottom='8px'>{subCategory.name}</Typography>

      <Box display='flex' gap='16px' flexWrap='wrap'>
        {
          subCategory.filmIds.map((filmId) => {
            const film = getFilmById(filmId);

            return (
              <FilmDisplay key={filmId} filmName={film?.name || ''}/>
            )
          })
        }
      </Box>
    </Box>
  )
}

export { SubCategoryDisplay };
