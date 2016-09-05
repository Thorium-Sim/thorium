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
        },
        flightId: %{
          type: %GraphQL.Type.String{},
          description: "Return based on the flightID of the simulator."
        },
        template: %{
          type: %GraphQL.Type.String{}, #This is a string becuase I can't figure out how to get booleans to work
          description: "Returns only template simulators"
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

  def simulators(_, %{flightId: flightId}, _) do
    table("simulators") 
    |> get_all(flightId, %{"index" => "flightId"}) 
    |> DB.run 
    |> DB.handle_graphql_resp
  end

  def simulators(_, %{template: "true"}, _) do
    table("simulators") 
    |> filter(%{"template" => true})
    |> DB.run 
    |> DB.handle_graphql_resp
  end

  def simulators(_, %{template: "false"}, _) do
    table("simulators") 
    |> filter(%{"template" => nil})
    |> DB.run 
    |> DB.handle_graphql_resp
  end

  def simulators(_, _args, _) do
    table("simulators") 
    |> DB.run 
    |> DB.handle_graphql_resp
  end
end
