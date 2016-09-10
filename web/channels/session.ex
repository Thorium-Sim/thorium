import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1]

defmodule Thorium.SessionChannel do
  use Thorium.Web, :channel
  alias Thorium.Presence

  def join("session", params, socket) do
    send(self, :after_join)
    {:ok, assign(socket, :user_id, params["client_id"])}
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
      "station" => nil
    }
    
    #Push the presence information
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end
end