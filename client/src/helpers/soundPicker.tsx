import React from "react";
import Menu, {SubMenu, MenuItem} from "rc-menu";
import matchSorter from "match-sorter";
import "rc-menu/assets/index.css";
import "./soundPicker.scss";
import {useSoundPickerQuery, AssetFolder, AssetObject} from "generated/graphql";

const nameSort = (a: {name: string}, b: {name: string}) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};
const getFolders = (
  assetFolders: AssetFolder[],
  fullPath: string,
): string[] => {
  const folders = assetFolders
    ? assetFolders.filter(s => s.folderPath === fullPath)
    : [];
  const extras = folders.reduce(
    (prev: string[], next) =>
      prev.concat(getFolders(assetFolders, next.fullPath)),
    [],
  );
  return folders.map(f => f.fullPath).concat(extras);
};
const isAudio = ["mp3", "mp4", "ogg", "wav", "aiff", "aif", "webm", "aac"];

const SoundSubMenu: React.FC<{
  setSound: (sound: string) => void;
  assetFolders: AssetFolder[];
  fullPath: string;
  label: string | null;
}> = props => {
  const [search, setSearch] = React.useState("");
  const {setSound, assetFolders, fullPath, label} = props;
  const allObjects = React.useMemo(
    () =>
      assetFolders
        .reduce((acc: AssetObject[], f) => acc.concat(f.objects), [])
        .filter(f => isAudio.find(a => f.name.includes(a))),
    [assetFolders],
  );
  const searchObjects = React.useMemo(
    () => matchSorter(allObjects, search, {keys: ["name"]}),
    [allObjects, search],
  );
  const mainFolder = assetFolders.find(s => s.fullPath === fullPath);
  const folders = assetFolders.filter(s => s.folderPath === fullPath);
  return (
    <SubMenu
      {...props}
      key={mainFolder?.fullPath}
      title={label || mainFolder?.name}
    >
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
              <SoundSubMenu
                {...props}
                key={c.id}
                label={null}
                fullPath={c.fullPath}
              />
            ))
            .concat(
              mainFolder?.objects
                .concat()
                .sort(nameSort)
                .map(c => (
                  <MenuItem key={c.id} onClick={() => setSound(c.fullPath)}>
                    {c.name}
                  </MenuItem>
                )) || [],
            )}
    </SubMenu>
  );
};

function isAssetFolder(a: unknown): a is AssetFolder {
  if (a) return true;
  return false;
}

const SoundPicker: React.FC<{
  selectedSound: string;
  setSound: (sound: string) => void;
  pickFolder?: (folder: string) => void;
}> = ({selectedSound, setSound, pickFolder}) => {
  const {data} = useSoundPickerQuery();
  return (
    <Menu triggerSubMenuAction="click" key={selectedSound}>
      {pickFolder ? (
        <SubMenu
          popupClassName="sound-picker-menu"
          title={selectedSound === "nothing" ? "Pick a sound" : selectedSound}
        >
          {getFolders(
            data?.assetFolders?.filter(isAssetFolder) || [],
            "/Sounds",
          )
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
          assetFolders={data?.assetFolders?.filter(isAssetFolder) || []}
          fullPath={"/Sounds"}
          label={selectedSound === "nothing" ? "Pick a sound" : selectedSound}
        />
      )}
    </Menu>
  );
};

export default SoundPicker;
