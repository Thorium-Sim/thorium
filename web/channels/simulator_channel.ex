alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1]

defmodule Thorium.SimulatorsChannel do
	@moduledoc """
	A channel for tracking the simulator object.
	"""
	use Phoenix.Channel

	@doc "Supply all simulator object when the socket joins initially"
	def join("simulators:all", _message, socket) do
		send(self, :after_join)
    	{:ok, socket}
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
				handle_changes(change)
			end)
		end

		{:noreply, socket}
	end

	def handle_changes(%{new_val: nil}) do
		IO.inspect "Nil"
	end
	def handle_changes(%{new_val: value}) do
		IO.inspect value
	end
	def handle_changes(change) do
		IO.inspect change
	end
end