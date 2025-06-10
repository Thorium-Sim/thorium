import { MacroConfigProps } from "helpers/genericTypes";
import { FormGroup } from 'reactstrap';

const AddExtraReportToSimulator: React.FC<MacroConfigProps> = ({ args, updateArgs }) => {
    return <FormGroup className='macro-template'>
        <div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
            <label>Name</label>
            <input type="text" value={args.name} onChange={(e) => updateArgs("name", e.target.value)} />
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
            <label>Which</label>
            <select value={args.which || "rnd"} onChange={(e) => updateArgs("which", e.target.value)}>
                <option value="rnd">RnD</option>
                <option value="engineering">Engineering</option>
                <option value="damage">Damage</option>
            </select>
        </div>
    </FormGroup>
}

export const addExtraReportToSimulator = AddExtraReportToSimulator;