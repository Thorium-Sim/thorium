import printJS from "print-js";
interface Macro {
  stepId: string;
  event: string;
  args: string;
  delay: number;
}

const localMacros: {[key: string]: Function | null} = {
  printPdf: ({asset}: {asset: string}) => {
    if (!asset) return;
    printJS({printable: `/assets${asset}`, type: "pdf"});
  },
};
export default function triggerLocalMacros(actions: Macro[]) {
  actions.forEach(action => {
    if (localMacros[action.event]) {
      setTimeout(() => {
        localMacros[action.event]?.(JSON.parse(action.args));
      }, action.delay || 0);
    }
  });
}
