alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, filter: 2, get_all: 3]

defmodule App.Query.Simulators do
  def get do
    %{
      type: %List{ofType: App.Type.Simulator.get},
      args: %{
        id: %{
          type: %GraphQL.Type.String{},
          description: "Return a single simulator by ID."
        }
      },
      resolve: {App.Query.Simulators, :simulators}
    }
  end

  def simulators(_, %{id: id}, _) do
    table("simulators") 
    |> get_all(id, %{"index" => "id"}) 
    |> DB.run 
    |> DB.handle_graphql_resp
  end

  def simulators(_, _args, _) do
    table("simulators") 
    |> DB.run 
    |> DB.handle_graphql_resp
  end
end
