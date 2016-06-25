import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1]

defmodule Thorium.GenericChannel do
	@moduledoc """
	General Purpose channel. Allows for filtering keys.
	Use a more specific channel for joins and other
	complex database operations
	"""
	use Phoenix.Channel

	@doc """
	Pull out all the variables from the subscription itself
	Use more specific channels for more specific queries
	"""

	def join("generic:" <> connParams, _params, socket) do
		#Split up the tablename
		splitParams = String.split(connParams,":")
		handleParams = case length(splitParams) do
			1 -> %{"tableName" => List.first(splitParams)}
			res -> %{"tableName" => List.first(splitParams), "filterParams" => splitParams -- List.wrap(List.first(splitParams))}
		end
		send self, {:after_join, handleParams}
		{:ok, socket}
	end

	def join("generic:operations", params, socket) do
		IO.inspect "Generic Operations"
		IO.inspect params
		{:ok, socket}	
	end

	def join(whatever, _, socket) do
		{:error, %{message: "Unable to connect to channel " <> whatever <> ". Try using the form 'generic:tableName:keyName' eg 'generic:simulators:all'"}}
	end

	@doc "Connect to the RethinkDB Changefeed with a specific key and value and publish changes as added"
	def handle_info({:after_join, %{"tableName" => tableName, "filterParams" => [filterParams]}}, socket) do
		#Gotta convert our key-value pair into a keyword list
		#Only going to support one filterParam for now
		filters = String.split(filterParams,";")
		filter_map = Enum.reduce filters, %{}, fn(filter, acc) ->
			filterList = String.split(filter,"?")
			Map.put(acc, List.first(filterList), List.last(filterList))
		end
		IO.inspect "Filter Map"
		IO.inspect filter_map
		q = table(tableName) |> filter(filter_map)
		result = DB.run(q)
		Enum.each(result.data, fn station -> push socket, "new:" <> tableName, station end)

		changes = changes(q)
		|> DB.run
		Task.async fn ->
			Enum.each(changes, fn change ->
				handle_changes(socket, change, tableName)
			end)
		end

		{:noreply, socket}
	end

	def handle_info({:after_join, %{"tableName" => tableName}}, socket) do
		q = table(tableName)
		result = DB.run(q)
		Enum.each(result.data, fn record -> push socket, "new:" <> tableName, record end)
		IO.inspect "new:" <> tableName
		changes = changes(q)
		|> DB.run
		Task.async fn ->
			Enum.each(changes, fn change ->
				handle_changes(socket, change, tableName)
			end)
		end

		{:noreply, socket}
	end

	@doc "Station object removed"
	def handle_changes(socket, %{"new_val" => nil, "old_val" => old_val}, tableName) do
		push socket, "remove:" <> tableName, old_val
	end
	@doc "New station object created"
	def handle_changes(socket, %{"new_val" => new_val, "old_val" => nil}, tableName) do
		push socket, "new:" <> tableName, new_val
	end
	@doc "Station object updated"
	def handle_changes(socket, change, tableName) do
		push socket, "update:" <> tableName, change
	end
end
