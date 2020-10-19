import React from "react";
import {
  Simulator,
  useDocumentsSubscription,
  useAddDocumentMutation,
  useRemoveDocumentMutation,
} from "generated/graphql";
import {
  Button,
  ButtonGroup,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import {css} from "@emotion/core";
import {FaBan} from "react-icons/fa";
import FileExplorer from "../TacticalMap/fileExplorer";
const DocumentViewer = React.lazy(() => import("./documentViewer"));

export default function DocumentsCore({simulator}: {simulator: Simulator}) {
  const {data} = useDocumentsSubscription({
    variables: {simulatorId: simulator.id},
  });
  const documents = data?.simulatorsUpdate?.[0]?.documents || [];
  const [creating, setCreating] = React.useState(false);
  const [previewAsset, setPreviewAsset] = React.useState("");
  const [remove] = useRemoveDocumentMutation();
  return (
    <div
      className="documents-core"
      css={css`
        display: flex;
        height: 100%;
      `}
    >
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <p>Documents</p>
        <ListGroup
          css={css`
            flex: 1;
          `}
        >
          {documents.map(d => (
            <ListGroupItem
              key={d.id}
              css={css`
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
              onClick={() => setPreviewAsset(d.asset)}
            >
              {d.name}
              <FaBan
                className="text-danger"
                css={css`
                  cursor: pointer;
                `}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  remove({variables: {simulatorId: simulator.id, id: d.id}});
                }}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
        <Button size="sm" color="success" onClick={() => setCreating(true)}>
          Add Document
        </Button>
      </div>
      <div
        css={css`
          flex: 3;
        `}
      >
        {creating && (
          <NewDocument
            simulatorId={simulator.id}
            cancel={() => setCreating(false)}
            preview={setPreviewAsset}
          />
        )}
      </div>
      <Modal
        isOpen={!!previewAsset}
        toggle={() => setPreviewAsset("")}
        size="large"
      >
        <ModalHeader toggle={() => setPreviewAsset("")}>
          Document Preview
        </ModalHeader>
        <ModalBody>
          {previewAsset && (
            <DocumentViewer
              assetPath={previewAsset}
              height={window.innerHeight * (50 / 100)}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setPreviewAsset("")}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const NewDocument: React.FC<{
  simulatorId: string;
  cancel: () => void;
  preview: (asset: string) => void;
}> = ({simulatorId, cancel, preview}) => {
  const [name, setName] = React.useState("");
  const [asset, setAsset] = React.useState("");
  const [add] = useAddDocumentMutation();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <p>Name</p>
      <Input type="text" value={name} onChange={e => setName(e.target.value)} />
      <p>Document File</p>
      <div
        css={css`
          flex: 1;
          overflow: hidden;
        `}
      >
        <FileExplorer
          simple
          directory={"/"}
          selectedFiles={[asset]}
          onClick={(_evt: any, container: {id: string; fullPath: string}) => {
            setAsset(container.fullPath);
          }}
        />
      </div>
      <ButtonGroup>
        <Button size="sm" color="danger" onClick={() => cancel()}>
          Cancel
        </Button>
        <Button size="sm" color="info" onClick={() => preview(asset)}>
          Preview
        </Button>
        <Button
          size="sm"
          color="success"
          disabled={!name || !asset}
          onClick={() => {
            add({variables: {simulatorId, name, asset}});
            cancel();
          }}
        >
          Submit
        </Button>
      </ButtonGroup>
    </div>
  );
};
