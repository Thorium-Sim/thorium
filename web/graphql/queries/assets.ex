alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, filter: 2]

defmodule App.Query.Assets do
  def get do
    %{
      type: %List{ofType: App.Type.Flight.get},
      args: %{
        fullPath: %{
          type: %GraphQL.Type.String{},
          description: "Return a single asset by full path."
        },
      },
      resolve: {App.Query.Assets, :assets}
    }
  end
  def flights(_, %{fullPath: fullPath}, _) do
    table("flight")
    |> filter(%{fullPath: fullPath})
    |> DB.run
    |> DB.handle_graphql_resp
  end

  def flights(_, _args, _) do
    table("flights")
    |> DB.run
    |> DB.handle_graphql_resp
  end
end
