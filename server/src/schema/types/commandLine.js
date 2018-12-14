export default `
type CommandLine{
  id: ID
  name:String
  commands:[CommandLineCommand]
  components:JSON
  connections:JSON
  values:JSON
  config:JSON
}

type CommandLineCommand {
  name: String
  help: String
}
`;
