
export type CreateFlightSetStepProps<T> = {
    onBack: () => void;
    onNext: () => void;
    canNext: boolean;
    nextLabel: string;
    backLabel: string;
    state: T;
    setState: (state: T) => void;
}
