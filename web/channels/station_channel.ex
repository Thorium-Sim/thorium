import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1]

defmodule Thorium.StationsChannel do
	@moduledoc """
	A channel for tracking the station object.
	"""
	use Phoenix.Channel

	def join("stations:id:" <> station_id, params, socket) do
		send self, {:after_join, %{"id" => station_id}}
		{:ok, station_id, socket}
	end

	def join("stations:simulatorId:" <> simulator_id, params, socket) do
		send self, {:after_join, %{"simulator_id" => simulator_id}}
		{:ok, simulator_id, socket}
	end

	@doc "Supply all station objects when the socket joins initially"
	def join("stations:all", _message, socket) do
		send(self, :after_join)
    	{:ok, socket}
	end

	@doc "Connect to the RethinkDB Changefeed with a specific station id and publish changes as added"
	def handle_info({:after_join, %{"id" => station_id}}, socket) do
		q = table("stations") |> filter(%{id: station_id})
		result = DB.run(q)
		Enum.each(result.data, fn station -> push socket, "new:station", station end)

		changes = changes(q)
		|> DB.run
		Task.async fn ->
			Enum.each(changes, fn change ->
				handle_changes(socket, change)
			end)
		end

		{:noreply, socket}
	end

	@doc "Connect to the RethinkDB Changefeed with a specific simulator id and publish changes as added"
	def handle_info({:after_join, %{"simulator_id" => simulator_id}}, socket) do
		q = table("stations") |> filter(%{simulatorId: simulator_id})
		result = DB.run(q)
		Enum.each(result.data, fn station -> push socket, "new:station", station end)

		changes = changes(q)
		|> DB.run
		Task.async fn ->
			Enum.each(changes, fn change ->
				handle_changes(socket, change)
			end)
		end

		{:noreply, socket}
	end
	@doc "Connect to the RethinkDB Changefeed and publish changes as added"
	def handle_info(:after_join, socket) do
		q = table("stations")
		result = DB.run(q)
		Enum.each(result.data, fn station -> push socket, "new:station", station end)

		changes = changes(q)
		|> DB.run
		Task.async fn ->
			Enum.each(changes, fn change ->
				handle_changes(socket, change)
			end)
		end

		{:noreply, socket}
	end
	@doc "Station object removed"
	def handle_changes(socket, %{"new_val" => nil, "old_val" => old_val}) do
		push socket, "remove:station", old_val
	end
	@doc "New station object created"
	def handle_changes(socket, %{"new_val" => new_val, "old_val" => nil}) do
		push socket, "new:station", new_val
	end
	@doc "Station object updated"
	def handle_changes(socket, change) do
		push socket, "update:station", change
	end
end