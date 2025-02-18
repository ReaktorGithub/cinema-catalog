import {Button} from "@mui/material";
import {buildOutput} from "../category-editor/utils/build-output.ts";
import {useAppContext} from "../../store/hooks.ts";

const SaveButton = () => {
  const { filmsData, isEditorOpened, draft } = useAppContext();

  const disabled = isEditorOpened;

  const handleSave = () => {
    if (!filmsData) {
      return;
    }

    const output = buildOutput({
      initialState: filmsData.categories,
      draft,
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
