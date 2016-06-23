import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1]

defmodule Thorium.SimulatorsChannel do
	@moduledoc """
	A channel for tracking the simulator object.
	"""
	use Phoenix.Channel

	def join("simulators:id:" <> simulator_id, params, socket) do
		send self, {:after_join, simulator_id}
		{:ok, simulator_id, socket}
	end
	@doc "Supply all simulator object when the socket joins initially"
	def join("simulators:all", _message, socket) do
		send(self, :after_join)
		{:ok, socket}
	end

	@doc "Connect to the RethinkDB Changefeed with a specific simulator id and publish changes as added"
	def handle_info({:after_join, simulator_id}, socket) do
		q = table("simulators") |> filter(%{id: simulator_id})
		result = DB.run(q)
		Enum.each(result.data, fn simulator -> push socket, "new:simulator", simulator end)

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
		q = table("simulators")
		result = DB.run(q)
		Enum.each(result.data, fn simulator -> push socket, "new:simulator", simulator end)

		changes = changes(q)
		|> DB.run
		Task.async fn ->
			Enum.each(changes, fn change ->
				handle_changes(socket, change)
			end)
		end

		{:noreply, socket}
	end
	@doc "Simulator object removed"
	def handle_changes(socket, %{"new_val" => nil, "old_val" => old_val}) do
		push socket, "remove:simulator", old_val
	end
	@doc "New simulator object created"
	def handle_changes(socket, %{"new_val" => new_val, "old_val" => nil}) do
		push socket, "new:simulator", new_val
	end
	@doc "Simulator object updated"
	def handle_changes(socket, change) do
		push socket, "update:simulator", change
	end
end