import {useContext} from "react";
import {CinemaContext} from "./context.ts";

export const useAppContext = () => {
  const context = useContext(CinemaContext);

  if (!context) {
    throw new Error('Use app context within provider!');
  }

  return context;
}
