import React from "react";
import useMeasure from "helpers/hooks/useMeasure";

const Beam: React.FC<{shown: boolean; className?: string}> = ({
  shown,
  className = "",
}) => {
  const [dimRef, dimensions, canvas] = useMeasure<HTMLCanvasElement>();
  React.useEffect(() => {
    let animation: number;
    const context = canvas?.getContext("2d");
    const draw = () => {
      animation = requestAnimationFrame(draw);

      if (!canvas || !context) return;
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      context.clearRect(0, 0, dimensions.width, dimensions.height);
      for (let i = 0; i < 200; i++) {
        context.beginPath();
        context.moveTo(dimensions.width, 0);
        context.lineTo(
          0,
          0.7 * dimensions.height + (Math.random() * dimensions.height) / 2,
        );
        context.strokeStyle = "rgba(50,180,255," + (Math.random() - 0.25) + ")";
        context.stroke();
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(animation);
    };
  }, [canvas, dimensions]);

  return (
    <canvas
      ref={dimRef}
      id="tractorEffect"
      className={`${className} ${shown ? "shown" : ""}`}
    />
  );
};

export default Beam;
