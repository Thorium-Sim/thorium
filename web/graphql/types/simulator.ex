alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, get: 2, filter: 2]

defmodule App.Type.Simulator do
  @type_string %{type: %GraphQL.Type.String{}}
  @type_boolean %{type: %GraphQL.Type.Boolean{}}

  def get do
    %GraphQL.Type.ObjectType{
      name: "Simulator",
      description: "A simulator.",
      fields: %{
        id: @type_string,
        flightId: @type_string,
        name: @type_string,
        alertLevel: @type_string,
        layout: @type_string,
        template: @type_boolean,
        stations: %{
          type: %List{ofType: App.Type.Station.get},
          resolve: {App.Type.Simulator, :get_stations}
          },
        }
      }
    end

    def get_stations(doc, _args, _) do
      table("stations")
      |> filter(%{simulatorId: doc.id})
      |> DB.run
      |> DB.handle_graphql_resp
    end
  end
