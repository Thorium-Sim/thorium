import {css} from "@emotion/core";
import {ListGroup, ListGroupItem} from "helpers/reactstrap";
import React from "react";
import {Simulator, useDocumentsSubscription} from "generated/graphql";
import DocumentViewer from "./documentViewer";

export default function Documents({simulator}: {simulator: Simulator}) {
  const {data} = useDocumentsSubscription({
    variables: {simulatorId: simulator.id},
  });
  const [selectedDocument, setSelectedDocument] = React.useState<string | null>(
    null,
  );

  const documents = data?.simulatorsUpdate?.[0]?.documents || [];
  const doc = documents.find(d => d.id === selectedDocument);
  return (
    <div
      css={css`
        height: 80vh;
        display: flex;
        align-items: center;
        justify-content: space-around;
      `}
    >
      <div
        css={css`
          width: 400px;
        `}
      >
        <h1>Documents</h1>
        <ListGroup
          css={css`
            height: 70vh;
            overflow-y: auto;
          `}
        >
          {documents.map(d => (
            <ListGroupItem
              key={d.id}
              css={css`
                cursor: pointer;
              `}
              active={selectedDocument === d.id}
              onClick={() => {
                setSelectedDocument(d.id);
              }}
            >
              {d.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 445px;
        `}
      >
        {doc && <DocumentViewer assetPath={doc.asset} />}
      </div>
    </div>
  );
}
