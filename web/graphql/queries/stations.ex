alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, filter: 2]

defmodule App.Query.Stations do
  def get do
    %{
      type: %List{ofType: App.Type.Station.get},
      args: %{
        id: %{
          type: %GraphQL.Type.String{},
          description: "Return a single station by ID"
        },
        simulatorId: %{
          type: %GraphQL.Type.String{},
          description: "Return all stations in a simulator"
        }
      },
      resolve: {App.Query.Stations, :stations}
    }
  end
  def stations(_, %{id: id}, _) do
    table("stations") 
    |> filter(%{id: id}) 
    |> DB.run 
    |> DB.handle_graphql_resp
  end

  def stations(_, %{simulatorId: id}, _) do
    table("stations") 
    |> filter(%{simulatorId: id}) 
    |> DB.run 
    |> DB.handle_graphql_resp
  end

  def stations(_, _args, _) do
    table("stations") 
    |> DB.run 
    |> DB.handle_graphql_resp
  end
end
