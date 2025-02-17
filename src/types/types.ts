export type Film = {
  id: number;
  name: string;
}

export type SubCategory = {
  id: number;
  name: string;
  filmIds: number[];
}

export type Category = {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

export type FilmsData = {
  films: Film[];
  categories: Category[];
}

export type NewSubCategory = Omit<SubCategory, 'id'>

export type NewCategory = {
  name: string;
  subCategories: NewSubCategory[]
}

export type UpdatedSubCategory = NewSubCategory

export type DeletedSubCategory = NewSubCategory

export type DeletedCategory = {
  id: number;
}

export type UpdatedCategory = {
  id: number;
  name: string;
  updatedSubCategories: UpdatedSubCategory[];
  deletedSubCategories: DeletedSubCategory[];
}

export type Output = {
  newCategories: NewCategory[];
  updatedCategories: UpdatedCategory[];
  deletedCategories: DeletedCategory[];
}
