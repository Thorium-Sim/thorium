export const shieldColor = ({state, integrity}) => {
  if (!state) return 'rgba(0,0,0,0)';
  let red = 0;
  let green = 0;
  let blue = 0;
  let alpha = 1;
  if (integrity <= 0.33){
    red = integrity * 3 * 255;
    alpha = 255 - (integrity * 3 * 255);
  }
  if (integrity > 0.33 && integrity <= 0.66) {
    red = 255;
    green = (integrity - .33) * 3 * 255;
  }
  if (integrity > 0.66) {
    red = (255 - (integrity * 255));
    green = (255 - (integrity * 128));
    blue = integrity * 255;
  }
  return `rgba(${Math.round(red)},${Math.round(green)},${Math.round(blue)},${Math.round(alpha)})`;
}
const shieldStyle = (shields, extra=false) =>{
  // Creates the styles for multiple shields
  const output = [];
  shields.forEach(s => {
    if (s.position === 1){
      output.push(`20px 0px 20px -15px ${shieldColor(s)}`);
      output.push(`inset -20px 0px 20px -15px ${shieldColor(s)}`);
    }
    if (s.position === 2){
      output.push(`-20px 0px 20px -15px ${shieldColor(s)}`);
      output.push(`inset 20px 0px 20px -15px ${shieldColor(s)}`);
    }
    if (s.position === 3 && !extra){
      output.push(`0px -20px 20px -15px ${shieldColor(s)}`);
      output.push(`inset 0px 20px 20px -15px ${shieldColor(s)}`);
    }
    if (s.position === 4 && !extra){
      output.push(`0px 20px 20px -15px ${shieldColor(s)}`);
      output.push(`inset 0px -20px 20px -15px ${shieldColor(s)}`);
    }
    if (s.position === 5 && extra){
      output.push(`0px 20px 20px -15px ${shieldColor(s)}`);
      output.push(`inset 0px -20px 20px -15px ${shieldColor(s)}`);
    }
    if (s.position === 6 && extra){
      output.push(`0px -20px 20px -15px ${shieldColor(s)}`);
      output.push(`inset 0px 20px 20px -15px ${shieldColor(s)}`);
    }
  })
  return output.join(',');
}

export default shieldStyle;