alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, filter: 2]

defmodule App.Query.Cards do
  def get do
    %{
      type: %List{ofType: App.Type.Card.get},
      args: %{
        id: %{
          type: %GraphQL.Type.String{},
          description: "Return a single card by ID."
        },
        stationId: %{
          type: %GraphQL.Type.String{},
          description: "Return all cards on a station"
        }
      },
      resolve: {App.Query.Cards, :cards}
    }
  end
  def cards(_, %{id: id}, _) do
    table("cards") 
    |> filter(%{id: id}) 
    |> DB.run 
    |> DB.handle_graphql_resp
  end

  def cards(_, %{stationId: id}, _) do
    table("cards") 
    |> filter(%{stationId: id}) 
    |> DB.run 
    |> DB.handle_graphql_resp
  end

  def cards(_, _args, _) do
    table("cards") 
    |> DB.run 
    |> DB.handle_graphql_resp
  end
end
