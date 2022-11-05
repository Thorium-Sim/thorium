import React, {Suspense} from "react";
import useGLTFPreview from "./useGLTFPreview";

function Preview({src}: {src: string}) {
  const preview = useGLTFPreview(src);
  return <img src={preview} alt="preview" />;
}
const GLTFPreview: React.FC<{src: string}> = ({src}) => {
  return (
    <div className="gltf-preview" style={{height: "200px", width: "100%"}}>
      <Suspense fallback={<span>Loading...</span>}>
        <Preview src={src} />
      </Suspense>
    </div>
  );
};

export default GLTFPreview;
