import {createContext} from "react";
import {CinemaContextType} from "./context-types.ts";

export const defaultContext: CinemaContextType = {
  loading: true,
  error: false,
  filmsData: null,
  isEditorOpened: false,
  selectedCategory: null,
  addedCategories: [],
  changedCategories: [],
  deletedCategories: [],
  updateFilmsData: () => undefined,
  updateLoading: () => undefined,
  updateError: () => undefined,
  getFilmById: () => undefined,
  updateIsEditorOpened: () => undefined,
  updateSelectedCategory: () => undefined,
  pushAddedCategory: () => undefined,
  updateChangedCategory: () => undefined,
  removeChangedCategory: () => undefined,
  updateDeletedCategory: () => undefined,
  removeDeletedCategory: () => undefined,
}

export const CinemaContext = createContext(defaultContext);
