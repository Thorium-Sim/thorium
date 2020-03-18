import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../../../helpers/subscriptionManager";
import App from "../../../app";
import {setComponent} from "../setComponentHelper";
import {
  patchResolve,
  handleInitialSubResponse,
} from "../../../helpers/filterPatches";

const schema = gql`
  type TemplateComponent {
    category: String
  }

  extend type Entity {
    template: TemplateComponent
  }
  extend type Subscription {
    templateEntities: [EntitiesPatch]
  }
  extend type Mutation {
    entitySetTemplate(id: ID, category: String!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetTemplate: setComponent("template"),
  },
  Subscription: {
    templateEntities: {
      resolve: patchResolve,
      subscribe: withFilter(
        () => {
          const id = handleInitialSubResponse(id => {
            const entities = App.entities.filter(e => Boolean(e.template));
            pubsub.publish(id, {
              template: true,
              patches: [{values: entities}],
            });
          });
          return pubsub.asyncIterator([id, "templateEntities"]);
        },
        rootValue => {
          return rootValue.template;
        },
      ),
    },
  },
};

export default {schema, resolver};
