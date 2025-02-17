import {Category, Film, FilmsData} from "../types/types.ts";

export type CinemaContextType = {
  loading: boolean;
  error: boolean;
  filmsData: FilmsData | null;
  isEditorOpened: boolean;
  selectedCategory: Category | null;
  updateFilmsData: (data: FilmsData) => void;
  updateLoading: (value: boolean) => void;
  updateError: (value: boolean) => void;
  getFilmById: (id: number) => Film | undefined;
  updateIsEditorOpened: (value: boolean) => void;
  updateSelectedCategory: (category: Category | null) => void;
}
