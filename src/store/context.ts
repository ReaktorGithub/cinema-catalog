import {createContext} from "react";
import {CinemaContextType} from "./context-types.ts";

export const defaultContext: CinemaContextType = {
  loading: true,
  error: false,
  filmsData: null,
  isEditorOpened: false,
  selectedCategory: null,
  draft: [],
  updateFilmsData: () => undefined,
  updateLoading: () => undefined,
  updateError: () => undefined,
  getFilmById: () => undefined,
  updateIsEditorOpened: () => undefined,
  updateSelectedCategory: () => undefined,
  updateDraft: () => undefined,
  updateCategory: () => undefined,
  deleteCategory: () => undefined,
  addCategory: () => undefined,
}

export const CinemaContext = createContext(defaultContext);
