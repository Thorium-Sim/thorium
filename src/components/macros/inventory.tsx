import { ApolloClient, gql, useLazyQuery, useQuery } from '@apollo/client';
import { InventoryMetadata } from 'generated/graphql';
import { MacroConfigProps } from "helpers/genericTypes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormGroup, Button } from 'reactstrap';


type InventorySelection = {
    roomName?: string
    deckId?: string
    deckNumber?: number
    inventoryAdded?: Array<{ name: string, count: number }>
}

type Deck = {
    id: string
    number: number
    rooms: Array<{ id: string, name: string }>
}

type InventoryInput = {
    simulatorId: string
    name: string
    metadata?: InventoryMetadata
    roomCount?: Array<{ room: string, count: number }>
    crewCount?: Array<{ crew: string, count: number }>
}

const AddMultipleInventory: React.FC<MacroConfigProps> = ({ args, updateArgs, client, simulatorId }) => {
    const typedArgs = args as { inventory: Array<InventoryInput> | undefined };
    const [decks, setDecks] = useState<Array<Deck>>([]);
    const [selectedSimulatorId, setSelectedSimulatorId] = useState<string | undefined>(simulatorId);
    const [availableSimulators, setAvailableSimulators] = useState<Array<{ id: string, name: string }>>([]);
    const [localInventorySelections, setLocalInventorySelections] = useState<InventorySelection[]>([]);
    const { data: simulatorsData } = useQuery(gql`
        query Simulators {
            simulators {
                id
                name
            }
        }
    `);

    useEffect(() => {
        if (simulatorsData && simulatorsData.simulators && simulatorsData.simulators.length > 0) {
            setAvailableSimulators(simulatorsData.simulators);
        }
    }, [simulatorsData]);

    const [getDecks, { data: decksData }] = useLazyQuery(gql`
        query Decks($simulatorId: ID!) {
            decks(simulatorId: $simulatorId) {
                id
                number
                rooms {
                    id
                    name
                }
            }
        }
    `);

    useEffect(() => {
        if (decksData && decksData.decks && decksData.decks.length > 0) {
            setDecks(decksData.decks);
        }
    }, [decksData]);

    const roomMap = useMemo(() => {
        return decks.reduce((acc, deck) => {
            deck.rooms.forEach(room => {
                acc[room.name] = { ...room, deckId: deck.id, deckNumber: deck.number };
            })
            return acc;
        }, {} as Record<string, { id: string, name: string, deckId: string, deckNumber: number }>);
    }, [decks]);

    // Initialize local state from args
    useEffect(() => {
        if (!typedArgs || !typedArgs.inventory || typedArgs.inventory.length === 0 || !typedArgs.inventory.filter) {
            setLocalInventorySelections([]);
            return;
        }
        const inventoryWithRoom = typedArgs.inventory.filter((arg) => arg.roomCount && arg.roomCount.length > 0);
        const baseInventorySelectionArray: InventorySelection[] = [];
        // Make an array for all of the available rooms
        for (const room of Object.values(roomMap)) {
            baseInventorySelectionArray.push({
                roomName: room.name,
                deckId: room.deckId,
                deckNumber: room.deckNumber,
                inventoryAdded: []
            })
        }

        inventoryWithRoom.forEach((arg) => {
            if (arg.roomCount && arg.roomCount.length > 0) {
                arg.roomCount.forEach((r) => {
                    const room = roomMap[r.room];
                    if (room) {
                        baseInventorySelectionArray?.find((s) => s.roomName === room.name)?.inventoryAdded?.push({ name: arg.name, count: r.count });
                    }
                })
            }
        });
        const filteredBaseInventorySelectionArray = baseInventorySelectionArray.filter((s) => (s?.inventoryAdded?.length || 0) > 0);
        setLocalInventorySelections(filteredBaseInventorySelectionArray);
    }, [typedArgs, roomMap]);

    const updateArgsTranslation: (translatedData: InventorySelection[]) => InventoryInput[] = (translatedData: InventorySelection[]) => {
        const inventoryNameMap: Record<string, InventoryInput> = {};
        translatedData.forEach((s) => {
            s.inventoryAdded?.forEach((i) => {
                if (!inventoryNameMap[i.name]) {
                    inventoryNameMap[i.name] = {
                        simulatorId: "",
                        name: i.name,
                    }
                }
                // Find the room ID from the room name
                const roomId = Object.values(roomMap).find(r => r.name === s.roomName)?.id || "";
                inventoryNameMap[i.name].roomCount = [...(inventoryNameMap[i.name].roomCount || []), { room: s.roomName || "", count: i.count }];
            })
        })
        return Object.values(inventoryNameMap);
    }

    useEffect(() => {
        if (selectedSimulatorId) {
            getDecks({ variables: { simulatorId: selectedSimulatorId } });
        }
    }, [selectedSimulatorId, getDecks]);

    const isSaved = useMemo(() => {
        return JSON.stringify(typedArgs.inventory) === JSON.stringify(updateArgsTranslation(localInventorySelections));
    }, [typedArgs, localInventorySelections]);

    const sortedDecks = useMemo(() => {
        return [...decks].sort((a, b) => a.number - b.number);
    }, [decks]);

    const handleSaveChanges = () => {
        updateArgs('inventory', updateArgsTranslation(localInventorySelections));
    };

    return <FormGroup className='macro-template'>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <div>
                Note: Because of how inventory is added, you will need to hit the save button before leaving this action.
            </div>
            <div>
                Currently, this is
                <span style={{ color: isSaved ? "green" : "red" }}>{isSaved ? " saved" : " not saved"}</span>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <label>Simulator (to get room list)</label>
            <select
                value={selectedSimulatorId}
                onChange={(e) => setSelectedSimulatorId(e.target.value)}
            >
                <option value="">Select a Simulator</option>
                {availableSimulators.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
        </div>

        {selectedSimulatorId && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <label>Rooms to add inventory to</label>
                {localInventorySelections.map((deckRoomSelections) => (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }} key={deckRoomSelections.roomName}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '50px' }}>
                                <label>Deck</label>
                                <select
                                    value={deckRoomSelections.deckId}
                                    onChange={(e) => {
                                        const newDeckId = e.target.value;
                                        const newInventorySelections = localInventorySelections.map((s) => {
                                            if (s.roomName === deckRoomSelections.roomName) {
                                                const newDeck = decks.find(d => d.id === newDeckId);
                                                return {
                                                    deckId: newDeckId,
                                                    deckNumber: newDeck?.number || 0,
                                                    roomName: newDeck?.rooms[0]?.name,
                                                    inventoryAdded: []
                                                };
                                            }
                                            return s;
                                        })
                                        setLocalInventorySelections(newInventorySelections);
                                    }}
                                >
                                    <option value="">Select a Deck</option>
                                    {sortedDecks.map((d) => <option key={d.id} value={d.id}>{d.number}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                                <label>Room</label>
                                <select
                                    value={deckRoomSelections.roomName}
                                    onChange={(e) => {
                                        const newRoomName = e.target.value;
                                        const newInventorySelections = localInventorySelections.map((s) => {
                                            if (s.roomName === deckRoomSelections.roomName) {
                                                return {
                                                    ...s,
                                                    roomName: newRoomName,
                                                };
                                            }
                                            return s;
                                        })
                                        setLocalInventorySelections(newInventorySelections);
                                    }}
                                >
                                    <option value="">Select a Room</option>
                                    {decks.find((d) => d.id === deckRoomSelections.deckId)?.rooms.map((r) => <option key={r.id} value={r.name}>{r.name}</option>)}
                                </select>
                            </div>
                            <Button
                                size="sm"
                                color="danger"
                                onClick={() => {
                                    const newInventorySelections = localInventorySelections.filter((s) => s.roomName !== deckRoomSelections.roomName);
                                    setLocalInventorySelections(newInventorySelections);
                                }}>Remove</Button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginLeft: "2rem" }}>
                            {deckRoomSelections.inventoryAdded?.map((i, index) => (
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '2px' }} key={i.name}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                                        <label>{"Name"}</label>
                                        <input
                                            type="text"
                                            value={i.name}
                                            id={deckRoomSelections.roomName + "-" + index}
                                            onChange={(e) => {
                                                const newInventorySelections = localInventorySelections.map((s) => {
                                                    if (s.roomName === deckRoomSelections.roomName) {
                                                        return {
                                                            ...s,
                                                            inventoryAdded: s.inventoryAdded?.map((ii) =>
                                                                ii.name === i.name ? { ...ii, name: e.target.value } : ii
                                                            )
                                                        };
                                                    }
                                                    return s;
                                                })
                                                setLocalInventorySelections(newInventorySelections);
                                                setTimeout(() => {
                                                    const input = document.getElementById(deckRoomSelections.roomName + "-" + index) as HTMLInputElement;
                                                    if (input) {
                                                        input.focus();
                                                    }
                                                }, 10);
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                                        <label>{"Count"}</label>
                                        <input
                                            type="number"
                                            value={i.count}
                                            onChange={(e) => {
                                                const newInventorySelections = localInventorySelections.map((s) => {
                                                    if (s.roomName === deckRoomSelections.roomName) {
                                                        return {
                                                            ...s,
                                                            inventoryAdded: s.inventoryAdded?.map((ii) =>
                                                                ii.name === i.name ? { ...ii, count: parseInt(e.target.value) } : ii
                                                            )
                                                        };
                                                    }
                                                    return s;
                                                })
                                                setLocalInventorySelections(newInventorySelections);
                                            }}
                                        />
                                    </div>
                                    <Button
                                        size="sm"
                                        color="danger"
                                        onClick={() => {
                                            const newInventorySelections = localInventorySelections.map((s) => {
                                                if (s.roomName === deckRoomSelections.roomName) {
                                                    return { ...s, inventoryAdded: s.inventoryAdded?.filter((ii) => ii.name !== i.name) };
                                                }
                                                return s;
                                            })
                                            setLocalInventorySelections(newInventorySelections);
                                        }}>X</Button>
                                </div>
                            ))}
                            <Button
                                size="sm"
                                color="secondary"
                                onClick={() => {
                                    const newInventorySelections = [...localInventorySelections];
                                    const currentRoom = newInventorySelections.find((s) => s.roomName === deckRoomSelections.roomName);
                                    if (currentRoom) {
                                        currentRoom.inventoryAdded = [...(currentRoom.inventoryAdded || []), { name: "", count: 0 }];
                                    }
                                    setLocalInventorySelections(newInventorySelections);
                                }}>Add Inventory</Button>
                        </div>
                    </div>
                ))}

                <Button
                    size="sm"
                    color="secondary"
                    onClick={() => {
                        if (decks.length === 0) return;
                        const firstDeck = decks[0];
                        const firstRoom = firstDeck.rooms[0];
                        const newSelection = {
                            deckId: firstDeck.id,
                            deckNumber: firstDeck.number,
                            roomName: firstRoom.name,
                            inventoryAdded: []
                        };
                        setLocalInventorySelections([...localInventorySelections, newSelection]);
                    }}>Add Room</Button>
                <Button
                    size="lg"
                    onClick={handleSaveChanges}
                    color="primary"
                >
                    Save Changes
                </Button>
            </div>
        )}
    </FormGroup>
}

export const addMultipleInventory = AddMultipleInventory