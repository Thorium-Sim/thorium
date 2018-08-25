export default ({ reactivate }) => {
  return `If you followed the steps properly, the system has been repaired. ${
    reactivate
      ? "Enter the following reactivation code to reactivate the system: #REACTIVATIONCODE"
      : ""
  }`;
};
