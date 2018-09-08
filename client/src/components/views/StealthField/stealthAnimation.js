import React from "react";

const StealthAnimation = ({ src, activated, status, id, state }) => {
  const getDisplay = () => {
    if (!id) return "none";
    if (status && !activated) return "none";
    if (state || !activated) return "block";
    return "none";
  };
  return (
    <div
      className="stealth-animation"
      style={{
        WebkitMaskImage: `url('${src}')`,
        maskImage: `url('${src}')`,
        display: getDisplay()
      }}
    >
      <div className="band band-1">
        <div className="color" />
      </div>
      <div className="band band-2">
        <div className="color" />
      </div>
      <div className="band band-3">
        <div className="color" />
      </div>
      <div className="band band-4">
        <div className="color" />
      </div>
      <div className="band band-5">
        <div className="color" />
      </div>
      <div className="band band-6">
        <div className="color" />
      </div>
      <div className="band band-7">
        <div className="color" />
      </div>
      <div className="band band-8">
        <div className="color" />
      </div>
      <div className="band band-9">
        <div className="color" />
      </div>
      <div className="band band-10">
        <div className="color" />
      </div>
      <div className="band band-11">
        <div className="color" />
      </div>
      <div className="band band-12">
        <div className="color" />
      </div>
      <div className="band band-13">
        <div className="color" />
      </div>
      <div className="band band-14">
        <div className="color" />
      </div>
      <div className="band band-15">
        <div className="color" />
      </div>
      <div className="band band-16">
        <div className="color" />
      </div>
      <div className="band band-17">
        <div className="color" />
      </div>
      <div className="band band-18">
        <div className="color" />
      </div>
      <div className="band band-19">
        <div className="color" />
      </div>
      <div className="band band-20">
        <div className="color" />
      </div>
      <div className="band band-21">
        <div className="color" />
      </div>
      <div className="band band-22">
        <div className="color" />
      </div>
      <div className="band band-23">
        <div className="color" />
      </div>
      <div className="band band-24">
        <div className="color" />
      </div>
      <div className="band band-25">
        <div className="color" />
      </div>
      <div className="band band-26">
        <div className="color" />
      </div>
      <div className="band band-27">
        <div className="color" />
      </div>
      <div className="band band-28">
        <div className="color" />
      </div>
      <div className="band band-29">
        <div className="color" />
      </div>
      <div className="band band-30">
        <div className="color" />
      </div>
    </div>
  );
};

export default StealthAnimation;
