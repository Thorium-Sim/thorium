alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, filter: 2]

defmodule App.Query.Flights do
  def get do
    %{
      type: %List{ofType: App.Type.Flight.get},
      args: %{
        id: %{
          type: %GraphQL.Type.String{},
          description: "Return a single flight by ID."
        },
      },
      resolve: {App.Query.Flights, :flights}
    }
  end
  def flights(_, %{id: id}, _) do
    table("flight") 
    |> filter(%{id: id}) 
    |> DB.run 
    |> DB.handle_graphql_resp
  end

  def flights(_, _args, _) do
    table("flights") 
    |> DB.run 
    |> DB.handle_graphql_resp
  end
end


