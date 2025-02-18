import {Category} from "src/types";
import {SubCategoryDisplay} from "src/components/sub-category-display";
import {Box} from "@mui/material";
import {EditCategory} from "src/components/edit-category";

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
