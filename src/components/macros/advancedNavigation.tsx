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
        <label>
            <input type="checkbox" checked={!!args.show} onChange={(e) => updateArgs('show', e.target.checked)} /> Show Flight Set
        </label>
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

const ShowPoiOnCurrentFlightSet: React.FC<MacroConfigProps> = ({ args, updateArgs, client }) => {
    const apolloClient = client as ApolloClient<any>;
    const [flightSetOptions, setFlightSetOptions] = React.useState<any[]>([]);
    const [poiOptions, setPoiOptions] = React.useState<{ id: string, name: string }[]>([]);
    const selectedFlightSetId = args.flightSetId;


    useEffect(() => {
        apolloClient && apolloClient.query({
            query: gql` { 
                getAllFlightSets { 
                    id 
                    name 
                    pointsOfInterest { 
                        id 
                        name 
                    } 
                } }`
        }).then((res) => {
            const fsets = res.data.getAllFlightSets || [];
            setFlightSetOptions(fsets);
        })
    }, [apolloClient]);
    React.useEffect(() => {
        const fs = flightSetOptions.find((f: any) => f.id === selectedFlightSetId);
        setPoiOptions(fs ? fs.pointsOfInterest : []);
        updateArgs('poiId', '');
    }, [flightSetOptions, selectedFlightSetId]);

    return <FormGroup className='macro-template'>
        <label>Flight Set</label>
        <select
            value={args.flightSetId || ''}
            onChange={(e) => {
                console.log('e', e.target.value);
                updateArgs('flightSetId', e.target.value);
            }}
        >
            <option value={""}>Select a Flight Set</option>
            {flightSetOptions.map((f: any) => (
                <option key={f.id} value={f.id}>{f.name}</option>
            ))}
        </select>
        <label>Point of Interest</label>
        <select
            value={args.poiId || ''}
            onChange={(e) => updateArgs('poiId', e.target.value)}
        >
            <option value={""}>Select a POI</option>
            {poiOptions.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
            ))}
        </select>
        <label>
            <input type="checkbox" checked={!!args.showName} onChange={(e) => updateArgs('showName', e.target.checked)} /> Show Name
        </label>
    </FormGroup>
}

const ShowPoiInformationOnCurrentFlightSet: React.FC<MacroConfigProps> = ({ args, updateArgs, client }) => {
    const apolloClient = client as ApolloClient<any>;
    const [flightSetOptions, setFlightSetOptions] = React.useState<any[]>([]);
    const [poiOptions, setPoiOptions] = React.useState<{ id: string, name: string }[]>([]);
    const selectedFlightSetId = args.flightSetId;


    useEffect(() => {
        apolloClient && apolloClient.query({
            query: gql` { 
                getAllFlightSets { 
                    id 
                    name 
                    pointsOfInterest { 
                        id 
                        name 
                    } 
                } }`
        }).then((res) => {
            const fsets = res.data.getAllFlightSets || [];
            setFlightSetOptions(fsets);
        })
    }, [apolloClient]);
    React.useEffect(() => {
        const fs = flightSetOptions.find((f: any) => f.id === selectedFlightSetId);
        setPoiOptions(fs ? fs.pointsOfInterest : []);
        updateArgs('poiId', '');
    }, [flightSetOptions, selectedFlightSetId]);

    return <FormGroup className='macro-template'>
        <label>Flight Set</label>
        <select
            value={args.flightSetId || ''}
            onChange={(e) => {
                console.log('e', e.target.value);
                updateArgs('flightSetId', e.target.value);
            }}
        >
            <option value={""}>Select a Flight Set</option>
            {flightSetOptions.map((f: any) => (
                <option key={f.id} value={f.id}>{f.name}</option>
            ))}
        </select>
        <label>Point of Interest</label>
        <select
            value={args.poiId || ''}
            onChange={(e) => updateArgs('poiId', e.target.value)}
        >
            <option value={""}>Select a POI</option>
            {poiOptions.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
            ))}
        </select>
        <label>Information Type</label>
        <select
            value={args.infoType || 'BASIC'}
            onChange={(e) => updateArgs('infoType', e.target.value)}
        >
            <option value={'BASIC'}>Basic</option>
            <option value={'DETAILED'}>Detailed</option>
            <option value={'SECRET'}>Secret</option>
        </select>
    </FormGroup>
}

export const showPoiOnCurrentFlightSet = ShowPoiOnCurrentFlightSet;
export const showPoiInformationOnCurrentFlightSet = ShowPoiInformationOnCurrentFlightSet;

