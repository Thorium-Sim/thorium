import {addMockFunctionsToSchema, makeExecutableSchema} from "graphql-tools";
import {addTypenameToDocument} from "apollo-utilities";
import {graphql} from "graphql";
import gql from "graphql-tag";
import mergeWith from "lodash.mergewith";
import {print} from "graphql/language/printer";
import schemaString from "../../schema.graphql?raw";

// Mock our custom scalar values in the canvas graphql schema
const DEFAULT_MOCKS = [
  //{URL: "http://graphql-mocked-url.com"},
  // {DateTime: null},
  {
    JSON: {},
    Damage: {
      damaged: false,
    },
    Power: {
      power: 40,
      powerLevels: [1],
    },
  },
];

// Allow you to merge and replace an existing array with an empty array.
// https://github.com/lodash/lodash/issues/1313
function emptyArrayReplaceCustomizer(obj, src) {
  if (Array.isArray(src)) {
    return src;
  }
  return undefined;
}

// Get and cache the valid types that can be mocked
let _typeIntrospectionSet = null;
async function getValidTypes() {
  if (_typeIntrospectionSet !== null) {
    return _typeIntrospectionSet;
  }

  const typeIntrospectionQuery = "{ __schema { types { name } } }";
  const schema = makeExecutableSchema({
    typeDefs: schemaString,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });
  const result = await graphql(schema, typeIntrospectionQuery);
  // eslint-disable-next-line require-atomic-updates
  _typeIntrospectionSet = new Set(
    result.data.__schema.types.map(type => type.name),
  );
  return _typeIntrospectionSet;
}

async function createMocks(overrides = []) {
  const mocks = {};
  if (!Array.isArray(overrides)) {
    overrides = [overrides];
  }

  const validTypes = await getValidTypes();
  const allOverrides = [...DEFAULT_MOCKS, ...overrides];

  allOverrides.forEach(overrideObj => {
    if (typeof overrideObj !== "object") {
      throw new Error(`overrides must be an object, not ${typeof overrideObj}`);
    }

    Object.keys(overrideObj).forEach(key => {
      // Sanity check. If someone tries to add an override that doesn't exist in
      // the schema, we are going to fail hard here instead of having unexpected
      // results returned from this function
      if (!validTypes.has(key)) {
        const err =
          `The override "${key}" is not a valid graphql type. ` +
          "Did you typo it or forget to update your graphql schema?";
        throw new Error(err);
      }

      const defaultFunction = mocks[key] || (() => undefined);
      const defaultValues = defaultFunction();
      const overrideFunction =
        typeof overrideObj[key] === "function"
          ? overrideObj[key]
          : () => overrideObj[key];
      const overrideValues = overrideFunction();

      // This if statement handles scalar types. For example, saying that all URL
      // types resolve to a dummy url, regardless of where they show up in the query
      if (typeof overrideValues !== "object" || overrideValues === null) {
        mocks[key] = () => overrideValues;
      } else {
        mocks[key] = () =>
          mergeWith(defaultValues, overrideValues, emptyArrayReplaceCustomizer);
      }
    });
  });

  return mocks;
}

function nodeInterfaceProperlyMocked(queryAST, mocks) {
  // flatMap
  const selections = queryAST.definitions.reduce(
    (acc, d) => acc.concat(d.selectionSet.selections),
    [],
  );
  const selectionNames = new Set(selections.map(s => s.name.value));
  if (selectionNames.has("node") || selectionNames.has("legacyNode")) {
    if (mocks.Node) {
      const result = mocks.Node();
      return result && result.__typename;
    }
  } else {
    return true;
  }
}

export default async function mockGraphqlQuery(
  query,
  overrides = [],
  variables = {},
) {
  const queryAST = typeof query === "string" ? gql(query) : query;
  const mocks = await createMocks(overrides);

  // Catch common mistake of forgetting to override the __typename for node interface
  if (!nodeInterfaceProperlyMocked(queryAST, mocks)) {
    const err =
      "You must add a __typename override to tell the node interface what type " +
      'you are expecting. For example: `{Node: {__typename: "Course"}}`';
    throw new Error(err);
  }

  // Turn the AST query into a string that can be used to make a query against graphql.js
  const queryStr = print(addTypenameToDocument(queryAST));
  const schema = makeExecutableSchema({
    typeDefs: schemaString,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  // Run our query againsted the mocked server
  addMockFunctionsToSchema({schema, mocks});
  const result = await graphql(schema, queryStr, null, null, variables);
  if (result.errors) {
    const errors = result.errors.map(e => e.message);
    throw new Error(
      "The graphql query contained errors:\n  - " + errors.join("\n  - "),
    );
  }
  return result;
}
