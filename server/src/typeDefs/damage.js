import App from "../app";
import { gql } from "apollo-server-express";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
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
  extend type Mutation {
    damageSystem(
      systemId: ID!
      report: String
      destroyed: Boolean
      which: String
    ): String
    damageReport(systemId: ID!, report: String!): String
    updateCurrentDamageStep(systemId: ID!, step: Int!): String
    repairSystem(systemId: ID!): String
    requestDamageReport(systemId: ID!): String
    systemReactivationCode(
      systemId: ID!
      station: String!
      code: String!
    ): String
    systemReactivationCodeResponse(systemId: ID!, response: Boolean!): String
    addSystemDamageStep(systemId: ID!, step: DamageStepInput!): String
    updateSystemDamageStep(systemId: ID!, step: DamageStepInput!): String
    removeSystemDamageStep(systemId: ID!, step: ID!): String
    generateDamageReport(systemId: ID!, steps: Int): String

    addSystemDamageTask(systemId: ID!, task: DamageTaskInput!): String
    removeSystemDamageTask(systemId: ID!, taskId: ID!): String
    updateSystemDamageTask(systemId: ID!, task: DamageTaskInput!): String

    #Macro: Damage Control: Break system
    breakSystem(simulatorId: ID!, type: String!, name: String): String

    #Macro: Damage Control: Fix system
    fixSystem(simulatorId: ID!, type: String!, name: String): String

    setDamageStepValidation(id: ID!, validation: Boolean!): String
    validateDamageStep(id: ID!): String

    addSimulatorDamageStep(simulatorId: ID!, step: DamageStepInput!): String
    updateSimulatorDamageStep(simulatorId: ID!, step: DamageStepInput!): String
    removeSimulatorDamageStep(simulatorId: ID!, step: ID!): String

    addSimulatorDamageTask(simulatorId: ID!, task: DamageTaskInput!): String
    removeSimulatorDamageTask(simulatorId: ID!, taskId: ID!): String
    updateSimulatorDamageTask(simulatorId: ID!, task: DamageTaskInput!): String
  }

  extend type Simulator {
    damageTasks: [DamageTask]
  }

  extend type System {
    damageTasks: [DamageTask]
  }
`;

const resolver = {
  DamageTask: {
    taskTemplate(rootValue) {
      return App.taskTemplates.find(t => t.id === rootValue.id);
    },
    nextSteps(rootValue) {
      return App.taskTemplates.filter(
        t => rootValue.nextSteps.indexOf(t.id) > -1
      );
    }
  },
  Mutation: mutationHelper(schema)
};

export default { schema, resolver };
