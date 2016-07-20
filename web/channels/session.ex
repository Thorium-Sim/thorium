import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1]

defmodule Thorium.SessionChannel do
  use Thorium.Web, :channel
  alias Thorium.Presence

  def join("session", params, socket) do
    IO.inspect "Parameters:"
    IO.inspect params
    send(self, :after_join)
    {:ok, assign(socket, :user_id, params["client_id"])}
  end

  def handle_in("updateClient", %{"clientId" => clientId, "params" => params}, socket) do
    IO.inspect "Updating Client"
    IO.inspect params
    IO.inspect clientId
    Presence.update(socket, clientId, params)
    push socket, "presence_state", Presence.list(socket)
    IO.inspect Presence.list(socket)
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      })
    #Push the presence information
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end
end