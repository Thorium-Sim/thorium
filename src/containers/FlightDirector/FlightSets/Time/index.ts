export function getSecondsBetweenUnixTimestamps(startTimestamp: number, endTimestamp: number): number {
    // Calculate the difference in seconds
    const differenceInSeconds = endTimestamp - startTimestamp;

    return differenceInSeconds;
}

export function isEndUnixTimestampAfterCurrent(endTimestamp: number): boolean {
    // Get the current Unix timestamp in seconds
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);

    // Compare the end timestamp with the current Unix timestamp
    return endTimestamp > currentUnixTimestamp;
}

export function isEndTimestampAfterCurrent(endTimestamp: string): boolean {
    // Get the current date and time
    const currentDate = new Date();

    // Convert the end timestamp to a Date object
    const endDate = new Date(endTimestamp);

    // Compare the end date with the current date
    return endDate > currentDate;
}

export function getTimePassedPercentage(startTimestamp: number, endTimestamp: number): number {
    // Get the current Unix timestamp in seconds
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);

    // Check if the current time is before the start time
    if (currentUnixTimestamp <= startTimestamp) {
        return 0;
    }

    // Check if the current time is after the end time
    if (currentUnixTimestamp >= endTimestamp) {
        return 100;
    }

    // Calculate the total duration between start and end timestamps
    const totalDuration = endTimestamp - startTimestamp;

    // Calculate the duration that has passed since the start timestamp
    const passedDuration = currentUnixTimestamp - startTimestamp;

    // Calculate the percentage of time that has passed
    const passedPercentage = (passedDuration / totalDuration) * 100;

    return passedPercentage;
}

export function generateCurrentUnixTimestamp() {
    return Math.floor(Date.now() / 1000);
}

export function formatSecondsToTime(seconds: number): string {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedHours: string = hours.toString().padStart(2, '0');
    const formattedMinutes: string = minutes.toString().padStart(2, '0');
    const formattedSeconds: string = remainingSeconds.toFixed(0).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}