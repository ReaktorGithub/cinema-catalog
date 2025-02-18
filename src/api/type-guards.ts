import {FilmsData} from "../types";
import {isObject} from "../utils/is-object.ts";

export const isFilmsData = (dto: unknown): dto is FilmsData => {
  if (!isObject(dto)) {
    return false;
  }

  const typedDto = dto as FilmsData;

  return ('films' in typedDto) && ('categories' in typedDto);
}
