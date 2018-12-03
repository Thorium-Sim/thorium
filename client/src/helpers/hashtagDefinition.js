import React from "react";

const HashtagDefinition = ({ system }) => (
  <small style={{ flex: 3, display: "inline-block" }}>
    You can use some hashtags to make your report dynamic:
    <ul>
      <li>
        <strong>#COLOR</strong> - a random color of red, green, blue, yellow
      </li>
      <li>
        <strong>#NUMBER</strong> - a random number between 1 and 12
      </li>
      <li>
        <strong>#[1 - 2]</strong> - a random whole number between the two listed
        numbers
      </li>
      <li>
        <strong>#["string1", "string2", "string3", etc.]</strong> - a random
        string from the list provided
      </li>
      <li>
        <strong>#PART</strong> - a random exocomp part
      </li>
      {system && (
        <li>
          <strong>#SYSTEMNAME</strong> - The name of the system, if applicable
        </li>
      )}
    </ul>
  </small>
);

export default HashtagDefinition;
