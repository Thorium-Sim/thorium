import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { FormGroup, Label, Input } from "reactstrap";
const voices = window.speechSynthesis.getVoices() || [];

const SOUNDS_QUERY = gql`
  query Sounds {
    assetFolders(name: "Sounds") {
      id
      name
      objects {
        id
        name
        fullPath
      }
    }
  }
`;

const MOVIE_QUERY = gql`
  query Movies {
    assetFolders(name: "Movies") {
      id
      name
      objects {
        id
        name
        fullPath
      }
    }
  }
`;

const renderButtons = ({
  args: { action, asset, voice, message },
  args,
  updateArgs
}) => {
  if (action === "sound")
    return (
      <Query query={SOUNDS_QUERY}>
        {({ loading, data: { assetFolders } }) =>
          loading ? (
            <p>Loading</p>
          ) : (
            <Input
              type="select"
              value={asset || "nothing"}
              onChange={e => updateArgs("asset", e.target.value)}
            >
              <option value="nothing" disabled>
                Select a Sound
              </option>
              {assetFolders[0]
                ? assetFolders[0].objects
                    .concat()
                    .sort((a, b) => {
                      if (a.name > b.name) return 1;
                      if (a.name < b.name) return -1;
                      return 0;
                    })
                    .map(c => (
                      <option key={c.id} value={c.fullPath}>
                        {c.name}
                      </option>
                    ))
                : null}
            </Input>
          )
        }
      </Query>
    );
  if (action === "movie")
    return (
      <Query query={MOVIE_QUERY}>
        {({ loading, data: { assetFolders } }) =>
          loading ? (
            <p>Loading</p>
          ) : (
            <Input
              type="select"
              value={asset || "nothing"}
              onChange={e => updateArgs("asset", e.target.value)}
            >
              <option value="nothing" disabled>
                Select a Movie
              </option>
              {assetFolders[0]
                ? assetFolders[0].objects
                    .concat()
                    .sort((a, b) => {
                      if (a.name > b.name) return 1;
                      if (a.name < b.name) return -1;
                      return 0;
                    })
                    .map(c => (
                      <option key={c.id} value={c.fullPath}>
                        {c.name}
                      </option>
                    ))
                : null}
            </Input>
          )
        }
      </Query>
    );
  if (action === "speak")
    return (
      <Fragment>
        <Input
          type="select"
          value={voice}
          onChange={e => updateArgs("voice", e.target.value)}
        >
          {voices.map(c => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </Input>
        <Input
          placeholder="Message"
          value={message}
          onChange={e => updateArgs("message", e.target.value)}
        />
      </Fragment>
    );
  if (action === "message")
    return (
      <Input
        placeholder="Message"
        value={message}
        onChange={e => updateArgs("message", e.target.value)}
      />
    );
  return null;
};

export default ({ updateArgs, args, client }) => {
  return (
    <div>
      <p>Performs the action on all stations in the simulator.</p>
      <FormGroup className="macro-addTractorTarget">
        <Label>Action</Label>
        <Input
          type="select"
          value={args.action || "nothing"}
          onChange={e => updateArgs("action", e.target.value)}
        >
          <option disabled value="nothing">
            Pick an action
          </option>
          <optgroup>
            <option value="flash">Flash</option>
            <option value="spark">Spark</option>
            <option value="sound">Sound</option>
            <option value="movie">Movie</option>
            <option value="beep">Beep</option>
            <option value="speak">Speak</option>
            <option value="message">Message</option>
          </optgroup>
          <optgroup>
            <option value="blackout">Blackout</option>
          </optgroup>
          <optgroup>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="power">Power Loss</option>
            <option value="lockdown">Lockdown</option>
            <option value="maintenance">Maintenance</option>
            <option value="soviet">Soviet</option>
          </optgroup>
        </Input>
        <Input
          type="select"
          onChange={e => updateArgs("stationId", e.target.value)}
          value={args.stationId}
        >
          <option value="all">All Stations</option>
          <option value="random">Random Station</option>
          <option value="bridge">Bridge stations</option>
          <option value="viewscreen">Viewscreens</option>
        </Input>
        {renderButtons({ args, updateArgs })}
      </FormGroup>
    </div>
  );
};
