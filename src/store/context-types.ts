import {Category, Film, FilmsData} from "../types";

export type CinemaContextType = {
  loading: boolean;
  error: boolean;
  filmsData: FilmsData | null;
  isEditorOpened: boolean;
  selectedCategory: Category | null;
  draft: Category[];
  updateFilmsData: (data: FilmsData) => void;
  updateLoading: (value: boolean) => void;
  updateError: (value: boolean) => void;
  getFilmById: (id: number) => Film | undefined;
  updateIsEditorOpened: (value: boolean) => void;
  updateSelectedCategory: (category: Category | null) => void;
  updateDraft: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;
  updateCategory: (category: Category) => void;
}
