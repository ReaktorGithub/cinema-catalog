import {Chip} from "@mui/material";

type Props = {
  filmName: string
}

const FilmDisplay = ({ filmName }: Props) => {
  if (filmName === '') {
    return null;
  }

  return (
    <Chip color="primary" label={filmName}/>
  )
}

export { FilmDisplay };
