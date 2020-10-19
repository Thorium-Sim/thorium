import React from "react";
import {
  Simulator,
  useComputerCoreHackingSubscription,
  useHackingAllowHackingMutation,
  useHackingAppendLogMutation,
  useHackingRemoveLogMutation,
  useHackingTransferToLongRangeMutation,
  useHackingCopyFileMutation,
  useHackingUpdateFilesMutation,
} from "generated/graphql";
import "./style.scss";
import useMeasure from "helpers/hooks/useMeasure";
import Arrow from "../CommShortRange/arrow";
import FrequencySignals from "../CommShortRange/frequency";
import {Doodad} from "components/viewscreens";
import Keypad from "../Navigation/keypad";
import {css} from "@emotion/core";
import {ListGroupItem, Button, Card, ListGroup} from "helpers/reactstrap";
import {capitalCase} from "change-case";
import useInterval from "helpers/hooks/useInterval";
import uuid from "uuid";
import TourHelper from "helpers/tourHelper";
interface TemplateProps {
  children: React.ReactNode;
  simulator: Simulator;
}

type HackingI = NonNullable<
  NonNullable<
    NonNullable<
      ReturnType<typeof useComputerCoreHackingSubscription>["data"]
    >["computerCoreUpdate"]
  >[0]
>;
const Hacking: React.FC<TemplateProps> = props => {
  const {simulator} = props;
  const {loading, data} = useComputerCoreHackingSubscription({
    variables: {simulatorId: simulator.id},
  });

  if (loading || !data) return null;
  const {computerCoreUpdate: computerCores} = data;
  const hacking = computerCores?.[0];
  if (!hacking) return <div>No Computer Core</div>;
  return (
    <div className="card-hacking">
      <SwitchScreen
        hacking={hacking}
        simulator={simulator}
        key={hacking.hackingState || ""}
      />
    </div>
  );
};

const SwitchScreen: React.FC<{hacking: HackingI; simulator: Simulator}> = ({
  hacking,
  simulator,
}) => {
  const [currentScreen, setCurrentScreen] = React.useState<string>("ports");
  switch (true) {
    case hacking.hackingState === "scanning":
      return <Scanning hacking={hacking} />;
    case hacking.hackingState === "hacking" && currentScreen === "ports":
      return <Ports hacking={hacking} setCurrentScreen={setCurrentScreen} />;
    case hacking.hackingState === "hacking" && currentScreen === "logs":
      return <Logs hacking={hacking} setCurrentScreen={setCurrentScreen} />;
    case hacking.hackingState === "hacking" && currentScreen === "longRange":
      return (
        <LongRange
          hacking={hacking}
          simulatorId={simulator.id}
          setCurrentScreen={setCurrentScreen}
        />
      );
    case hacking.hackingState === "hacking" &&
      currentScreen === "remoteControl":
      return (
        <RemoteControl hacking={hacking} setCurrentScreen={setCurrentScreen} />
      );
    case hacking.hackingState === "hacking" && currentScreen === "fileViewer":
      return (
        <FileViewer hacking={hacking} setCurrentScreen={setCurrentScreen} />
      );
    default:
      return <FrequencyScan hacking={hacking} />;
  }
};

const BottomButtons: React.FC<{
  hacking: HackingI;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}> = ({hacking, setCurrentScreen}) => {
  const [setState] = useHackingAllowHackingMutation();

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-around;
        width: 100%;
      `}
    >
      <Button
        size="lg"
        color="secondary"
        onClick={() => setCurrentScreen("ports")}
        className="return-to-ports"
      >
        Return to Ports
      </Button>
      <Button
        size="lg"
        color="warning"
        onClick={() =>
          hacking.id && setState({variables: {id: hacking.id, state: "idle"}})
        }
      >
        Disconnect
      </Button>
    </div>
  );
};

const Logs: React.FC<{
  hacking: HackingI;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}> = ({hacking, setCurrentScreen}) => {
  const [remove] = useHackingRemoveLogMutation();
  const [selectedLog, setSelectedLog] = React.useState<number | null>(null);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
      `}
    >
      <h1>Logs</h1>
      <ListGroup
        css={css`
          width: 60vw;
          height: 50vh;
          overflow-y: auto;
        `}
        className="logs-list"
      >
        {hacking.hackingLog.map((l, i) => (
          <ListGroupItem
            key={`${i}-${l}`}
            css={css`
              cursor: pointer;
            `}
            active={selectedLog === i}
            onClick={() => setSelectedLog(i)}
          >
            {l}
          </ListGroupItem>
        ))}
      </ListGroup>
      <Button
        className="delete-log"
        size="lg"
        block
        color="danger"
        disabled={selectedLog === null}
        onClick={() => {
          hacking.id &&
            selectedLog !== null &&
            remove({variables: {id: hacking.id, index: selectedLog}});
          setSelectedLog(null);
        }}
      >
        Delete Log Entry
      </Button>
      <BottomButtons hacking={hacking} setCurrentScreen={setCurrentScreen} />
      <TourHelper
        innerKey="logs"
        steps={[
          {
            selector: ".logs-list",
            content:
              "This is the log viewer. The target computer will be tracking all of your actions as you hack. If you leave incriminating evidence on their computer, you might get in trouble. You can see all of the logs that have been captured here. Click on a log to select it.",
          },
          {
            selector: ".delete-log",
            content:
              "Once you have selected a log, you can click this button to delete it.",
          },
          {
            selector: ".return-to-ports",
            content:
              "Click this button now to return to the port entry screen.",
          },
        ]}
      />
    </div>
  );
};

const LongRange: React.FC<{
  hacking: HackingI;
  simulatorId: string;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}> = ({hacking, simulatorId, setCurrentScreen}) => {
  const [selectedMessage, setSelectedMessage] = React.useState<string | null>(
    null,
  );
  const [append] = useHackingAppendLogMutation();

  const [transfer] = useHackingTransferToLongRangeMutation();
  const message = hacking.activeHackingPreset?.longRangeMessages.find(
    m => m.id === selectedMessage,
  );
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 70vw;
      `}
    >
      <h1>Long Range Messages</h1>
      <div
        css={css`
          display: flex;
          gap: 2rem;
        `}
      >
        <ListGroup
          css={css`
            height: 50vh;
            flex: 1;
            overflow-y: auto;
          `}
          className="message-list"
        >
          {hacking.activeHackingPreset?.longRangeMessages.map(m => (
            <ListGroupItem
              key={m.id}
              active={selectedMessage === m.id}
              onClick={() => {
                hacking.id &&
                  append({
                    variables: {
                      id: hacking.id,
                      log: `Message accessed by  fe80::4c3:2e73:2557:c71a: ${
                        message?.title || ""
                      }`,
                    },
                  });
                setSelectedMessage(m.id);
              }}
              css={css`
                cursor: pointer;
              `}
            >
              {m.title}
            </ListGroupItem>
          ))}
        </ListGroup>
        <Card
          className="message-body"
          css={css`
            padding: 2rem;
            height: 50vh;
            flex: 2;
            overflow-y: auto;
          `}
        >
          {message?.message || ""}
        </Card>
      </div>
      <Button
        className="extract-button"
        size="lg"
        color="info"
        disabled={!message}
        onClick={() => {
          transfer({
            variables: {
              simulatorId,
              message: message?.message || "",
              sender: `Hacking Extraction`,
            },
          });
          hacking.id &&
            append({
              variables: {
                id: hacking.id,
                log: `Message extracted by  fe80::4c3:2e73:2557:c71a: ${
                  message?.title || ""
                }`,
              },
            });

          setSelectedMessage(null);
        }}
      >
        Transfer to Communications
      </Button>
      <BottomButtons hacking={hacking} setCurrentScreen={setCurrentScreen} />
      <TourHelper
        innerKey="message"
        steps={[
          {
            selector: ".message-list",
            content:
              "This is the long range message viewer. You can see all of the long range messages stored on your target's computers. Click a message to see its contents.",
          },
          {
            selector: ".message-body",
            content: "You can read the message here.",
          },
          {
            selector: ".extract-button",
            content:
              "You can click this button to transfer a copy of this message to your ship's Long Range Communications screen.",
          },
          {
            selector: ".return-to-ports",
            content:
              "Click this button now to return to the port entry screen.",
          },
        ]}
      />
    </div>
  );
};

function randomString(length: number, chars: string) {
  var result = "";
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

const CorruptString: React.FC<{corrupted: boolean}> = ({
  children,
  corrupted,
}) => {
  const [corruptString, setCorruptString] = React.useState(() =>
    randomString(
      10,
      "0123456789abcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\",
    ),
  );

  useInterval(() => {
    setCorruptString(
      randomString(
        10,
        "0123456789abcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\",
      ),
    );
  }, Math.random() * 5000 + 2000);
  if (corrupted) {
    return <span>{corruptString}</span>;
  }
  return <span>{children}</span>;
};
const FileViewer: React.FC<{
  hacking: HackingI;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}> = ({hacking, setCurrentScreen}) => {
  const [append] = useHackingAppendLogMutation();
  const [copy] = useHackingCopyFileMutation();
  const [update] = useHackingUpdateFilesMutation();
  const [selectedLevel, setSelectedLevel] = React.useState<number | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const file = hacking.activeHackingPreset?.files.find(
    f => f.id === selectedFile,
  );
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 70vw;
      `}
    >
      <h1>File Viewer</h1>
      <div
        css={css`
          display: flex;
          gap: 2rem;
        `}
      >
        <ListGroup
          className="level-list"
          css={css`
            height: 50vh;
            flex: 1;
            overflow-y: auto;
          `}
        >
          {Array.from({length: 10}).map((_, i) => (
            <ListGroupItem
              key={`level-${i}`}
              active={selectedLevel === i + 1}
              onClick={() => {
                hacking.id &&
                  append({
                    variables: {
                      id: hacking.id,
                      log: `Level ${
                        i + 1
                      } accessed by fe80::4c3:2e73:2557:c71a`,
                    },
                  });
                setSelectedLevel(i + 1);
              }}
              css={css`
                cursor: pointer;
              `}
            >
              Level {i + 1}
            </ListGroupItem>
          ))}
        </ListGroup>
        <ListGroup
          className="file-list"
          css={css`
            flex: 2;
            height: 50vh;
            overflow-y: auto;
          `}
        >
          {hacking.activeHackingPreset?.files
            .filter(f => f.level === selectedLevel)
            .map(m => (
              <ListGroupItem
                key={m.id || ""}
                active={m.id === selectedFile}
                onClick={() => setSelectedFile(m.id || null)}
                css={css`
                  cursor: pointer;
                `}
              >
                <CorruptString corrupted={!!m.corrupted}>
                  {m.name}
                </CorruptString>
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
      <div
        css={css`
          display: flex;
          width: 100%;
          justify-content: space-around;
        `}
      >
        <Button
          className="copy-file"
          size="lg"
          color="info"
          disabled={!selectedFile}
          onClick={() => {
            if (!hacking.id || !file) return;
            append({
              variables: {
                id: hacking.id,
                log: `File copied by fe80::4c3:2e73:2557:c71a: ${
                  file?.name || ""
                }`,
              },
            });

            copy({
              variables: {
                id: hacking.id,
                file: {
                  id: uuid.v4(),
                  level: file?.level || 10,
                  name: file.name,
                  restoring: false,
                  corrupted: file.corrupted,
                },
              },
            });
            setSelectedFile(null);
          }}
        >
          Copy File
        </Button>
        <Button
          className="corrupt-file"
          size="lg"
          color="warning"
          disabled={!selectedFile}
          onClick={() => {
            if (!hacking.id || !file) return;
            append({
              variables: {
                id: hacking.id,
                log: `File corrupted by fe80::4c3:2e73:2557:c71a: ${
                  file?.name || ""
                }`,
              },
            });
            const newFiles = hacking.activeHackingPreset?.files.map(f => {
              if (f.id === selectedFile) {
                return {...f, corrupted: true};
              }
              return f;
            });
            if (newFiles) {
              update({variables: {id: hacking.id, files: newFiles}});
            }
          }}
        >
          Corrupt File
        </Button>
        <Button
          className="delete-file"
          size="lg"
          color="danger"
          disabled={!selectedFile}
          onClick={() => {
            if (!hacking.id || !file) return;
            append({
              variables: {
                id: hacking.id,
                log: `File deleted by fe80::4c3:2e73:2557:c71a: ${
                  file?.name || ""
                }`,
              },
            });
            const newFiles = hacking.activeHackingPreset?.files.filter(f => {
              if (f.id === selectedFile) {
                return false;
              }
              return true;
            });
            setSelectedFile(null);
            if (newFiles) {
              update({variables: {id: hacking.id, files: newFiles}});
            }
          }}
        >
          Delete File
        </Button>
      </div>
      <BottomButtons hacking={hacking} setCurrentScreen={setCurrentScreen} />
      <TourHelper
        innerKey="files"
        steps={[
          {
            selector: ".level-list",
            content:
              "This is the file viewer. Over here is a list of file levels. Level 1 is highest security files; level 10 is lowest security. Click on level 1 to see a special training file.",
          },
          {
            selector: ".file-list",
            content:
              "Once you choose a level, this is where you can see what files are on the target's computers.",
          },
          {
            selector: ".copy-button",
            content:
              "Click this button to copy a file to your ship's computer core.",
          },
          {
            selector: ".corrupt-button",
            content: "Click this button to corrupt the file.",
          },
          {
            selector: ".delete-button",
            content:
              "Click this button to delete the file. Make sure you copy the file before deleting it if you need a copy of it.",
          },
          {
            selector: ".return-to-ports",
            content:
              "Click this button now to return to the port entry screen.",
          },
        ]}
      />
    </div>
  );
};

const RemoteControl: React.FC<{
  hacking: HackingI;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}> = ({hacking, setCurrentScreen}) => {
  return (
    <div>
      <BottomButtons hacking={hacking} setCurrentScreen={setCurrentScreen} />
    </div>
  );
};
let seenPortsScreen = false;
const Ports: React.FC<{
  hacking: HackingI;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}> = ({hacking, setCurrentScreen}) => {
  const [currentNumber, setCurrentNumber] = React.useState("");
  const [append] = useHackingAppendLogMutation();
  const [setState] = useHackingAllowHackingMutation();
  return (
    <div
      className="ports-inner-card-area"
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 10rem;
        `}
      >
        <div>
          <h1>Open Ports</h1>
          <ListGroup className="open-ports">
            {Object.values(hacking.hackingPorts)
              .filter(Boolean)
              .map(p => (
                <ListGroupItem
                  key={p?.toString()}
                  css={css`
                    font-size: xx-large;
                    font-weight: 600;
                  `}
                >
                  {p}
                </ListGroupItem>
              ))}
          </ListGroup>
          <Button
            size="lg"
            color="warning"
            block
            onClick={() =>
              hacking.id &&
              setState({variables: {id: hacking.id, state: "idle"}})
            }
          >
            Disconnect
          </Button>
        </div>
        <div
          css={css`
            width: 300px;
          `}
          className="keypad-area"
        >
          <Keypad
            keydown={(key: string) =>
              setCurrentNumber(c => `${c}${key}`.slice(0, 5))
            }
            enter={() => {
              const screen = Object.entries(hacking.hackingPorts).find(
                ([key, value]) => value?.toString() === currentNumber,
              )?.[0];
              if (screen) {
                setCurrentScreen(screen);
                seenPortsScreen = true;
                if (hacking.id) {
                  append({
                    variables: {
                      id: hacking.id,
                      log: `${capitalCase(
                        screen,
                      )} accessed by fe80::4c3:2e73:2557:c71a`,
                    },
                  });
                }
              } else {
                if (hacking.id) {
                  append({
                    variables: {
                      id: hacking.id,
                      log: `An invalid port was accessed by fe80::4c3:2e73:2557:c71a`,
                    },
                  });
                }
              }
              setCurrentNumber("");
            }}
            clear={() => setCurrentNumber("")}
          />
        </div>
      </div>
      <div
        css={css`
          margin-top: 5rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
        `}
      >
        {Array.from({length: 5}).map((_, i) => (
          <Card
            key={i}
            css={css`
              width: 88px;
              height: 114px;
              text-align: center;
              padding: 2rem;
              font-size: xx-large;
              font-weight: 600;
              font-variant-numeric: tabular-nums;
            `}
          >
            {currentNumber[i] || "\u00a0"}
          </Card>
        ))}
      </div>
      <TourHelper
        innerKey="ports"
        steps={
          seenPortsScreen
            ? [
                {
                  selector: ".ports-inner-card-area",
                  content:
                    "Continue typing in port numbers to continue your training.",
                },
              ]
            : [
                {
                  selector: ".open-ports",
                  content:
                    "It looks like we found some open ports, but we don't know what system they are associated with. We will need to access each of them individually to complete your training.",
                },
                {
                  selector: ".keypad-area",
                  content:
                    "Use this keypad to enter in one of the port numbers. You can also use the keys on your keyboard.",
                },
                {
                  selector: ".ports-inner-card-area",
                  content:
                    "Enter the first port number and then press 'Enter' to access the system.",
                },
              ]
        }
      />
    </div>
  );
};

const Scanning: React.FC<{hacking: HackingI}> = ({hacking}) => {
  const [setState] = useHackingAllowHackingMutation();

  return (
    <div className="port-scanning">
      <Doodad />
      <h1 className="port-scan-text">Scanning Ports...</h1>
      <div className="btn-container">
        <Button
          size="lg"
          color="warning"
          block
          onClick={() =>
            hacking.id && setState({variables: {id: hacking.id, state: "idle"}})
          }
        >
          Cancel Scan
        </Button>
      </div>
      <TourHelper
        innerKey="scan"
        steps={[
          {
            selector: ".nothing",
            content: "Wait for the port scan to complete.",
          },
        ]}
      />
    </div>
  );
};
const FrequencyScan: React.FC<{hacking: HackingI}> = ({hacking}) => {
  const [measureRef, dimensions] = useMeasure<HTMLDivElement>();
  const [measureRef2, dimensions2] = useMeasure<HTMLDivElement>();
  const [freq, setFreq] = React.useState(
    hacking.hackingPortScanFrequency || 0.5,
  );
  const mouseDown = () => {
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("touchmove", mouseMove);
    document.addEventListener("touchend", mouseUp);
  };
  const mouseMove = (e: MouseEvent | TouchEvent) => {
    const {height, top} = dimensions;
    let y = 0;
    if ("pageY" in e) {
      y = e.pageY ? e.pageY : 0;
    } else {
      y = e.touches ? e.touches[0].pageY : 0;
    }
    const value = Math.max(Math.min((y - top) / height, 1), 0);
    setFreq(value);
  };
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    document.removeEventListener("touchmove", mouseMove);
    document.removeEventListener("touchend", mouseUp);
  };
  const [setState] = useHackingAllowHackingMutation();

  return (
    <>
      <div className="frequency-section">
        <Card style={{padding: "1rem 3rem"}}>
          <h1>Frequency</h1>
          <h3>{Math.round(freq * 37700 + 37700) / 100} MHz</h3>
        </Card>
        <Button
          className="scan-button"
          size="lg"
          color="success"
          disabled={!hacking.hackingActive}
          onClick={() =>
            hacking.id &&
            setState({variables: {id: hacking.id, state: "scanning"}})
          }
        >
          Scan Vulnerable Ports
        </Button>
      </div>
      <Card className="frequencyContainer">
        <div className="bar frequencyBar" />
        <div ref={measureRef} className="arrowHolder-right">
          {dimensions && (
            <Arrow level={freq} mouseDown={mouseDown} dimensions={dimensions} />
          )}
        </div>
      </Card>
      <Card className="signalCanvas">
        <div ref={measureRef2} className="signal-right">
          {dimensions2 && (
            <FrequencySignals
              dimensions={dimensions2}
              frequency={freq}
              amplitude={0.5}
            />
          )}
        </div>
      </Card>
      <TourHelper
        innerKey="main"
        steps={[
          {
            selector: ".nothing",
            content:
              "Hacking allows you to remotely access other starships and gain access to their files and messages. Using hacking for nefarious purposes is highly illegal, so don't use this screen unless your mission depends on it.",
          },
          {
            selector: ".frequencyContainer",
            content:
              "Your target must have a vulnerable signal frequency for you to hack them. Have your sensors officer scan to find that frequency. Drag this arrow up and down to change the frequency.",
          },
          {
            selector: ".scan-button",
            content:
              "Ports are specific routes which you can use to access vulnerable systems on your target. Click this button to begin scanning for open ports.",
          },
        ]}
      />
    </>
  );
};
export default Hacking;
