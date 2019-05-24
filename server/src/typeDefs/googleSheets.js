import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type GoogleSheets {
    id: ID
    simulatorId: ID
  }
  type GoogleSheetFile {
    id: ID
    name: String
  }
  type GoogleSpreadsheet {
    id: ID
    title: String
    sheets: [GoogleSheet]
  }
  type GoogleSheet {
    id: ID
    title: String
  }
  extend type Query {
    googleSheets(simulatorId: ID): [GoogleSheets]
  }
  extend type Mutation {
    googleSheetsAuthorize: String
    googleSheetsCompleteAuthorize(token: String!): String
    googleSheetsFileSearch(searchText: String!): [GoogleSheetFile]
    googleSheetsGetSpreadsheet(spreadsheetId: ID!): GoogleSpreadsheet
    googleSheetsAppendData(
      spreadsheetId: ID
      sheetId: String
      data: JSON
    ): String
  }
  extend type Subscription {
    googleSheetsUpdate(simulatorId: ID): [GoogleSheets]
  }
`;

const resolver = {
  GoogleSpreadsheet: {
    id(data) {
      return data.data.spreadsheetId;
    },
    title(data) {
      return data.data.properties.title;
    },
    sheets(data) {
      return data.data.sheets;
    }
  },
  GoogleSheet: {
    id(data) {
      return data.properties.sheetId;
    },
    title(data) {
      return data.properties.title;
    }
  },
  Query: {
    googleSheets(root, { simulatorId }) {
      let returnVal = [];
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    googleSheetsUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("googleSheetsUpdate"),
        (rootValue, args) => {
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
