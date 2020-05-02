import React, {Fragment} from "react";
import {Client} from "generated/graphql";

// Component for caching all of the videos on the viewscreen for loading later.
// Cache is loaded from the client and updated dynamically
const Caching: React.FC<{client: Client}> = ({client}) => {
  return (
    <Fragment>
      {client.caches &&
        client.caches.map(c => (
          <link
            key={c || ""}
            rel="preload"
            href={`${
              typeof window === undefined ? "" : window.location.origin
            }${c}`}
            as="video"
          />
        ))}
    </Fragment>
  );
};

export default Caching;
