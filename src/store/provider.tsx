import {CinemaContext} from "./context.ts";
import {ReactNode, useCallback, useState} from "react";
import {CinemaContextType} from "./context-types.ts";
import {Category, Film, FilmsData} from "../types";

const useCreateAppContext = (): CinemaContextType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [filmsData, setFilmsData] = useState<FilmsData | null>(null);
  const [isEditorOpened, setIsEditorOpened] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [draft, setDraft] = useState<Category[]>([]);

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

  const updateDraft = useCallback((categories: Category[]) => {
    setDraft(categories);
  }, []);

  const addCategory = useCallback((category: Category) => {
    setDraft((prev) => [...prev, category]);
  }, []);

  const updateCategory = useCallback((category: Category) => {
    setDraft((prev) => {
      const index = prev.findIndex((item) => item.id === category.id);

      if (index > -1) {
        const newValue = [...prev];
        newValue[index] = category;
        return newValue;
      } else {
        return prev;
      }
    });
  }, []);

  const deleteCategory = useCallback((id: number) => {
    setDraft((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    loading,
    error,
    filmsData,
    isEditorOpened,
    selectedCategory,
    draft,
    updateFilmsData,
    updateLoading,
    updateError,
    getFilmById,
    updateIsEditorOpened,
    updateSelectedCategory,
    updateDraft,
    addCategory,
    updateCategory,
    deleteCategory,
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
