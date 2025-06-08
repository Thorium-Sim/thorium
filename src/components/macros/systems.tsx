import { MacroConfigProps } from "helpers/genericTypes";
import { FormGroup } from 'reactstrap';

const AddRnDToSimulator: React.FC<MacroConfigProps> = ({ args, updateArgs }) => {
    return <FormGroup className='macro-template'>
        <div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
            <label>Name</label>
            <input type="text" value={args.name} onChange={(e) => updateArgs("name", e.target.value)} />
        </div>
    </FormGroup>
}

export const addRnDToSimulator = AddRnDToSimulator;