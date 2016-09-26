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
    stationKeyMap = for {key, val} <- station, into: %{}, do: {Atom.to_string(key), val}
    stations = stationSet["stations"] ++ [stationKeyMap]
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
  def addCard(%{id: id, name: name, card: card}, _info) do
    %{data: stationSet} = table("stations")
    |> get(id)
    |>  DB.run()
    cardKeyMap = for {key, val} <- card, into: %{}, do: {Atom.to_string(key), val}
    stations = Enum.map(stationSet["stations"], fn(stationIt) ->
      case stationIt["name"] do
        name -> Map.put(stationIt, "cards", stationIt["cards"] ++ [cardKeyMap])
        _ -> stationIt
      end
    end)
    updatedStationSet = Map.put(stationSet, "stations", stations)
    table("stations")
    |> get(id)
    |> update(updatedStationSet)
    |> DB.run()
    updatedStationSet |> DB.handle_graphql
  end

  def removeCard(%{id: id, name: name, cardname: card}, _info) do
    %{data: stationSet} = table("stations")
    |> get(id)
    |>  DB.run()
    stations = Enum.map(stationSet["stations"], fn(stationIt) ->
      case stationIt["name"] do
        name -> Map.put(stationIt, "cards", Enum.filter(stationIt["cards"], fn(cardIt) -> cardIt["name"] != card end))
        _ -> stationIt
      end
    end)
    updatedStationSet = Map.put(stationSet, "stations", stations)
    table("stations")
    |> get(id)
    |> update(updatedStationSet)
    |> DB.run()
    IO.inspect updatedStationSet |> DB.handle_graphql
    updatedStationSet |> DB.handle_graphql
  end

  def editStation(args, _info) do

  end
end