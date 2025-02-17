import {useEffect, useState} from "react";
import {Category, SubCategory} from "../../types/types.ts";
import {useAppContext} from "../../store/hooks.ts";
import {generateNumberId} from "../../utils/generate-number-id.ts";
import {Box, Button, TextField, Typography} from "@mui/material";
import {Add, Close, Delete} from "@mui/icons-material";
import {SelectFilmDialog} from "../select-film-dialog";

type Props = {
  onConfirm: (category: Category) => void;
  onRemoveCategory: (category: Category | null) => void;
}

const CategoryForm = ({ onConfirm, onRemoveCategory }: Props) => {
  const [name, setName] = useState<string>('');
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | undefined>(undefined);

  const { selectedCategory, updateIsEditorOpened, updateSelectedCategory, getFilmById } = useAppContext();

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

  const handleCancel = () => {
    updateIsEditorOpened(false);
    updateSelectedCategory(null);
  }

  const handleConfirm = () => {
    onConfirm({
      id: selectedCategory?.id || generateNumberId(16),
      name,
      subCategories,
    });

    handleCancel();
  }

  const handleRemoveCategory = () => {
    onRemoveCategory(selectedCategory);
    handleCancel();
  }

  return (
    <Box>
      <Box display='flex' flexDirection='column' gap='24px'>
        <Box display='flex' gap='24px' alignItems='center' justifyContent='space-between'>
          <TextField
            label='Category name'
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleRemoveCategory}>
            <Delete color='error'/>
          </Button>
        </Box>

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

        <Box display='flex' gap='32px' width='100%' justifyContent='space-between'>
          <Button
            onClick={handleCancel}
            startIcon={<Close color='error'/>}
            color='error'
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color="success"
            onClick={handleConfirm}
          >
            {selectedCategory ? 'Confirm changes' : 'Add category'}
          </Button>
        </Box>

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

export { CategoryForm };
