import {Category, Film, FilmsData} from "../types/types.ts";

export type CinemaContextType = {
  loading: boolean;
  error: boolean;
  filmsData: FilmsData | null;
  isEditorOpened: boolean;
  selectedCategory: Category | null;
  changedCategories: Category[];
  addedCategories: Category[];
  deletedCategories: Category[];
  updateFilmsData: (data: FilmsData) => void;
  updateLoading: (value: boolean) => void;
  updateError: (value: boolean) => void;
  getFilmById: (id: number) => Film | undefined;
  updateIsEditorOpened: (value: boolean) => void;
  updateSelectedCategory: (category: Category | null) => void;
  pushAddedCategory: (category: Category) => void;
  updateChangedCategory: (currentList: Category[], category: Category) => void;
  removeChangedCategory: (id: number) => void;
  updateDeletedCategory: (currentList: Category[], category: Category) => void;
  removeDeletedCategory: (id: number) => void;
}
