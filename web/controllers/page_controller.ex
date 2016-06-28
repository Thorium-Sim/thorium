import RethinkDB.Query, only: [table_create: 1, table_drop: 1, table: 1, insert: 2]

defmodule Thorium.PageController do
  use Thorium.Web, :controller

  def reset_db(conn, _params) do
    table_drop("simulators") |> DB.run
    table_drop("stations") |> DB.run
    table_drop("cards") |> DB.run
    table_drop("systems") |> DB.run

    table_create("simulators") |> DB.run
    table_create("stations") |> DB.run
    table_create("cards") |> DB.run
    table_create("systems") |> DB.run

    table("simulators") |> insert(%{
    	id: "voyager",
    	name: "Voyager"
    	}) |> DB.run
    table("stations") |> insert(%{
      id: "voyager-admin",
      name: "Admin",
      simulatorId: "voyager"
      }) |> DB.run
    table("cards") |> insert(%{
      name: "Station Admin",
      component: "AdminStations",
      stationId: "voyager-admin",
      order: 0
      }) |> DB.run
    table("systems") |> insert(%{
      name: "Thrusters",
      simulatorId: "voyager",
      attitude: %{
        yaw: 0,
        pitch: 0,
        roll: 0
      },
      attitudeAdjust: %{
        yaw: 0,
        pitch: 0,
        roll: 0
      },
      direction: %{
        x: 0, #Port and Starboard
        y: 0, #Up and Down
        z: 0  #Forward and back
      }
      }) |> DB.run()
    text conn, "Database Reset"
  end


  def index(conn, _params) do
    render conn, "index.html"
  end

end
