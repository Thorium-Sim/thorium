import React from "react";
import {
  Simulator,
  usePrintQueueSubscription,
  useClearPdfMutation,
} from "generated/graphql";
import "./style.scss";
import {TimeCounter} from "../Sensors";
import printJS from "print-js";

interface TemplateProps {
  children: React.ReactNode;
  simulator: Simulator;
}

const PrintQueue: React.FC<TemplateProps> = props => {
  const {simulator} = props;
  const {loading, data} = usePrintQueueSubscription({
    variables: {simulatorId: simulator.id},
  });

  const [clearPdf] = useClearPdfMutation();

  if (loading || !data) return null;
  const {printQueue} = data;
  if (!printQueue || printQueue?.length === 0)
    return <div>No Items Queued</div>;
  return (
    <ul className="core-printqueue">
      {printQueue.map(
        queue =>
          queue && (
            <li key={queue.id}>
              {queue.asset} (<TimeCounter time={new Date(queue.timestamp)} />){" "}
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => {
                  if (queue.asset) {
                    printJS({printable: `/assets${queue.asset}`, type: "pdf"});
                  }
                  clearPdf({variables: {id: queue.id}});
                }}
              >
                Print
              </button>
            </li>
          ),
      )}
    </ul>
  );
};
export default PrintQueue;
