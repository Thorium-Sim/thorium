import {css} from "@emotion/core";
import React from "react";
import {Document, Page, pdfjs} from "react-pdf";
import {Button} from "reactstrap";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentViewer = ({
  assetPath,
  height = window.innerHeight * (70 / 100),
}: {
  assetPath: string;
  height?: number;
}) => {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({numPages}: {numPages: number}) {
    setNumPages(numPages);
  }

  React.useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
  }, [assetPath]);
  return (
    <>
      <Document
        file={`/assets${assetPath}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page height={height} pageNumber={pageNumber} />
      </Document>
      {numPages && numPages > 1 && (
        <div
          css={css`
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <Button onClick={() => setPageNumber(p => Math.max(1, p - 1))}>
            Prev
          </Button>
          <p>
            {pageNumber} of {numPages}
          </p>
          <Button onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}>
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default DocumentViewer;
