defmodule Thorium.SessionChannel do
  use Thorium.Web, :channel
  alias Thorium.Presence

  def join("session", params, socket) do
        IO.inspect "Parameters:"
    IO.inspect params
    send(self, :after_join)
    {:ok, assign(socket, :user_id, params["client_id"])}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      online_at: inspect(System.system_time(:seconds))
      })
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end
end