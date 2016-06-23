import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1]

defmodule Thorium.CardsChannel do
	@moduledoc """
	A channel for tracking the card object.
	"""
	use Phoenix.Channel

	@doc "Supply a single card object based on station id card objects when the socket joins initially"
	def join("cards:stationId:" <> station_id, params, socket) do
		send self, {:after_join, station_id}
		{:ok, station_id, socket}
	end
	@doc "Connect to the RethinkDB Changefeed and publish changes as added"
	def handle_info({:after_join, station_id}, socket) do
		q = table("cards") |> filter(%{stationId: station_id})
		result = DB.run(q)
		Enum.each(result.data, fn card -> push socket, "new:card", card end)

		changes = changes(q)
		|> DB.run
		Task.async fn ->
			Enum.each(changes, fn change ->
				handle_changes(socket, change)
			end)
		end

		{:noreply, socket}
	end
	@doc "Card object removed"
	def handle_changes(socket, %{"new_val" => nil, "old_val" => old_val}) do
		push socket, "remove:card", old_val
	end
	@doc "New card object created"
	def handle_changes(socket, %{"new_val" => new_val, "old_val" => nil}) do
		push socket, "new:card", new_val
	end
	@doc "Card object updated"
	def handle_changes(socket, change) do
		push socket, "update:card", change
	end
end