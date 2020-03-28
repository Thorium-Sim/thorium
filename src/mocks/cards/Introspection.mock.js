import {IntrospectionQueryDocument} from "generated/graphql";
import introspection from "../data/introspection";
export default [
  {
    request: {
      query: IntrospectionQueryDocument,
    },
    result: {
      data: introspection,
    },
  },
];
