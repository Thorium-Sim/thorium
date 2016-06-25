import RethinkDB.Query, only: [table: 1, filter: 2, insert: 2, update: 2, delete: 1]

defmodule Thorium.OperationsChannel do
	@moduledoc """
	General purpose operations channel. Use for inserts,
	updates, and deletes
	"""
	use Phoenix.Channel

	def join("operations", params, socket) do
		{:ok, socket}
	end


	def handle_in("insert", params, socket) do
		IO.inspect "insert"
		IO.inspect params
		table(params["table"])
		|> insert(params["data"])
		|> DB.run
		{:noreply, socket}
	end

	def handle_in("update", params, socket) do
		IO.inspect "update"
		IO.inspect params
		table(params["table"])
		|> filter(params["filter"])
		|> update(params["data"])
		|> DB.run
		{:noreply, socket}
	end

	def handle_in("delete", params, socket) do
		IO.inspect "delete"
		IO.inspect params
		table(params["table"])
		|> filter(params["filter"])
		|> delete()
		|> DB.run
		{:noreply, socket}
	end
end