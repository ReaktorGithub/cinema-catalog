import {Button} from "@mui/material";
import {useAppContext} from "../../store/hooks.ts";
import {buildOutput} from "../category-editor/utils/build-output.ts";

const SaveButton = () => {
  const { addedCategories, deletedCategories, changedCategories, filmsData } = useAppContext();

  const disabled = !addedCategories.length && !deletedCategories.length && !changedCategories.length;

  const handleSave = () => {
    if (!filmsData) {
      return;
    }

    const result = buildOutput({
      initialState: filmsData.categories,
      added: addedCategories,
      deleted: deletedCategories,
      changed: changedCategories,
    })

    console.log(result);
  }

  return (
    <Button
      variant='contained'
      color="success"
      disabled={disabled}
      onClick={handleSave}
    >
      Save
    </Button>
  )
}

export { SaveButton };
