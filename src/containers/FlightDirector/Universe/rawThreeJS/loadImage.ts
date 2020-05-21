const imageCache: {[key: string]: HTMLImageElement} = {};

function loadImage(url: string): Promise<HTMLImageElement> {
  if (!imageCache[url]) {
    const image = new Image();
    const promise = new Promise(resolve => {
      image.addEventListener("load", () => resolve(image));
      image.crossOrigin = "anonymous";
      image.src = url;
    }).then(res => {
      imageCache[url] = res as HTMLImageElement;
      return res;
    }) as Promise<HTMLImageElement>;
    return promise;
  }
  return Promise.resolve(imageCache[url]);
}

export default loadImage;
