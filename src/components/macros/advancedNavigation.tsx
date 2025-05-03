import React, { useEffect } from 'react';
import { FormGroup } from 'helpers/reactstrap';
import { MacroConfigProps } from 'helpers/genericTypes';
import { ApolloClient, gql } from '@apollo/client';


const SelectCurrentFlightSet: React.FC<MacroConfigProps> = ({ args, updateArgs, client }) => {
    const apolloClient = client as ApolloClient<any>;
    const [flightSetOptions, setFlightSetOptions] = React.useState<{ id: string, name: string }[]>([]);
    useEffect(() => {
        apolloClient && apolloClient.query({
            query: gql`
            {
                getAllFlightSets {
                    id
                    name
                }
            }`
        }).then((res) => {
            const flightSets = res.data.getAllFlightSets;
            setFlightSetOptions(flightSets)
        })
    }, [apolloClient]);
    return <FormGroup className='macro-template'>
        <label>Flight Set to show</label>
        <select
            value={args.flightSetId}
            onChange={(e) => updateArgs('flightSetId', e.target.value)}
        >
            <option value={""}>Select a Flight Set</option>
            {flightSetOptions.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
            ))}
        </select>
    </FormGroup>
}

const AddFlightSetToNavigation: React.FC<MacroConfigProps> = ({ args, updateArgs, client }) => {
    const apolloClient = client as ApolloClient<any>;
    const [flightSetOptions, setFlightSetOptions] = React.useState<{ id: string, name: string }[]>([]);
    useEffect(() => {
        apolloClient && apolloClient.query({
            query: gql`
            {
                getAllFlightSets {
                    id
                    name
                }
            }`
        }).then((res) => {
            const flightSets = res.data.getAllFlightSets;
            setFlightSetOptions(flightSets)
        })
    }, [apolloClient]);
    return <FormGroup className='macro-template'>
        <label>Flight Set to add</label>
        <select
            value={args.flightSetId}
            onChange={(e) => updateArgs('flightSetId', e.target.value)}
        >
            <option value={""}>Select a Flight Set</option>
            {flightSetOptions.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
            ))}
        </select>
    </FormGroup>
}

export const addFlightSetToNavigation = AddFlightSetToNavigation;
export const selectCurrentFlightSet = SelectCurrentFlightSet;

