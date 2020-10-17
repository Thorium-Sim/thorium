import SearchableList from "helpers/SearchableList";
import React from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Input,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import {
  HackingPresetsDocument,
  useHackingPresetsQuery,
  useHackingPresetCreateMutation,
  useHackingPresetDeleteMutation,
  useHackingPresetUpdateMutation,
} from "../../../generated/graphql";
import uuid from "uuid";

const HackingPresets: React.FC = () => {
  const {data} = useHackingPresetsQuery();
  const [create] = useHackingPresetCreateMutation();
  const [remove] = useHackingPresetDeleteMutation();
  const [update] = useHackingPresetUpdateMutation();
  const presets = data?.hackingPresets || [];
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const [selectedView, setSelectedView] = React.useState<
    "remoteControl" | "longRange" | "fileViewer" | null
  >(null);

  const preset = presets.find(p => p.id === selectedItem);
  return (
    <Container
      className="interface-container"
      fluid
      style={{
        height: "calc(100vh - 60px)",
      }}
    >
      <Row style={{height: "100%"}}>
        <Col sm={3} style={{height: "100%"}}>
          <h3>Hacking Presets</h3>
          <div style={{height: "60vh"}}>
            <SearchableList
              items={presets.map(p => ({id: p.id, label: p.name}))}
              selectedItem={selectedItem}
              setSelectedItem={item => {
                setSelectedItem(item);
                setSelectedView(null);
              }}
            />
          </div>

          <Button
            color="success"
            size="sm"
            block
            onClick={() => {
              const name = window.prompt(
                "What is the name of the new hacking preset?",
              );
              if (!name) return;
              create({
                variables: {name},
                refetchQueries: [{query: HackingPresetsDocument}],
              });
            }}
          >
            Add Preset
          </Button>
          {preset ? (
            <Button
              color="danger"
              size="sm"
              block
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to remove this hacking preset?",
                  )
                ) {
                  remove({
                    variables: {id: preset.id},
                    refetchQueries: [{query: HackingPresetsDocument}],
                  });
                  setSelectedItem(null);
                  setSelectedView(null);
                }
              }}
            >
              Remove Interface
            </Button>
          ) : null}
          <p>
            <small>
              Remember that hacking requires the simulator to have a computer
              core system installed.
            </small>
          </p>
        </Col>
        <Col sm={3}>
          <h4>Options</h4>
          {preset && (
            <ListGroup>
              <ListGroupItem>
                <Input
                  type="checkbox"
                  defaultChecked={preset.logs}
                  onChange={e =>
                    update({
                      variables: {
                        id: preset.id,
                        preset: {...preset, logs: e.target.checked},
                      },
                      refetchQueries: [{query: HackingPresetsDocument}],
                    })
                  }
                />{" "}
                Logs
              </ListGroupItem>
              {/* <ListGroupItem
                active={selectedView === "remoteControl"}
                onClick={() => setSelectedView("remoteControl")}
              >
                <Input
                  type="checkbox"
                  defaultChecked={preset.remoteControl}
                  onChange={e =>
                    update({
                      variables: {
                        id: preset.id,
                        preset: {...preset, remoteControl: e.target.checked},
                      },
                      refetchQueries: [{query: HackingPresetsDocument}],
                    })
                  }
                />{" "}
                Remote Control
              </ListGroupItem> */}
              <ListGroupItem
                active={selectedView === "longRange"}
                onClick={() => setSelectedView("longRange")}
              >
                <Input
                  type="checkbox"
                  defaultChecked={preset.longRange}
                  onChange={e =>
                    update({
                      variables: {
                        id: preset.id,
                        preset: {...preset, longRange: e.target.checked},
                      },
                      refetchQueries: [{query: HackingPresetsDocument}],
                    })
                  }
                />{" "}
                Long Range Messages
              </ListGroupItem>
              <ListGroupItem
                active={selectedView === "fileViewer"}
                onClick={() => setSelectedView("fileViewer")}
              >
                <Input
                  type="checkbox"
                  defaultChecked={preset.fileViewer}
                  onChange={e =>
                    update({
                      variables: {
                        id: preset.id,
                        preset: {...preset, fileViewer: e.target.checked},
                      },
                      refetchQueries: [{query: HackingPresetsDocument}],
                    })
                  }
                />{" "}
                Files
              </ListGroupItem>
            </ListGroup>
          )}
        </Col>
        <Col sm={6}>
          {selectedView === "remoteControl" && preset?.remoteControl ? (
            <RemoteControl preset={preset} update={update}></RemoteControl>
          ) : null}
          {selectedView === "longRange" && preset?.longRange ? (
            <LongRange preset={preset} update={update}></LongRange>
          ) : null}
          {selectedView === "fileViewer" && preset?.fileViewer ? (
            <Files preset={preset} update={update}></Files>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

type Preset = NonNullable<
  ReturnType<typeof useHackingPresetsQuery>["data"]
>["hackingPresets"][0];
type Update = ReturnType<typeof useHackingPresetUpdateMutation>[0];

const RemoteControl: React.FC<{
  preset: Preset;
  update: Update;
}> = update => {
  return (
    <div>
      <h4>Remote Control</h4>
    </div>
  );
};

const LongRange: React.FC<{
  preset: Preset;
  update: Update;
}> = ({preset, update}) => {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const message = preset.longRangeMessages.find(l => l.id === selectedItem);
  return (
    <div>
      <h4>Long Range</h4>
      <Row>
        <Col sm={4}>
          <h5>Messages</h5>
          <SearchableList
            items={preset.longRangeMessages.map(p => ({
              id: p.id,
              label: p.title,
            }))}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <Button
            size="sm"
            block
            color="success"
            onClick={() => {
              const name = window.prompt(
                "What is the subject for the new message?",
              );
              if (!name) return;
              const message = {
                id: uuid.v4(),
                title: name,
                message: "",
              };
              update({
                variables: {
                  id: preset.id,
                  preset: {
                    ...preset,
                    longRangeMessages: preset.longRangeMessages.concat(message),
                  },
                },
                refetchQueries: [{query: HackingPresetsDocument}],
              });
            }}
          >
            New Message
          </Button>
          <Button
            size="sm"
            block
            color="danger"
            disabled={!selectedItem}
            onClick={() => {
              if (
                !window.confirm("Are you sure you want to delete this message?")
              )
                return;
              update({
                variables: {
                  id: preset.id,
                  preset: {
                    ...preset,
                    longRangeMessages: preset.longRangeMessages.filter(
                      l => l.id !== selectedItem,
                    ),
                  },
                },
                refetchQueries: [{query: HackingPresetsDocument}],
              });
            }}
          >
            Delete Message
          </Button>
        </Col>
        <Col sm={8} key={message?.id}>
          <h5>Message Contents</h5>
          <Input
            type="textarea"
            defaultValue={message?.message}
            rows={10}
            disabled={!message}
            onKeyDown={(e: any) =>
              update({
                refetchQueries: [{query: HackingPresetsDocument}],
                variables: {
                  id: preset.id,
                  preset: {
                    ...preset,
                    longRangeMessages: preset.longRangeMessages.map(l => {
                      if (l.id === selectedItem) {
                        return {...l, message: e.target.value};
                      }
                      return l;
                    }),
                  },
                },
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

const Files: React.FC<{
  preset: Preset;
  update: Update;
}> = ({preset, update}) => {
  const [selectedItem, setSelectedItem] = React.useState<number | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  return (
    <div>
      <h4>Files</h4>
      <Row>
        <Col sm={4}>
          <h5>File Levels</h5>
          <ListGroup>
            {Array.from({length: 10}).map((_, i) => (
              <ListGroupItem
                key={i}
                active={selectedItem === i + 1}
                onClick={() => setSelectedItem(i + 1)}
              >
                Level {i + 1}
              </ListGroupItem>
            ))}
          </ListGroup>
          <Button
            size="sm"
            color="info"
            block
            onClick={() => {
              update({
                variables: {
                  id: preset.id,
                  preset: {
                    ...preset,
                    files: preset.files
                      .concat(
                        files.map(f => ({
                          ...f,
                          id: uuid.v4(),
                          corrupted: false,
                          restoring: false,
                        })),
                      )
                      .filter(
                        (a, i, arr) =>
                          arr.findIndex(p => p.name === a.name) === i,
                      ),
                  },
                },
                refetchQueries: [{query: HackingPresetsDocument}],
              });
            }}
          >
            Add Default Files
          </Button>
        </Col>
        <Col sm={8}>
          <h5>File List</h5>
          <ListGroup style={{maxHeight: "60vh", overflowY: "auto"}}>
            {preset.files
              .filter(f => f.level === selectedItem)
              .map(f => (
                <ListGroupItem
                  key={f.id || ""}
                  active={f.id === selectedFile}
                  onClick={() => setSelectedFile(f.id || null)}
                >
                  {f.name}
                </ListGroupItem>
              ))}
          </ListGroup>
          <ButtonGroup>
            <Button
              size="sm"
              color="success"
              disabled={!selectedItem}
              onClick={() => {
                const name = window.prompt(
                  "What is the name of the new file?",
                  "File ",
                );
                update({
                  variables: {
                    id: preset.id,
                    preset: {
                      ...preset,
                      files: preset.files.concat({
                        id: uuid.v4(),
                        name,
                        level: selectedItem,
                        corrupted: false,
                        restoring: false,
                      }),
                    },
                  },
                  refetchQueries: [{query: HackingPresetsDocument}],
                });
              }}
            >
              New File
            </Button>
            <Button
              size="sm"
              color="danger"
              disabled={!selectedItem}
              onClick={() => {
                setSelectedFile(null);
                update({
                  variables: {
                    id: preset.id,
                    preset: {
                      ...preset,
                      files: preset.files.filter(p => p.level !== selectedItem),
                    },
                  },
                  refetchQueries: [{query: HackingPresetsDocument}],
                });
              }}
            >
              Delete All Files
            </Button>
            <Button
              size="sm"
              color="danger"
              disabled={!selectedFile}
              onClick={() => {
                setSelectedFile(null);
                update({
                  variables: {
                    id: preset.id,
                    preset: {
                      ...preset,
                      files: preset.files.filter(p => p.id !== selectedFile),
                    },
                  },
                  refetchQueries: [{query: HackingPresetsDocument}],
                });
              }}
            >
              Delete File
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
};

export default HackingPresets;

const files = [
  {name: "KERNEL1024.DLL", level: 1},
  {name: "FILE 852", level: 1},
  {name: "FILE 258", level: 1},
  {name: "FILE 825", level: 1},
  {name: "FILE 023", level: 1},
  {name: "FILE 059", level: 1},
  {name: "FILE 090", level: 1},
  {name: "FILE 089", level: 1},
  {name: "FILE 078", level: 1},
  {name: "FILE 782", level: 1},
  {name: "FILE 593", level: 1},
  {name: "FILE 6O3", level: 1},
  {name: "FILE 604", level: 1},
  {name: "FILE 934", level: 1},
  {name: "FILE 394", level: 1},
  {name: "FILE 399", level: 1},
  {name: "FILE 104", level: 1},
  {name: "FILE 096", level: 1},
  {name: "FILE 759", level: 1},
  {name: "FILE 209", level: 1},
  {name: "FILE 495", level: 1},

  {name: "FILE 266", level: 2},
  {name: "FILE 032", level: 2},
  {name: "FILE 210", level: 2},
  {name: "FILE 059", level: 2},
  {name: "FILE 088", level: 2},
  {name: "FILE 307", level: 2},
  {name: "FILE 405", level: 2},
  {name: "FILE 406", level: 2},
  {name: "FILE 584", level: 2},
  {name: "FILE 248", level: 2},
  {name: "FILE 365", level: 2},
  {name: "FILE 358", level: 2},
  {name: "FILE 983", level: 2},
  {name: "FILE 349", level: 2},
  {name: "FILE 998", level: 2},
  {name: "FILE 876", level: 2},

  {name: "VONRUNDSTED.DLL", level: 3},
  {name: "FILE 988", level: 3},
  {name: "FILE 989", level: 3},
  {name: "FILE 758", level: 3},
  {name: "FILE 458", level: 3},
  {name: "FILE 778", level: 3},
  {name: "FILE 779", level: 3},
  {name: "FILE 789", level: 3},
  {name: "FILE 987", level: 3},
  {name: "FILE 775", level: 3},
  {name: "FILE 556", level: 3},
  {name: "FILE 459", level: 3},
  {name: "FILE 845", level: 3},
  {name: "FILE 111", level: 3},
  {name: "FILE 112", level: 3},

  {name: "FILE 885", level: 4},
  {name: "FILE 889", level: 4},
  {name: "FILE 886", level: 4},
  {name: "FILE 754", level: 4},
  {name: "FILE 888", level: 4},
  {name: "FILE 321", level: 4},
  {name: "FILE 625", level: 4},
  {name: "FILE 856", level: 4},
  {name: "FILE 433", level: 4},
  {name: "FILE 135", level: 4},
  {name: "FILE 529", level: 4},
  {name: "FILE 666", level: 4},
  {name: "FILE 665", level: 4},
  {name: "FILE 664", level: 4},
  {name: "FILE 667", level: 4},
  {name: "FILE 669", level: 4},
  {name: "FILE 662", level: 4},
  {name: "FILE 663", level: 4},
  {name: "FILE 900", level: 4},
  {name: "FILE 909", level: 4},
  {name: "ROMMEL.DLL", level: 4},

  {name: "FILE 9987", level: 5},
  {name: "FILE 2265", level: 5},
  {name: "FILE 4486", level: 5},
  {name: "FILE 9567", level: 5},
  {name: "FILE 9877", level: 5},
  {name: "FILE 9845", level: 5},
  {name: "FILE 9543", level: 5},
  {name: "FILE 9852", level: 5},
  {name: "FILE 2315", level: 5},
  {name: "FILE 6548", level: 5},
  {name: "FILE 3337", level: 5},
  {name: "FILE 7154", level: 5},
  {name: "FILE 4124", level: 5},
  {name: "FILE 9654", level: 5},
  {name: "FILE 0156", level: 5},
  {name: "FILE 9654", level: 5},
  {name: "FILE 7410", level: 5},
  {name: "FILE 1234", level: 5},
  {name: "FILE 8463", level: 5},
  {name: "FILE 4444", level: 5},
  {name: "FILE 5555", level: 5},
  {name: "FILE 6583", level: 5},
  {name: "FILE 7516", level: 5},
  {name: "FILE 6843", level: 5},
  {name: "FILE 9138", level: 5},
  {name: "FILE 7654", level: 5},
  {name: "FILE 3654", level: 5},
  {name: "FILE 6550", level: 5},
  {name: "FILE 7645", level: 5},
  {name: "RANMA.MP12", level: 5},
  {name: "TENCHI.MP12", level: 5},
  {name: "AMG.MP12", level: 5},
  {name: "BNL.MP12", level: 5},

  {name: "FILE 8551", level: 6},
  {name: "FILE 7783", level: 6},
  {name: "FILE 8566", level: 6},
  {name: "FILE 1111", level: 6},
  {name: "FILE 1121", level: 6},
  {name: "FILE 8885", level: 6},
  {name: "FILE 9956", level: 6},
  {name: "FILE 6644", level: 6},
  {name: "FILE 7777", level: 6},
  {name: "FILE 8888", level: 6},
  {name: "FILE 1115", level: 6},
  {name: "FILE 2222", level: 6},
  {name: "FILE 3333", level: 6},
  {name: "FILE 6846", level: 6},
  {name: "FILE 8365", level: 6},
  {name: "FILE 2121", level: 6},
  {name: "FILE 5435", level: 6},
  {name: "FILE 8753", level: 6},
  {name: "FILE 0025", level: 6},
  {name: "FILE 0260", level: 6},
  {name: "FILE 0985", level: 6},
  {name: "FILE 0987", level: 6},
  {name: "FILE 7654", level: 6},
  {name: "FILE 3215", level: 6},
  {name: "FILE 7765", level: 6},
  {name: "FILE 9656", level: 6},
  {name: "FILE 9998", level: 6},
  {name: "FILE 1123", level: 6},
  {name: "FILE 3326", level: 6},
  {name: "FILE 7785", level: 6},

  {name: "FILE 6843", level: 7},
  {name: "FILE 7789", level: 7},
  {name: "FILE 7798", level: 7},
  {name: "FILE 6565", level: 7},
  {name: "FILE 6556", level: 7},
  {name: "FILE 5665", level: 7},
  {name: "FILE 4562", level: 7},
  {name: "FILE 3256", level: 7},
  {name: "FILE 0087", level: 7},
  {name: "FILE 7894", level: 7},
  {name: "FILE 6431", level: 7},
  {name: "FILE 9731", level: 7},
  {name: "FILE 9764", level: 7},
  {name: "FILE 3197", level: 7},
  {name: "FILE 3164", level: 7},
  {name: "FILE 7413", level: 7},
  {name: "BITMAP1.BMP", level: 7},
  {name: "BITMAP2.BMP", level: 7},
  {name: "BITMAP3.BMP", level: 7},

  {name: "FILE 6549", level: 8},
  {name: "FILE 7535", level: 8},
  {name: "FILE 3575", level: 8},
  {name: "FILE 2222", level: 8},
  {name: "FILE 8888", level: 8},
  {name: "FILE 7797", level: 8},
  {name: "FILE 6665", level: 8},
  {name: "FILE 4454", level: 8},
  {name: "FILE 3321", level: 8},
  {name: "FILE 4464", level: 8},
  {name: "FILE 6568", level: 8},
  {name: "FILE 3333", level: 8},

  {name: "FILE 9687", level: 9},
  {name: "FILE 9874", level: 9},
  {name: "FILE 8148", level: 9},
  {name: "FILE 6572", level: 9},
  {name: "FILE 2298", level: 9},
  {name: "FILE 3.74", level: 9},
  {name: "FILE 6184", level: 9},
  {name: "FILE 9110", level: 9},
  {name: "FILE 0911", level: 9},
  {name: "FILE 4564", level: 9},
  {name: "FILE 6516", level: 9},
  {name: "FILE 3287", level: 9},
  {name: "FILE 1955", level: 9},
  {name: "FILE 3545", level: 9},
  {name: "FILE 5166", level: 9},
  {name: "HITOKIRI.JPN", level: 9},
  {name: "BATOUSIA.CMD", level: 9},
  {name: "APPLE.MAC", level: 9},
  {name: "PROGRAM.NOT", level: 9},
  {name: "EMRIX.APP", level: 9},
  {name: "FLINT.CACHE", level: 9},

  {name: "FILE 6544", level: 10},
  {name: "FILE 6542", level: 10},
  {name: "FILE 0935", level: 10},
  {name: "FILE 0266", level: 10},
  {name: "FILE 0956", level: 10},
  {name: "FILE 0952", level: 10},
  {name: "FILE 0741", level: 10},
  {name: "FILE 0963", level: 10},
  {name: "FILE 0934", level: 10},
  {name: "FILE 0005", level: 10},
  {name: "FILE 0002", level: 10},
  {name: "FILE 1000", level: 10},
  {name: "FILE 2000", level: 10},
  {name: "FILE 3000", level: 10},
  {name: "FILE 4000", level: 10},
  {name: "FILE 5000", level: 10},
  {name: "FILE 6000", level: 10},
  {name: "FILE 7000", level: 10},
  {name: "FILE 8000", level: 10},
  {name: "FILE 9000", level: 10},
  {name: "FILE 4509", level: 10},
  {name: "FILE 3290", level: 10},
  {name: "FILE 2039", level: 10},
  {name: "FILE 3450", level: 10},
  {name: "FILE 9034", level: 10},
  {name: "FILE 7980", level: 10},
  {name: "FILE 3409", level: 10},
  {name: "FILE 3025", level: 10},
  {name: "FILE 2340", level: 10},
];
