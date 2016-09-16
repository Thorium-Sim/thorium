import RethinkDB.Query, only: [table: 1]
defmodule Thorium.SessionResolver do
	def get(_args, _info) do
		table("clients")
		|> DB.run
		|> DB.handle_graphql_resp
	end
	def add(args, _info) do
		IO.inspect args
	end

	def revoke(args, _info) do
		IO.inspect args
	end
end
