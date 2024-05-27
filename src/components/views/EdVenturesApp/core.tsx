import { graphql, withApollo } from "react-apollo";
import React, { useCallback, useMemo, } from 'react'
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss"
const EdVenturesSimulatorsQuery = gql`
    query EdVenturesSimulators {
        getFirebaseSimulators {
            id
            Name
            Roles 
            Missions {
                id
                Name
                FlightHours
                ClassHours
                Synopsis
                Retired
            }
        }
        getCurrentFirebaseSelections {
            Mission
            Simulator
            StationEmailLinks {
                station
                email
            }
            Awards {
                id
                Name
                ClassHours
                FlightHours
                Description
                ImageURL
            }
            EventId
            flightSubmissions
        }
        getFirebaseAwards {
            id
            Name
            ClassHours
            FlightHours
            Description
            ImageURL
        }
    }
`

const chosenFirebaseSimulatorMutation = gql`
    mutation ChosenFirebaseSimulator($id: ID!) {
        setFirebaseSimulator(id: $id)

    }
`

const chosenFirebaseMissionMutation = gql`
    mutation ChosenFirebaseMission($id: ID!) {
        setFirebaseMission(id: $id)
    }
`

const chosenEdventuresValuesSubscription = gql`
    subscription ChosenFirebaseValues {
        firebaseCurrentSelectionsUpdate {
            Mission
            Simulator
            StationEmailLinks {
                station
                email
            }
            Awards {
                id
                Name
                ClassHours
                FlightHours
                Description
                ImageURL
            }
            EventId
            flightSubmissions
        }
    }

`



const EdVenturesAppCore: React.FC<any> = props => {
    const simulatorId = useMemo(() => {
        return props.data.getCurrentFirebaseSelections?.Simulator;
    }, [props.data.getCurrentFirebaseSelections]);
    const missionId = useMemo(() => {
        return props.data.getCurrentFirebaseSelections?.Mission;
    }, [props.data.getCurrentFirebaseSelections]);

    const currentAwards = useMemo(() => {
        return props.data.getCurrentFirebaseSelections?.Awards || [];
    }, [props.data.getCurrentFirebaseSelections]);

    const eventId = useMemo(() => {
        return props.data.getCurrentFirebaseSelections?.EventId;
    }, [props.data.getCurrentFirebaseSelections]);

    const flightSubmissions = useMemo(() => {
        return props.data.getCurrentFirebaseSelections?.flightSubmissions || [];
    }, [props.data.getCurrentFirebaseSelections])

    const updateSimulator = useCallback((e: any) => {
        let firebaseSimulatorId = e.currentTarget.value;
        if (firebaseSimulatorId === "none") {
            firebaseSimulatorId = "";
        }
        props.client.mutate({
            mutation: chosenFirebaseSimulatorMutation,
            variables: { id: firebaseSimulatorId }
        });
        props.client.mutate({
            mutation: chosenFirebaseMissionMutation,
            variables: { id: "" }
        })
    }, [props.client])

    const updateMission = useCallback((e: any) => {
        let firebaseMissionId = e.currentTarget.value;
        if (firebaseMissionId === "none") {
            firebaseMissionId = "";
        }
        props.client.mutate({
            mutation: chosenFirebaseMissionMutation,
            variables: { id: firebaseMissionId }
        })
    }, [props.client])

    const updateAward = useCallback((e: any) => {
        const firebaseAwardId = e.currentTarget.value;
        const firebaseAward = props.data.getFirebaseAwards.find((a: any) => a.id === firebaseAwardId);
        firebaseAward && props.client.mutate({
            mutation: gql`
                mutation SetAwards($awards: [FBAwardInput!]!) {
                    setFirebaseAwards(awards: $awards)
                }
            `,
            variables: { awards: [...currentAwards, firebaseAward] }
        })
    }, [props.client, currentAwards, props.data.getFirebaseAwards]);
    if (!props.data || props.data.loading) {
        return <p>Loading...</p>
    }
    return (
        <div className="core-edVentureApp">
            {flightSubmissions.includes(props.flightId) ?
                <p>This event has already been sent to EVA.</p> :
                <React.Fragment>
                    <SubscriptionHelper
                        subscribe={() =>
                            (props as any).data.subscribeToMore({
                                document: chosenEdventuresValuesSubscription,
                                updateQuery: (previousResult: any, { subscriptionData }: any) => {
                                    return Object.assign({}, previousResult, {
                                        getCurrentFirebaseSelections: subscriptionData.data?.firebaseCurrentSelectionsUpdate
                                    })
                                }
                            })
                        }
                    />
                    <div>
                        <span>Event Id: </span>
                        <span>{eventId}</span>
                    </div>
                    <div>
                        <label>Simulator</label>
                        <select value={simulatorId || "none"} onChange={updateSimulator}>
                            <option key={"none"} value="none">Select a simulator</option>
                            {props.data.getFirebaseSimulators?.map((sim: any) => {
                                return <option key={sim.id} value={sim.id}>{sim.Name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Mission</label>
                        <select value={missionId || "none"} onChange={updateMission}>
                            <option key={"none"} value="none">Select a {simulatorId ? "mission" : "simulator first!"}</option>
                            {simulatorId && props.data.getFirebaseSimulators.find((sim: any) => sim.id === simulatorId).Missions.map((mission: any) => {
                                return <option key={mission.id} value={mission.id}>{mission.id}</option>
                            })};
                        </select>
                    </div>


                    <div className="awards-parent">
                        <div>
                            <label>Awards</label>
                            <select value={"none"} key={"none"} onChange={updateAward}>
                                <option key={"none"} value="none">Select an award</option>
                                {props.data.getFirebaseAwards && props.data.getFirebaseAwards.filter((each: any) => {
                                    return !currentAwards.find((a: any) => a.id === each.id)
                                }).map((award: any) => {
                                    return <option key={award.id} value={award.id}>{award.Name}</option>
                                })};
                            </select>
                        </div>

                        {props.data.getCurrentFirebaseSelections?.Awards.map((award: any) => {
                            return <div className="awards-list-parent" key={award.id}>
                                <div>{award.Name}</div>
                                <div>{award.Description}</div>
                                <button onClick={() => {
                                    // Remove the award
                                    const newAwards = props.data.getFirebaseAwards.filter((a: any) => a.id !== award.id);
                                    props.client.mutate({
                                        mutation: gql`
                                    mutation RemoveAward($awards: [FBAwardInput!]!) {
                                        setFirebaseAwards(awards: $awards)
                                    }
                                `,
                                        variables: { awards: newAwards }
                                    });
                                }}>Remove</button>
                            </div>
                        })}
                    </div>
                    <div>
                        <label>Station Email Links</label>
                        {props.data.getCurrentFirebaseSelections?.StationEmailLinks.map((link: any) => {
                            return <div key={link.station}>
                                <span>{link.station}</span> - <span>{link.email}</span>
                            </div>
                        })}
                    </div>
                    <div>
                        <button disabled={!simulatorId || !missionId} onClick={() => {
                            const confirmed = window.confirm("Are you sure you want to send this event to EVA? You won't be able to undo this action.");
                            confirmed && props.client.mutate({
                                mutation: gql`
                            mutation ExecuteEvent($eventId: ID!, $flightId: ID!) {
                                executeFirebasePush(eventId: $eventId, flightId: $flightId)
                            }
                        `,
                                variables: { eventId, flightId: props.flightId }
                            })
                        }}>{(!simulatorId || !missionId) ? "Select a sim/mission" : "EXECUTE"}</button>
                    </div>
                </React.Fragment>}

        </div>
    );
}

export default graphql(EdVenturesSimulatorsQuery, {
    options: () => ({
        fetchPolicy: 'cache-and-network',
    }),
})(withApollo(EdVenturesAppCore));