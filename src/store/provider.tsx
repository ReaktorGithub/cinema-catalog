import {CinemaContext} from "./context.ts";
import {ReactNode, useCallback, useState} from "react";
import {Category, Film, FilmsData} from "../types/types.ts";
import {CinemaContextType} from "./context-types.ts";

const useCreateAppContext = (): CinemaContextType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [filmsData, setFilmsData] = useState<FilmsData | null>(null);
  const [isEditorOpened, setIsEditorOpened] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [changedCategories, setChangedCategories] = useState<Category[]>([]);
  const [addedCategories, setAddedCategories] = useState<Category[]>([]);
  const [deletedCategories, setDeletedCategories] = useState<Category[]>([]);

  const updateFilmsData = useCallback((data: FilmsData) => {
    setFilmsData(data);
  }, []);

  const updateLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  const updateError = useCallback((value: boolean) => {
    setError(value);
  }, []);
  
  const getFilmById = useCallback((id: number): Film | undefined => {
    return filmsData?.films.find((film) => film.id === id);
  }, [filmsData]);

  const updateIsEditorOpened = useCallback((value: boolean) => {
    setIsEditorOpened(value);
  }, []);

  const updateSelectedCategory = useCallback((data: Category | null) => {
    setSelectedCategory(data);
  }, []);

  const pushAddedCategory = useCallback((category: Category) => {
    setAddedCategories((prev) => [...prev, category]);
  }, []);

  const updateChangedCategory = useCallback((currentList: Category[], category: Category) => {
    const index = currentList.findIndex((item) => item.id === category.id);

    if (index > -1) {
      setChangedCategories((prev) => {
        const newValue = [...prev];
        newValue[index] = category;
        return newValue;
      })
    } else {
      setChangedCategories((prev) => [...prev, category]);
    }
  }, []);

  const removeChangedCategory = useCallback((id: number) => {
    setChangedCategories((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateDeletedCategory = useCallback((currentList: Category[], category: Category) => {
    const index = currentList.findIndex((item) => item.id === category.id);

    if (index > -1) {
      setDeletedCategories((prev) => {
        const newValue = [...prev];
        newValue[index] = category;
        return newValue;
      })
    } else {
      setDeletedCategories((prev) => [...prev, category]);
    }
  }, []);

  const removeDeletedCategory = useCallback((id: number) => {
    setDeletedCategories((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    loading,
    error,
    filmsData,
    isEditorOpened,
    selectedCategory,
    addedCategories,
    changedCategories,
    deletedCategories,
    updateFilmsData,
    updateLoading,
    updateError,
    getFilmById,
    updateIsEditorOpened,
    updateSelectedCategory,
    pushAddedCategory,
    updateDeletedCategory,
    updateChangedCategory,
    removeDeletedCategory,
    removeChangedCategory,
  };
}

type Props = {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const context = useCreateAppContext();

  return (
    <CinemaContext.Provider value={context}>
      {children}
    </CinemaContext.Provider>
  );
};
