import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type SurveyForm {
    id: ID
    simulatorId: ID
    title: String
    active: Boolean
    form: [FormFields]
    results: [FormResults]
  }

  type FormResults {
    client: String
    station: String
    name: String
    form: [FormFields]
  }

  type FormFields {
    id: ID
    type: String
    title: String
    description: String
    options: [FormOptions]
    value: String
    max: Int
    min: Int
  }

  type FormOptions {
    id: ID
    label: String
  }

  input FormResultsInput {
    client: String
    form: [FormFieldsInput]
  }
  input FormFieldsInput {
    id: ID
    type: String
    title: String
    description: String
    options: [FormOptionsInput]
    value: String
    max: Int
    min: Int
  }
  input FormOptionsInput {
    id: ID
    label: String
  }
  extend type Query {
    surveyform(simulatorId: ID, active: Boolean): [SurveyForm]
  }
  extend type Mutation {
    createSurveyForm(name: String!): String
    removeSurveyForm(id: ID!): String
    updateSurveyForm(id: ID!, form: [FormFieldsInput]!): String
    triggerSurvey(simulatorId: ID!, id: ID!): String
    surveyFormResponse(id: ID!, response: FormResultsInput): String
    endSurvey(id: ID!): String
  }
  extend type Subscription {
    surveyformUpdate(simulatorId: ID, active: Boolean): [SurveyForm]
  }
`;

const resolver = {
  Query: {
    surveyform(root, { simulatorId, active }) {
      let returnVal = App.surveyForms.filter(s => {
        if (active === true) {
          return s.active === true;
        } else if (active === false) {
          return !s.active;
        }
        return true;
      });
      if (simulatorId) {
        return returnVal.filter(i => i.simulatorId === simulatorId);
      }
      return returnVal.filter(i => i.simulatorId === null);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    surveyformUpdate: {
      resolve(rootValue, { simulatorId, active }) {
        if (simulatorId) {
          return rootValue
            .filter(s => {
              if (active === true) {
                return s.active === true;
              } else if (active === false) {
                return !s.active;
              }
              return true;
            })
            .filter(s => s.simulatorId === simulatorId);
        }
        return rootValue
          .filter(s => {
            if (active === true) {
              return s.active === true;
            } else if (active === false) {
              return !s.active;
            }
            return true;
          })
          .filter(s => s.simulatorId === null);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("surveyformUpdate"),
        rootValue => !!rootValue
      )
    }
  }
};

export default { schema, resolver };
