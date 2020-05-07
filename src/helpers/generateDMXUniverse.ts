import color from "tinycolor2";
import defaultLightingConfig from "./defaultLightingConfig";

export type DMXChannelProperty =
  | "red"
  | "green"
  | "blue"
  | "amber"
  | "white"
  | "uv"
  | "intensity"
  | "strobe"
  | "generic"
  | "actionStrength"
  | "nothing";

export type ChannelProperties =
  | Exclude<DMXChannelProperty, "red" | "green" | "blue">
  | "color";
export type ChannelConfig = Partial<
  {
    [key in ChannelProperties]: number | string | null;
  }
>;

export interface Fixture {
  channel: number;
  mode: "active" | "passive";
  tags: ("main" | "accent" | "work" | "no effects" | string)[];
  passiveChannels: ChannelConfig;
  deviceChannels: DMXChannelProperty[];
}

export type ConfigObj = {
  "1": {[tag: string]: ChannelConfig};
  "2": {[tag: string]: ChannelConfig};
  "3": {[tag: string]: ChannelConfig};
  "4": {[tag: string]: ChannelConfig};
  "5": {[tag: string]: ChannelConfig};
  p: {[tag: string]: ChannelConfig};
  darken: {[tag: string]: ChannelConfig};
};

export type AlertLevels = "1" | "2" | "3" | "4" | "5" | "p" | "darken";

export interface Lighting {
  intensity: number;
  action:
    | "normal"
    | "darken"
    | "blackout"
    | "work"
    | "fade"
    | "shake"
    | "strobe"
    | "oscillate";
  actionStrength: number;
  transitionDuration: number;
  dmxConfig?: ConfigObj;
}

function setUniverse(
  fixture: Fixture,
  lighting: Lighting,
  channels: ChannelConfig,
  universe: number[],
) {
  for (let i = 0; i < fixture.deviceChannels.length; i++) {
    const deviceChannel = fixture.deviceChannels[i];
    const colorValue = color(String(channels.color)).toRgb();

    if (deviceChannel !== "nothing") {
      let value: number = 0;
      if (deviceChannel === "red") {
        value = colorValue.r / 255;
      } else if (deviceChannel === "green") {
        value = colorValue.g / 255;
      } else if (deviceChannel === "blue") {
        value = colorValue.b / 255;
      } else {
        const channelValue = channels[deviceChannel] || "0";
        value = Number(channelValue);
      }

      // Set all lighting channels to the highest value
      if (
        lighting.action === "work" &&
        ["red", "green", "blue", "amber", "white", "intensity"].includes(
          deviceChannel,
        )
      ) {
        value = 1;
      }

      universe[i + fixture.channel] = value;
    }
  }
}
export default function generateUniverse(
  fixtures: Fixture[],
  lighting: Lighting,
  alertLevel: AlertLevels,
  // Used for determining transition lengths
  actionChangeTime: number,
  prevIntensity: number,
) {
  const t = Math.min(
    1,
    (Date.now() - actionChangeTime) / lighting.transitionDuration,
  );
  const cycleT =
    ((Date.now() - actionChangeTime) / lighting.transitionDuration) % 1;

  const universe: number[] = Array(512).fill(0);

  // Total Blackout
  if (lighting.action === "blackout") return universe;

  const channelConfigs =
    lighting?.dmxConfig?.[
      lighting.action === "darken" ? "darken" : alertLevel
    ] ||
    defaultLightingConfig[lighting.action === "darken" ? "darken" : alertLevel];

  fixtures.forEach(fixture => {
    if (fixture.mode === "passive") {
      setUniverse(fixture, lighting, fixture.passiveChannels, universe);
    }
    if (fixture.mode === "active") {
      // Do all this calculation here so
      // lights can have different effect values
      let intensity = lighting.intensity;
      let multiplyValue = 1;
      if (!fixture.tags.includes("no-effects")) {
        switch (lighting.action) {
          case "fade":
            intensity = 1;
            if (prevIntensity > lighting.intensity) {
              // Fading Down
              multiplyValue = Math.abs(1 - t);
            } else {
              // Fading Up
              multiplyValue = t;
            }
            break;
          case "shake":
            multiplyValue = 1 - Math.random() * lighting.actionStrength;
            break;
          case "strobe":
            multiplyValue =
              Math.sin(cycleT * Math.PI) > 0.5
                ? 1 - lighting.actionStrength
                : 1;
            break;
          case "oscillate":
            multiplyValue =
              1 - Math.sin(cycleT * Math.PI) * lighting.actionStrength;
            break;
        }
      }

      const hasIntensity = fixture.deviceChannels.includes("intensity");
      const colorMultiply = (!hasIntensity ? multiplyValue : 1) * intensity;
      const intensityMultiply = (hasIntensity ? multiplyValue : 1) * intensity;

      // Merge together all of the tags
      const channels = fixture.tags
        .concat()
        .sort()
        .reduce((prev: ChannelConfig, tag) => {
          if (tag === "no-effects") return prev;
          const tagConfig = channelConfigs?.[tag];
          if (!tagConfig) return prev;
          Object.entries(tagConfig).forEach(([key, value]) => {
            if (typeof prev[key as ChannelProperties] === "undefined") {
              if (key === "intensity") {
                prev[key as ChannelProperties] =
                  Number(value) * intensityMultiply;
              } else if (key === "color") {
                const rgb = color(String(value)).toRgb();
                prev[key as ChannelProperties] = color({
                  r: rgb.r * colorMultiply,
                  g: rgb.g * colorMultiply,
                  b: rgb.b * colorMultiply,
                }).toHexString();
              } else if (["amber", "white", "uv"].includes(key)) {
                prev[key as ChannelProperties] = Number(value) * colorMultiply;
              } else {
                prev[key as ChannelProperties] = Number(value) || 0;
              }
            }
          });
          return prev;
        }, {});

      // Loop over the channels and apply the correct multiply to the appropriate channel
      setUniverse(fixture, lighting, channels, universe);
    }
  });
  return universe.map(v => Math.round(v * 255));
}
