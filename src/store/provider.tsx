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

  return {
    loading,
    error,
    filmsData,
    isEditorOpened,
    selectedCategory,
    updateFilmsData,
    updateLoading,
    updateError,
    getFilmById,
    updateIsEditorOpened,
    updateSelectedCategory,
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
