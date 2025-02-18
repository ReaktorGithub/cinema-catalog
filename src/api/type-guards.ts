import {FilmsData} from "src/types";
import {isObject} from "src/utils/is-object.ts";

export const isFilmsData = (dto: unknown): dto is FilmsData => {
  if (!isObject(dto)) {
    return false;
  }

  const typedDto = dto as FilmsData;

  return ('films' in typedDto) && ('categories' in typedDto);
}
