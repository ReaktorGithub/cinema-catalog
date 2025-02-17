import {useEffect} from "react";
import {getDataDto} from "./api/queries.ts";
import {useAppContext} from "./store/hooks.ts";
import {isFilmsData} from "./api/type-guards.ts";
import {Typography, Box, CircularProgress} from "@mui/material";
import {FilmsPage} from "./pages/films-page";

const App = () => {
  const { updateFilmsData, error, loading, updateError, updateLoading } = useAppContext();

  useEffect(() => {
    updateError(false);
    updateLoading(true);

    getDataDto()
      .then((res) => {
        if (isFilmsData(res.data)) {
          updateFilmsData(res.data);
        } else {
          updateError(true)
        }
      })
      .catch(() => {
        updateError(true);
      })
      .finally(() => {
        updateLoading(false);
      })
  }, [updateError, updateFilmsData, updateLoading])

  return (
    <Box padding='32px 0 32px'>
      <Typography textAlign='center' variant="h4" component="h1" marginBottom='64px'>Cinema Catalog</Typography>
      <Box width='80%' margin='0 auto'>
        {
          error ? (
            <Typography color='error'>Oops!.. Something went wrong.</Typography>
          ) : (
            loading ? (
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
              >
                <CircularProgress />
              </Box>
            ) : (
              <FilmsPage />
            )
          )
        }
      </Box>
    </Box>
  )
}

export { App };
