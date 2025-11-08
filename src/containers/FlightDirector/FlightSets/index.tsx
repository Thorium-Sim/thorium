/* eslint-disable react-refresh/only-export-components */
import React from "react"
import { CreateFlightSet } from "./create-flight-set"
import { FlightSet } from "./types";
import { Alert, Button, ButtonGroup, Modal, Spinner } from "reactstrap";
import { Label, Input } from "helpers/reactstrap";
import "./styles.css"
import { useCreateNewFlightSetMutation, useDeleteFlightSetMutation, useGetAllFlightSetsQuery, useUpdateFlightSetMutation } from "generated/graphql";
import { formatGraphqlQueryToTypescript } from "./formatters";
import { FlightSetCreationSummary } from "./create-flight-set/steps/summary";

export default () => {
    const [flightSets, setFlightSets] = React.useState<FlightSet[]>([]);
    const [selectedFlightSet, setSelectedFlightSet] = React.useState<FlightSet | undefined>();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [showToast, setShowToast] = React.useState(false);
    const [toastText, setToastText] = React.useState<string | null>(null);
    const [showErrorToast, setShowErrorToast] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const value = useGetAllFlightSetsQuery();
    const [AddFlightSet] = useCreateNewFlightSetMutation({
        refetchQueries: ["GetAllFlightSets"],
        onCompleted: (data) => {
            setToastText("Flight Set Created");
            setShowToast(true);
            toggle();
        },
        onError: (error) => {
            setError(error.message);
            setShowErrorToast(true);
        }
    });
    const [DeleteFlightSet] = useDeleteFlightSetMutation({
        refetchQueries: ["GetAllFlightSets"],
        onCompleted: (data) => {
            setToastText("Flight Set Deleted");
            setShowToast(true);
        },
        onError: (error) => {
            setError(error.message);
            setShowErrorToast(true);
        }
    })
    const [UpdateFlightSet] = useUpdateFlightSetMutation({
        refetchQueries: ["GetAllFlightSets"],
        onCompleted: (data) => {
            setToastText("Flight Set Updated");
            setShowToast(true);
            // Close the modal after a successful update to mirror create behavior
            toggle();
        },
        onError: (error) => {
            setError(error.message);
            setShowErrorToast(true);
        }
    })
    React.useEffect(() => {
        if (value.data) {
            const newFlightSets = formatGraphqlQueryToTypescript(value.data);
            setFlightSets(newFlightSets);
        }
    }, [value.data]);

    const filteredFlightSets = React.useMemo(() => {
        // sort the flight sets into a 2d array based on label
        const sortedFlightSets: Record<string, FlightSet[]> = {};
        flightSets.forEach(flightSet => {
            if (!sortedFlightSets[flightSet.label || '']) {
                sortedFlightSets[flightSet.label || ''] = [];
            }
            sortedFlightSets[flightSet.label || ""].push(flightSet);
        });
        return sortedFlightSets;
    }, [flightSets]);


    const toggle = () => setDialogOpen(!dialogOpen);

    const handleCreateFlightSet = (flightSet: FlightSet) => {
        AddFlightSet({
            variables: { flightSet: flightSet },
        });
    }

    const handleDeleteFlightSet = (id: string) => {
        // Send up a confirmation dialog, then call the delete mutation
        if (window.confirm("Are you sure you want to delete this flight set?")) {
            DeleteFlightSet({
                variables: { id }
            });
        }
    }

    const handleUpdateFlightSet = (flightSet: FlightSet) => {
        UpdateFlightSet({
            variables: {
                flightSet: flightSet,
                id: flightSet.id
            }
        });
    }

    const importFlightSet = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files?.[0]) {
            const data = new FormData();
            Array.from(evt.target.files).forEach((f, index) =>
                data.append(`files[${index}]`, f),
            );
            fetch(`/importFlightSet`, {
                method: "POST",
                body: data,
            }).then(() => {
                window.location.reload();
            });
        }
    };

    return (
        <div style={{ padding: '5rem', overflowY: 'auto', height: '100%' }}>
            {showToast && <Alert toggle={() => { setShowToast(false) }} isOpen={showToast} color="info">
                {toastText}
            </Alert>}
            {showErrorToast && <Alert isOpen={showErrorToast} toggle={() => setShowErrorToast(false)} color="danger">
                {error}
            </Alert>}
            <h1>Flight Sets</h1>
            <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '15%', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
                    {value.loading && <Spinner style={{ width: '3rem', height: '3rem' }} />}
                    {value.error && <div>Error: {value.error.message}</div>}
                    {value.data && (<React.Fragment>
                        <Button onClick={() => {
                            setSelectedFlightSet(undefined);
                            toggle();
                        }}>Create Flight Set</Button>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Button
                                disabled={!selectedFlightSet}
                                onClick={() => {
                                    if (selectedFlightSet) {
                                        window.location.href = `/exportFlightSet/${selectedFlightSet.id}`
                                    }
                                }}
                            >
                                Export Selected
                            </Button>
                            <Label style={{ margin: 0 }}>
                                <div className="btn btn-secondary">Import</div>
                                <Input hidden type="file" accept=".flst" onChange={importFlightSet} />
                            </Label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {Object.keys(filteredFlightSets).map(label => {
                                return (
                                    <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <h3>{label}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {filteredFlightSets[label].map(flightSet => (
                                                <ButtonGroup>
                                                    <Button key={flightSet.id} onClick={() => setSelectedFlightSet(flightSet)}>{flightSet.name}</Button>
                                                    <Button color="danger" onClick={() => handleDeleteFlightSet(flightSet.id)}>Delete</Button>
                                                </ButtonGroup>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </React.Fragment>)}
                </div>
                <div style={{ width: '85%', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
                    {selectedFlightSet && (
                        <FlightSetCreationSummary
                            onBack={() => setSelectedFlightSet(undefined)}
                            onNext={() => toggle()}
                            nextLabel="Edit Flight Set"
                            state={selectedFlightSet}
                            canNext={true}
                            backLabel="Close"
                            setState={() => { }}
                        />
                    )}
                </div>
            </div>

            <Modal className="fullscreen-modal" isOpen={dialogOpen} toggle={toggle}>
                <div style={{ height: '90vh', padding: '1rem', background: 'rgba(245, 245, 245, 0.95)', borderRadius: "5px" }}>
                    <CreateFlightSet
                        onCreate={(flightSet) => {
                            if (flightSet.id) {
                                handleUpdateFlightSet(flightSet);
                            }
                            else {
                                handleCreateFlightSet(flightSet);
                            }
                        }}
                        onCancel={toggle}
                        flightSets={flightSets}
                        editingFlightSet={selectedFlightSet}
                    />
                </div>
            </Modal>

        </div>

    )
}
