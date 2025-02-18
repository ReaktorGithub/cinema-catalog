import {Box, Typography} from "@mui/material";
import {SubCategory} from "../../types";
import {useAppContext} from "../../store/hooks.ts";
import {FilmDisplay} from "../film-display";

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
