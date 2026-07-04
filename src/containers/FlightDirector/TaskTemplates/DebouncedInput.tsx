import React, {useEffect, useRef, useState} from "react";
import {Input} from "reactstrap";
import debounce from "helpers/debounce";

interface DebouncedInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Input>, "onChange"> {
  /** Controlled value sourced from the server. Only synced in when the
   *  input is not focused, so an inbound subscription echo never clobbers
   *  actively typed text. */
  value: string | number | undefined | null;
  /** Called with the latest value after the user pauses typing (~400 ms). */
  onCommit: (value: string) => void;
}

/**
 * A debounced, focus-aware controlled input for the Task Flow config editor.
 *
 * The task-flow subscription re-pushes the entire taskFlows array on every
 * mutation, which previously caused `defaultValue`-based inputs to reset their
 * text on every keystroke round-trip.  This component fixes that by:
 *   1. Holding local state for smooth typing — server value only seeded on mount
 *      or when the field is not focused.
 *   2. Firing `onCommit` (the GraphQL mutation) debounced at 400 ms so the
 *      subscription does not echo back mid-keystroke.
 */
const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value,
  onCommit,
  ...rest
}) => {
  const [localValue, setLocalValue] = useState<string>(
    value !== undefined && value !== null ? String(value) : "",
  );
  const isFocused = useRef(false);

  // Sync from server only when not actively typing.
  useEffect(() => {
    if (!isFocused.current) {
      setLocalValue(value !== undefined && value !== null ? String(value) : "");
    }
  }, [value]);

  const debouncedCommit = useRef(
    debounce((v: string) => onCommit(v), 400),
  );

  // Rebuild the debounced callback if onCommit identity changes (rare but safe).
  useEffect(() => {
    debouncedCommit.current = debounce((v: string) => onCommit(v), 400);
  }, [onCommit]);

  return (
    <Input
      {...rest}
      value={localValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setLocalValue(v);
        debouncedCommit.current(v);
      }}
      onFocus={() => {
        isFocused.current = true;
      }}
      onBlur={() => {
        isFocused.current = false;
      }}
    />
  );
};

export default DebouncedInput;
