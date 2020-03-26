import React, {Fragment} from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import {Mission, useMissionSetRequirementsMutation} from "generated/graphql";
import Cards from "../../../components/views/index";
import {FaBan} from "react-icons/fa";
interface MissionConfigProps {
  mission: Mission;
  updateMission: (key: string, value: any) => void;
}

const systemList = [
  "Engine",
  "Shield",
  "Thrusters",
  "Sensors",
  "Transporters",
  "LongRangeComm",
  "InternalComm",
  "Navigation",
  "ShortRangeComm",
  "Reactor",
  "Torpedo",
  "Phasers",
  "Targeting",
  "Probes",
  "StealthField",
  "Coolant",
  "TractorBeam",
  "SignalJammer",
  "Library",
  "ComputerCore",
  "Sickbay",
  "Thx",
  "Railgun",
  "JumpDrive",
  "SubspaceField",
  "Transwarp",
  "Crm",
  "Countermeasures",
].sort();

const MissionConfig: React.FC<MissionConfigProps> = ({
  mission,
  updateMission,
}) => {
  const [setRequirements] = useMissionSetRequirementsMutation();
  return (
    <Fragment>
      <FormGroup>
        <Label>Mission Name</Label>
        <Input
          type="text"
          defaultValue={mission?.name || ""}
          onChange={e => updateMission("name", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Mission Description</Label>
        <Input
          type="textarea"
          rows={5}
          defaultValue={mission?.description || ""}
          name="text"
          onChange={e => updateMission("description", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Mission Category</Label>
        <Input
          type="text"
          defaultValue={mission?.category || ""}
          name="text"
          onChange={e => updateMission("category", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          <Input
            type="checkbox"
            defaultChecked={mission?.aux || false}
            name="text"
            onChange={e => updateMission("aux", e)}
          />
          Auxiliary Mission
        </Label>
        <div>
          <small>
            Auxiliary missions are reserved for second story lines and are not
            available as the primary mission for a simulator.
          </small>
        </div>
      </FormGroup>
      <h3>Requirements</h3>
      <div className="requirements">
        <div className="cards">
          <h4>Cards</h4>
          <ul>
            {mission.requirements?.cards.map(c => (
              <li>{c}</li>
            ))}
          </ul>
          <h5>Extra Card Requirements</h5>
          <select
            className="button-primary"
            value="nothing"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const cards = mission.extraRequirements?.cards || [];
              setRequirements({
                variables: {
                  missionId: mission.id,
                  requirements: {
                    ...mission.extraRequirements,
                    cards: cards.concat(e.target.value),
                  },
                },
              });
            }}
          >
            <option disabled value="nothing">
              Choose a Card
            </option>
            {Object.keys(Cards)
              .concat()
              .filter(s => !mission.extraRequirements?.cards.includes(s))

              .sort()
              .map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
          {mission.extraRequirements?.cards.map(c => (
            <li>
              {c}{" "}
              <FaBan
                className="text-danger"
                onClick={() =>
                  setRequirements({
                    variables: {
                      missionId: mission.id,
                      requirements: {
                        ...mission.extraRequirements,
                        cards:
                          mission.extraRequirements?.cards.filter(
                            s => s !== c,
                          ) || [],
                      },
                    },
                  })
                }
              />
            </li>
          ))}
        </div>
        <div className="systems">
          <h4>Systems</h4>
          <ul>
            {mission.requirements?.systems.map(c => (
              <li>{c}</li>
            ))}
          </ul>
          <h5>Extra System Requirements</h5>
          <select
            className="button-primary"
            value="nothing"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const systems = mission.extraRequirements?.systems || [];
              setRequirements({
                variables: {
                  missionId: mission.id,
                  requirements: {
                    ...mission.extraRequirements,
                    systems: systems.concat(e.target.value),
                  },
                },
              });
            }}
          >
            <option disabled value="nothing">
              Choose a System
            </option>

            {systemList
              .filter(s => !mission.extraRequirements?.systems.includes(s))
              .map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
          {mission.extraRequirements?.systems.map(c => (
            <li>
              {c}{" "}
              <FaBan
                className="text-danger"
                onClick={() =>
                  setRequirements({
                    variables: {
                      missionId: mission.id,
                      requirements: {
                        ...mission.extraRequirements,
                        systems:
                          mission.extraRequirements?.systems.filter(
                            s => s !== c,
                          ) || [],
                      },
                    },
                  })
                }
              />
            </li>
          ))}
        </div>
        <div className="other">
          <h4>Other</h4>
          <label>
            <input
              type="checkbox"
              checked={Boolean(mission.requirements?.spaceEdventures)}
              disabled
            />{" "}
            Space EdVentures
          </label>
          <label>
            <input
              type="checkbox"
              checked={Boolean(mission.requirements?.docking)}
              disabled
            />{" "}
            Docking Ports/Shuttles
          </label>
        </div>
      </div>
    </Fragment>
  );
};

export default MissionConfig;
