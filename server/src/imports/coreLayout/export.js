import App from "../../app";

export default function exportCoreLayout(id, res) {
  const layout = App.coreLayouts.find(s => s.id === id);
  if (!layout) {
    return res.end("No core layout");
  }
  const { id: layoutId, ...layoutData } = layout;

  res.set({
    "Content-Disposition": `attachment; filename=${layout.name}.coreLayout`,
    "Content-Type": "application/octet-stream"
  });
  res.end(JSON.stringify(layoutData));
}
