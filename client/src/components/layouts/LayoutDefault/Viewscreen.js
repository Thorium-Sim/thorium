import React from "react";
import Views from "../../views";
import { withApollo } from "react-apollo";

export default withApollo(props => {
  return (
    <div>
      <h1>This is the default viewscreen layout!</h1>
      <Views.Viewscreen {...props} />
    </div>
  );
});
