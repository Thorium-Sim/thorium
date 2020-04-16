export interface MacroConfigProps {
  id?: string;
  simulatorId?: string;
  stations?: any[];
  clients?: any[];
  updateArgs: (key: string, value: any) => void;
  args: any;
  client?: any;
}
