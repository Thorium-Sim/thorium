import React, {ChangeEvent} from "react";
import {OutputField, TypingField} from "../../generic/core";
import {Button, Container, Row, Col} from "helpers/reactstrap";
import ScanPresets from "./ScanPresets";
import {subscribe} from "helpers/pubsub";
import {FaSyncAlt} from "react-icons/fa";
import useLocalStorage from "helpers/hooks/useLocalStorage";
import {
  Sensors,
  Simulator,
  SensorScan,
  useSensorsSubscription,
  useSensorsProbeDataMutation,
  useSensorsProcessedDataMutation,
  useSensorScanResultMutation,
  useSensorsProbesQuery,
  useSensorsSetHistoryMutation,
  useSensorScanResponseMutation,
} from "generated/graphql";
import {ProcessedData} from "./";
interface SensorsCoreProps {
  simulator: Simulator;
}
const SensorsCore: React.FC<SensorsCoreProps> = ({simulator}) => {
  const [dataField, setDataField] = React.useState("");
  const [selectedScan, setSelectedScan] = React.useState<string | null>(null);
  const [processedDataHistory, setProcessedDataHistory] = React.useState(false);
  const [domain, setDomain] = useLocalStorage("sensorCore-domain", "external");

  React.useEffect(() => {
    const unSub = subscribe("sensorData", (data: string) => {
      setDataField(data);
    });
    return () => unSub();
  }, []);

  const [sendProbeData] = useSensorsProbeDataMutation();
  const [sendProcessedDataMutation] = useSensorsProcessedDataMutation();
  const [sendScanResultMutation] = useSensorScanResultMutation();
  const [setScanHistory] = useSensorsSetHistoryMutation();
  const [sensorScanResponseMutation] = useSensorScanResponseMutation();

  const {loading, data} = useSensorsSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: probeQueryData} = useSensorsProbesQuery({
    variables: {simulatorId: simulator.id},
  });
  if (loading || !data) return null;
  const external = data.sensorsUpdate?.find(s => s.domain === "external");
  const internal = data.sensorsUpdate?.find(s => s.domain === "internal");
  const sensor = domain === "external" ? external : internal;
  const probesId = probeQueryData?.probes?.[0]?.id;

  if (!sensor) return <p>No Sensors</p>;
  const scan = sensor.scans?.find(s => s?.id === selectedScan);

  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.data.loading ||
  //     this.props.data.loading ||
  //     !this.props.data.sensors
  //   )
  //     return;
  //   const external = this.props.data.sensors.find(s => s.domain === "external");
  //   const internal = this.props.data.sensors.find(s => s.domain === "internal");
  //   const sensor = this.state.domain === "external" ? external : internal;
  //   const oldExternal = prevProps.data.sensors.find(
  //     s => s.domain === "external",
  //   );
  //   const oldInternal = prevProps.data.sensors.find(
  //     s => s.domain === "internal",
  //   );
  //   const oldSensor =
  //     this.state.domain === "external" ? oldExternal : oldInternal;
  //   if (sensor.scanResults !== oldSensor.scanResults)
  //     this.setState({
  //       dataField: sensor.scanResults,
  //     });
  // }

  const sendScanResult = (sensors: Sensors) => {
    if (sensors.history && selectedScan !== "basic-scan") {
      if (!selectedScan) return;
      sensorScanResponseMutation({
        variables: {
          id: sensors.id,
          scan: {
            id: selectedScan,
            response: dataField,
          },
        },
      });
      return;
    } else {
      sendScanResultMutation({
        variables: {
          id: sensors.id,
          result: dataField,
        },
      });
    }
  };
  const sendProcessedData = (sensors: Sensors, flash: boolean = false) => {
    sendProcessedDataMutation({
      variables: {
        id: sensors.id,
        data: dataField,
        flash,
      },
    });
  };

  const probeData = (flash: boolean = false) => {
    probesId &&
      sendProbeData({
        variables: {
          id: probesId,
          data: dataField,
          flash,
        },
      });
  };
  const setSensorsDomain = (which: string) => {
    setDomain(which);
    setSelectedScan(null);
  };
  const setSensorsHistory = (e: ChangeEvent<HTMLInputElement>) => {
    setScanHistory({
      variables: {
        id: sensor.id,
        history: e.target.checked,
      },
    });
  };
  const selectScan = ({id, response}: SensorScan) => {
    setSelectedScan(id);
    setDataField(response || "");
  };
  if (!sensor) return null;

  if (processedDataHistory && external) {
    return (
      <Container className="sensor-core" style={{height: "100%"}}>
        <Button
          color="danger"
          size="sm"
          onClick={() => setProcessedDataHistory(false)}
        >
          Close
        </Button>
        <ProcessedData sensors={external} core={true} />
      </Container>
    );
  }
  return (
    <Container className="sensor-core" style={{height: "100%"}}>
      <Row>
        <Button
          size="sm"
          className={`${domain === "external" ? "active" : ""} ${
            external?.scanning ? "btn-danger" : ""
          }`}
          onClick={() => setSensorsDomain("external")}
        >
          External
        </Button>
        <Button
          size="sm"
          className={`${domain === "internal" ? "active" : ""} ${
            internal?.scanning ? "btn-danger" : ""
          }`}
          onClick={() => setSensorsDomain("internal")}
        >
          Internal
        </Button>
        <label>
          <input
            type="checkbox"
            checked={sensor.history || false}
            onChange={setSensorsHistory}
          />
          Scan History
        </label>
        {external && (
          <Button
            size="sm"
            color="warning"
            onClick={() => setProcessedDataHistory(true)}
          >
            Processed Data History
          </Button>
        )}
      </Row>
      <div className="scan-input-field">
        <Row style={{flex: 1}}>
          {sensor.history && (
            <Col sm={4} style={{height: "100%"}}>
              <div className="scan-list">
                {sensor.scanning && (
                  <p
                    className={`${
                      selectedScan === "basic-scan" ? "selected" : ""
                    }`}
                    onClick={() =>
                      selectScan({
                        id: "basic-scan",
                        request: sensor.scanRequest || "",
                      })
                    }
                  >
                    {sensor.scanRequest?.substr(0, 15)}
                    ... <FaSyncAlt className="fa-spin" />
                  </p>
                )}
                {sensor.scans
                  ?.concat()
                  .reverse()
                  .map(s => (
                    <p
                      key={s?.id}
                      className={`${s?.cancelled ? "text-danger" : ""} ${
                        selectedScan === s?.id ? "selected" : ""
                      } ${!s?.cancelled && !s?.scanning ? "text-success" : ""}`}
                      onClick={() => s && selectScan(s)}
                    >
                      {s?.request?.substr(0, 15)}
                      ... {s?.scanning && <FaSyncAlt className="fa-spin" />}
                    </p>
                  ))}
              </div>
            </Col>
          )}
          <Col
            sm={sensor.history ? 8 : 12}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <OutputField
              style={{
                flexGrow: 2,
                minHeight: "44px",
                whiteSpace: "pre-line",
                overflowY: "auto",
              }}
              alert={
                (sensor.history
                  ? (scan && scan.scanning) ||
                    (selectedScan === "basic-scan" && sensor.scanning)
                  : sensor.scanning) || false
              }
            >
              {(() => {
                if (sensor.history && selectedScan !== "basic-scan") {
                  if (scan) {
                    const date = new Date(scan?.timestamp || "");
                    return (
                      `${date.toLocaleTimeString()} - ${scan.mode}${
                        scan.location && " - " + scan.location
                      }` +
                      "\n" +
                      scan.request
                    );
                  }
                  return "";
                }
                return sensor.scanRequest;
              })()}
            </OutputField>
            <TypingField
              style={{flexGrow: 6, minHeight: "44px"}}
              controlled
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => setDataField(e.target.value)}
              value={dataField}
            />
          </Col>
        </Row>
        <div style={{display: "flex"}}>
          <Button
            onClick={() => sendScanResult(sensor)}
            style={{flexGrow: 2}}
            size={"sm"}
            color="primary"
          >
            Send
          </Button>
          {/*<Button
            onClick={this.flash.bind(this)}
            style={{ flexGrow: 1 }}
            size={"sm"}
          >
            Flash
          </Button>*/}
          <ScanPresets
            domain={domain}
            style={{flexGrow: 4, maxWidth: 100}}
            onChange={(e: string) => setDataField(e)}
          />
          <select
            onChange={e => setDataField(e.target.value)}
            value={"answers"}
            style={{flexGrow: 4, maxWidth: 50}}
          >
            <option disabled value={"answers"}>
              Info
            </option>
            {sensor?.presetAnswers?.map(p =>
              p ? (
                <option key={`${p.label}-${p.value}`} value={p.value}>
                  {p.label || ""}
                </option>
              ) : null,
            )}
          </select>
          <Button
            onClick={() => external && sendProcessedData(external, true)}
            style={{flexGrow: 2}}
            size={"sm"}
            color="warning"
          >
            F&S
          </Button>
          <Button
            onClick={() => external && sendProcessedData(external)}
            style={{flexGrow: 4}}
            size={"sm"}
            color="success"
          >
            Data
          </Button>
        </div>
        <div style={{display: "flex"}}>
          <Button onClick={() => probeData()} style={{flexGrow: 2}} size={"sm"}>
            Probe Data
          </Button>
          <Button
            onClick={() => probeData(true)}
            style={{flexGrow: 2}}
            color="warning"
            size={"sm"}
          >
            Flash & Send Probe Data
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SensorsCore;
