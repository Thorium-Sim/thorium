import RethinkDB.Query, only: [table: 1, get: 2]
defmodule Thorium.StationResolver do
  def getStation _, %{source: source} do
    table("stations")
    |> get(source.stationSet)
    |> DB.run()
    |> DB.handle_graphql_resp
  end
end