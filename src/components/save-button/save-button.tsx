import {Button} from "@mui/material";
import {useAppContext} from "src/store/hooks.ts";
import {buildOutput} from "@/components/category-editor/utils/build-output.ts";

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
