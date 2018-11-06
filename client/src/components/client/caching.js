import React, { Fragment } from "react";

// Component for caching all of the videos on the viewscreen for loading later.
// Cache is loaded from the client and updated dynamically
const Caching = ({ client }) => {
  return (
    <Fragment>
      {client.caches &&
        client.caches.map(c => (
          <link
            key={c}
            rel="preload"
            href={`${window.location.origin}${c}`}
            as="video"
          />
        ))}
    </Fragment>
  );
};

export default Caching;
