import RethinkDB.Query, only: [table: 1, get: 2, insert: 2, update: 2, delete: 1]
defmodule Thorium.StationResolver do
  def getStation(_, %{source: source}) when is_map(source) do
    table("stations")
    |> get(source.stationSet)
    |> DB.run()
    |> DB.handle_graphql_resp
  end
  def getStation(args, _info) do
    table("stations")
    |> DB.run()
    |> DB.handle_graphql_resp
  end
  def addStationSet(args, _info) do
    {:ok, %{generated_keys: keys}} = table("stations")
    |> insert(args)
    |> DB.run()
    |> DB.handle_graphql_resp

    [head | tail] = keys
    {:ok, Map.put(args, :id, head)}
  end

  def removeStationSet(args, _info) do
    IO.inspect(args)
    res = table("stations")
    |> get(args.id)
    |> delete()
    |> DB.run()
    |> DB.handle_graphql_resp
    IO.inspect res
    {:ok, args}
  end

  def addStation(%{id: id, station: station}, _info) do
    %{data: stationSet} = table("stations")
    |> get(id)
    |>  DB.run()
    stations = stationSet["stations"] ++ [station]
    updatedStationSet = Map.put(stationSet, "stations", stations)
    table("stations")
    |> get(id)
    |> update(updatedStationSet)
    |> DB.run()
    updatedStationSet |> DB.handle_graphql
  end

  def removeStation(%{id: id, station: station}, _info) do
    %{data: stationSet} = table("stations")
    |> get(id)
    |>  DB.run()
    stations = Enum.filter(stationSet["stations"], fn(stationIt) -> stationIt["name"] != station end)
    updatedStationSet = Map.put(stationSet, "stations", stations)
    table("stations")
    |> get(id)
    |> update(updatedStationSet)
    |> DB.run()
    updatedStationSet |> DB.handle_graphql
  end

  def editStation(args, _info) do

  end
end