import React, { useEffect } from 'react'
import { FlightSetCreationInitialInformation } from './steps/initial-information';
import { FlightSetCreationDefaultSpeed } from './steps/default-speed';
import { FlightSetCreationSummary } from './steps/summary';
import { FlightSetCreationPointsOfInterestNBorders } from './steps/points-of-interest-n-borders';
import { FlightSetCreationFlightOptions } from './steps/flight-options';
import { FlightSet, NavigationExitOptions, NavigationSpeedOptions, NavigationStartOptions } from '../types';


export type CreateFlightSetProps = {
    onCreate: (flightSet: FlightSet) => void;
    onCancel: () => void;
    flightSets: FlightSet[];
    editingFlightSet?: FlightSet;
}
const useAdjustTextColorBasedOnBackground = () => {
    const elementRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Function to calculate perceived brightness
        const calculateBrightness = (rgb: number[]): number => {
            return (0.299 * rgb[0]) + (0.587 * rgb[1]) + (0.114 * rgb[2]);
        };

        // Convert a hex color to RGB values
        const hexToRgb = (hex: string): number[] => {
            let normalizedHex = hex.replace('#', '');
            if (normalizedHex.length === 3) {
                normalizedHex = normalizedHex.split('').map(char => char + char).join('');
            }
            const bigint = parseInt(normalizedHex, 16);
            return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
        };

        // Parse a color string into an RGB array
        const parseColor = (color: string): number[] => {
            if (color.startsWith('#')) {
                return hexToRgb(color);
            } else if (color.startsWith('rgb')) {
                const rgb = color.match(/\d+/g)?.map(Number);
                return rgb ? rgb : [0, 0, 0]; // Fallback to black if parsing fails
            }
            return [255, 255, 255]; // Default to white for unsupported formats
        };

        // Function to get computed background color or traverse up if transparent
        const getEffectiveBackgroundColor = (el: HTMLElement | null): string => {
            while (el) {
                const computedStyle = window.getComputedStyle(el);
                const backgroundColor = computedStyle.backgroundColor;

                if (backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
                    return backgroundColor;
                }
                el = el.parentElement; // Traverse up to the parent element
            }
            return 'rgb(255, 255, 255)'; // Default to white if no background found
        };

        // Get the effective background color
        const backgroundColor = getEffectiveBackgroundColor(element);
        const rgbValues = parseColor(backgroundColor);
        const brightness = calculateBrightness(rgbValues);

        // Set text color based on brightness
        if (brightness > 186) {
            element.style.color = '#333333'; // Dark gray for light background
        } else {
            element.style.color = '#f0f0f0'; // Light gray for dark background
        }
    }, []);

    return elementRef;
};


export const CreateFlightSet: React.FC<CreateFlightSetProps> = (props) => {
    const [flightSetState, setFlightSetState] = React.useState<FlightSet>({
        id: props.editingFlightSet ? props.editingFlightSet.id : '',
        name: props.editingFlightSet ? props.editingFlightSet.name : '',
        label: props.editingFlightSet ? props.editingFlightSet.label : '',
        backgroundImg: props.editingFlightSet ? props.editingFlightSet.backgroundImg : '',
        defaultStartingLocation: props.editingFlightSet ? props.editingFlightSet.defaultStartingLocation : { x: 0, y: 0 },
        startOptions: props.editingFlightSet ? props.editingFlightSet.startOptions : [],
        exitOptions: props.editingFlightSet ? props.editingFlightSet.exitOptions : [],
        speedOptions: props.editingFlightSet ? props.editingFlightSet.speedOptions : [],
        pointsOfInterest: props.editingFlightSet ? props.editingFlightSet.pointsOfInterest : [],
        borders: props.editingFlightSet ? props.editingFlightSet.borders : [],
        imageMaxX: props.editingFlightSet ? props.editingFlightSet.imageMaxX : 0,
        imageMaxY: props.editingFlightSet ? props.editingFlightSet.imageMaxY : 0,
        pixelsPerSecond: props.editingFlightSet ? props.editingFlightSet.pixelsPerSecond : 4,
        probeLaunchRangeRadius: props.editingFlightSet?.probeLaunchRangeRadius || 100,
        pixelDistanceModifier: props.editingFlightSet?.pixelDistanceModifier || 1,
        addOnTraining: props.editingFlightSet?.addOnTraining || false
    });
    const colorRef = useAdjustTextColorBasedOnBackground();
    useEffect(() => {
        if (props.editingFlightSet) {
            setFlightSetState({
                id: props.editingFlightSet.id,
                name: props.editingFlightSet.name,
                label: props.editingFlightSet.label,
                backgroundImg: props.editingFlightSet.backgroundImg,
                defaultStartingLocation: props.editingFlightSet.defaultStartingLocation,
                startOptions: props.editingFlightSet.startOptions,
                exitOptions: props.editingFlightSet.exitOptions,
                speedOptions: props.editingFlightSet.speedOptions,
                pointsOfInterest: props.editingFlightSet.pointsOfInterest,
                borders: props.editingFlightSet.borders,
                imageMaxX: props.editingFlightSet.imageMaxX,
                imageMaxY: props.editingFlightSet.imageMaxY,
                pixelsPerSecond: props.editingFlightSet.pixelsPerSecond,
                probeLaunchRangeRadius: props.editingFlightSet.probeLaunchRangeRadius
            });
        }
    }, [props.editingFlightSet]);

    const [formState, setFormState] = React.useState<number>(0);
    // Draft options created/edited during this wizard session that may not be included yet
    const [draftStartOptions, setDraftStartOptions] = React.useState<NavigationStartOptions[]>([]);
    const [draftSpeedOptions, setDraftSpeedOptions] = React.useState<NavigationSpeedOptions[]>([]);
    const [draftExitOptions, setDraftExitOptions] = React.useState<NavigationExitOptions[]>([]);
    const upsertByName = <T extends { name: string }>(arr: T[], item: T): T[] => {
        const map: Record<string, T> = {};
        arr.forEach(o => { map[o.name] = o; });
        map[item.name] = item;
        return Object.values(map);
    };
    const allStartOptions = React.useMemo(() => {
        const uniqueByName: Record<string, NavigationStartOptions> = {};
        props.flightSets.forEach(flightSet => {
            flightSet.startOptions.forEach(option => {
                if (!uniqueByName[option.name]) {
                    uniqueByName[option.name] = option;
                }
            });
        });
        // Include currently edited flight set's included options
        flightSetState.startOptions.forEach(option => {
            if (!uniqueByName[option.name]) {
                uniqueByName[option.name] = option;
            }
        });
        // Include drafts created during this session (not necessarily included yet)
        draftStartOptions.forEach(option => {
            uniqueByName[option.name] = option;
        });
        return Object.values(uniqueByName);
    }, [props.flightSets, flightSetState.startOptions, draftStartOptions]);
    const allSpeedOptions = React.useMemo(() => {
        const uniqueByName: Record<string, NavigationSpeedOptions> = {};
        props.flightSets.forEach(flightSet => {
            flightSet.speedOptions.forEach(option => {
                if (!uniqueByName[option.name]) {
                    uniqueByName[option.name] = option;
                }
            });
        });
        flightSetState.speedOptions.forEach(option => {
            if (!uniqueByName[option.name]) {
                uniqueByName[option.name] = option;
            }
        });
        draftSpeedOptions.forEach(option => {
            uniqueByName[option.name] = option;
        });
        return Object.values(uniqueByName);
    }, [props.flightSets, flightSetState.speedOptions, draftSpeedOptions]);
    const allExitOptions = React.useMemo(() => {
        const uniqueByName: Record<string, NavigationExitOptions> = {};
        props.flightSets.forEach(flightSet => {
            flightSet.exitOptions.forEach(option => {
                if (!uniqueByName[option.name]) {
                    uniqueByName[option.name] = option;
                }
            });
        });
        flightSetState.exitOptions.forEach(option => {
            if (!uniqueByName[option.name]) {
                uniqueByName[option.name] = option;
            }
        });
        draftExitOptions.forEach(option => {
            uniqueByName[option.name] = option;
        });
        return Object.values(uniqueByName);
    }, [props.flightSets, flightSetState.exitOptions, draftExitOptions]);

    return (
        <div ref={colorRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {formState === 0 &&
                <FlightSetCreationInitialInformation
                    state={flightSetState}
                    setState={setFlightSetState}
                    onNext={() => {
                        const image = new Image();
                        image.src = flightSetState.backgroundImg;
                        image.onload = () => {
                            setFlightSetState({
                                ...flightSetState,
                                imageMaxX: image.width,
                                imageMaxY: image.height
                            });
                            setFormState(1);
                        }
                    }}
                    onBack={props.onCancel}
                    canNext={Boolean(flightSetState.name && flightSetState.name.length && flightSetState.backgroundImg)}
                    nextLabel={"Next"}
                    backLabel={"Cancel"}
                />
            }
            {formState === 1 &&
                <FlightSetCreationPointsOfInterestNBorders
                    state={flightSetState}
                    setState={setFlightSetState}
                    onNext={() => {
                        setFormState(2);
                    }}
                    onBack={() => {
                        setFormState(0);
                    }}
                    canNext={Boolean(flightSetState.pointsOfInterest.length)}
                    nextLabel={"Next"}
                    backLabel={"Back"}
                />
            }
            {formState === 2 &&
                <FlightSetCreationDefaultSpeed
                    state={flightSetState}
                    setState={setFlightSetState}
                    onNext={() => {
                        setFormState(3);
                    }}
                    onBack={() => {
                        setFormState(1);
                    }}
                    canNext={Boolean(flightSetState.pixelsPerSecond)}
                    nextLabel={"Next"}
                    backLabel={"Back"}
                />
            }
            {formState === 3 &&
                <FlightSetCreationFlightOptions
                    state={flightSetState}
                    setState={setFlightSetState}
                    onNext={() => {
                        setFormState(4);
                    }}
                    onBack={() => {
                        setFormState(2);
                    }}
                    canNext={true}
                    nextLabel={"Next"}
                    backLabel={"Back"}
                    allExitOptions={allExitOptions}
                    allSpeedOptions={allSpeedOptions}
                    allStartOptions={allStartOptions}
                    onUpsertDraftStartOption={(opt: NavigationStartOptions) => {
                        setDraftStartOptions(prev => upsertByName(prev, opt));
                    }}
                    onUpsertDraftSpeedOption={(opt: NavigationSpeedOptions) => {
                        setDraftSpeedOptions(prev => upsertByName(prev, opt));
                    }}
                    onUpsertDraftExitOption={(opt: NavigationExitOptions) => {
                        setDraftExitOptions(prev => upsertByName(prev, opt));
                    }}
                />
            }
            {formState === 4 &&
                <FlightSetCreationSummary
                    state={flightSetState}
                    setState={setFlightSetState}
                    onBack={() => {
                        setFormState(3);
                    }}
                    onNext={() => {
                        props.onCreate(flightSetState);
                    }}
                    backLabel={"Back"}
                    nextLabel={"Create"}
                    canNext={true}
                />

            }
        </div>
    )
}