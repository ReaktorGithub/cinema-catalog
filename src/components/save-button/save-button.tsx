import {Button} from "@mui/material";
import {useAppContext} from "../../store/hooks.ts";
import {buildOutput} from "../category-editor/utils/build-output.ts";

const SaveButton = () => {
  const { addedCategories, deletedCategories, changedCategories, filmsData, isEditorOpened } = useAppContext();

  const disabled = !addedCategories.length && !deletedCategories.length && !changedCategories.length || isEditorOpened;

  const handleSave = () => {
    if (!filmsData) {
      return;
    }

    const output = buildOutput({
      initialState: filmsData.categories,
      added: addedCategories,
      deleted: deletedCategories,
      changed: changedCategories,
    })

    console.log(output);
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
