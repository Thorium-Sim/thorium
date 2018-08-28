import React, { Fragment } from "react";
import { Container } from "reactstrap";
import releaseNotes from "../../releaseNotes.json";
import { Link } from "react-router-dom";
const Releases = () => {
  return (
    <div className="config-container">
      <Container style={{ height: "100%", overflowY: "auto" }}>
        <h1>Release Notes</h1>
        <Link to="/">Go Back</Link>
        {Object.entries(releaseNotes).map(([key, value]) => (
          <div key={key}>
            <h2>{key}</h2>
            {value.features &&
              value.features.length > 0 && (
                <Fragment>
                  <h4>Features</h4>
                  <ul>
                    {value.features.map((f, i) => (
                      <li key={`${key}-feature-${i}`}>{f}</li>
                    ))}
                  </ul>
                </Fragment>
              )}
            {value.fixes &&
              value.fixes.length > 0 && (
                <Fragment>
                  <h4>Bug Fixes</h4>
                  <ul>
                    {value.fixes.map((f, i) => (
                      <li key={`${key}-fixes-${i}`}>{f}</li>
                    ))}
                  </ul>
                </Fragment>
              )}
            <hr />
          </div>
        ))}
      </Container>
    </div>
  );
};
export default Releases;
