import React from 'react';
import { MacroConfigProps } from 'helpers/genericTypes';
import Views from '../views';
import { Input } from 'reactstrap';
import { capitalCase } from 'change-case';

const SetClientsHypercard: React.FC<MacroConfigProps> = ({ args, updateArgs }) => {
    const viewList = Object.keys(Views).sort()

    return <Input
        bsSize="sm"
        className="hypercard-picker"
        value={args.component || "null"}
        onChange={e =>{
            updateArgs("component", e.target.value);
        }}
        type="select"
    >
        <option value="null">No Hypercard</option>
        {viewList.map(v => (
            <option key={v} value={v}>
                {capitalCase(v)}
            </option>

        ))}
        
    </Input>
};

export const setClientHypercard = SetClientsHypercard;
