import actionHelper from "./actionHelper";
import SendLongRangeMessage from "components/macros/sendLongRangeMessage";
const sendLongRangeMessage = actionHelper(
  "sendLongRangeMessage",
  SendLongRangeMessage
);
export default sendLongRangeMessage;
