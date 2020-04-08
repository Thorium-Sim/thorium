import React from "react";
import {Label, Input, Button} from "helpers/reactstrap";
import {FaBan} from "react-icons/fa";
import {useParams} from "react-router";
import {useToggleStationMessageGroupMutation} from "generated/graphql";
import Maybe from "graphql/tsutils/Maybe";
const defaultGroups = ["SecurityTeams", "DamageTeams", "MedicalTeams"];

interface ExtraMessageGroupsProps {
  station: string;
  messageGroups: Maybe<string>[];
}

const ExtraMessageGroups: React.FC<ExtraMessageGroupsProps> = ({
  station,
  messageGroups,
}) => {
  const [textInput, setTextInput] = React.useState("");
  const {subPath1: stationSetId} = useParams();

  const [toggleMessageGroup] = useToggleStationMessageGroupMutation();

  const addGroup = () => () => {
    if (!textInput || !stationSetId) return;
    toggleMessageGroup({
      variables: {stationSetId, station, group: textInput, state: true},
    });
    setTextInput("");
  };
  return (
    <>
      <div>
        <Label>
          Extra Message Groups
          <Input
            type="text"
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
          />
        </Label>

        <Button color="success" size="sm" onClick={addGroup()}>
          Add Group
        </Button>
      </div>
      <div>
        {messageGroups
          .filter(m => m && defaultGroups.includes(m))
          .map(m => (
            <p key={m || ""}>
              {m}{" "}
              <FaBan
                className="text-danger"
                onClick={() => {
                  if (!stationSetId || !m) return;
                  toggleMessageGroup({
                    variables: {
                      stationSetId,
                      station,
                      group: m,
                      state: false,
                    },
                  });
                }}
              />
            </p>
          ))}
      </div>
    </>
  );
};

export default ExtraMessageGroups;
