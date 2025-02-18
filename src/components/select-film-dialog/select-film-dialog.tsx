import {Box, Button, Dialog, DialogTitle, Typography} from "@mui/material";
import {useAppContext} from "src/store/hooks.ts";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelectFilm: (id: number) => void;
  excludeFilmIds?: number[];
}

const SelectFilmDialog = ({ onClose, open, excludeFilmIds = [], onSelectFilm }: Props) => {
  const { filmsData } = useAppContext();

  if (!open || !filmsData) {
    return null;
  }

  const filteredList = filmsData.films.filter((film) => !excludeFilmIds.includes(film.id))

  return (
    <Dialog onClose={onClose} open={open}>
      {
        filteredList.length ? (
          <>
            <DialogTitle>Please select a film</DialogTitle>
            <Box marginBottom='16px' display='flex' flexDirection='column' gap='4px'>
              {
                filteredList
                  .map((film) => {
                    return <Button key={film.id} onClick={() => onSelectFilm(film.id)}>
                      {film.name}
                    </Button>
                  })
              }
            </Box>
          </>
        ) : (
          <Typography margin='16px'>The list is empty.</Typography>
        )
      }
    </Dialog>
  )
}

export { SelectFilmDialog };
