import {Box, Button, TextField, Typography} from "@mui/material";
import {useAppContext} from "../../store/hooks.ts";
import {useEffect, useState} from "react";
import {SubCategory} from "../../types/types.ts";
import {Add, Close, Delete} from "@mui/icons-material";
import {generateNumberId} from "../../utils/generate-number-id.ts";
import {SelectFilmDialog} from "../select-film-dialog";

const CategoryEditor = () => {
  const [name, setName] = useState<string>('');
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | undefined>(undefined);

  const { isEditorOpened, selectedCategory, updateIsEditorOpened, updateSelectedCategory, getFilmById } = useAppContext();

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setSubCategories(selectedCategory.subCategories);
    } else {
      setName('');
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const handleChangeSubCategoryName = (id: number, value: string) => {
    const index = subCategories.findIndex((category) => category.id === id);

    if (index > -1) {
      setSubCategories((prev) => {
        const newValue = [...prev];
        newValue[index] = {
          ...newValue[index],
          name: value,
        }
        return newValue;
      })
    }
  }

  const handleAddSubCategory = () => {
    const newSubCategory: SubCategory = {
      id: generateNumberId(16),
      name: '',
      filmIds: [],
    };

    setSubCategories((prev) => {
      return [
        ...prev,
        newSubCategory,
      ]
    })
  }

  const handleRemoveSubCategory = (id: number) => {
    setSubCategories((prev) => prev.filter((category) => category.id !== id))
  }

  const openAddFilmDialog = (subCategoryId: number) => {
    setSelectedSubCategory(subCategories.find((subCategory) => subCategory.id === subCategoryId))
    setOpenDialog(true);
  }

  const closeAddFilmDialog = () => {
    setSelectedSubCategory(undefined)
    setOpenDialog(false);
  }

  const handleSelectFilm = (id: number) => {
    const index = subCategories.findIndex((category) => category.id === selectedSubCategory?.id);

    if (index > -1) {
      setSubCategories((prev) => {
        const newValue = [...prev];
        newValue[index] = {
          ...newValue[index],
          filmIds: [
            ...newValue[index].filmIds,
            id,
          ]
        }
        return newValue;
      })
    }

    closeAddFilmDialog();
  }

  const handleDeleteFilm = (subCategoryId: number, filmId: number) => {
    const index = subCategories.findIndex((category) => category.id === subCategoryId);

    if (index > -1) {
      setSubCategories((prev) => {
        const newValue = [...prev];
        newValue[index] = {
          ...newValue[index],
          filmIds: newValue[index].filmIds.filter((id) => id !== filmId),
        }
        return newValue;
      })
    }
  }

  const handleFormClose = () => {
    updateIsEditorOpened(false);
    updateSelectedCategory(null);
  }

  if (!isEditorOpened) {
    return null;
  }

  return (
    <Box>
      <Box display='flex' gap='24px' justifyContent='space-between' marginBottom='32px'>
        <Typography variant='h5' component="h2">Category editor</Typography>
        <Button onClick={handleFormClose} startIcon={<Close color='error'/>} color='error'>
          Close
        </Button>
      </Box>

      <Box display='flex' flexDirection='column' gap='24px'>
        <TextField
          label='Category name'
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box display='flex' flexDirection='column' gap='24px' marginLeft='32px' marginBottom='32px'>
          {
            subCategories.map((subCategory) => (
              <Box key={subCategory.id} display='flex' flexDirection='column' gap='12px'>
                <Box display='flex' gap='12px'>
                  <TextField
                    label='Sub Category name'
                    variant="outlined"
                    value={subCategory.name}
                    onChange={(e) => handleChangeSubCategoryName(subCategory.id, e.target.value)}
                  />
                  <Button onClick={() => handleRemoveSubCategory(subCategory.id)}>
                    <Delete color='error'/>
                  </Button>
                </Box>

                <Box display='flex' flexDirection='column' gap='12px' marginLeft='32px'>
                  {
                    subCategory.filmIds.map((filmId) => {
                      const film = getFilmById(filmId);

                      return film ? (
                        <Box key={filmId} display='flex' gap='12px' alignItems='center'>
                          <Typography>{film.name}</Typography>
                          <Button
                            size='small'
                            sx={{
                              minWidth: 'auto'
                            }}
                            onClick={() => handleDeleteFilm(subCategory.id, film?.id)}
                          >
                            <Delete color='error' fontSize='small'/>
                          </Button>
                        </Box>
                      ) : null
                    })
                  }
                  <Button
                    startIcon={<Add />}
                    size='small'
                    sx={{
                      textTransform: 'none',
                    }}
                    onClick={() => openAddFilmDialog(subCategory.id)}
                  >
                    Add film
                  </Button>
                </Box>
              </Box>
            ))
          }
          <Button
            startIcon={<Add />}
            variant='contained'
            sx={{
              textTransform: 'none',
            }}
            onClick={handleAddSubCategory}
          >
            Add sub category
          </Button>
        </Box>

        <Button
          variant='contained'
          color="success"
        >
          Save
        </Button>
      </Box>

      <SelectFilmDialog
        excludeFilmIds={selectedSubCategory?.filmIds}
        open={openDialog}
        onClose={closeAddFilmDialog}
        onSelectFilm={handleSelectFilm}
      />
    </Box>
  )
}

export { CategoryEditor };
