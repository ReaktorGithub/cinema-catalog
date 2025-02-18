import {Box} from "@mui/material";
import {EditCategory} from "../edit-category";
import {SubCategoryDisplay} from "../sub-category-display";
import {Category} from "../../types";

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
