import React from "react";
import {throttle} from "helpers/debounce";

interface ThrottledSliderProps {
  label: string;
  value: number;
  warning?: string;
  onChange: (value: number) => void;
}

// Range slider that sends throttled updates while dragging and keeps showing
// the local value until the subscription echo catches up — so the thumb never
// jumps back under the user's finger on a touch screen.
const ThrottledSlider: React.FC<ThrottledSliderProps> = ({
  label,
  value,
  warning,
  onChange,
}) => {
  const [local, setLocal] = React.useState<number | null>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const send = React.useRef(
    throttle((v: number) => onChangeRef.current(v), 150),
  );
  React.useEffect(() => {
    // Once the server value matches what we sent, drop the local override
    if (local !== null && Math.abs(local - value) < 0.02) {
      setLocal(null);
    }
  }, [value, local]);
  const shown = local ?? value;
  return (
    <label className="aegis-slider">
      {label}: {Math.round(shown * 100)}%
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(shown * 100)}
        onChange={e => {
          const v = parseInt(e.target.value, 10) / 100;
          setLocal(v);
          send.current(v);
        }}
      />
      {warning && shown > 0.7 && (
        <small className="text-warning">{warning}</small>
      )}
    </label>
  );
};

export default ThrottledSlider;
