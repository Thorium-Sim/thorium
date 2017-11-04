import React from "react";

export default ({ data, updateData }) =>
  <div>
    <label>
      Type your information in here. If you are previewing, the information will
      automatically type on when you show the card. If you are showing the card,
      the information will type on in realtime.
    </label>
    <textarea
      rows="10"
      style={{ width: "100%" }}
      onChange={evt => updateData(JSON.stringify({ text: evt.target.value }))}
      value={JSON.parse(data).text}
    />
  </div>;
