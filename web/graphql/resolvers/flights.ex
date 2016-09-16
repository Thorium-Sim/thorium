import RethinkDB.Query, only: [table: 1]
defmodule Thorium.FlightResolver do
	def get(_args, _info) do
		table("flights")
		|> DB.run
		|> DB.handle_graphql_resp
	end
end
