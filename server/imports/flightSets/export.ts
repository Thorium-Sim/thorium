import App from "../../app";
import yazl from "yazl";
import addAsset from "../addAsset";

export default function exportFlightSet(id: string, res: any) {
  const flightSet = (App as any).flightSets?.find((s: any) => s.id === id);
  if (!flightSet) {
    return res.end("No flight set");
  }

  const zipfile = new yazl.ZipFile();

  // Add the flight set JSON (preserve macro actions as-is)
  const flightSetBuffer = Buffer.from(JSON.stringify(flightSet));
  zipfile.addBuffer(flightSetBuffer, "flightSet/flightSet.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8),
  });

  const addAssetFromString = (loc?: string | null) => {
    if (!loc || typeof loc !== "string") return;
    const normalized = loc.startsWith("/assets/")
      ? loc.replace(/^\/assets\//, "/")
      : loc;
    addAsset(normalized as any, zipfile, "flightSet");
  };

  // Gather all referenced assets
  addAssetFromString(flightSet.backgroundImg);
  (flightSet.startOptions || []).forEach((o: any) => addAssetFromString(o?.imgUrl));
  (flightSet.speedOptions || []).forEach((o: any) => addAssetFromString(o?.imgUrl));
  (flightSet.exitOptions || []).forEach((o: any) => addAssetFromString(o?.imgUrl));
  (flightSet.borders || []).forEach((b: any) => addAssetFromString(b?.iconUrl));
  (flightSet.pointsOfInterest || []).forEach((poi: any) => {
    addAssetFromString(poi?.iconUrl);
    addAssetFromString(poi?.fullImageUrl);
    (poi?.transitOptions || []).forEach((t: any) => addAssetFromString(t?.iconUrl));
  });

  zipfile.end({}, function () {
    res.set({
      "Content-Disposition": `attachment; filename=${flightSet.name}.flst`,
      "Content-Type": "application/octet-stream",
    });
    zipfile.outputStream.pipe(res);
  });
}


