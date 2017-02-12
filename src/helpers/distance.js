export default function distance(points1 = {x: 0, y:0}, points2){
  return Math.sqrt(Math.pow(points2.x-points1.x,2)+Math.pow(points2.y-points1.y,2));
}