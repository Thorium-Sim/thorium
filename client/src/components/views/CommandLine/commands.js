import PluginBase from "terminal-in-react/lib/js/components/Plugin";

export default function(props) {
  return class Commands extends PluginBase {
    static displayName = "Commands";
    static version = "1.0.0";

    monitor = ([_, command]) => {
      switch (command ? command.toLowerCase() : command) {
        case "activate":
          return "Monitor Activated";
        case "deactivate":
          return "Monitor Deactivated";
        case "help":
          return `monitor activate - Activate the security monitors
monitor deactivate - Deactivate the security monitors`;
        default:
          return "Invalid Command";
      }
    };
    lockdown = () => {
      this.api.takeControl({}, "", "");
      Array(200)
        .fill(0)
        .forEach((_, i, a) => {
          setTimeout(() => {
            this.api.removeLine(-1);
            this.api.printLine(
              `Locking down computer console: ${Math.floor(
                Math.random() * 255
              )}.${Math.floor(Math.random() * 255)}.${Math.floor(
                Math.random() * 255
              )}.${Math.floor(
                Math.random() * 255
              )} - Percent complete: ${Math.round((i / a.length) * 100)}%`
            );
            if (i === a.length - 1) {
              this.api.releaseControl();
              this.api.printLine("LOCKDOWN COMPLETE");
            }
          }, i * 100);
        });
    };
    scramble = () => {
      this.api.takeControl({}, "", "");
      Array(30)
        .fill(0)
        .forEach((_, i, a) => {
          const line = Array(Math.round(Math.random() * 20) + 6)
            .fill(0)
            .map(() => String.fromCharCode(Math.round(Math.random() * 57) + 32))
            .join("");
          setTimeout(() => {
            this.api.removeLine(-1);
            if (i + 1 === a.length) {
              this.api.releaseControl();
              this.api.printLine("Scrambling Codes: Done");
            } else {
              this.api.printLine(`Scrambling Codes: ${line}`);
            }
          }, i * 100);
        });
    };
    run = ([_, cmd, args]) => {
      return "Command not found";
    };
    disconnect = () => props.disconnect && props.disconnect();
    programmer = () => "Alex Anderson 🚀";
    commands = {
      monitor: this.monitor,
      lockdown: this.lockdown,
      scramble: this.scramble,
      run: this.run,
      programmer: this.programmer
    };
    descriptions = {
      programmer: false,
      monitor: "Activate or deactivate the security monitors",
      scramble: "Scramble access codes",
      run: false,
      lockdown: "Lock down computer terminals on the network",
      disconnect: "Disconnect from this terminal"
    };
  };
}
