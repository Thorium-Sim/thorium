import React from "react";
import gql from "graphql-tag.macro";
import { Query } from "react-apollo";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import matchSorter from "match-sorter";
import "rc-menu/assets/index.css";
import "./soundPicker.scss";
const SOUNDS_QUERY = gql`
  query Sounds {
    assetFolders {
      id
      name
      fullPath
      folderPath
      objects {
        id
        name
        fullPath
      }
    }
  }
`;
const nameSort = (a, b) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};
const getFolders = (assetFolders, fullPath) => {
  const folders = assetFolders
    ? assetFolders.filter(s => s.folderPath === fullPath)
    : [];
  const extras = folders.reduce(
    (prev, next) => prev.concat(getFolders(assetFolders, next.fullPath)),
    []
  );
  return folders.map(f => f.fullPath).concat(extras);
};
const isAudio = ["mp3", "mp4", "ogg", "wav", "aiff", "aif", "webm", "aac"];

const SoundSubMenu = props => {
  const [search, setSearch] = React.useState("");
  const { setSound, assetFolders, fullPath, label } = props;
  const allObjects = React.useMemo(
    () =>
      assetFolders
        .reduce((acc, f) => acc.concat(f.objects), [])
        .filter(f => isAudio.find(a => f.name.includes(a))),
    [assetFolders]
  );
  const searchObjects = React.useMemo(
    () => matchSorter(allObjects, search, { keys: ["name"] }),
    [allObjects, search]
  );
  const mainFolder = assetFolders.find(s => s.fullPath === fullPath);
  if (!mainFolder) return null;
  const folders = assetFolders.filter(s => s.folderPath === fullPath);
  const { objects, name } = mainFolder;
  if (!objects || objects.length === 0) return null;
  return [
    <SubMenu {...props} key={mainFolder.fullPath} title={label || name}>
      <input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {search
        ? searchObjects.map(c => (
            <MenuItem key={c.id} onClick={() => setSound(c.fullPath)}>
              {c.name}
            </MenuItem>
          ))
        : folders
            .concat()
            .sort(nameSort)
            .map(c => (
              <SoundSubMenu {...props} label={null} fullPath={c.fullPath} />
            ))
            .concat(
              objects
                .concat()
                .sort(nameSort)
                .map(c => (
                  <MenuItem key={c.id} onClick={() => setSound(c.fullPath)}>
                    {c.name}
                  </MenuItem>
                ))
            )}
    </SubMenu>
  ];
};
const SoundPicker = ({ selectedSound, setSound, pickFolder }) => {
  return (
    <Query query={SOUNDS_QUERY}>
      {({ loading, data: { assetFolders } }) => {
        if (loading) return <p>Loading</p>;
        return (
          <Menu triggerSubMenuAction="click" key={selectedSound}>
            {pickFolder ? (
              <SubMenu
                title={
                  selectedSound === "nothing" ? "Pick a sound" : selectedSound
                }
              >
                {getFolders(assetFolders, "/Sounds")
                  .sort()
                  .map(f => (
                    <MenuItem key={f} onClick={() => setSound(f)}>
                      {f}
                    </MenuItem>
                  ))}
              </SubMenu>
            ) : (
              <SoundSubMenu
                setSound={setSound}
                assetFolders={assetFolders}
                fullPath={"/Sounds"}
                label={
                  selectedSound === "nothing" ? "Pick a sound" : selectedSound
                }
              />
            )}
          </Menu>
        );
      }}
    </Query>
  );
};

export default SoundPicker;
