export interface MacroConfigProps {
  simulatorId?: string;
  stations?: any[];
  clients?: any[];
  updateArgs: (key: string, value: any) => void;
  args: any;
  client?: any;
}
