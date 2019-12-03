import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  MEDICAL_ROSTER_CREW_SUB,
  MEDICAL_ROSTER_QUERY,
  MEDICAL_ROSTER_SUB,
} from "components/views/MedicalRoster/index.js";

export default {
  title: "Cards|Medical/MedicalRoster",
};
export const MedicalRoster = () => (
  <StorybookWrapper
    queries={[
      MEDICAL_ROSTER_CREW_SUB,
      MEDICAL_ROSTER_QUERY,
      MEDICAL_ROSTER_SUB,
    ]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
