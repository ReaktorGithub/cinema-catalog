import {Category} from "../../types/types.ts";
import {SubCategoryDisplay} from "../sub-category-display";
import {Box} from "@mui/material";
import {EditCategory} from "../edit-category/edit-category.tsx";

type Props = {
  category: Category;
}

const CategoryDisplay = ({ category }: Props) => {
  return (
    <Box borderBottom='1px grey solid'>
      <EditCategory category={category} />
      {
        category.subCategories.map((sub) => (
          <SubCategoryDisplay key={sub.id} subCategory={sub}/>
        ))
      }
    </Box>
  )
}

export { CategoryDisplay };
