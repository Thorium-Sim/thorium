import React, { useRef, useEffect, useState } from 'react';

export type BasicCoordinate = {
    x: number
    y: number
}

export type ColoredCoordinate = {
    color: string
} & BasicCoordinate

export type IdCoordinate = {
    id: string
} & BasicCoordinate

export type NamedCoordinate = {
    name: string
} & BasicCoordinate

export type ShownCoordinate = {
    showName?: boolean
} & NamedCoordinate;

export type FullCoordinate = {
    speed: number

} & ColoredCoordinate

interface ImageCanvasProps {
    imageUrl: string;
    canvasWidth: number;
    canvasHeight: number;
    coordinates: FullCoordinate[];
    draw?: {
        duration: number;
    }
    line?: boolean
    staticLocation?: {
        primary?: FullCoordinate,
        secondary?: FullCoordinate
    }
    selectLocation?: {
        coordinates: (IdCoordinate & ShownCoordinate)[]
        onClick: (id: string) => void
        selectedId?: string
    }
    shipIcon?: {
        imageUrl: string
        location: BasicCoordinate
    }
    icons?: {
        imageUrl: string
        coordinate: BasicCoordinate
    }[]
    transparentCircle?: {
        center: BasicCoordinate
        radius: number
    }
    onClickMap?: (coord: { x: number, y: number }) => void
}

export const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageUrl, canvasWidth, canvasHeight, coordinates, draw, line, staticLocation, selectLocation, shipIcon, icons, transparentCircle, onClickMap }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [shipImage, setShipImage] = useState<HTMLImageElement | null>(null);
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImage(img);
        };
        img.src = imageUrl;
    }, [imageUrl]);

    useEffect(() => {
        if (shipIcon) {
            const img = new Image();
            img.onload = () => {
                setShipImage(img);
            };
            img.src = shipIcon.imageUrl;
        }
    }, [shipIcon])



    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            // Calculate scaling factors
            const scaleX = canvasWidth / image.width;
            const scaleY = canvasHeight / image.height;
            const scale = Math.min(scaleX, scaleY);

            // Calculate the position to center the image
            const x = (canvasWidth / 2) - (image.width * scale / 2);
            const y = (canvasHeight / 2) - (image.height * scale / 2);

            // Draw the image
            ctx.drawImage(image, x, y, image.width * scale, image.height * scale);

            // Add click event listener to log coordinates
            const handleClick = (event: MouseEvent) => {
                const rect = canvas.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const clickY = event.clientY - rect.top;

                // Calculate the coordinates relative to the image
                const imageX = (clickX - x) / scale;
                const imageY = (clickY - y) / scale;

                if (selectLocation) {
                    let minDistance: number | undefined = undefined;
                    let closestId: string | undefined = undefined;
                    for (let i = 0; i < selectLocation.coordinates.length; i++) {
                        const distance = Math.hypot(Math.abs(imageX - selectLocation.coordinates[i].x), Math.abs(imageY - selectLocation.coordinates[i].y));
                        if (!distance || !minDistance || distance < minDistance) {
                            minDistance = distance;
                            closestId = selectLocation.coordinates[i].id
                        }

                    }
                    selectLocation.onClick(closestId || "");
                }
                if (onClickMap) {
                    onClickMap({ x: imageX, y: imageY });
                }

            };

            canvas.addEventListener('click', handleClick);

            // Cleanup event listener on component unmount
            return () => {
                canvas.removeEventListener('click', handleClick);
            };
        }
    }, [image, canvasWidth, canvasHeight, selectLocation, onClickMap]);

    const drawAllNames = () => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Calculate scaling factors
            const scaleX = canvasWidth / image.width;
            const scaleY = canvasHeight / image.height;
            const scale = Math.min(scaleX, scaleY);

            // Calculate the position to center the image
            const x = (canvasWidth / 2) - (image.width * scale / 2);
            const y = (canvasHeight / 2) - (image.height * scale / 2);
            selectLocation && selectLocation.coordinates.forEach((coords) => {
                if (coords.showName) {
                    ctx.beginPath();
                    ctx.font = "16px Saira";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.fillText(coords.name, coords.x * scale + x, coords.y * scale + y + 35 * scale);
                }

            })
        }
    }

    const drawTarget = (ctx: CanvasRenderingContext2D, coords: IdCoordinate & ShownCoordinate, x: number, y: number, scale: number) => {
        ctx.beginPath();
        ctx.arc(coords.x * scale + x, coords.y * scale + y, 3 * scale, 0, 2 * Math.PI)
        ctx.fillStyle = "white"
        ctx.fill();
        ctx.beginPath();
        ctx.arc(coords.x * scale + x, coords.y * scale + y, 20 * scale, 0, 2 * Math.PI)
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(coords.x * scale + x + (25 * scale), coords.y * scale + y);
        ctx.lineTo(coords.x * scale + x + (15 * scale), coords.y * scale + y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(coords.x * scale + x + (-25 * scale), coords.y * scale + y);
        ctx.lineTo(coords.x * scale + x + (-15 * scale), coords.y * scale + y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(coords.x * scale + x, coords.y * scale + y + (-25 * scale));
        ctx.lineTo(coords.x * scale + x, coords.y * scale + y + (-15 * scale));
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(coords.x * scale + x, coords.y * scale + y + (25 * scale));
        ctx.lineTo(coords.x * scale + x, coords.y * scale + y + (15 * scale));
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.font = "16px Saira";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        coords.showName && ctx.fillText(coords.name, coords.x * scale + x, coords.y * scale + y + 35 * scale);
    }

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Calculate scaling factors
            const scaleX = canvasWidth / image.width;
            const scaleY = canvasHeight / image.height;
            const scale = Math.min(scaleX, scaleY);

            // Calculate the position to center the image
            const x = (canvasWidth / 2) - (image.width * scale / 2);
            const y = (canvasHeight / 2) - (image.height * scale / 2);
            if (selectLocation && selectLocation.selectedId === undefined) {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
                drawAllNames();
            }
            else if (selectLocation?.selectedId) {

                for (let i = 0; i < selectLocation.coordinates.length; i++) {
                    const coords: (IdCoordinate & NamedCoordinate) = selectLocation.coordinates[i];
                    if (coords.id === selectLocation?.selectedId) {
                        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
                        drawAllNames();
                        drawTarget(ctx, coords, x, y, scale);
                    }
                }
            }
            if (staticLocation) {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
                if (staticLocation.primary) {
                    ctx.beginPath();
                    ctx.arc(staticLocation.primary.x * scale + x, staticLocation.primary.y * scale + y, 15 * scale, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white'
                    ctx.fill();
                }
                if (staticLocation.secondary) {
                    ctx.beginPath();
                    ctx.arc(staticLocation.secondary.x * scale + x, staticLocation.secondary.y * scale + y, 15 * scale, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                }
            }
            if (shipIcon && shipImage) {
                ctx.drawImage(shipImage, shipIcon.location.x * scale + x - 13, shipIcon.location.y * scale + y - 13, 25 * scale, 25 * scale);
            }
            if (icons && icons.length) {
                icons.forEach((icon) => {
                    // draw a triangle at the position specified by the icon
                    const x1 = icon.coordinate.x * scale + x;
                    const y1 = icon.coordinate.y * scale + y;
                    const x2 = x1 - 5;
                    const y2 = y1 - 10;
                    const x3 = x1 + 5;
                    const y3 = y1 - 10;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);  // Move to the bottom-left corner
                    ctx.lineTo(x2, y2);  // Draw line to the top-middle
                    ctx.lineTo(x3, y3);  // Draw line to the bottom-right corner
                    ctx.closePath();     // Close the path to form a triangle
                    ctx.fillStyle = 'white';
                    ctx.fill();

                })
            }

            if (transparentCircle) {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
                ctx.beginPath();
                ctx.arc(transparentCircle.center.x * scale + x, transparentCircle.center.y * scale + y, transparentCircle.radius * scale, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.fill();
            }

            if (draw || line) {
                if (coordinates.length > 1) {
                    if (line) {
                        (!staticLocation && !selectLocation) && ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                        //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
                        ctx.beginPath();
                        ctx.moveTo(coordinates[0].x * scale + x, coordinates[0].y * scale + y);
                        for (let i = 1; i < coordinates.length; i++) {
                            ctx.strokeStyle = coordinates[i - 1].color; // Use the color of the previous coordinate
                            ctx.lineTo(coordinates[i].x * scale + x, coordinates[i].y * scale + y);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(coordinates[i].x * scale + x, coordinates[i].y * scale + y);
                        }
                        ctx.strokeStyle = coordinates[coordinates.length - 1].color; // Use the color of the last coordinate
                        ctx.lineWidth = 2;
                        ctx.lineCap = 'round';
                        ctx.stroke();
                    }
                    else if (draw) {
                        let startTime: number | null = null;
                        //const controlPoints = getAllControlPoints(coordinates, 1, false);
                        const animate = (timestamp: number) => {
                            if (!startTime) startTime = timestamp;
                            const elapsed = timestamp - startTime;

                            // Calculate total segment durations based on speeds
                            const totalSegmentDuration = coordinates.reduce((acc, coord, index) => {
                                if (index < coordinates.length - 1) {
                                    const nextCoord = coordinates[index + 1];
                                    const segmentDistance = Math.sqrt(
                                        Math.pow(nextCoord.x - coord.x, 2) + Math.pow(nextCoord.y - coord.y, 2)
                                    );
                                    return acc + segmentDistance / coord.speed;
                                }
                                return acc;
                            }, 0);

                            // Adjust the segment durations to fit within the total animation duration
                            const segmentDurations = coordinates.map((coord, index) => {
                                if (index < coordinates.length - 1) {
                                    const nextCoord = coordinates[index + 1];
                                    const segmentDistance = Math.sqrt(
                                        Math.pow(nextCoord.x - coord.x, 2) + Math.pow(nextCoord.y - coord.y, 2)
                                    );
                                    const segmentDuration = (segmentDistance / coord.speed) * (draw.duration / totalSegmentDuration);
                                    return segmentDuration;
                                }
                                return 0;
                            });

                            const t = elapsed / draw.duration;
                            if (t >= 1) {
                                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                                ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
                                ctx.beginPath();
                                ctx.moveTo(coordinates[0].x * scale + x, coordinates[0].y * scale + y);
                                for (let i = 1; i < coordinates.length; i++) {
                                    ctx.strokeStyle = coordinates[i - 1].color; // Use the color of the previous coordinate
                                    ctx.lineTo(coordinates[i].x * scale + x, coordinates[i].y * scale + y);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(coordinates[i].x * scale + x, coordinates[i].y * scale + y);
                                }
                                ctx.strokeStyle = coordinates[coordinates.length - 1].color; // Use the color of the last coordinate
                                ctx.lineWidth = 2;
                                ctx.lineCap = 'round';
                                ctx.stroke();
                            } else {
                                let accumulatedTime = 0;
                                let segmentIndex = 0;
                                for (let i = 0; i < coordinates.length - 1; i++) {
                                    const segmentDuration = segmentDurations[i];

                                    if (elapsed < accumulatedTime + segmentDuration) {
                                        segmentIndex = i;
                                        break;
                                    } else {
                                        accumulatedTime += segmentDuration;
                                    }
                                }

                                const segmentElapsed = elapsed - accumulatedTime;
                                const segmentDuration = segmentDurations[segmentIndex];
                                const segmentT = segmentElapsed / segmentDuration;

                                const startCoord = coordinates[segmentIndex];
                                const endCoord = coordinates[segmentIndex + 1];
                                const nextX = startCoord.x + (endCoord.x - startCoord.x) * segmentT;
                                const nextY = startCoord.y + (endCoord.y - startCoord.y) * segmentT;

                                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                                ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
                                ctx.beginPath();
                                ctx.moveTo(coordinates[0].x * scale + x, coordinates[0].y * scale + y);

                                for (let i = 1; i <= segmentIndex; i++) {
                                    ctx.strokeStyle = coordinates[i - 1].color; // Use the color of the previous coordinate
                                    ctx.lineTo(coordinates[i].x * scale + x, coordinates[i].y * scale + y);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(coordinates[i].x * scale + x, coordinates[i].y * scale + y);
                                }

                                ctx.lineTo(nextX * scale + x, nextY * scale + y);
                                ctx.strokeStyle = startCoord.color; // Use the color of the current segment
                                ctx.lineWidth = 2;
                                ctx.lineCap = 'round';
                                ctx.stroke();

                                requestAnimationFrame(animate);
                            }
                        };
                        requestAnimationFrame(animate);
                    }

                }
            }

        }
    }, [image, shipImage, canvasWidth, canvasHeight, coordinates, draw, line, staticLocation, selectLocation, icons, transparentCircle, onClickMap]);

    return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};
