import React, {useState} from "react";
import {AlertLevelColor} from "generated/graphql";
import ColorPicker from "helpers/colorPicker";
import gql from "graphql-tag.macro";

// TODO make save mutation work.
const saveAlertLevelColors = gql`
  mutation saveAlertLevelColors($id: ID!, $value: [AlertLevelColor!]) {
    saveAlertLevelColors(simulatorId: $id, alertLevelColor: $value)
  }
`;

const DEFAULT_ALERT_LEVEL_COLORS: AlertLevelColor[] = [
  {
    alertLevel: "1",
    color: "red",
  },
  {
    alertLevel: "2",
    color: "orange",
  },
  {
    alertLevel: "3",
    color: "yellow",
  },
  {
    alertLevel: "4",
    color: "green",
  },
  {
    alertLevel: "5",
    color: "blue",
  },
  {
    alertLevel: "p",
    color: "rebeccapurple",
  },
];

interface AlertLevelColorsFormProps {
  targetSimulatorID: String;
  currentAlertLevelColors?: AlertLevelColor[];
}

const AlertLevelColorsForm = ({
  targetSimulatorID,
  currentAlertLevelColors = DEFAULT_ALERT_LEVEL_COLORS,
}: AlertLevelColorsFormProps) => {
  const [alertLevelColors, setAlertLevelColors] = useState<AlertLevelColor[]>(
    currentAlertLevelColors,
  );

  const updateAlertLevelColor = (newAlertLevelColor: AlertLevelColor) => {
    setAlertLevelColors(
      alertLevelColors.map(existingAlertLevelColor =>
        existingAlertLevelColor.alertLevel !== newAlertLevelColor.alertLevel
          ? existingAlertLevelColor
          : newAlertLevelColor,
      ),
    );
  };

  return (
    <div>
      <h2>Alert Level Colors</h2>
      {alertLevelColors.map(targetAlertLevelColor => {
        return (
          <fieldset className="form-group">
            <label>
              Alert Level
              {targetAlertLevelColor.alertLevel === "p"
                ? "Stealth"
                : targetAlertLevelColor.alertLevel}
            </label>
            <ColorPicker
              color={targetAlertLevelColor.color}
              format="rgb"
              onChangeComplete={newColor =>
                updateAlertLevelColor({
                  ...targetAlertLevelColor,
                  color: newColor.toString(),
                })
              }
            />
          </fieldset>
        );
      })}
    </div>
  );
};

export default AlertLevelColorsForm;
