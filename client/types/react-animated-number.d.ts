declare module "react-animated-number" {
  export const AnimatedNumber: React.FC<{
    stepPrecision?: number;
    value: number;
    duration: number;
    formatValue: (v: number) => React.Element;
  }>;
  export default AnimatedNumber;
}
