import RethinkDB.Query, only: [table: 1, get_all: 3]
defmodule Thorium.SimulatorResolver do
  def get(_, %{source: source}) when is_map(source) do
    simulatorList = Enum.map(source.simulators, fn(item) -> item["id"] end)
    table("simulators")
    |> get_all(simulatorList, %{index: "id"})
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
  end

  def update(args, _info) do
    IO.inspect args
  end

  def delete(args, _info) do
    IO.inspect args
  end
end
