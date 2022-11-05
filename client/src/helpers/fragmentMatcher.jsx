import {IntrospectionFragmentMatcher} from "@apollo/client/react/components";

const FragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Location",
          possibleTypes: [
            {
              name: "Deck",
            },
            {
              name: "Room",
            },
          ],
        },
      ],
    },
  },
});

export default FragmentMatcher;
