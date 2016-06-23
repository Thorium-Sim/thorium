import RethinkDB.Query, only: [table_create: 1, table_drop: 1, table: 1, insert: 2]

defmodule Thorium.PageController do
  use Thorium.Web, :controller

  def reset_db(conn, _params) do
    table_drop("simulators") |> DB.run
    table_drop("stations") |> DB.run

    table_create("simulators") |> DB.run
    table_create("stations") |> DB.run
    table_create("cards") |> DB.run
    
    table("simulators") |> insert(%{
    	id: "voyager",
    	name: "Voyager"
    	}) |> DB.run
    table("simulators") |> insert(%{
    	id: "phoenix",
    	name: "Phoenix"
    	}) |> DB.run
    table("stations") |> insert(%{
      id: "voyager-captain",
      name: "Captain",
      simulatorId: "voyager"
      }) |> DB.run

    text conn, "Database Reset"
  end


  def index(conn, _params) do
    render conn, "index.html"
  end

end
