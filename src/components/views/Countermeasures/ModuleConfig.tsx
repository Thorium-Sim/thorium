import React, {ChangeEvent} from "react";
import {
  CountermeasureModule,
  CountermeasureSlotEnum,
  useCountermeasuresConfigureModuleMutation,
} from "generated/graphql";
import {Input} from "reactstrap";
import TriggerConfig from "./TriggerConfig";

interface ModuleConfigProps {
  id: string;
  slot: CountermeasureSlotEnum;
  moduleObj: CountermeasureModule;
  allModuleTypes: string[];
}
const ModuleConfig: React.FC<ModuleConfigProps> = ({
  id,
  slot,
  moduleObj,
  allModuleTypes,
}) => {
  // Types of config option
  // Trigger
  // TextArea
  // Number
  // Pulse:Constant

  const [setConfig] = useCountermeasuresConfigureModuleMutation();
  return (
    <>
      <h3>{moduleObj.name}</h3>
      {moduleObj.configurationOptions.map(c => {
        const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
          setConfig({
            variables: {
              id,
              slot,
              moduleId: moduleObj.id,
              config: {...moduleObj.config, [c.label]: e.target.value},
            },
          });
        let configType = <div></div>;
        switch (c.type) {
          case "Trigger":
            configType = (
              <TriggerConfig
                configValue={moduleObj.config[c.label]}
                setConfig={value =>
                  setConfig({
                    variables: {
                      id,
                      slot,
                      moduleId: moduleObj.id,
                      config: {...moduleObj.config, [c.label]: value},
                    },
                  })
                }
                allModuleTypes={allModuleTypes}
              />
            );
            break;
          case "TextArea":
            configType = (
              <Input
                value={moduleObj.config[c.label]}
                onChange={handleChange}
                type="textarea"
              />
            );
            break;
          case "Number":
            configType = (
              <Input
                value={moduleObj.config[c.label]}
                type="number"
                min="377"
                max="754"
                placeholder="377 - 754"
                onChange={handleChange}
              />
            );
            break;
          case "Pulse:Constant":
            configType = (
              <Input
                value={moduleObj.config[c.label]}
                type="select"
                onChange={handleChange}
              >
                <option>Constant</option>
                <option>Pulse</option>
              </Input>
            );
            break;
          default:
            break;
        }
        return (
          <div key={c.label}>
            <label>
              {c.label}
              {configType}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default ModuleConfig;
