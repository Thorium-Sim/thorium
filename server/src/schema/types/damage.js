export default `
type Damage {
  damaged: Boolean
  destroyed: Boolean
  report: String
  reportSteps: [DamageReportStep]
  requested: Boolean
  reactivationCode: String
  neededReactivationCode: String 
  currentStep: Int
  validate: Boolean
  which: DAMAGE_TYPES
}

enum DAMAGE_TYPES {
  default
  rnd
  engineering
}

type DamageStep {
  id: ID
  name: String
  args: DamageStepArgs
}

type DamageStepArgs {
  end: Boolean

  #Damage Team Args
  cleanup: Boolean
  name: String
  orders: String
  room: String
  preamble: String
  type: String

  #Damage Team Message Args
  message: String

  #Remote Access Args
  code: String
  backup: String

  #Inventory Args
  inventory: String

  #Long Range Message Args
  destination: String

  #Probe Launch Args
  equipment: String
  query: String

  #Generic Args

  #Finish Args
  reactivate: Boolean
}

type DamageTask {
  id: ID
  taskTemplate: TaskTemplate
  required: Boolean
  nextSteps: [TaskTemplate]
}

input DamageTaskInput {
  id: ID
  required: Boolean
  nextSteps: [ID]
}

input DamageStepInput {
  id: ID
  name: String
  args: DamageStepArgsInput
  type: DAMAGE_STEP_TYPES
}

enum DAMAGE_STEP_TYPES {
  required
  optional
}

input DamageStepArgsInput {
  end: Boolean

  #Damage Team Args
  cleanup: Boolean
  name: String
  orders: String
  room: String
  preamble: String
  type: String

  #Damage Team Message Args
  message: String

  #Remote Access Args
  code: String
  backup: String
  
  #Inventory Args
  inventory: String

  #Long Range Message Args
  destination: String

  #Probe Launch Args
  equipment: String
  query: String

  #Generic Args

  #Finish Args
  reactivate: Boolean
}

type DamageReportStep {
  id: ID
  text: String
  validate: Boolean
  validated: Boolean
}
`;
