import React, {Fragment} from "react";
import {InputField, OutputField} from "../../generic/core";
import {Container, Row, Col, Button, Input, Progress} from "helpers/reactstrap";
import {Duration} from "luxon";
import {capitalCase} from "change-case";

import "./style.scss";
import {FaRandom} from "react-icons/fa";
import {
  useReactorsSubscription,
  Simulator,
  useSetDilithiumRateMutation,
  useReactorSetEfficiencyMutation,
  useReactorPowerLevelMutation,
  useReactorHeatMutation,
  useReactorSetHeatRateMutation,
  useBatteryChargeLevelMutation,
  useBatteryChargeRateMutation,
  useFluxDilithiumMutation,
} from "generated/graphql";

function parseDepletion(time: number) {
  if (Math.round(time) > 10000) return "Infinite";
  return Object.entries(
    Duration.fromObject({
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: Math.round(time),
    })
      .normalize()
      .toObject(),
  )
    .filter(t => t[1] !== 0)
    .map(t => `${t[1]} ${capitalCase(t[0])}`)
    .join(", ");
}

const rateSpeeds = (
  <Fragment>
    <option value={1.5}>Fast</option>
    <option value={1}>Normal</option>
    <option value={0.5}>Slow</option>
    <option value={0.25}>Very Slow</option>
    <option value={0.1}>Super Slow</option>
    <option value={0}>Stop</option>
    <option value={-1}>Reverse</option>
  </Fragment>
);

const ReactorCore: React.FC<{simulator: Simulator}> = ({simulator}) => {
  const {data} = useReactorsSubscription({
    variables: {simulatorId: simulator.id},
  });
  const [setEfficiencyMutation] = useReactorSetEfficiencyMutation();
  const [setOutput] = useReactorPowerLevelMutation();
  const [setBatteryCharge] = useBatteryChargeLevelMutation();
  const [setBatteryRate] = useBatteryChargeRateMutation();
  const [setHeat] = useReactorHeatMutation();
  const [setHeatRateMutation] = useReactorSetHeatRateMutation();
  const [setDilithium] = useSetDilithiumRateMutation();
  const [fluxDilithium] = useFluxDilithiumMutation();

  const reactors = data?.reactorUpdate;
  const reactor = reactors?.find(r => r.model === "reactor");
  const battery = reactors?.find(r => r.model === "battery");
  const setEfficiency = (e: string) => {
    if (!reactor) return;
    let value = parseFloat(e);
    if (parseFloat(e) === reactor.efficiency) {
      value = parseFloat(
        window.prompt(
          "What would you like the reactor efficiency to be?",
          String(reactor.efficiency) || "",
        ) || "",
      );
      if (!value && value !== 0) return;
    }
    setEfficiencyMutation({
      variables: {id: reactor?.id, e: e === "external" ? null : value},
    });
  };
  const setPowerLevel = (e: string | number) => {
    if ((!e || !parseFloat(String(e))) && e !== "0") return;
    if (!reactor) return;
    setOutput({variables: {id: reactor.id, e: parseFloat(String(e))}});
  };

  const setChargeLevel = (e: string) => {
    if (!e || !battery) return;
    setBatteryCharge({
      variables: {
        id: battery.id,
        e: parseFloat(e) / 100,
      },
    });
  };
  const setChargeRate = (e: string | number) => {
    if (!e || !battery) return;
    setBatteryRate({
      variables: {
        id: battery.id,
        e: parseFloat(String(e)) / 1000,
      },
    });
  };
  const updateHeat = (heat: string | number) => {
    if (!reactor) return;
    setHeat({
      variables: {
        id: reactor.id,
        heat: parseFloat(String(heat)) / 100,
      },
    });
  };
  const setHeatRate = (value: string | number) => {
    if (!reactor) return;
    setHeatRateMutation({
      variables: {
        id: reactor.id,
        rate: parseFloat(String(value)),
      },
    });
  };
  const setDilithiumRate = (value: string) => {
    if (!reactor) return;

    setDilithium({
      variables: {
        id: reactor.id,
        rate: parseFloat(value),
      },
    });
  };
  const calcStressLevel = () => {
    if (!reactor) return 0;
    const alphaDif = Math.abs(
      (reactor.alphaTarget || 0) - (reactor.alphaLevel || 0),
    );
    const betaDif = Math.abs(
      (reactor.betaTarget || 0) - (reactor.betaLevel || 0),
    );
    const stressLevel = alphaDif + betaDif > 100 ? 100 : alphaDif + betaDif;
    return stressLevel;
  };
  const calculateColor = () => {
    let stress = calcStressLevel();
    if (stress < 50) return "";
    else if (stress < 90) return "warning";
    else return "danger";
  };

  if (!reactor && !battery) return <p>No Reactor</p>;
  const efficiencies =
    reactor?.efficiencies?.concat().sort((a, b) => {
      const aEfficiency = a?.efficiency || 0;
      const bEfficiency = b?.efficiency || 0;
      if (aEfficiency > bEfficiency) return -1;
      if (aEfficiency < bEfficiency) return 1;
      return 0;
    }) || [];
  return (
    <Container className="reactor-control-core">
      <Row>
        <Col sm={12}>
          {reactor && (
            <Fragment>
              <p>Reactor Output:</p>
              <InputField
                prompt="What is the new power output?"
                onClick={setPowerLevel}
              >
                {reactor.powerOutput}
              </InputField>
              <p>Reactor Efficiency:</p>
              <Input
                bsSize="sm"
                type="select"
                onChange={evt => setEfficiency(evt.target.value)}
                value={
                  reactor.externalPower
                    ? "external"
                    : String(reactor.efficiency)
                }
              >
                {efficiencies.map(e => (
                  <option
                    key={e.label}
                    value={
                      e?.efficiency || e?.efficiency === 0
                        ? e?.efficiency
                        : "external"
                    }
                  >
                    {e.label}{" "}
                    {(e?.efficiency || e?.efficiency === 0) &&
                      `- ${e?.efficiency * 100}%`}
                  </option>
                ))}
                <option disabled>----------</option>
                <option value={reactor.efficiency || 0}>
                  Force - {(reactor.efficiency || 0) * 100}%
                </option>
              </Input>
              <p>Effective Output:</p>
              <p>
                {Math.round(
                  (reactor.powerOutput || 0) * (reactor.efficiency || 0),
                )}
              </p>
              <p>Heat Rate:</p>
              <Input
                bsSize="sm"
                type="select"
                onChange={evt => setHeatRate(evt.target.value)}
                value={String(reactor.heatRate)}
              >
                {rateSpeeds}
              </Input>
              <p>Reactor Heat:</p>
              <InputField
                prompt="What is the new reactor heat?"
                onClick={updateHeat}
              >
                {Math.round((reactor.heat || 0) * 1000) / 10}%
              </InputField>
            </Fragment>
          )}
          {battery && (
            <Fragment>
              {" "}
              <p>Battery Output:</p>
              <InputField
                prompt="What is the new battery charge level?"
                promptValue={String((battery.batteryChargeLevel || 0) * 100)}
                onClick={(e: React.ReactText) => setChargeLevel(String(e))}
              >
                {Math.round((battery.batteryChargeLevel || 0) * 100)}%
              </InputField>
              <p>Battery Rate:</p>
              <InputField
                prompt="What is the new battery charge rate?"
                onClick={setChargeRate}
              >
                {(battery.batteryChargeRate || 0) * 1000}
              </InputField>
              <p>Battery Depletion Time:</p>
              <OutputField>
                {parseDepletion(battery.depletion || 0)}
              </OutputField>
            </Fragment>
          )}

          {calcStressLevel() || calcStressLevel() === 0 ? (
            <Fragment>
              <p>Dilithium Stress:</p>
              <div style={{display: "flex"}}>
                <Progress
                  color={calculateColor()}
                  style={{flex: 1}}
                  value={calcStressLevel()}
                >
                  {Math.round(calcStressLevel())}%
                </Progress>

                <Button
                  style={{
                    width: "20px",
                    height: "17px",
                    fontSize: ".9em",
                    display: "block",
                  }}
                  color="danger"
                  onClick={() =>
                    reactor && fluxDilithium({variables: {id: reactor.id}})
                  }
                >
                  <FaRandom
                    style={{
                      position: "relative",
                      left: "-5px",
                      bottom: "3px",
                    }}
                  />
                </Button>
              </div>
              <p>Dilithium Stress Rate:</p>
              <Input
                bsSize="sm"
                type="select"
                onChange={evt => setDilithiumRate(evt.target.value)}
                value={reactor?.dilithiumRate || 0}
              >
                {rateSpeeds}
              </Input>
            </Fragment>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default ReactorCore;
