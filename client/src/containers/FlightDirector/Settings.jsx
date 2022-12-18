import React from "react";
import {Container, Button, Input} from "helpers/reactstrap";
import "./settings.scss";
import {q} from "@client/context/AppContext";

const Settings = () => {
  const [spaceEdventuresCenter] =
    q.spaceEdventures.spaceEdventuresCenter.useNetRequest();
  const [spaceEdventuresToken] =
    q.spaceEdventures.spaceEdventuresToken.useNetRequest();
  const [thorium] = q.thorium.useNetRequest();
  const [googleSheets] = q.googleSheets.googleSheets.useNetRequest();
  const authorizeMutation = q.googleSheets.authorize.useNetSend();
  return (
    <Container className="fd-settings">
      <h1>Settings</h1>
      <section>
        <h3>
          Thorium ID: <span className="selectable">{thorium.thoriumId}</span>
        </h3>
      </section>
      <section>
        <div>
          <label>
            <h2>Space EdVentures Token</h2>

            <input
              defaultValue={spaceEdventuresToken}
              type="password"
              onBlur={e =>
                q.spaceEdventures.setSpaceEdventuresToken(e.target.value)
              }
            />
          </label>
          <div>
            <small>
              This allows flights flown using this Thorium server to be
              transmitted to spaceedventures.org for participants to track their
              ranks.
            </small>
          </div>
          {spaceEdventuresCenter?.id && (
            <div>
              <h4>
                Connected to SpaceEdventures.org center:{" "}
                {spaceEdventuresCenter.name}
              </h4>
            </div>
          )}
        </div>
      </section>
      <section>
        <div>
          <h3>Google Sheets Connections</h3>

          {googleSheets ? (
            <div>
              <p>Connected to Google Sheets: {googleSheets}</p>

              <Button onClick={() => q.googleSheets.revoke.netSend()}>
                Revoke Connection
              </Button>
            </div>
          ) : authorizeMutation.data ? (
            <div>
              <label>
                Paste Access Token Here
                <Input
                  onChange={e =>
                    q.googleSheets.completeAuthorize.netSend({
                      token: e.target.value,
                    })
                  }
                />
              </label>
            </div>
          ) : (
            <Button
              onClick={async () => {
                const url = await authorizeMutation.mutateAsync();
                window.open(url);
              }}
            >
              Connect Google Sheets
            </Button>
          )}
        </div>
      </section>
    </Container>
  );
};

export default Settings;
