import FileExplorer from "components/views/TacticalMap/fileExplorer";
import React from "react";

export default ({ selectedImage, updateImage }: { selectedImage: string, updateImage: (img: string) => void }) => (
    <FileExplorer
        directory="/"
        selectedFiles={[selectedImage]}
        onClick={(evt: any, container: { fullPath: string, url: string }) => updateImage(container.url)}
    />
);