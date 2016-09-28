import RethinkDB.Query, only: [table: 1, get_all: 3, filter: 2, insert: 2, delete: 1]
defmodule Thorium.SimulatorResolver do
  def get(_, %{source: source}) when is_map(source) do
    simulatorList = Enum.map(source.simulators, fn(item) -> item["id"] end)
    table("simulators")
    |> get_all(simulatorList, %{index: "id"})
    |> DB.run()
    |> DB.handle_graphql_resp
  end

  def get(%{template: true}, _info) do
    table("simulators")
    |> filter(%{template: true})
    |> DB.run()
    |> DB.handle_graphql_resp
  end

  def get(args, _info) do
    table("simulators")
    |> DB.run()
    |> DB.handle_graphql_resp
  end

  def create(args, _info) do
    IO.inspect args
    IO.inspect _info
    {:ok, %{generated_keys: keys}} = table("simulators")
    |> insert(args)
    |> DB.run()
    |> DB.handle_graphql_resp

    [head | tail] = keys
    {:ok, Map.put(args, :id, head)}
  end

  def delete(args, _info) do
    res = table("simulators")
    |> get(args.id)
    |> delete()
    |> DB.run()
    |> DB.handle_graphql_resp
    {:ok, args}
  end
end
