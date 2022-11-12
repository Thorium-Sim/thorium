import chalk from "chalk";
import color from "tinycolor2";

const color1 = `rgb(246, 68, 256)`;
const color2 = `rgb(68, 9, 255)`;

export default function vanity() {
  console.info(chalk`{hex('#000000')  
${`                                                          
                  BPP#                  
                GYYYYY5B                
              BYYY5##555P#              
             GYYYG    B5PPB             
            PY5Y#      #PPPB            
           #Y55B        #PGP&           
           5555          GGPG           
          &555G &&&&&&&& &&&#           
          &555B G55PPPPPGGB#&&          
       &G# P5PP &#&&&&&##BBGGGB#&       
     #P5YP B5PP#        &&&&&#BBB#&     
   &5Y55B&  GPPP&      &GGB#   &BB##    
  BY55G&     GPGG&    &BBBB      ####&  
 BY55B        BGGG& &#GBB#        &###& 
#555B          && &BGGB#           &### 
P555#        &&#BGGGB#& &&          #&&&
G5555PPPGGGGGGGGGB#&  &BBBB#########&&&&
  &&#BBBBBBB##&&         &&&&&&&&&&&    
`
  .split("\n")
  .map((line, lineIndex, lineArr) =>
    line
      .split("")
      .map((char, index, arr) =>
        chalk.hex(
          color
            .mix(
              color1,
              color2,
              Math.round(((index + 1) / arr.length) * 50) +
                Math.round(((lineIndex + 1) / lineArr.length) * 50),
            )
            .toHexString(),
        )(char),
      )
      .join(""),
  )
  .join("\n")}
${` _____ _                _                 
|_   _| |              (_)                
  | | | |__   ___  _ __ _ _   _ _ __ ___  
  | | | '_ \\ / _ \\| '__| | | | | '_ ' _ \\ 
  | | | | | | (_) | |  | | |_| | | | | | |
  \\_/ |_| |_|\\___/|_|  |_|\\__,_|_| |_| |_|`
  .split("\n")
  .map(line =>
    line
      .split("")
      .map((char, index, arr) =>
        chalk.hex(
          color
            .mix(color1, color2, Math.round(((index + 1) / arr.length) * 100))
            .toHexString(),
        )(char),
      )
      .join(""),
  )
  .join("\n")}}`);
};