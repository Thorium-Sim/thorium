export type BasicStepProps = {
    updateSelectedOption: (option: string) => void;
    selectedOption?: string
    allowContinue: boolean;
    continueToNextStep: () => void;
    canJumpToSummary: boolean;
}