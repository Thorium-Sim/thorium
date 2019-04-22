import reportReplace from "../helpers/reportReplacer";

export default [
  // Simple, generic task definition.
  // Always available, must be manually verified
  {
    name: "Generic",
    class: "Generic",
    active() {
      return true;
    },
    values: {
      name: {
        input: () => "text",
        value: () => "Task"
      },
      message: {
        input: () => "textarea",
        value: () => "This is a generic task."
      }
    },
    instructions({ simulator, requiredValues: { message, system } }) {
      return reportReplace(message, { simulator, system });
    },
    verify() {
      return false;
    }
  }
];
