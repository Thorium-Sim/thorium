alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, get: 2, filter: 2]

defmodule App.Type.Flight do
  @type_string %{type: %GraphQL.Type.String{}}
  @type_integer %{type: %GraphQL.Type.Int{}}
  def get do
    %GraphQL.Type.ObjectType{
      name: "Flight",
      description: "A flight is a single instance of a currently-running mission.",
      fields: %{
        id: @type_string,
        name: @type_string,
        simulators: %{
          type: %List{ofType: App.Type.Simulator.get},
          resolve: {App.Type.Flight, :get_simulators}
          },
          },
        }
      end

      def get_simulators(doc, _args, _) do
        table("simulators")
        |> filter(%{flightId: doc.id})
        |> DB.run
        |> DB.handle_graphql_resp
      end
    end
