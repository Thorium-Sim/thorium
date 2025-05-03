import React, { useRef, useEffect, useState } from 'react';
import { BasicCoordinate, ColoredCoordinate, IdCoordinate, ImageCanvas, NamedCoordinate, ShownCoordinate } from './ImageCanvas';
import { PointOfInterest } from '../types';

export type StaticLineMapProps = {
    imageUrl: string;
    coordinates: { x: number, y: number, color: string, speed: number }[]
}

export type PreviewMapProps = {
    duration: number
} & StaticLineMapProps

export const PreviewMap: React.FC<PreviewMapProps> = ({ imageUrl, coordinates, duration }) => {
    const parentRef = useRef(null);
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (parentRef.current) {
                const { offsetWidth, offsetHeight } = parentRef.current;
                setParentSize({ width: offsetWidth, height: offsetHeight });
            }
        };

        // Update size on component mount
        updateSize();

        // Update size on window resize
        window.addEventListener('resize', updateSize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);


    return <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div ref={parentRef} style={{ flexGrow: 1 }}>
            <ImageCanvas
                imageUrl={imageUrl}
                canvasWidth={parentSize.width - 15}
                canvasHeight={parentSize.height - 15}
                coordinates={coordinates}
                draw={{ duration: duration }}
            />
        </div>
    </div>

}

export const MemoedPreviewMap = React.memo(PreviewMap);

export const StaticLineMap: React.FC<StaticLineMapProps> = ({ imageUrl, coordinates }) => {
    const parentRef = useRef(null);
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (parentRef.current) {
                const { offsetWidth, offsetHeight } = parentRef.current;
                setParentSize({ width: offsetWidth, height: offsetHeight });
            }
        };

        // Update size on component mount
        updateSize();

        // Update size on window resize
        window.addEventListener('resize', updateSize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);


    return <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div ref={parentRef} style={{ flexGrow: 1 }}>
            <ImageCanvas
                imageUrl={imageUrl}
                canvasWidth={parentSize.width - 15}
                canvasHeight={parentSize.height - 15}
                coordinates={coordinates}
                draw={{ duration: 50 }}
            />
        </div>
    </div>
}


export type RangeShowingMapProps = {
    imageUrl: string;
    coordinate: BasicCoordinate;
    radius: number;
}

export const RangeShowingMap: React.FC<RangeShowingMapProps> = ({ imageUrl, coordinate, radius }) => {
    const parentRef = useRef(null);
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const updateSize = () => {
            if (parentRef.current) {
                const { offsetWidth, offsetHeight } = parentRef.current;
                setParentSize({ width: offsetWidth, height: offsetHeight });
            }
        };

        // Update size on component mount
        updateSize();

        // Update size on window resize
        window.addEventListener('resize', updateSize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div ref={parentRef} style={{ flexGrow: 1 }}>
            <ImageCanvas
                imageUrl={imageUrl}
                canvasWidth={parentSize.width - 15}
                canvasHeight={parentSize.height - 15}
                coordinates={[]}
                transparentCircle={{
                    center: coordinate,
                    radius
                }}
            />
        </div>
    </div>

}


export type PositionMapProps = {
    imageUrl: string;
    primaryLocation?: { x: number, y: number }
    secondaryLocation?: { x: number, y: number }
    onMapClick?: (coord: { x: number, y: number }) => void
}

export const PositionMap: React.FC<PositionMapProps> = ({ imageUrl, primaryLocation, secondaryLocation, onMapClick }) => {
    const parentRef = useRef(null);
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

    const primary = React.useMemo(() => {
        if (primaryLocation) {
            return { ...primaryLocation, color: 'white', speed: 0 }
        }
        else {
            return undefined
        }
    }, [primaryLocation])

    const secondary = React.useMemo(() => {
        if (secondaryLocation) {
            return { ...secondaryLocation, color: 'white', speed: 0 }
        }
        return undefined;
    }, [secondaryLocation])

    useEffect(() => {
        const updateSize = () => {
            if (parentRef.current) {
                const { offsetWidth, offsetHeight } = parentRef.current;
                setParentSize({ width: offsetWidth, height: offsetHeight });
            }
        };

        // Update size on component mount
        updateSize();

        // Update size on window resize
        window.addEventListener('resize', updateSize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div ref={parentRef} style={{ flexGrow: 1 }}>
            <ImageCanvas
                imageUrl={imageUrl}
                canvasWidth={parentSize.width - 15}
                canvasHeight={parentSize.height - 15}
                coordinates={[]}
                staticLocation={{
                    primary,
                    secondary
                }}
                onClickMap={onMapClick}
            />
        </div>
    </div>
}

export type SelectableLocationMapProps = {
    imageUrl: string;
    locations: (IdCoordinate & ShownCoordinate)[]
    onClick: (id: string) => void
    selectedPOI?: PointOfInterest
    shipIcon?: {
        imgUrl: string
        location: { x: number, y: number }
    }
}

export const SelectablePositionMap: React.FC<SelectableLocationMapProps> = ({ imageUrl, locations, onClick, selectedPOI, shipIcon }) => {
    const parentRef = useRef(null);
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (parentRef.current) {
                const { offsetWidth, offsetHeight } = parentRef.current;
                setParentSize({ width: offsetWidth, height: offsetHeight });
            }
        };

        // Update size on component mount
        updateSize();

        // Update size on window resize
        window.addEventListener('resize', updateSize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div ref={parentRef} style={{ flexGrow: 1 }}>
            <ImageCanvas
                imageUrl={imageUrl}
                canvasWidth={parentSize.width - 15}
                canvasHeight={parentSize.height - 15}
                coordinates={[]}
                selectLocation={{
                    coordinates: locations,
                    onClick,
                    selectedId: selectedPOI?.id
                }}
                shipIcon={shipIcon && {
                    imageUrl: shipIcon.imgUrl,
                    location: shipIcon.location
                }}
            />
        </div>
    </div>
}

export type SelectableLocationMultiIconMapProps = {
    imageUrl: string;
    locations: (IdCoordinate & ShownCoordinate)[]
    onClick: (id: string) => void
    selectedPOI?: PointOfInterest
    shipIcon?: {
        imgUrl: string
        location: { x: number, y: number }
    }
    icons: { imgUrl: string, location: { x: number, y: number } }[]
    transparentCircle?: {
        center: BasicCoordinate;
        radius: number;
    }
}

export const SelectableLocationMultiIconMap = (props: SelectableLocationMultiIconMapProps) => {
    const parentRef = useRef(null);
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (parentRef.current) {
                const { offsetWidth, offsetHeight } = parentRef.current;
                setParentSize({ width: offsetWidth, height: offsetHeight });
            }
        };

        // Update size on component mount
        updateSize();

        // Update size on window resize
        window.addEventListener('resize', updateSize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div ref={parentRef} style={{ flexGrow: 1 }}>
            <ImageCanvas
                imageUrl={props.imageUrl}
                canvasWidth={parentSize.width - 15}
                canvasHeight={parentSize.height - 15}
                coordinates={[]}
                selectLocation={{
                    coordinates: props.locations,
                    onClick: props.onClick,
                    selectedId: props.selectedPOI?.id
                }}
                shipIcon={props.shipIcon && {
                    imageUrl: props.shipIcon.imgUrl,
                    location: props.shipIcon.location
                }}
                icons={props.icons.map((each) => {
                    return {
                        imageUrl: each.imgUrl,
                        coordinate: each.location
                    }
                })}
                transparentCircle={props.transparentCircle}
            />
        </div>
    </div>
}
