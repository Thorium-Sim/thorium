import React from "react";
import usePrevious from "helpers/hooks/usePrevious";
import FighterDisplay from "./fighterDisplay";
import calculatePosition from "./calculatePosition";

const Fighters = props => {
  return props.fighters.map(e => <Fighter key={e.id} {...props} {...e} />);
};

export default Fighters;

const Fighter = ({
  id,
  type,
  position,
  destroyed,
  zoomFactor = 10,
  center,
  track,
  miniMap,
  ...props
}) => {
  const prevDestroyed = usePrevious(destroyed);
  const [exploding, setExploding] = React.useState(false);
  React.useEffect(() => {
    if (!prevDestroyed && destroyed && !exploding) {
      setExploding(true);
    }
  }, [destroyed, exploding, prevDestroyed]);
  if (!exploding && destroyed) return null;
  if ((type === "torpedo" || exploding) && miniMap) return null;
  const { x, y } = calculatePosition({
    position: position,
    center,
    zoomFactor,
    track
  });
  return (
    <div
      key={id}
      className="enemy-outer"
      style={{
        zIndex: exploding ? 1000000 : null,
        transform: `translate(${x}%,${y}%)`
      }}
    >
      <FighterDisplay
        {...props}
        id={id}
        exploding={exploding}
        type={type}
        miniMap={miniMap}
      />
    </div>
  );
};
