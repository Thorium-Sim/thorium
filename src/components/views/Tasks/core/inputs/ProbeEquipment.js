import React from "react";
import {Button} from "helpers/reactstrap";
import {randomFromList} from "helpers/randomFromList";
import {useProbeEquipmentQuery} from "generated/graphql";
import {FaBan} from "react-icons/fa";

const ProbeEquipment = ({simulatorId, onChange, value}) => {
  const {data} = useProbeEquipmentQuery();
  console.log(data?.probeEquipment);
  return (
    <div>
      {Object.entries(value || {}).map(([id, count]) => (
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <select
            value={id}
            onChange={e => {
              const {[id]: _, ...rest} = value;
              onChange({...rest, [e.target.value]: count});
            }}
          >
            {data?.probeEquipment.map(i => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <input
            defaultValue={count}
            type="number"
            min={1}
            max={5}
            onBlur={e => onChange({...value, [id]: e.target.value})}
          />
          <FaBan
            className="text-danger"
            style={{cursor: "pointer"}}
            onClick={() => {
              const {[id]: myKey, ...rest} = value;
              onChange(rest);
            }}
          />
        </div>
      ))}
      <Button
        block
        size="sm"
        color="success"
        onClick={() =>
          onChange({
            ...value,
            [randomFromList(data?.probeEquipment.map(e => e.id))]: Math.ceil(
              Math.random() + 1,
            ),
          })
        }
      >
        Add Equipment
      </Button>
    </div>
  );
};

export default ProbeEquipment;
