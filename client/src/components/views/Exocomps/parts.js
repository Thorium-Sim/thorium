function importAll(r) {
  return r
    .keys()
    .map(k => ({ path: k, image: r(k) }))
    .reduce((prev, next) => {
      const key = next.path.replace("./", "").replace(".svg", "");
      prev[key] = next.image;
      return prev;
    }, {});
}

const images = importAll(
  require.context("./parts", false, /\.(png|jpe?g|svg|JPE?G|PNG|SVG)$/)
);

export default images;
