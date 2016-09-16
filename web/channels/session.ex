import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1, get: 2, insert: 2,  update: 2, delete: 1]

defmodule Thorium.SessionChannel do
  use Thorium.Web, :channel
  alias Thorium.Presence

  def join("session", params, socket) do
    send(self, :after_join)
    {:ok, assign(socket, :user_id, params["client_id"])}
  end

  def terminate(_msg, socket) do
    key = socket.assigns.user_id
    IO.inspect table("clients")
    |> get(key)
    |> delete
    |> DB.run
    Presence.untrack(socket, key)
    socket
  end

  def handle_in("updateClient", %{"clientId" => clientId, "params" => params}, socket) do
    # Not worrying about ClientStore right now; save to the Database
    # ClientStore.update_client(clientId, params)
    table("clients")
    |> get(clientId)
    |> update(params)
    |> DB.run
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      })
    key = socket.assigns.user_id
    init = %{
      "flight" => nil,
      "simulator" => nil,
      "station" => nil,
      "id" => key
    }
    #Check to see if the client record already exists
    IO.inspect key
    %{data: data} = table("clients")
    |> get(key)
    |> DB.run
    if data do
      table("clients")
      |> get(key)
      |> update(init)
      |> DB.run
    else
      table("clients")
      |> insert(init)
      |> DB.run
    end
    #Push the presence information
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end
end