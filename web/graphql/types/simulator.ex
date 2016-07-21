alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, get: 2, filter: 2]

defmodule App.Type.Simulator do
  @type_string %{type: %GraphQL.Type.String{}}

  def get do
    %GraphQL.Type.ObjectType{
      name: "Simulator",
      description: "A simulator.",
      fields: %{
        id: @type_string,
        name: @type_string,
        stations: %{
          type: %List{ofType: App.Type.Station.get},
          resolve: fn (doc, _args, _) ->
            table("stations")
            |> filter(%{simulatorId: doc.id})
            |> DB.run
            |> DB.handle_graphql_resp
          end
        },
      }
    }
  end
end
