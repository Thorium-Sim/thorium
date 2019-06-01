import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import { FormGroup, Label, Input } from "reactstrap";
import SoundPicker from "helpers/soundPicker";

const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];

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
      <SoundPicker
        selectedSound={asset || "nothing"}
        setSound={sound => updateArgs("asset", sound)}
      />
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

export default ({ updateArgs, args, noStations, stations, clients }) => {
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
            <option value="spaceEdventuresToken">
              Space EdVentures Token Screen
            </option>
          </optgroup>
          <optgroup>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="power">Power Loss</option>
            <option value="lockdown">Lockdown</option>
            <option value="maintenance">Maintenance</option>
            <option value="soviet">Soviet</option>
            <option value="crack">Crack</option>
            <option value="uncrack">Un-Crack</option>
          </optgroup>
        </Input>
        {noStations || (
          <Input
            type="select"
            onChange={e => updateArgs("stationId", e.target.value)}
            value={args.stationId}
          >
            <option value="all">All Stations</option>
            <option value="random">Random Station</option>
            <option value="bridge">Bridge stations</option>
            <option value="viewscreen">Viewscreens</option>

            {stations && stations.length > 0 && (
              <optgroup label="Stations">
                {stations.map(c => (
                  <option value={c.name} key={c.name}>
                    {c.name}
                  </option>
                ))}
              </optgroup>
            )}
            {clients && clients.length > 0 && (
              <optgroup label="Clients">
                {clients.map(c => (
                  <option value={c.id} key={c.id}>
                    {c.id}
                  </option>
                ))}
              </optgroup>
            )}
          </Input>
        )}
        {renderButtons({ args, updateArgs })}
      </FormGroup>
    </div>
  );
};
