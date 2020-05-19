import React, {Fragment, ChangeEvent} from "react";
import {Button} from "helpers/reactstrap";
import ObjPreview from "./3dObjPreview";
import matchSorter from "match-sorter";
import debounce from "helpers/debounce";
import "./fileExplorer.scss";
import {
  FaFolderOpen,
  FaUpload,
  FaShare,
  FaFolder,
  FaBan,
  FaFileVideo,
  FaFileAudio,
} from "react-icons/fa";
import {
  useAssetsAddFolderMutation,
  useAssetsRemoveFolderMutation,
  useAssetsRemoveObjectMutation,
  useAssetFoldersSubscription,
  AssetFolder,
} from "generated/graphql";
import useDimensions from "helpers/hooks/useDimensions";
import GLTFPreview from "./GLTFPreview";
import useOnScreen from "helpers/hooks/useOnScreen";

interface AssetFolderI {
  id: string;
  fullPath: string;
  objects: AssetObjectI[];
  folderPath: string;
  name: string;
}

export interface AssetObjectI {
  id: string;
  fullPath: string;
  url: string;
  name: string;
}
interface FileExplorerProps {
  folderChange?: (dir: string) => void;
  directory?: string;
  selectedFiles?: string[];
  simple?: boolean;
  admin?: boolean;
  onClick?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  selectedFiles = [],
  directory = "/",
  folderChange,
  simple = false,
  admin = false,
  onClick,
  onMouseDown,
  onMouseUp,
}) => {
  let currentDirInit = directory;
  if (selectedFiles && selectedFiles[0]) {
    currentDirInit = selectedFiles[0].split("/").slice(0, -1).join("/");
  }
  const [currentDirectory, setCurrentDirectory] = React.useState(
    currentDirInit,
  );
  const [search, setSearch] = React.useState("");
  const [searchedText, setSearchedText] = React.useState("");

  React.useEffect(() => {
    folderChange?.(currentDirectory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDirectory]);

  const [createFolderMutation] = useAssetsAddFolderMutation();
  const [removeFolderMutation] = useAssetsRemoveFolderMutation();
  const [removeObjectMutation] = useAssetsRemoveObjectMutation();
  const setDirectory = (directory: string) => {
    setCurrentDirectory(directory);
  };
  const createFolder = () => {
    let name = prompt("What is the name of the folder?");
    if (name) {
      const currentDir = currentDirectory === "/" ? "" : currentDirectory;
      createFolderMutation({
        variables: {
          name,
          folderPath: currentDirectory,
          fullPath: `${currentDir}/${name}`,
        },
      });
    }
  };
  const removeFolder = (fullPath: string, e: Event) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to remove this folder? This will permenantly delete all of the files inside the folder.",
      )
    ) {
      removeFolderMutation({variables: {fullPath}});
    }
  };
  const removeObject = (fullPath: string, e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      window.confirm("Are you sure you want to permenantly remove this asset?")
    ) {
      removeObjectMutation({variables: {fullPath}});
    }
  };
  const massUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (files.length === 0) return;
    if (files.length > 1) return doMassUpload(files);
    const fileName = files[0].name.slice(0, files[0].name.lastIndexOf("."));
    const name = prompt(
      "What would you like to name the uploaded file?",
      fileName,
    );
    if (name) {
      doMassUpload(files, name);
    }
  };
  const doMassUpload = (files: any, name?: string) => {
    const data = new FormData();
    data.append("folderPath", currentDirectory);
    if (name) data.append("name", name);
    Array.from(files).forEach((f: any, index) =>
      data.append(`files[${index}]`, f),
    );
    fetch(`/upload`, {
      method: "POST",
      body: data,
    });
  };

  const setSearchDebounce = React.useCallback(
    debounce((searchValue: string) => {
      setSearch(searchValue);
    }, 500),
    [],
  );

  const [measureRef, dimensions] = useDimensions();

  const {data, loading} = useAssetFoldersSubscription();

  if (loading || !data) return null;

  const assetFolders = (data.assetFolderChange || []) as AssetFolder[];
  if (!assetFolders) return null;

  let navDirectory = currentDirectory;
  if (!assetFolders.find(a => a.fullPath === currentDirectory)) {
    navDirectory = "/";
  }
  const widthFactor = 0.25;
  return (
    <div className="file-explorer">
      <div>
        {simple ? <strong>{navDirectory}</strong> : <h4>{navDirectory}</h4>}
        {!simple && (
          <Fragment>
            <Button color="primary" size="sm" onClick={createFolder}>
              Create Folder <FaFolderOpen />
            </Button>
            <label>
              <input
                type="file"
                id="mass-upload-folder"
                multiple
                hidden
                onChange={massUpload}
              />
              <div className="btn btn-warning btn-sm">
                Upload Assets <FaUpload />
              </div>
            </label>
          </Fragment>
        )}
      </div>
      <input
        type={"search"}
        placeholder="Search..."
        value={searchedText}
        onChange={e => {
          setSearchedText(e.target.value);
          if (!e.target.value) {
            setSearch("");
          } else {
            setSearchDebounce(e.target.value);
          }
        }}
      />

      <div ref={measureRef}>
        {dimensions && (
          <div className="directory-container">
            {search ? (
              <>
                {matchSorter(
                  assetFolders.reduce(
                    (acc: AssetObjectI[], next) =>
                      acc.concat(next.objects || []),
                    [],
                  ),
                  search,
                  {keys: ["name"]},
                ).map(object => {
                  return (
                    <div
                      style={{
                        maxWidth: (dimensions?.width || 0) * widthFactor,
                      }}
                      key={object.id}
                      onClick={evt => onClick?.(evt, object)}
                      onMouseDown={evt => onMouseDown?.(evt, object)}
                      onMouseUp={evt => onMouseUp?.(evt, object)}
                    >
                      <div
                        className={`file-container ${
                          selectedFiles.indexOf(object.fullPath) > -1
                            ? "selected"
                            : ""
                        }`}
                      >
                        <AssetObject object={object} />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {currentDirectory !== directory && currentDirectory !== "/" && (
                  <div
                    style={{maxWidth: dimensions.width * widthFactor}}
                    onClick={() => {
                      //Get the current directory's folder
                      let dir = assetFolders.filter((folder: AssetFolderI) => {
                        return folder.fullPath === currentDirectory;
                      })[0];
                      setCurrentDirectory(dir ? dir.folderPath : "/");
                    }}
                  >
                    <div className="file-container">
                      <FaShare className="fa-flip-horizontal" size="3em" />
                      <p>Back</p>
                    </div>
                  </div>
                )}
                {assetFolders
                  .filter(folder => {
                    return folder.folderPath === currentDirectory;
                  })
                  .map(folder => (
                    <div
                      style={{
                        maxWidth: (dimensions?.width || 0) * widthFactor,
                      }}
                      key={folder.id}
                      onClick={() => setDirectory(folder.fullPath)}
                    >
                      <div className="file-container">
                        <FaFolder size="3em" />
                        <p>
                          {folder.name}{" "}
                          {admin && (
                            <FaBan
                              className="text-danger"
                              onClick={e =>
                                removeFolder(
                                  folder.fullPath,
                                  (e as unknown) as Event,
                                )
                              }
                            />
                          )}{" "}
                        </p>
                      </div>
                    </div>
                  ))}
                {assetFolders?.length &&
                  assetFolders
                    .concat({
                      id: "/",
                      name: "/",
                      folderPath: "/",
                      fullPath: "/",
                      objects: [],
                    })
                    ?.find(
                      (folder: AssetFolderI) =>
                        folder.fullPath === currentDirectory,
                    )
                    ?.objects.map((object: AssetObjectI) => {
                      const ext1 = object.url.match(/\..{3,4}$/gi);
                      const ext = ext1
                        ? ext1[0].replace(".", "").toLowerCase()
                        : "";
                      return (
                        <div
                          style={{
                            width: "30%",
                            maxWidth:
                              (dimensions?.width || 0) *
                              (["glb", "gltf"].includes(ext)
                                ? 0.33
                                : widthFactor),
                          }}
                          key={object.id}
                          onClick={evt => onClick?.(evt, object)}
                          onMouseDown={evt => onMouseDown?.(evt, object)}
                          onMouseUp={evt => onMouseUp?.(evt, object)}
                        >
                          <div
                            className={`file-container ${
                              selectedFiles.indexOf(object.fullPath) > -1
                                ? "selected"
                                : ""
                            }`}
                          >
                            <AssetObject
                              object={object}
                              removeObject={admin ? removeObject : undefined}
                            />
                          </div>
                        </div>
                      );
                    })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const VideoPreview: React.FC<{src: string}> = ({src}) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div>
      <FaFileVideo size="3em" style={{display: !loaded ? "block" : "none"}} />
      <video
        muted
        src={src}
        style={{
          width: "100%",
          display: loaded ? "block" : "none",
        }}
        onLoadedData={() => setLoaded(true)}
      />
    </div>
  );
};

const AssetObject: React.FC<{
  object: AssetObjectI;
  removeObject?: Function;
}> = ({object, removeObject}) => {
  const ext1 = object.url.match(/\..{3,4}$/gi);
  const ext = ext1 ? ext1[0].replace(".", "").toLowerCase() : "";
  const ref = React.useRef<HTMLDivElement>(null);

  const preview = useOnScreen(ref, "-100px");

  if (ext === "obj") {
    return (
      <div ref={ref}>
        <ObjPreview src={object.url} />
        <p>
          {object.name}{" "}
          {removeObject && (
            <FaBan
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
      </div>
    );
  }
  if (["glb", "gltf"].includes(ext)) {
    return (
      <div ref={ref}>
        <div style={{height: "300px", width: "100%"}}>
          {preview && <GLTFPreview src={object.url} />}
        </div>
        <p>
          {object.name}{" "}
          {removeObject && (
            <FaBan
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
      </div>
    );
  }
  if (["mov", "mp4", "ogv", "webm", "m4v"].indexOf(ext) > -1) {
    return (
      <div ref={ref}>
        <VideoPreview src={object.url} />
        <p>
          {object.name}{" "}
          {removeObject && (
            <FaBan
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
      </div>
    );
  }
  if (["m4a", "wav", "mp3", "ogg", "aiff", "aif"].indexOf(ext) > -1) {
    return (
      <div ref={ref}>
        <FaFileAudio size="3em" />
        <p>
          {object.name}{" "}
          {removeObject && (
            <FaBan
              className="text-danger"
              onClick={e => removeObject(object.fullPath, e)}
            />
          )}
        </p>
        <audio className="audio-preview" controls src={object.url} />
      </div>
    );
  }
  return (
    <div ref={ref}>
      <img alt="object" draggable="false" src={object.url} />
      <p>
        {object.name}{" "}
        {removeObject && (
          <FaBan
            className="text-danger"
            onClick={e => removeObject(object.fullPath, e)}
          />
        )}
      </p>
    </div>
  );
};

export default FileExplorer;
