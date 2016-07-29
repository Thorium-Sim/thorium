# breakup query and mutations into separate modules this module
# will glue everything together and expose the endpoint
# TODO: update this to be named something appropriate.
defmodule App.PublicSchema do
  def get do
    %GraphQL.Schema{

      query: %GraphQL.Type.ObjectType{
        name: "PublicQueries",
        fields: %{
          simulators: App.Query.Simulators.get,
          stations: App.Query.Stations.get,
          sessions: App.Query.Session.get,
          flights: App.Query.Flights.get,
        }
      },

      mutation: %GraphQL.Type.ObjectType{
        name: "PublicMutations",
        fields: %{
          simulator_create: App.Mutation.Simulators.create,
          simulator_update: App.Mutation.Simulators.update,
          simulator_delete: App.Mutation.Simulators.delete,
        }
      }

    }
  end
end
