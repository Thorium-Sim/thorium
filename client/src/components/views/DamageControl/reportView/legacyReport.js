import React from "react";

const ReportViewLegacy = ({ system, stepDamage }) => {
  const report = system ? system.damage.report : "";
  const steps = report
    ? report.split(/Step [0-9]+:\n/gi).filter(s => s && s !== "\n")
    : [];
  const damageReportText = (system, steps, stepDamage) => {
    if (system) {
      if (stepDamage) {
        return steps[system.damage.currentStep || 0];
      }
      return system.damage.report;
    }
  };
  return (
    <p className="damageReport-text" style={{ fontSize: "24px" }}>
      {damageReportText(system, steps, stepDamage)}
    </p>
  );
};

export default ReportViewLegacy;
