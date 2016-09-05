defmodule Thorium.FlightsChannel do
	@moduledoc """
	Channel for accessing flights information from the store.
	"""
	use Phoenix.Channel

	@doc """
	Pull out all the variables from the subscription itself
	Use more specific channels for more specific queries
	"""

	def join("flights", params, socket) do
		IO.puts "flights connection in progress"
		IO.inspect params
		IO.inspect socket
		send(self, {:after_join, params})
		{:ok, socket}
	end

	def join(whatever, _, socket) do
		{:error, %{message: "Unable to connect to channel " <> whatever <> ". Try using the form 'flights'"}}
	end

	@doc """
	The param is a specific flight id that I want to grab
	"""
	def handle_info({:after_join, param}, socket) do
		IO.inspect "Sending init flights"
		{:ok, data} = Poison.encode(Store.getAll)
		push socket, "init:flights", Store.getAll
		{:noreply, socket}
	end
	@doc "flight object removed"
	def handle_changes(socket, %{"new_val" => nil, "old_val" => old_val}, tableName) do
		push socket, "remove:flight", old_val
	end
	@doc "New flight object created"
	def handle_changes(socket, %{"new_val" => new_val, "old_val" => nil}, tableName) do
		push socket, "new:flight", new_val
	end
	@doc "flight object updated"
	def handle_changes(socket, change, tableName) do
		push socket, "update:flight", change
	end
end
