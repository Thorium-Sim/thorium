import React from "react";
import {FormGroup, Label, Button, Input} from "helpers/reactstrap";
import FileExplorer from "components/views/TacticalMap/fileExplorer";

interface PrintPDFProps {
  updateArgs: Function;
  args: any;
}
const DocumentAdd: React.FC<PrintPDFProps> = props => {
  const {updateArgs, args} = props;
  const [getAsset, setGetAsset] = React.useState(false);
  if (getAsset) {
    return (
      <>
        <h3>Select PDF Asset</h3>
        <FileExplorer
          simple
          directory={"/"}
          selectedFiles={[args.asset]}
          onClick={(_evt: any, container: {id: string; fullPath: string}) => {
            updateArgs("asset", container.fullPath);
            setGetAsset(false);
          }}
        />
      </>
    );
  }
  return (
    <FormGroup
      className="macro-template"
      style={{display: "flex", flexDirection: "column"}}
    >
      <Label>Name</Label>
      <Input
        type="text"
        defaultValue={args.data}
        onBlur={evt => updateArgs("name", evt.target.value)}
      />
      <p>Print PDF</p>
      <Label>
        PDF URL: {args.asset}
        <div>
          <Button size="sm" onClick={() => setGetAsset(true)}>
            Set PDF Asset
          </Button>
        </div>
      </Label>
    </FormGroup>
  );
};

export default DocumentAdd;
